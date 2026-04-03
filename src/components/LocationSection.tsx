import { MapPin, Waves, Mountain, Plane, Car } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import renderAerial from "@/assets/render-aerial.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const LocationSection = () => {
  const { t } = useLanguage();

  const points = [
    { icon: MapPin, label: t("location.leiria"), time: "10 min" },
    { icon: Waves, label: t("location.beach"), time: "15 min" },
    { icon: Mountain, label: t("location.nazare"), time: "25 min" },
    { icon: Plane, label: t("location.airport"), time: "80 min" },
    { icon: Car, label: t("location.highways"), time: "5 min" },
  ];

  return (
    <section id="localizacao" className="bg-background">
      <AnimatedSection className="relative h-[40vh] md:h-[60vh]">
        <img
          src={renderAerial}
          alt="Vista aérea da localização"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-primary-foreground/70 mb-4">
              {t("location.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground">
              Albergaria, Marinha Grande
            </h2>
          </div>
        </div>
      </AnimatedSection>

      <div className="px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("location.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-5">
              {points.map((p, i) => (
                <div
                  key={i}
                  className={`text-center py-12 px-6 ${
                    i < points.length - 1 ? "border-r border-border" : ""
                  }`}
                >
                  <p.icon className="w-5 h-5 text-gold mx-auto mb-5 stroke-[1.5]" />
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    {p.label}
                  </p>
                  <p className="font-heading text-2xl md:text-3xl text-foreground">{p.time}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.25} className="text-center mt-12">
            <a
              href="https://www.google.com/maps/search/Rua+do+Fagundo,+Albergaria,+Marinha+Grande,+Portugal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
            >
              {t("location.cta")}
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
