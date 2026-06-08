import { Waves, Building2, MapPin, Car, GraduationCap, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import renderAerial from "@/assets/render-aerial.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import { GUIDES } from "@/data/guideContent";

const LocationSection = () => {
  const { t, lang } = useLanguage();
  const guide = GUIDES[lang];

  const points = [
    { icon: Waves, label: t("location.poi.beaches") },
    { icon: Building2, label: t("location.poi.center") },
    { icon: MapPin, label: t("location.poi.leiria") },
    { icon: Car, label: t("location.poi.highways") },
    { icon: GraduationCap, label: t("location.poi.schools") },
  ];

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

      <div className="px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("location.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <ul className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {points.map((p, i) => (
                <li
                  key={i}
                  className="bg-background flex items-start gap-4 px-6 py-6"
                >
                  <p.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5 stroke-[1.5]" />
                  <span className="font-body text-sm text-foreground leading-relaxed">
                    {p.label}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </div>

      <AnimatedSection delay={0.2}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[400px] lg:h-[550px]">
            <iframe
              src="https://www.google.com/maps?q=Rua+do+Fagundo,+Albergaria,+Marinha+Grande&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.3) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Elocuente"
            />
          </div>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20 bg-muted/30">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("location.label")}
            </p>
            <h3 className="font-heading text-2xl md:text-4xl text-foreground mb-6">
              {t("location.title")}
            </h3>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base mb-8">
              {t("location.desc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rua+do+Fagundo,+Albergaria,+Marinha+Grande"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
              >
                {t("location.cta")}
              </a>
              <Link
                to={guide.path}
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/40 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-gold hover:text-background hover:border-gold transition-all duration-500"
              >
                <BookOpen size={12} strokeWidth={1.5} aria-hidden="true" />
                {guide.title}
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default LocationSection;
