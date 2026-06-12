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
        <div className="max-w-3xl mx-auto">
          <AnimatedSection className="text-center mb-20">
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

          <StaggerGroup stagger={0.08} delayChildren={0.05}>
            <div className="flex flex-col gap-16 md:gap-20">
              {items.map((it, i) => (
                <StaggerItem key={i} variant="fade-up">
                  {/* Future: alternate with image on left/right via md:grid-cols-2 */}
                  <div className="flex flex-col gap-5">
                    <h3 className="font-heading text-2xl md:text-[28px] leading-tight text-foreground">
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
