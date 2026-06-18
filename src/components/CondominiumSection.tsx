import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";

const CondominiumSection = () => {
  const { t } = useLanguage();

  const items = [
    { label: t("condo.parking"), desc: t("condo.parking.desc") },
    { label: t("condo.storage"), desc: t("condo.storage.desc") },
    { label: t("condo.solar"), desc: t("condo.solar.desc") },
    { label: t("condo.garden"), desc: t("condo.garden.desc") },
    { label: t("condo.security"), desc: t("condo.security.desc") },
  ];

  const heroPlaceholder = "[Render: espaços comuns — jardim/entrada]";

  return (
    <section id="condominio" className="bg-cream-dark/30">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
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

          <AnimatedSection delay={0.1}>
            <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden rounded-sm flex items-center justify-center mb-20 md:mb-24">
              <img
                src=""
                alt={heroPlaceholder}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
              <span className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                {heroPlaceholder}
              </span>
            </div>
          </AnimatedSection>

          <StaggerGroup stagger={0.06} delayChildren={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-14">
              {items.map((it, i) => (
                <StaggerItem key={i} variant="fade-up">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-xl md:text-2xl leading-tight text-foreground">
                      {it.label}
                    </h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.9]">
                      {it.desc}
                    </p>
                  </div>
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
