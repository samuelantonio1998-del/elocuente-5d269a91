import AnimatedSection from "./AnimatedSection";
import renderFront from "@/assets/render-front.jpg";

const AboutSection = () => {
  return (
    <section id="sobre" className="py-28 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimatedSection>
            <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6">
              O Empreendimento
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-10">
              Arquitectura contemporânea em Monte Grande
            </h2>
            <div className="space-y-6">
              <p className="font-body text-muted-foreground leading-[1.8] text-sm md:text-base">
                O Monte Grande Residences é um novo empreendimento residencial localizado
                na Rua do Fagundo, com um projecto de arquitectura assinado pelo atelier
                Tiago Frazão Arquitetos.
              </p>
              <p className="font-body text-muted-foreground leading-[1.8] text-sm md:text-base">
                Linhas contemporâneas, varandas generosas e integração paisagística
                definem este projecto singular. Cada apartamento foi pensado para
                maximizar a luz natural e o conforto.
              </p>
            </div>

            <div className="flex gap-16 mt-12 pt-10 border-t border-border">
              {[
                { num: "T1–T3", label: "Tipologias" },
                { num: "4", label: "Pisos" },
                { num: "2027", label: "Conclusão" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl text-foreground">{stat.num}</p>
                  <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <img
              src={renderFront}
              alt="Vista frontal do Monte Grande Residences"
              className="w-full h-[400px] md:h-[600px] object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
