// import * as pdfjsLib from "pdfjs-dist";

// // Use CDN worker for pdf.js
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

// export async function extractTextFromPDF(file: File): Promise<string> {
//   const arrayBuffer = await file.arrayBuffer();
//   const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//   const pages: string[] = [];

//   for (let i = 1; i <= pdf.numPages; i++) {
//     const page = await pdf.getPage(i);
//     const content = await page.getTextContent();
//     const text = content.items
//       .map((item: any) => item.str)
//       .join(" ");
//     pages.push(text);
//   }

//   return pages.join("\n\n");
// }

// export async function extractTextFromImage(file: File): Promise<string> {
//   // Convert image to base64 for the AI to process directly
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       // We'll send a marker so the edge function knows it's an image
//       resolve(`[IMAGE_BASE64:${reader.result}]`);
//     };
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }

// export async function extractTextFromFile(file: File): Promise<string> {
//   const ext = file.name.split(".").pop()?.toLowerCase();

//   if (ext === "pdf") {
//     return extractTextFromPDF(file);
//   }

//   if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) {
//     return extractTextFromImage(file);
//   }

//   if (ext === "docx" || ext === "doc") {
//     // For DOCX, read as text (basic extraction)
//     const text = await file.text();
//     // DOCX is XML-based, try to extract readable text
//     const cleaned = text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
//     return cleaned || "Could not extract text from this document format.";
//   }

//   throw new Error(`Unsupported file type: .${ext}`);
// }

// export const ACCEPTED_FILE_TYPES = {
//   "application/pdf": [".pdf"],
//   "image/jpeg": [".jpg", ".jpeg"],
//   "image/png": [".png"],
//   "image/webp": [".webp"],
//   "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
// };

// export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// export function validateFile(file: File): string | null {
//   if (file.size > MAX_FILE_SIZE) {
//     return "File size exceeds 10MB limit";
//   }

//   const ext = file.name.split(".").pop()?.toLowerCase();
//   const validExts = ["pdf", "jpg", "jpeg", "png", "webp", "docx", "doc"];
//   if (!ext || !validExts.includes(ext)) {
//     return `Unsupported file type. Accepted: PDF, DOCX, JPG, PNG`;
//   }

//   return null;
// }

"use client";

import * as pdfjsLib from "pdfjs-dist";

/**
 * SOLUTION ROBUSTE POUR NEXT.JS + TURBOPACK
 * Au lieu d'un CDN, on utilise le worker inclus dans le package pdfjs-dist.
 */
if (typeof window !== "undefined") {
  // Cette syntaxe permet à Next.js de résoudre le chemin vers le fichier 
  // dans node_modules et de le servir correctement.
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    const loadingTask = pdfjsLib.getDocument({ 
      data: arrayBuffer,
      // Paramètres de sécurité pour éviter les erreurs d'exécution
      isEvalSupported: false 
    });
    
    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      
      const pageText = content.items
        .map((item: any) => item.str)
        .join(" ");
        
      fullText += pageText + "\n\n";
    }

    return fullText.trim();
  } catch (error: any) {
    console.error("Erreur détaillée PDF.js:", error);
    throw new Error(`Erreur lors de l'extraction du PDF: ${error.message}`);
  }
}

export async function extractTextFromImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(`[IMAGE_BASE64:${reader.result}]`);
    };
    reader.onerror = () => reject(new Error("Erreur lors de la lecture de l'image"));
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
    return cleaned || "Contenu DOCX illisible ou vide.";
  }

  throw new Error(`Type de fichier non supporté : .${ext}`);
}

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
};

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return "Le fichier dépasse la limite de 10 Mo";
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  const validExts = ["pdf", "jpg", "jpeg", "png", "webp", "docx", "doc"];
  if (!ext || !validExts.includes(ext)) {
    return `Type de fichier non supporté. Acceptés : PDF, DOCX, JPG, PNG, WEBP`;
  }

  return null;
}