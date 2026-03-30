import AnimatedSection from "./AnimatedSection";
import renderFront from "@/assets/render-front.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="bg-background">
      <div className="py-28 md:py-40 px-8 lg:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedSection>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-10">
              {t("about.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground leading-[1.15] mb-10">
              {t("about.title1")}<br className="hidden md:block" /> {t("about.title2")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-3xl mx-auto">
              {t("about.p1")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-3xl mx-auto mt-6">
              {t("about.p2")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <div className="flex flex-wrap justify-center gap-6 mt-14">
              <a
                href="#contacto"
                className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                {t("about.cta1")}
              </a>
              <a
                href="#apartamentos"
                className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                {t("about.cta2")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        <AnimatedSection className="relative h-[50vh] md:h-[80vh]">
          <img
            src={renderFront}
            alt="Vista frontal do Elocuente"
            className="w-full h-full object-cover"
            loading="lazy"
            width={1024}
            height={1024}
          />
        </AnimatedSection>
        <div className="flex items-center px-8 lg:px-20 py-16 md:py-0 bg-cream-dark">
          <AnimatedSection delay={0.15}>
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-8">
              {t("about.locationLabel")}
            </p>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-md">
              {t("about.locationText")}
            </p>
            <a
              href="#localizacao"
              className="inline-flex items-center gap-2 mt-8 font-body text-[10px] tracking-[0.3em] uppercase text-foreground border-b border-foreground/20 pb-1 hover:border-foreground transition-colors duration-300"
            >
              {t("about.locationLink")}
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
