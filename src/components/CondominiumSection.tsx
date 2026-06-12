import { Car, Package, Sun, Trees, ShieldCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";

const CondominiumSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Car, label: t("condo.parking"), desc: t("condo.parking.desc") },
    { icon: Package, label: t("condo.storage"), desc: t("condo.storage.desc") },
    { icon: Sun, label: t("condo.solar"), desc: t("condo.solar.desc") },
    { icon: Trees, label: t("condo.garden"), desc: t("condo.garden.desc") },
    { icon: ShieldCheck, label: t("condo.security"), desc: t("condo.security.desc") },
  ];

  return (
    <section id="condominio" className="bg-cream-dark/30">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("condo.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("condo.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("condo.desc")}
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
        </div>
      </div>
    </section>
  );
};

export default CondominiumSection;
