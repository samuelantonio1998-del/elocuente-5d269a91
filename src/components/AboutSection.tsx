import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import renderFront from "@/assets/render-front.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  const blocks = [
    { sub: t("about.sub1"), p: t("about.p1") },
    { sub: t("about.sub2"), p: t("about.p2") },
    { sub: t("about.sub3"), p: t("about.p3") },
  ];

  return (
    <section id="sobre" className="bg-background">
      <div className="grid lg:grid-cols-2">
        <Reveal
          variant="mask-reveal"
          duration={1.1}
          className="relative h-[50vh] lg:h-auto lg:min-h-[600px] overflow-hidden"
        >
          <img
            src={renderFront}
            alt="Render exterior da fachada principal do empreendimento Elocuente em Marinha Grande"
            width={1600}
            height={1200}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </Reveal>

        <div className="flex items-center px-8 lg:px-20 py-20 md:py-28 bg-cream-dark">
          <Reveal variant="slide-right" delay={0.1}>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-8">
              {t("about.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-12">
              {t("about.title")}
            </h2>

            <StaggerGroup stagger={0.12} delayChildren={0.2} className="space-y-8 max-w-lg">
              {blocks.map((b, i) => (
                <StaggerItem key={i}>
                  <p className="font-body text-sm md:text-base text-foreground leading-[1.9]">
                    <strong className="font-semibold text-foreground">{b.sub}</strong>{" "}
                    <span className="text-muted-foreground">{b.p}</span>
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

