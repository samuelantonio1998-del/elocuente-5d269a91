import { Waves, TreePine, Shield, Car, Dumbbell, Wine } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import poolImage from "@/assets/amenities-pool.jpg";

const amenities = [
  { icon: Waves, label: "Piscina Infinita", desc: "Rooftop com vistas panorâmicas" },
  { icon: Dumbbell, label: "Ginásio Premium", desc: "Equipamento de última geração" },
  { icon: TreePine, label: "Jardins Privados", desc: "Espaços verdes paisagísticos" },
  { icon: Shield, label: "Segurança 24h", desc: "Vigilância e controlo de acessos" },
  { icon: Car, label: "Estacionamento", desc: "Lugares privativos e carregadores EV" },
  { icon: Wine, label: "Lounge Residentes", desc: "Espaço social exclusivo" },
];

const AmenitiesSection = () => {
  return (
    <section id="amenidades" className="py-24 md:py-32 bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <img
              src={poolImage}
              alt="Piscina infinita com vista panorâmica ao entardecer"
              className="w-full h-[500px] object-cover"
              loading="lazy"
              width={1280}
              height={960}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
              Amenidades
            </p>
            <h2 className="font-heading text-4xl md:text-5xl leading-tight mb-12">
              Viver além do extraordinário
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {amenities.map((a) => (
                <div key={a.label} className="flex items-start gap-4">
                  <a.icon className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body text-sm font-medium mb-1">{a.label}</p>
                    <p className="font-body text-xs text-primary-foreground/60">{a.desc}</p>
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
