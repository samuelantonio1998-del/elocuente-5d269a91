import { MapPin, Train, GraduationCap, ShoppingBag } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import renderAerial from "@/assets/render-aerial.jpg";

const points = [
  { icon: MapPin, label: "Centro de Marinha Grande", time: "5 min" },
  { icon: Train, label: "Acessos Rodoviários", time: "3 min" },
  { icon: GraduationCap, label: "Escolas e Serviços", time: "5 min" },
  { icon: ShoppingBag, label: "Comércio e Restauração", time: "3 min" },
];

const LocationSection = () => {
  return (
    <section id="localizacao" className="bg-background">
      {/* Full-width image */}
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
              Localização
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-primary-foreground">
              Albergaria, Marinha Grande
            </h2>
          </div>
        </div>
      </AnimatedSection>

      {/* Info grid */}
      <div className="px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              Numa zona residencial em Albergaria, junto à cidade de Marinha Grande,
              com boas acessibilidades rodoviárias e proximidade a serviços e comércio.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {points.map((p, i) => (
                <div
                  key={p.label}
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
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Ver no Google Maps
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;