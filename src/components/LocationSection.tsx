import { MapPin, Train, GraduationCap, ShoppingBag } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const points = [
  { icon: MapPin, label: "Centro de Monte Grande", time: "5 min" },
  { icon: Train, label: "Estação Fertagus", time: "8 min" },
  { icon: GraduationCap, label: "Escolas e Serviços", time: "5 min" },
  { icon: ShoppingBag, label: "Comércio e Restauração", time: "3 min" },
];

const LocationSection = () => {
  return (
    <section id="localizacao" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Localização
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Rua do Fagundo, Monte Grande
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            Numa zona residencial consolidada, com excelentes acessibilidades à
            A2, IC21 e transportes públicos. A poucos minutos de Lisboa pela
            ponte 25 de Abril.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {points.map((p) => (
              <div
                key={p.label}
                className="text-center p-8 border border-border hover:border-gold/40 transition-colors duration-500"
              >
                <p.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <p className="font-body text-sm font-medium text-foreground mb-1">
                  {p.label}
                </p>
                <p className="font-heading text-2xl text-gold">{p.time}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default LocationSection;
