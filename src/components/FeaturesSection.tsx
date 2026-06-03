import {
  TreePine,
  Car,
  Leaf,
  Wind,
  Plug,
  Sparkles,
  Maximize,
  FileDown,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: TreePine, label: t("features.balconies") },
    { icon: Car, label: t("features.parking") },
    { icon: Leaf, label: t("features.energy") },
    { icon: Wind, label: t("features.ac") },
    { icon: Plug, label: t("features.ev") },
    { icon: Sparkles, label: t("features.finishes") },
    { icon: Maximize, label: t("features.areas") },
  ];

  return (
    <section id="caracteristicas" className="bg-background">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("features.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("features.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("features.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
              {items.map((it, i) => (
                <div
                  key={i}
                  className="bg-background flex flex-col items-center text-center py-10 px-6 hover:bg-cream-dark/40 transition-colors duration-500"
                >
                  <it.icon className="w-7 h-7 text-gold mb-5 stroke-[1.25]" />
                  <p className="font-body text-xs md:text-sm tracking-wide text-foreground leading-relaxed">
                    {it.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-14">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                <FileDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("features.download.finishes")}
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                <FileDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("features.download.payment")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
