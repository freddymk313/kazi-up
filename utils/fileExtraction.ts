export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const pdfjsLib = await import("pdfjs-dist");

    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.mjs",
        import.meta.url
      ).toString();
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      isEvalSupported: false,
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => item.str).join(" ");
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error: any) {
    console.error("PDF extraction error:", error);
    throw new Error(`Failed to extract PDF text: ${error.message}`);
  }
}

export async function extractTextFromImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(`[IMAGE_BASE64:${reader.result}]`);
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  if (ext === "pdf") {
    return extractTextFromPDF(file);
  }

  if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
    return extractTextFromImage(file);
  }

  if (ext === "docx" || ext === "doc") {
    const text = await file.text();
    const cleaned = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    return cleaned || "Could not extract readable content from this document.";
  }

  throw new Error(`Unsupported file type: .${ext}`);
}

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return "File size exceeds the 10MB limit";
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const validExts = ["pdf", "jpg", "jpeg", "png", "webp", "docx", "doc"];
  if (!ext || !validExts.includes(ext)) {
    return "Unsupported file type. Accepted: PDF, DOCX, JPG, PNG, WEBP";
  }

  return null;
}
