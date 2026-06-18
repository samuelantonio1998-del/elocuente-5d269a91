import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";

const LifeAtSection = () => {
  const { t } = useLanguage();

  const items = [
    { title: t("life.time"), desc: t("life.time.desc") },
    { title: t("life.connectivity"), desc: t("life.connectivity.desc") },
    { title: t("life.remote"), desc: t("life.remote.desc") },
    { title: t("life.nature"), desc: t("life.nature.desc") },
    { title: t("life.services"), desc: t("life.services.desc") },
    { title: t("life.investment"), desc: t("life.investment.desc") },
  ];

  return (
    <section id="vida-elocuente" className="bg-background">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("life.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("life.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("life.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="relative w-full aspect-[21/9] bg-muted overflow-hidden rounded-sm flex items-center justify-center mb-20 md:mb-24">
              <img
                src=""
                alt="[Imagem: pinhal de Leiria / Atlântico]"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
              <span className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                [Imagem: pinhal de Leiria / Atlântico]
              </span>
            </div>
          </AnimatedSection>

          <StaggerGroup stagger={0.08} delayChildren={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 md:gap-y-16 max-w-5xl mx-auto">
              {items.map((it, i) => (
                <StaggerItem key={i} variant="fade-up">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-2xl md:text-[26px] leading-tight text-foreground">
                      {it.title}
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

export default LifeAtSection;
