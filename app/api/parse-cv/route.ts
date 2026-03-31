import { NextRequest, NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdfParse = (await import("pdf-parse")).default;
  const result = await pdfParse(buffer);
  return result.text;
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

function extractWithRegex(text: string) {
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i);
  const phoneMatch = text.match(/(\+?\d[\d\s\-().]{7,}\d)/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const websiteMatch = text.match(/https?:\/\/(?!linkedin)[^\s,]+/i);

  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const firstLine = lines[0] || "";
  const nameParts = firstLine.split(/\s+/);

  const skillKeywords = [
    "JavaScript","TypeScript","Python","React","Node","SQL","Git",
    "Java","C++","CSS","HTML","AWS","Docker","Figma","Excel","Word",
  ];
  const foundSkills = skillKeywords.filter((s) =>
    new RegExp(`\\b${s}\\b`, "i").test(text)
  );

  const summaryMatch = text.match(/(?:summary|about|profile|objective)[:\s\n]+([^\n]{40,300})/i);

  return {
    personalInfo: {
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "",
      jobTitle: lines[1] || "",
      email: emailMatch?.[0] || "",
      phone: phoneMatch?.[0]?.trim() || "",
      location: "",
      website: websiteMatch?.[0] || "",
      linkedin: linkedinMatch?.[0] || "",
    },
    summary: summaryMatch?.[1]?.trim() || "",
    experience: [],
    education: [],
    skills: foundSkills,
    languages: [],
    certifications: [],
  };
}

async function parseWithAI(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const { OpenAI } = await import("openai");
  const client = new OpenAI({ apiKey });

  const prompt = `You are an expert CV parser. Extract structured resume data from the text below.

Return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "personalInfo": {
    "firstName": "",
    "lastName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": "",
    "linkedin": ""
  },
  "summary": "",
  "experience": [
    {
      "company": "",
      "position": "",
      "location": "",
      "startDate": "",
      "endDate": "",
      "currentJob": false,
      "description": ""
    }
  ],
  "education": [
    {
      "school": "",
      "degree": "",
      "location": "",
      "startDate": "",
      "endDate": ""
    }
  ],
  "skills": [],
  "languages": [],
  "certifications": []
}

Rules:
- Dates must be in YYYY-MM format (e.g. "2021-03") or empty string
- currentJob is true if the person still works there (endDate is empty or "Present")
- skills, languages, certifications must be arrays of strings
- description should preserve bullet points separated by newlines
- Extract ALL experience entries and ALL education entries
- linkedin should be just the path like "linkedin.com/in/username"

CV TEXT:
${text.slice(0, 12000)}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content?.trim() || "";
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned no valid JSON");

  return JSON.parse(jsonMatch[0]);
}

function normalizeData(raw: any) {
  const addIds = (arr: any[]) =>
    (arr || []).map((item: any, i: number) => ({
      ...item,
      id: item.id || String(i + 1),
    }));

  return {
    personalInfo: {
      firstName: raw.personalInfo?.firstName || "",
      lastName: raw.personalInfo?.lastName || "",
      jobTitle: raw.personalInfo?.jobTitle || "",
      email: raw.personalInfo?.email || "",
      phone: raw.personalInfo?.phone || "",
      location: raw.personalInfo?.location || "",
      website: raw.personalInfo?.website || "",
      linkedin: raw.personalInfo?.linkedin || "",
    },
    summary: raw.summary || "",
    experience: addIds(raw.experience || []),
    education: addIds(raw.education || []),
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    languages: Array.isArray(raw.languages) ? raw.languages : [],
    certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds the 5MB size limit" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const validExts = ["pdf", "docx", "doc"];
    if (!ext || !validExts.includes(ext)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a PDF or DOCX file." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let text = "";
    if (ext === "pdf") {
      text = await extractTextFromPDF(buffer);
    } else {
      text = await extractTextFromDOCX(buffer);
    }

    const cleanText = text.replace(/\s{3,}/g, "\n").trim();

    if (!cleanText || cleanText.length < 30) {
      return NextResponse.json(
        { error: "Could not extract readable text from this file. Try a different format." },
        { status: 422 }
      );
    }

    let parsed: any = null;
    let usedFallback = false;

    try {
      parsed = await parseWithAI(cleanText);
    } catch (aiError) {
      console.warn("AI parsing failed, using regex fallback:", aiError);
    }

    if (!parsed) {
      parsed = extractWithRegex(cleanText);
      usedFallback = true;
    }

    const data = normalizeData(parsed);

    return NextResponse.json({ data, usedFallback });
  } catch (err: any) {
    console.error("parse-cv error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
