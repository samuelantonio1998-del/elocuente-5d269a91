import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import renderAerial from "@/assets/render-aerial.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { GUIDES } from "@/data/guideContent";

const LocationSection = () => {
  const { t, lang } = useLanguage();
  const guide = GUIDES[lang];

  const distances = [
    { label: t("location.dist.leiria"), time: "10 min" },
    { label: t("location.dist.highways"), time: "5 min" },
    { label: t("location.dist.spm"), time: "15 min" },
    { label: t("location.dist.vieira"), time: "20 min" },
    { label: t("location.dist.nazare"), time: "25 min" },
    { label: t("location.dist.lisbon"), time: "80 min" },
  ];

  const lat = 39.746029;
  const lon = -8.889281;
  const delta = 0.012;
  const bbox = `${lon - delta},${lat - delta * 0.7},${lon + delta},${lat + delta * 0.7}`;
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <section id="localizacao" className="bg-background">
      <AnimatedSection className="relative h-[40vh] md:h-[55vh]">
        <img
          src={renderAerial}
          alt="Vista aérea de Albergaria, Marinha Grande, com a localização do Elocuente"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-primary-foreground/70 mb-4">
              {t("location.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground">
              {t("location.title")}
            </h2>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left: dark panel with description + distances */}
          <div className="bg-charcoal text-primary-foreground px-8 lg:px-16 py-16 lg:py-20 flex flex-col justify-center">
            <p className="font-body text-primary-foreground/80 leading-[2] text-sm md:text-base max-w-md mb-12">
              {t("location.desc")}
            </p>

            <ul className="w-full max-w-md">
              {distances.map((d, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-5 border-b border-primary-foreground/15"
                >
                  <span className="font-body text-sm md:text-base text-primary-foreground">
                    {d.label}
                  </span>
                  <span className="font-body text-sm md:text-base text-primary-foreground/80 tracking-wide">
                    {d.time}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3 mt-12">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 border border-primary-foreground/30 font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground hover:bg-primary-foreground hover:text-charcoal transition-all duration-500"
              >
                {t("location.cta")}
              </a>
              <Link
                to={guide.path}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/60 font-body text-[10px] tracking-[0.3em] uppercase text-primary-foreground hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-500"
              >
                <BookOpen size={12} strokeWidth={1.5} aria-hidden="true" />
                {guide.title}
              </Link>
            </div>
          </div>

          {/* Right: light OSM map */}
          <div className="h-[400px] lg:h-auto lg:min-h-[600px]">
            <iframe
              src={osmSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }}
              loading="lazy"
              title="Localização Elocuente"
            />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default LocationSection;
