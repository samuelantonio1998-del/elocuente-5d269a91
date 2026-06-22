import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";
import condo1 from "@/assets/condo-1.png.asset.json";
import condo2 from "@/assets/condo-2.png.asset.json";
import condo3 from "@/assets/condo-3.png.asset.json";

const CondominiumSection = () => {
  const { t } = useLanguage();
  const c1 = useSiteImage("condo.1", condo1.url);
  const c2 = useSiteImage("condo.2", condo2.url);
  const c3 = useSiteImage("condo.3", condo3.url);
  const [current, setCurrent] = useState(0);

  const images = [
    { image: c1, alt: "Espaços comuns do condomínio Elocuente — pátio ajardinado" },
    { image: c2, alt: "Espaços comuns do condomínio Elocuente — entrada e percurso pedonal" },
    { image: c3, alt: "Parqueamento subterrâneo do condomínio Elocuente" },
  ];

  const items = [
    { label: t("condo.parking"), desc: t("condo.parking.desc") },
    { label: t("condo.storage"), desc: t("condo.storage.desc") },
    { label: t("condo.solar"), desc: t("condo.solar.desc") },
    { label: t("condo.garden"), desc: t("condo.garden.desc") },
    { label: t("condo.security"), desc: t("condo.security.desc") },
  ];

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="condominio" className="bg-cream-dark/30">
      <div className="pt-24 md:pt-32 px-8 lg:px-16">
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
        </div>
      </div>

      <AnimatedSection delay={0.1}>
        <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden mb-20 md:mb-24 group">
          {images.map((img, i) =>
            img.image.src && img.image.isResolved ? (
              <img
                key={img.image.renderKey}
                src={img.image.src}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ) : null
          )}

          <button
            onClick={prev}
            aria-label="Imagem anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Imagem seguinte"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir para imagem ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-background w-6" : "bg-background/50"
                }`}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="pb-24 md:pb-32 px-8 lg:px-16">
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
        </div>
      </div>
    </section>
  );
};

export default CondominiumSection;
