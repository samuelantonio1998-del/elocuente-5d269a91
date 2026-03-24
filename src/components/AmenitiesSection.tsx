import { TreePine, Shield, Car, Sun, Droplets, Building } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import renderGarden from "@/assets/render-garden.jpg";

const amenities = [
  { icon: Sun, label: "Varandas Generosas", desc: "Espaços exteriores amplos com vegetação" },
  { icon: TreePine, label: "Jardins Comuns", desc: "Áreas verdes paisagísticas cuidadas" },
  { icon: Shield, label: "Segurança", desc: "Controlo de acessos e vigilância" },
  { icon: Car, label: "Estacionamento", desc: "24 lugares privativos em cave" },
  { icon: Droplets, label: "Eficiência Energética", desc: "Classificação energética elevada" },
  { icon: Building, label: "Arquitectura de Autor", desc: "Projecto por Tiago Frazão Arquitetos" },
];

const AmenitiesSection = () => {
  return (
    <section className="py-28 md:py-40 bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection>
            <img
              src={renderGarden}
              alt="Jardim interior do Monte Grande Residences"
              className="w-full h-[400px] md:h-[550px] object-cover"
              loading="lazy"
              width={1280}
              height={960}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6">
              Características
            </p>
            <h2 className="font-heading text-3xl md:text-5xl leading-[1.1] mb-14">
              Qualidade em cada detalhe
            </h2>

            <div className="grid grid-cols-2 gap-x-10 gap-y-10">
              {amenities.map((a) => (
                <div key={a.label} className="flex items-start gap-4">
                  <a.icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5 stroke-[1.5]" />
                  <div>
                    <p className="font-body text-sm font-medium mb-1">{a.label}</p>
                    <p className="font-body text-xs text-primary-foreground/50 leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
