import { NextRequest } from "next/server"
import pdf from "pdf-parse"
import mammoth from "mammoth"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    // ✅ 1. GET FILE
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = file.name.split(".").pop()?.toLowerCase()

    let text = ""

    // ✅ 2. EXTRACT TEXT
    if (ext === "pdf") {
      const data = await pdf(buffer)
      text = data.text
    } else if (ext === "docx") {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else {
      return Response.json({ error: "Unsupported file type" }, { status: 400 })
    }

    if (!text || text.trim().length === 0) {
      return Response.json({ error: "Empty CV content" }, { status: 400 })
    }

    // ✅ 3. CLEAN TEXT
    const cleanText = text
      .replace(/\b(CONTACT|SKILLS|EDUCATION|EXPERIENCE|PROFILE|SUMMARY|LANGUAGES|CERTIFICATIONS)\b/gi, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/\s{2,}/g, " ")

    const apiKey = process.env.LOVABLE_API_KEY

    if (!apiKey) {
      return Response.json({ error: "Missing API key" }, { status: 500 })
    }

    // ✅ 4. GEMINI CALL (SAME AS LOVABLE)
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert CV/resume parser. Extract structured data only.`,
          },
          {
            role: "user",
            content: `Here is the raw text extracted from a CV:\n\n${cleanText}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_resume_data",
              parameters: {
                type: "object",
                properties: {
                  personalInfo: {
                    type: "object",
                    properties: {
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      jobTitle: { type: "string" },
                      email: { type: "string" },
                      phone: { type: "string" },
                      location: { type: "string" },
                      website: { type: "string" },
                      linkedin: { type: "string" },
                    },
                  },
                  summary: { type: "string" },
                  experience: { type: "array", items: { type: "object" } },
                  education: { type: "array", items: { type: "object" } },
                  skills: { type: "array", items: { type: "string" } },
                  languages: { type: "array", items: { type: "string" } },
                  certifications: { type: "array", items: { type: "string" } },
                },
              },
            },
          },
        ],
        tool_choice: {
          type: "function",
          function: { name: "extract_resume_data" },
        },
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error(err)
      return Response.json({ error: "AI request failed" }, { status: 500 })
    }

    const result = await response.json()

    const toolCall = result?.choices?.[0]?.message?.tool_calls?.[0]

    if (!toolCall?.function?.arguments) {
      return Response.json({ error: "Invalid AI response" }, { status: 500 })
    }

    const parsedData = JSON.parse(toolCall.function.arguments)

    // ✅ 5. EMAIL FALLBACK
    if (!parsedData.personalInfo?.email) {
      const match = cleanText.match(/[^\s]+@[^\s]+\.[^\s]+/)
      if (match) parsedData.personalInfo.email = match[0]
    }

    return Response.json({
      data: parsedData,
      usedFallback: false,
      lowConfidence: false,
    })

  } catch (error) {
    console.error(error)
    return Response.json({ error: "Parsing failed" }, { status: 500 })
  }
}