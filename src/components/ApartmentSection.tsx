import { FileDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import ParallaxImages from "./motion/ParallaxImages";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";
import mapaAcabamentosAsset from "@/assets/mapa-acabamentos.pdf.asset.json";
import apt1 from "@/assets/apt-1.png.asset.json";
import apt2 from "@/assets/apt-2.png.asset.json";

const ApartmentSection = () => {
  const { t } = useLanguage();
  const a1 = useSiteImage("apartment.1", apt1.url);
  const a2 = useSiteImage("apartment.2", apt2.url);
  const images = [a1, a2];
  const [index, setIndex] = useState(0);

  const items = [
    { label: t("apartment.areas"), desc: t("apartment.areas.desc") },
    { label: t("apartment.kitchen"), desc: t("apartment.kitchen.desc") },
    { label: t("apartment.floors"), desc: t("apartment.floors.desc") },
    { label: t("apartment.windows"), desc: t("apartment.windows.desc") },
    { label: t("apartment.balconies"), desc: t("apartment.balconies.desc") },
    { label: t("apartment.climate"), desc: t("apartment.climate.desc") },
  ];

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section id="empreendimento" className="bg-background">
      <div className="section-pt px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-20 md:mb-28">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-8 md:mb-10">
              {t("apartment.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-10 md:mb-12">
              {t("apartment.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("apartment.desc")}
            </p>
          </AnimatedSection>
        </div>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="px-6 md:px-12 lg:px-16 mb-24 md:mb-32">
          <div className="relative mx-auto w-full lg:max-w-[62vw] aspect-[16/9] bg-muted overflow-hidden group">
            {images.map((image, i) =>
              image.src && image.isResolved ? (
                <img
                  key={image.renderKey}
                  src={image.src}
                  alt={`Apartamento ${i + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : null
            )}
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              aria-label="Seguinte"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 hover:bg-background text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? "bg-foreground" : "bg-foreground/30"
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

          <AnimatedSection delay={0.2}>
            <div className="flex justify-center mt-20">
              <a
                href={mapaAcabamentosAsset.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                <FileDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("features.download.finishes")}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;
