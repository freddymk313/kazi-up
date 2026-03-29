"use client";

// export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import {
  ResumeData,
  TemplateName,
  defaultResumeData,
  getFullName,
} from "@/utils/resumeTypes";

import {
  saveResumeData,
  loadResumeData,
  loadTemplate,
  saveTemplate,
} from "@/utils/storage";

import ResumeForm from "@/components/ResumeForm";
import PreviewContainer from "@/components/PreviewContainer";
// import DownloadButton from "@/components/DownloadButton";
import CVImportModal from "@/components/CVImportModal";

import dynamicImport from "next/dynamic";

const DownloadButton = dynamicImport(
  () => import("@/components/DownloadButton"),
  { ssr: false }
);

import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  Eye,
  Edit3,
  FileText,
  ChevronDown,
  Upload,
} from "lucide-react";

import { useTranslation } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Builder() {
  const router = useRouter();
  const { t } = useTranslation();

  const [data, setData] = useState<ResumeData>(defaultResumeData);
  const [template, setTemplate] = useState<TemplateName>("modern-minimal");
  const [mobileView, setMobileView] = useState<"form" | "preview">("form");
  const [templateOpen, setTemplateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  useEffect(() => {
    setData(loadResumeData());
    setTemplate(loadTemplate());
  }, []);

  const handleChange = useCallback((newData: ResumeData) => {
    setData(newData);
    saveResumeData(newData);
  }, []);

  const handleImportData = useCallback((newData: ResumeData) => {
    setData(newData);
    saveResumeData(newData);
  }, []);

  const templateOptions: { id: TemplateName; label: string }[] = [
    { id: "modern-minimal", label: "Minimal" },
    // { id: "sidebar-professional", label: "Sidebar" },
    { id: "creative-accent", label: "Creative" },
    { id: "simple-accent", label: "Simple" },
    { id: "classic-bordered", label: "Classic" },
    { id: "clean-professional", label: "Clean" },
    // { id: "corporate-classic", label: "Corporate" },
    { id: "professional-dark-sidebar", label: "Dark Pro" },
    // { id: "blue-card-professional", label: "Blue Card" },
    { id: "minimalist-engineer", label: "Minimalist" },
  ];

  const currentLabel =
    templateOptions.find((t) => t.id === template)?.label || "Template";

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="shrink-0 z-50 bg-background">
        <div className="px-2 sm:px-4 h-14 sm:h-15 flex items-center justify-between gap-1 sm:gap-3">
          {/* Left */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
              className="h-8 w-8 shrink-0 hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>

            {/* <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                kazi<span className="text-primary">Up</span>
              </span>
            </div> */}
          </div>

          {/* Template Switcher */}
          {/* <div className="relative shrink-0">
            <button
              onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs sm:text-sm font-medium"
            >
              {currentLabel}
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
            </button>

            {templateOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setTemplateOpen(false)}
                />

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-elevated p-1.5 min-w-[180px]">
                  {templateOptions.map((tOpt) => (
                    <button
                      key={tOpt.id}
                      onClick={() => {
                        setTemplate(tOpt.id);
                        saveTemplate(tOpt.id);
                        setTemplateOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        template === tOpt.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {tOpt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div> */}

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setImportOpen(true)}
              // className="hidden md:flex gap-1.5 text-xs"
              className="hidden md:flex rounded-full text-xs h-10 px-8 font-semibold transition-all active:scale-95"
              
            >
              <Upload className="w-3.5 h-3.5" />
              {t("builder_import_cv")}
            </Button>

            {/* Mobile Toggle */}
            <div className="flex sm:hidden items-center gap-0.5 bg-accent rounded-full p-0.5">
              <button
                onClick={() => setMobileView("form")}
                className={`p-1.5 rounded-full transition-all ${
                  mobileView === "form"
                    ? "bg-background"
                    : "text-muted-foreground"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setMobileView("preview")}
                className={`p-1.5 rounded-full transition-all ${
                  mobileView === "preview"
                    ? "bg-background"
                    : "text-muted-foreground"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setImportOpen(true)}
              className="flex md:hidden ml-2 h-8 w-8"
            >
              <Upload className="w-3 h-3 md:w-4 md:h-4" />
            </Button>

            <DownloadButton
              fileName={`${getFullName(data.personalInfo) || "resume"}.pdf`}
              data={data}
              template={template}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col sm:flex-row bg-accent min-h-0">
        {/* Editor */}
        <div
          className={`sm:w-[40%] shrink-0 border-r border-border/20 overflow-y-auto ${
            mobileView === "preview" ? "hidden sm:block" : "flex-1 min-h-0"
          }`}
        >
          <div className="p-4 sm:p-6 lg:p-8 *max-w-[560px] mx-auto pb-20 sm:pb-8">
            <div className="relative shrink-0">
            <button
              onClick={() => setTemplateOpen(!templateOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-xs sm:text-sm font-medium"
            >
              {currentLabel}
              <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-muted-foreground" />
            </button>

            {templateOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setTemplateOpen(false)}
                />

                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-elevated p-1.5 min-w-[180px]">
                  {templateOptions.map((tOpt) => (
                    <button
                      key={tOpt.id}
                      onClick={() => {
                        setTemplate(tOpt.id);
                        saveTemplate(tOpt.id);
                        setTemplateOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        template === tOpt.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {tOpt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

            <ResumeForm data={data} onChange={handleChange} />
          </div>
        </div>

        {/* Preview */}
        <div
          className={`flex-1 min-h-0 ${
            mobileView === "form" ? "hidden sm:flex" : "flex"
          }`}
        >
          <PreviewContainer data={data} template={template} />
        </div>
      </div>

      <CVImportModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onDataExtracted={handleImportData}
        hasExistingData={
          getFullName(data.personalInfo).length > 0 ||
          data.experience.length > 0
        }
      />
    </div>
  );
}
