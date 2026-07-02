import { useEffect, useState } from "react";
import Reveal from "./motion/Reveal";
import ParallaxImages from "./motion/ParallaxImages";
import render1 from "@/assets/render-1.png.asset.json";
import render2 from "@/assets/render-2.png.asset.json";
import render3 from "@/assets/render-3.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const ArchitectureSection = () => {
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

  return (
    <section id="arquitetura" className="bg-background">
      <div className="flex items-center px-8 lg:px-20 section-py bg-cream-dark">
        <Reveal variant="slide-right" delay={0.1}>
          <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-12 md:mb-16">
            {t("architecture.label")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground leading-[1.15] mb-16 md:mb-20">
            {t("architecture.title")}
          </h2>

          <div className="space-y-8 max-w-lg">
            <p className="font-body text-sm md:text-base text-foreground leading-[1.9]">
              <strong className="font-semibold text-foreground">{t("about.sub3")}</strong>{" "}
              <span className="text-muted-foreground">{t("about.p3")}</span>
            </p>

            <figure className="border-l-2 border-gold pl-6 mt-12">
              <blockquote className="font-heading italic text-xl md:text-2xl text-foreground leading-[1.5]">
                {t("architecture.quote")}
              </blockquote>
              <figcaption className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-4">
                {t("architecture.signature")}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 lg:px-16 pb-24 md:pb-32 bg-cream-dark">
        <Reveal
          variant="mask-reveal"
          duration={1.1}
          className="relative mx-auto w-full lg:max-w-[62vw] aspect-[4/3] overflow-hidden"
        >
          {renders.map((image, i) =>
            image.src && image.isResolved ? (
              <img
                key={image.renderKey}
                src={image.src}
                alt="Arquitetura do empreendimento Elocuente em Marinha Grande"
                width={1600}
                height={1200}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
              />
            ) : null
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default ArchitectureSection;
