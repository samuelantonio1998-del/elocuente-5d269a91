import { Maximize, ChefHat, Layers, Frame, TreePine, Wind, FileDown } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import mapaAcabamentosAsset from "@/assets/mapa-acabamentos.pdf.asset.json";

const ApartmentSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Maximize, label: t("apartment.areas"), desc: t("apartment.areas.desc") },
    { icon: ChefHat, label: t("apartment.kitchen"), desc: t("apartment.kitchen.desc") },
    { icon: Layers, label: t("apartment.floors"), desc: t("apartment.floors.desc") },
    { icon: Frame, label: t("apartment.windows"), desc: t("apartment.windows.desc") },
    { icon: TreePine, label: t("apartment.balconies"), desc: t("apartment.balconies.desc") },
    { icon: Wind, label: t("apartment.climate"), desc: t("apartment.climate.desc") },
  ];

  return (
    <section id="empreendimento" className="bg-background">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("apartment.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("apartment.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("apartment.desc")}
            </p>
          </AnimatedSection>

          <StaggerGroup stagger={0.06} delayChildren={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {items.map((it, i) => (
                <StaggerItem
                  key={i}
                  variant="fade-up"
                  className="bg-background flex flex-col items-center text-center py-10 px-6 hover:bg-cream-dark/40 transition-colors duration-500"
                >
                  <it.icon className="w-7 h-7 text-gold mb-5 stroke-[1.25]" />
                  <p className="font-body text-xs md:text-sm tracking-wide text-foreground leading-relaxed mb-2">
                    {it.label}
                  </p>
                  <p className="font-body text-[11px] md:text-xs text-muted-foreground leading-relaxed">
                    {it.desc}
                  </p>
                </StaggerItem>
              ))}
            </div>
          </StaggerGroup>

          <AnimatedSection delay={0.2}>
            <div className="flex justify-center mt-14">
              <a
                href={mapaAcabamentosAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                <FileDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("features.download.finishes")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;
