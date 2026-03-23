import AnimatedSection from "./AnimatedSection";
import interiorImage from "@/assets/interior-living.jpg";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
              O Empreendimento
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-foreground leading-tight mb-8">
              Um novo conceito de viver
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              O Aurora redefine o conceito de habitação premium na cidade. Com uma
              arquitectura contemporânea assinada por um atelier de renome
              internacional, cada detalhe foi pensado para proporcionar o máximo
              conforto e sofisticação.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Situado numa localização privilegiada, o empreendimento oferece 48
              apartamentos exclusivos de tipologias T1 a T4, com acabamentos de
              excelência e vistas panorâmicas deslumbrantes.
            </p>
            <div className="flex gap-12">
              {[
                { num: "48", label: "Apartamentos" },
                { num: "4", label: "Tipologias" },
                { num: "2026", label: "Conclusão" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl text-gold">{stat.num}</p>
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <img
                src={interiorImage}
                alt="Interior de sala de estar luxuosa"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                width={1024}
                height={1024}
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-gold/30" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
