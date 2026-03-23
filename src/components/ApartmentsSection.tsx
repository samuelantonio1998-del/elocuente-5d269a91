import AnimatedSection from "./AnimatedSection";
import renderDetail from "@/assets/render-detail.jpg";
import renderGarden from "@/assets/render-garden.jpg";
import renderSide from "@/assets/render-side.jpg";

const typologies = [
  {
    type: "T1",
    area: "50 — 65 m²",
    desc: "Ideal para jovens profissionais. Espaços abertos e luminosos com varanda privativa e vegetação integrada.",
    image: renderDetail,
  },
  {
    type: "T2",
    area: "80 — 100 m²",
    desc: "O equilíbrio perfeito entre conforto e funcionalidade, com varandas generosas e vistas desafogadas.",
    image: renderGarden,
  },
  {
    type: "T3",
    area: "110 — 140 m²",
    desc: "Amplos espaços de convívio familiar com cozinha equipada, terraço e acabamentos de qualidade superior.",
    image: renderSide,
  },
];

const ApartmentsSection = () => {
  return (
    <section id="apartamentos" className="py-24 md:py-32 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-20">
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Tipologias
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-foreground">
            Escolha o seu espaço
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {typologies.map((t, i) => (
            <AnimatedSection key={t.type} delay={i * 0.1}>
              <div className="group relative overflow-hidden bg-background">
                <div className="h-64 overflow-hidden">
                  <img
                    src={t.image}
                    alt={`Apartamento ${t.type} — Monte Grande Residences`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    width={1024}
                    height={1024}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-baseline justify-between mb-4">
                    <h3 className="font-heading text-3xl text-foreground">{t.type}</h3>
                    <span className="font-body text-sm text-gold tracking-wider">
                      {t.area}
                    </span>
                  </div>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {t.desc}
                  </p>
                  <a
                    href="#contacto"
                    className="inline-block mt-6 text-xs font-body tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-1 hover:border-gold transition-colors duration-300"
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
