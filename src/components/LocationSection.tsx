import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { GUIDES } from "@/data/guideContent";
import mapaAsset from "@/assets/mapa-albergariia.png.asset.json";

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
    { label: t("location.dist.services"), time: "5 min" },
  ];

  const lat = 39.746029;
  const lon = -8.889281;
  const delta = 0.012;
  const bbox = `${lon - delta},${lat - delta * 0.7},${lon + delta},${lat + delta * 0.7}`;
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <section id="localizacao" className="bg-background section-py">
      <AnimatedSection delay={0.2}>
        <div className="px-6 md:px-12 lg:px-16">
          <div className="mx-auto w-full lg:max-w-[72vw] grid grid-cols-1 lg:grid-cols-2">
            {/* Left: dark panel with description + distances */}
            <div className="bg-charcoal text-primary-foreground px-8 lg:px-12 py-14 lg:py-16 flex flex-col justify-center">
              <p className="font-body text-primary-foreground/80 leading-[2] text-sm md:text-base max-w-md mb-10 md:mb-12">
                {t("location.desc")}
              </p>

              <ul className="w-full max-w-md">
                {distances.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between py-3.5 border-b border-primary-foreground/15"
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

              <div className="flex flex-wrap gap-3 mt-8">
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

            {/* Right: custom map image */}
            <div className="h-[400px] lg:h-auto">
              <img
                src={mapaAsset.url}
                alt="Localização Elocuente"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default LocationSection;
