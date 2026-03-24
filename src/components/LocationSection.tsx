import { MapPin, Train, GraduationCap, ShoppingBag } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const points = [
  { icon: MapPin, label: "Centro de Marinha Grande", time: "5 min" },
  { icon: Train, label: "Acessos Rodoviários", time: "3 min" },
  { icon: GraduationCap, label: "Escolas e Serviços", time: "5 min" },
  { icon: ShoppingBag, label: "Comércio e Restauração", time: "3 min" },
];

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-28 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-20">
          <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            Localização
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-8">
            Albergaria, Marinha Grande
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto leading-[1.8] text-sm md:text-base">
            Numa zona residencial em Albergaria, junto à cidade de Marinha Grande,
            com boas acessibilidades rodoviárias e proximidade a serviços e comércio.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {points.map((p) => (
              <div
                key={p.label}
                className="text-center py-10 md:py-14 px-6 border border-border hover:border-gold/30 transition-colors duration-500"
              >
                <p.icon className="w-6 h-6 text-gold mx-auto mb-5 stroke-[1.5]" />
                <p className="font-body text-xs font-medium text-foreground mb-2">
                  {p.label}
                </p>
                <p className="font-heading text-2xl md:text-3xl text-foreground">{p.time}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LocationSection;
