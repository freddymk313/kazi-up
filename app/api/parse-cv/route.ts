import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";
import * as mammoth from "mammoth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const SECTION_HEADERS = [
  "CONTACT", "CONTACTS", "SKILLS", "SKILL", "EDUCATION", "EXPERIENCE",
  "EXPERIENCES", "PROFILE", "SUMMARY", "LANGUAGES", "LANGUAGE",
  "CERTIFICATIONS", "CERTIFICATION", "REFERENCES", "REFERENCE",
  "OBJECTIVE", "ABOUT", "AWARDS", "AWARD", "PROJECTS", "PROJECT",
  "INTERESTS", "INTEREST", "ACTIVITIES", "ACTIVITY", "PUBLICATIONS",
  "VOLUNTEERING", "PORTFOLIO", "HOBBIES",
];

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  return result.text;
}

async function extractTextFromDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

function preprocessText(raw: string): string {
  return raw
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isSectionHeader(value: string): boolean {
  if (!value) return false;
  const upper = value.trim().toUpperCase();
  if (SECTION_HEADERS.includes(upper)) return true;
  if (/^[A-Z\s]{3,}$/.test(value.trim()) && value.trim().split(" ").length <= 2) return true;
  return false;
}

function findRealName(text: string): { firstName: string; lastName: string } {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const candidate = lines.find(
    (line) =>
      line.split(/\s+/).length >= 2 &&
      line.split(/\s+/).length <= 5 &&
      line.length < 50 &&
      !isSectionHeader(line) &&
      !/[@:/\\]/.test(line) &&
      !/\d{3,}/.test(line) &&
      !/^(cv|resume|curriculum)/i.test(line)
  );
  if (!candidate) return { firstName: "", lastName: "" };
  const parts = candidate.trim().split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
}

function extractWithRegex(text: string) {
  const emailMatch = text.match(/[^\s]+@[^\s]+\.[a-z]{2,}/i);
  const phoneMatch = text.match(/(\+?\d[\d\s\-(). ]{6,}\d)/);
  const linkedinMatch = text.match(/linkedin\.com\/in\/[\w-]+/i);
  const websiteMatch = text.match(/https?:\/\/(?!linkedin)[^\s,)]+/i);

  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const { firstName, lastName } = findRealName(text);
  const nameLine = `${firstName} ${lastName}`.trim().toLowerCase();

  const jobTitleLine = lines.find(
    (line) =>
      !isSectionHeader(line) &&
      line.trim().toLowerCase() !== nameLine &&
      line.split(/\s+/).length >= 1 &&
      line.split(/\s+/).length <= 6 &&
      line.length < 60 &&
      !emailMatch?.[0]?.includes(line) &&
      !/^\+?\d/.test(line) &&
      !/^http/i.test(line) &&
      line.trim().toLowerCase() !== firstName.toLowerCase() &&
      line.trim().toLowerCase() !== lastName.toLowerCase()
  );

  const skillKeywords = [
    "JavaScript", "TypeScript", "Python", "React", "Node", "SQL", "Git",
    "Java", "C++", "CSS", "HTML", "AWS", "Docker", "Figma", "Excel", "Word",
    "PHP", "Vue", "Angular", "MongoDB", "PostgreSQL", "MySQL", "GraphQL",
    "REST", "API", "Linux", "Kubernetes", "TensorFlow", "PyTorch",
  ];
  const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const foundSkills = skillKeywords.filter((s) =>
    new RegExp(escapeRegex(s), "i").test(text)
  );

  const summaryMatch = text.match(
    /(?:summary|about|profile|objective)[:\s\n]+([^\n]{40,400})/i
  );

  return {
    personalInfo: {
      firstName,
      lastName,
      jobTitle: jobTitleLine && !isSectionHeader(jobTitleLine) ? jobTitleLine : "",
      email: emailMatch?.[0] || "",
      phone: phoneMatch?.[0]?.trim().replace(/\n.*/, "") || "",
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

  const systemPrompt = `You are a highly accurate resume/CV parser.

You receive raw CV text and extract ONLY real user information.

CRITICAL RULES:
- NEVER use section titles as values. Section titles include words like: CONTACT, SKILLS, EDUCATION, EXPERIENCE, PROFILE, SUMMARY, LANGUAGES, CERTIFICATIONS, REFERENCES, OBJECTIVE, ABOUT, AWARDS, PROJECTS, PORTFOLIO.
- If a field value looks like a section header, return an empty string instead.
- firstName and lastName must form a real person's full name — at least 2 words total, not a section label.
- jobTitle must be a real job title (e.g. "Software Engineer", "Marketing Manager"), not a section header. Reject ALL_CAPS single words.
- Extract email using pattern recognition (must contain @).
- Extract phone numbers using pattern recognition (digits, spaces, dashes, parentheses).
- If unsure about any field, return an empty string — do NOT guess.
- Return ONLY valid JSON. No markdown, no explanation.`;

  const userPrompt = `Extract structured resume data from the CV text below.

Return ONLY valid JSON with this exact structure:
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

Additional rules:
- Dates must be in YYYY-MM format (e.g. "2021-03") or empty string
- currentJob is true if the person still works there (endDate is empty or "Present")
- skills, languages, certifications must be arrays of strings
- description should preserve bullet points as newline-separated text
- Extract ALL experience entries and ALL education entries
- linkedin should be just the path like "linkedin.com/in/username"

CV TEXT:
${text.slice(0, 12000)}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.1,
    max_tokens: 2500,
  });

  const content = response.choices[0]?.message?.content?.trim() || "";
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI returned no valid JSON");

  return JSON.parse(jsonMatch[0]);
}

function postValidate(data: any, rawText: string): { data: any; lowConfidence: boolean } {
  const pi = data.personalInfo || {};

  if (isSectionHeader(pi.firstName) || isSectionHeader(pi.lastName)) {
    const { firstName, lastName } = findRealName(rawText);
    pi.firstName = firstName;
    pi.lastName = lastName;
  }

  if (isSectionHeader(pi.jobTitle)) {
    pi.jobTitle = "";
  }

  const emailMatch = rawText.match(/[^\s]+@[^\s]+\.[a-z]{2,}/i);
  if (!pi.email && emailMatch) {
    pi.email = emailMatch[0];
  }

  const phoneMatch = rawText.match(/(\+?\d[\d\s\-(). ]{6,}\d)/);
  if (!pi.phone && phoneMatch) {
    pi.phone = phoneMatch[0].trim().replace(/\n.*/, "");
  }

  const linkedinMatch = rawText.match(/linkedin\.com\/in\/[\w-]+/i);
  if (!pi.linkedin && linkedinMatch) {
    pi.linkedin = linkedinMatch[0];
  }

  data.personalInfo = pi;

  const lowConfidence =
    !pi.firstName ||
    !pi.lastName ||
    (!pi.email && !pi.phone);

  return { data, lowConfidence };
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

    let rawText = "";
    if (ext === "pdf") {
      rawText = await extractTextFromPDF(buffer);
    } else {
      rawText = await extractTextFromDOCX(buffer);
    }

    console.log("[parse-cv] RAW TEXT (first 500 chars):", rawText.slice(0, 500));

    const cleanText = preprocessText(rawText);

    console.log("[parse-cv] CLEAN TEXT (first 500 chars):", cleanText.slice(0, 500));

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
      console.log("[parse-cv] AI RESULT:", JSON.stringify(parsed?.personalInfo));
    } catch (aiError) {
      console.warn("[parse-cv] AI parsing failed, using regex fallback:", aiError);
    }

    if (!parsed) {
      parsed = extractWithRegex(cleanText);
      usedFallback = true;
      console.log("[parse-cv] FALLBACK RESULT:", JSON.stringify(parsed?.personalInfo));
    }

    const normalized = normalizeData(parsed);
    const { data, lowConfidence } = postValidate(normalized, cleanText);

    console.log("[parse-cv] FINAL:", JSON.stringify(data?.personalInfo), "lowConfidence:", lowConfidence);

    return NextResponse.json({ data, usedFallback, lowConfidence });
  } catch (err: any) {
    console.error("[parse-cv] error:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
