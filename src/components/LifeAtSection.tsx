import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import ParallaxImages from "./motion/ParallaxImages";
import { useSiteImage } from "@/hooks/useSiteImages";
import life1 from "@/assets/life-1.png.asset.json";
import life2 from "@/assets/life-2.png.asset.json";

const LifeAtSection = () => {
  const { t } = useLanguage();
  const l1 = useSiteImage("life.1", life1.url);
  const l2 = useSiteImage("life.2", life2.url);
  const images = [l1, l2];
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

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
      <div className="pt-24 md:pt-32 px-8 lg:px-16">
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
        </div>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="px-6 md:px-12 lg:px-16 mb-24 md:mb-32">
          <div className="relative mx-auto w-full lg:max-w-[62vw] aspect-[16/9] bg-muted overflow-hidden group">
            <ParallaxImages>
              {images.map((image, i) =>
                image.src && image.isResolved ? (
                  <img
                    key={image.renderKey}
                    src={image.src}
                    alt="A Vida no Elocuente"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      i === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null
              )}
            </ParallaxImages>
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-foreground w-6" : "bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="section-pb px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <StaggerGroup stagger={0.06} delayChildren={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 md:gap-y-14">
              {items.map((it, i) => (
                <StaggerItem key={i} variant="fade-up">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-heading text-xl md:text-2xl leading-tight text-foreground">
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
