import { useEffect, useState } from "react";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import render1 from "@/assets/render-1.png.asset.json";
import render2 from "@/assets/render-2.png.asset.json";
import render3 from "@/assets/render-3.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const AboutSection = () => {
  const { t } = useLanguage();
  const r1 = useSiteImage("about.render-1", render1.url);
  const r2 = useSiteImage("about.render-2", render2.url);
  const r3 = useSiteImage("about.render-3", render3.url);
  const renders = [r1, r2, r3];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % renders.length), 5000);
    return () => clearInterval(id);
  }, []);

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
          {renders.map((image, i) =>
            image.src && image.isResolved ? (
              <img
                key={image.renderKey}
                src={image.src}
                alt="Render exterior do empreendimento Elocuente em Marinha Grande"
                width={1600}
                height={1200}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ) : null
          )}
        </Reveal>


        <div className="flex items-center px-8 lg:px-20 section-py bg-cream-dark">
          <Reveal variant="slide-right" delay={0.1}>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-12 md:mb-16">
              {t("about.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-16 md:mb-20">
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

