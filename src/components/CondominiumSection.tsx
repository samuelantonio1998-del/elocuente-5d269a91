import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import condo1 from "@/assets/condo-1.png.asset.json";
import condo2 from "@/assets/condo-2.png.asset.json";


const CondominiumSection = () => {
  const { t } = useLanguage();

  const items = [
    { label: t("condo.parking"), desc: t("condo.parking.desc") },
    { label: t("condo.storage"), desc: t("condo.storage.desc") },
    { label: t("condo.solar"), desc: t("condo.solar.desc") },
    { label: t("condo.garden"), desc: t("condo.garden.desc") },
    { label: t("condo.security"), desc: t("condo.security.desc") },
  ];

  

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20 md:mb-24">
              <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-sm">
                <img
                  src={condo1.url}
                  alt="Espaços comuns do condomínio Elocuente — pátio ajardinado"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden rounded-sm">
                <img
                  src={condo2.url}
                  alt="Espaços comuns do condomínio Elocuente — entrada e percurso pedonal"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
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
