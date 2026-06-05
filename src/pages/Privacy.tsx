import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-background py-28 px-8 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {t("privacy.back")}
        </Link>
        <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-10">
          {t("privacy.title")}
        </h1>
        <div className="space-y-6 font-body text-sm md:text-base text-muted-foreground leading-[2]">
          <p>{t("privacy.p1")}</p>
          <p>{t("privacy.p2")}</p>
          <p>{t("privacy.p3")}</p>
          <p>{t("privacy.p4")}</p>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
