"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Lang = "en" | "fr";
type Translations = Record<string, string>;

const translations: Record<Lang, Translations> = { en, fr };
const STORAGE_KEY = "app_language";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");
  const [isReady, setIsReady] = useState(false);

  // INIT (client only)
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;

    if (stored === "en" || stored === "fr") {
      setLangState(stored);
    } else {
      const browserLang =
        typeof navigator !== "undefined" &&
        navigator.language.startsWith("fr")
          ? "fr"
          : "en";

      setLangState(browserLang);
    }

    setIsReady(true);
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
  }, []);

  useEffect(() => {
    if (isReady && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }, [lang, isReady]);

  const t = useCallback(
    (key: string): string => {
      return translations[lang][key] || translations.en[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
};