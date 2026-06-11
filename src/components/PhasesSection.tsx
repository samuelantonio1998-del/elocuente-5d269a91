import { Check } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

const PhasesSection = () => {
  const { t } = useLanguage();

  const phases = [
    { key: "licensing", active: true },
    { key: "construction", active: false },
    { key: "completion", active: false },
  ];

  return (
    <section id="fases" className="bg-background">
      <div className="py-16 md:py-24 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("phases.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("phases.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("phases.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {/* Desktop: horizontal */}
            <div className="hidden md:block relative">
              <div className="absolute top-5 left-[8%] right-[8%] h-px bg-border" />
              <div className="grid grid-cols-3 relative">
                {phases.map((p) => (
                  <div key={p.key} className="flex flex-col items-center text-center px-6">
                    <div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center mb-6 transition-colors ${
                        p.active
                          ? "bg-gold text-background"
                          : "bg-background border border-border text-muted-foreground"
                      }`}
                    >
                      {p.active ? <Check size={16} strokeWidth={2} /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                    </div>
                    {p.active && (
                      <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-3">
                        {t("phases.current")}
                      </span>
                    )}
                    <h3 className="font-heading text-xl text-foreground mb-3">
                      {t(`phases.${p.key}.title`)}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-[1.8] max-w-[240px]">
                      {t(`phases.${p.key}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden relative pl-10">
              <div className="absolute top-2 bottom-2 left-[19px] w-px bg-border" />
              <div className="space-y-10">
                {phases.map((p) => (
                  <div key={p.key} className="relative">
                    <div
                      className={`absolute -left-10 top-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        p.active
                          ? "bg-gold text-background"
                          : "bg-background border border-border text-muted-foreground"
                      }`}
                    >
                      {p.active ? <Check size={14} strokeWidth={2} /> : <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />}
                    </div>
                    {p.active && (
                      <span className="block font-body text-[9px] tracking-[0.3em] uppercase text-gold mb-2">
                        {t("phases.current")}
                      </span>
                    )}
                    <h3 className="font-heading text-xl text-foreground mb-2">
                      {t(`phases.${p.key}.title`)}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-[1.8]">
                      {t(`phases.${p.key}.desc`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default PhasesSection;
