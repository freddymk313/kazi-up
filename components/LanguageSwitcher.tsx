import { useTranslation } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center gap-0.5 bg-accent rounded-full p-0.5 text-xs font-medium">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1.5 rounded-full transition-all ${
          lang === "en" ? "bg-background *shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("fr")}
        className={`px-2.5 py-1.5 rounded-full transition-all ${
          lang === "fr" ? "bg-background *shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
