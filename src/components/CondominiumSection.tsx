import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";

const CondominiumSection = () => {
  const { t } = useLanguage();

  const items = [
    { label: t("condo.parking"), desc: t("condo.parking.desc"), placeholder: "[Render: estacionamento]" },
    { label: t("condo.storage"), desc: t("condo.storage.desc"), placeholder: "[Render: arrumos]" },
    { label: t("condo.solar"), desc: t("condo.solar.desc"), placeholder: "[Render: fotovoltaico/wallbox]" },
    { label: t("condo.garden"), desc: t("condo.garden.desc"), placeholder: "[Render: jardim comum]" },
    { label: t("condo.security"), desc: t("condo.security.desc"), placeholder: "[Render: entrada/segurança]" },
  ];

  return (
    <section id="condominio" className="bg-cream-dark/30">
      <div className="py-24 md:py-32 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20">
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
            <div className="flex flex-col gap-20 md:gap-28">
              {items.map((it, i) => {
                const imageRight = i % 2 === 1;
                return (
                  <StaggerItem key={i} variant="fade-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                      <div
                        className={`relative w-full aspect-[4/3] bg-muted overflow-hidden rounded-sm flex items-center justify-center ${
                          imageRight ? "md:order-2" : "md:order-1"
                        }`}
                      >
                        <img
                          src=""
                          alt={it.placeholder}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => ((e.currentTarget.style.display = "none"))}
                        />
                        <span className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                          {it.placeholder}
                        </span>
                      </div>
                      <div className={imageRight ? "md:order-1" : "md:order-2"}>
                        <h3 className="font-heading text-2xl md:text-[28px] leading-tight text-foreground mb-5">
                          {it.label}
                        </h3>
                        <p className="font-body text-sm md:text-base text-muted-foreground leading-[1.9]">
                          {it.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
};

export default CondominiumSection;
