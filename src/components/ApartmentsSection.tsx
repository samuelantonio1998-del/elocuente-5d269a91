import AnimatedSection from "./AnimatedSection";
import renderDetail from "@/assets/render-detail.jpg";
import renderGarden from "@/assets/render-garden.jpg";
import renderSide from "@/assets/render-side.jpg";

const typologies = [
  {
    type: "T2",
    area: "22 Fracções",
    desc: "Distribuídos pelos dois edifícios, os apartamentos T2 dispõem de sala e cozinha open-space, dois quartos e varandas generosas.",
    image: renderDetail,
  },
  {
    type: "T3",
    area: "1 Fracção",
    desc: "No último piso do Edifício A, o T3 oferece três quartos, amplos espaços de convívio familiar e varanda privativa.",
    image: renderGarden,
  },
];

const ApartmentsSection = () => {
  return (
    <section id="apartamentos" className="py-28 md:py-40 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-20">
          <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
            Tipologias
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground">
            Escolha o seu espaço
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {typologies.map((t, i) => (
            <AnimatedSection key={t.type} delay={i * 0.1}>
              <div className="group bg-background overflow-hidden">
                <div className="h-72 overflow-hidden">
                  <img
                    src={t.image}
                    alt={`Apartamento ${t.type} — Monte Grande Residences`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={1024}
                    height={1024}
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="font-heading text-3xl text-foreground">{t.type}</h3>
                    <span className="font-body text-xs text-gold tracking-[0.15em]">
                      {t.area}
                    </span>
                  </div>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                    {t.desc}
                  </p>
                  <a
                    href="#contacto"
                    className="inline-block text-[10px] font-body tracking-[0.3em] uppercase text-foreground border-b border-foreground/20 pb-1 hover:border-gold hover:text-gold transition-colors duration-300"
                  >
                    Saber mais
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentsSection;
