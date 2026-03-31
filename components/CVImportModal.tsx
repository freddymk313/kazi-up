"use client";

import { useState, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ResumeData, getFullName } from "@/utils/resumeTypes";
import { useTranslation } from "@/contexts/LanguageContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDataExtracted: (data: ResumeData) => void;
  hasExistingData: boolean;
}

type Step = "upload" | "parsing" | "review" | "error";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const CVImportModal = ({ open, onOpenChange, onDataExtracted, hasExistingData }: Props) => {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [extractedData, setExtractedData] = useState<ResumeData | null>(null);
  const [usedFallback, setUsedFallback] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const reset = () => {
    setStep("upload");
    setFile(null);
    setError("");
    setExtractedData(null);
    setUsedFallback(false);
    setDragOver(false);
  };

  const handleClose = (val: boolean) => {
    if (!val) reset();
    onOpenChange(val);
  };

  const processFile = useCallback(async (selectedFile: File) => {
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();
    const validExts = ["pdf", "docx", "doc"];

    if (!ext || !validExts.includes(ext)) {
      setError("Unsupported file type. Please upload a PDF or DOCX file.");
      setStep("error");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File exceeds the 5MB size limit.");
      setStep("error");
      return;
    }

    setFile(selectedFile);
    setStep("parsing");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/parse-cv", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to parse CV");
      }

      if (!json.data) {
        throw new Error("No data returned from parser");
      }

      setExtractedData(json.data);
      setUsedFallback(json.usedFallback ?? false);
      setStep("review");
    } catch (e) {
      console.error("CV import error:", e);
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
      setStep("error");
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
    e.target.value = "";
  }, [processFile]);

  const handleConfirm = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      handleClose(false);
    }
  };

  const getSummaryItems = (data: ResumeData) => {
    const items: string[] = [];
    const fullName = getFullName(data.personalInfo);
    if (fullName) items.push(`Name: ${fullName}`);
    if (data.personalInfo.jobTitle) items.push(`Title: ${data.personalInfo.jobTitle}`);
    if (data.personalInfo.email) items.push(`Email: ${data.personalInfo.email}`);
    if (data.experience.length) items.push(`${data.experience.length} experience entry(ies)`);
    if (data.education.length) items.push(`${data.education.length} education entry(ies)`);
    if (data.skills.length) items.push(`${data.skills.length} skill(s) detected`);
    if (data.languages.length) items.push(`${data.languages.length} language(s) detected`);
    return items;
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">

        {step === "upload" && (
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Upload className="w-5 h-5 text-primary" />
                {t("import_title")}
              </DialogTitle>
              <DialogDescription className="text-center">{t("import_desc")}</DialogDescription>
            </DialogHeader>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative cursor-pointer border-2 border-dashed rounded-xl p-10 text-center transition-all
                ${dragOver
                  ? "border-primary bg-primary/5 scale-[1.01]"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx,.doc"
                onChange={handleFileSelect}
              />
              <div className="flex flex-col items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  dragOver ? "bg-primary/10" : "bg-accent"
                }`}>
                  <Upload className={`w-6 h-6 ${dragOver ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {dragOver ? t("import_drop") : t("import_drag")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{t("import_browse")}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {["PDF", "DOCX"].map((tp) => (
                    <span key={tp} className="px-2 py-0.5 rounded-md bg-accent text-[10px] font-medium text-muted-foreground">
                      {tp}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground">{t("import_max")}</p>
              </div>
            </div>

            {hasExistingData && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400">{t("import_warning")}</p>
              </div>
            )}
          </div>
        )}

        {step === "parsing" && (
          <div className="p-6 flex flex-col items-center gap-5 py-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Loader2 className="w-7 h-7 text-primary animate-spin" />
            </div>
            <div className="text-center space-y-1.5">
              <p className="font-semibold text-base">{t("import_analyzing")}</p>
              <p className="text-sm text-muted-foreground">
                {t("import_reading")} {file?.name}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <div className="w-8 h-0.5 bg-primary/40" />
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
            </div>
          </div>
        )}

        {step === "review" && extractedData && (
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                {t("import_success")}
              </DialogTitle>
              <DialogDescription>{t("import_review")}</DialogDescription>
            </DialogHeader>

            {usedFallback && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-400">
                  AI parsing unavailable — basic extraction was used. Some fields may need manual editing.
                </p>
              </div>
            )}

            <div className="space-y-2">
              {getSummaryItems(extractedData).map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-secondary/50">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">{t("import_edit_after")}</p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-full" onClick={() => handleClose(false)}>
                {t("import_cancel")}
              </Button>
              <Button className="flex-1 rounded-full" onClick={handleConfirm}>
                <FileText className="w-4 h-4 mr-1.5" />
                {t("import_confirm")}
              </Button>
            </div>
          </div>
        )}

        {step === "error" && (
          <div className="p-6 space-y-5">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <AlertCircle className="w-5 h-5 text-destructive" />
                {t("import_failed")}
              </DialogTitle>
              <DialogDescription>{error}</DialogDescription>
            </DialogHeader>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 rounded-full" onClick={() => handleClose(false)}>
                {t("import_cancel")}
              </Button>
              <Button className="flex-1 border border-primary rounded-full" onClick={reset}>
                {t("import_try_again")}
              </Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default CVImportModal;
