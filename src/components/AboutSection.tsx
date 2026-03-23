import AnimatedSection from "./AnimatedSection";
import renderFront from "@/assets/render-front.jpg";

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
              Arquitectura contemporânea em Monte Grande
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              O Monte Grande Residences é um novo empreendimento residencial localizado
              na Rua do Fagundo, com um projecto de arquitectura assinado pelo atelier
              Tiago Frazão Arquitetos. Linhas contemporâneas, varandas generosas e
              integração paisagística definem este projecto singular.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              Cada apartamento foi pensado para maximizar a luz natural e o conforto,
              com acabamentos de qualidade superior e espaços exteriores privativos
              com vegetação integrada.
            </p>
            <div className="flex gap-12">
              {[
                { num: "T1–T3", label: "Tipologias" },
                { num: "4", label: "Pisos" },
                { num: "2027", label: "Conclusão Prevista" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-2xl text-gold">{stat.num}</p>
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
                src={renderFront}
                alt="Vista frontal do Monte Grande Residences"
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
