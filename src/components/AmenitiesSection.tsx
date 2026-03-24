import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import renderGarden from "@/assets/render-garden.jpg";
import renderEntrance from "@/assets/render-entrance.jpg";
import renderDetail from "@/assets/render-detail.jpg";
import renderAerial from "@/assets/render-aerial.jpg";

const amenities = [
  {
    label: "Jardins",
    desc: "Áreas verdes paisagísticas comuns, desenhadas para promover momentos de convívio e relaxamento ao ar livre.",
    image: renderGarden,
  },
  {
    label: "Estacionamento",
    desc: "24 lugares de estacionamento privativos em cave, garantindo comodidade e segurança para todos os residentes.",
    image: renderEntrance,
  },
  {
    label: "Varandas",
    desc: "Varandas generosas com vegetação integrada, prolongando o espaço interior e criando áreas de estar ao ar livre.",
    image: renderDetail,
  },
  {
    label: "Segurança",
    desc: "Sistema de controlo de acessos e vigilância, para a tranquilidade de todos os moradores.",
    image: renderAerial,
  },
];

const AmenitiesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="amenidades" className="bg-charcoal text-primary-foreground">
      <div className="py-28 md:py-40 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-primary-foreground/50 mb-4">
              Amenidades
            </p>
            <h2 className="font-heading text-3xl md:text-5xl leading-[1.15] mb-6">
              Conforto & Privacidade
            </h2>
            <p className="font-body text-primary-foreground/60 leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              Cada detalhe foi pensado para oferecer qualidade de vida excepcional,
              com espaços comuns que complementam a experiência residencial.
            </p>
          </AnimatedSection>

          {/* Image + tabs layout */}
          <AnimatedSection delay={0.1}>
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image area */}
              <div className="md:col-span-3 h-[350px] md:h-[500px] overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={amenities[activeIndex].image}
                    alt={amenities[activeIndex].label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover absolute inset-0"
                    loading="lazy"
                  />
                </AnimatePresence>
                {/* Counter overlay */}
                <div className="absolute bottom-6 left-6 font-body text-[10px] tracking-[0.3em] text-primary-foreground/60">
                  {activeIndex + 1} / {amenities.length}
                </div>
              </div>

              {/* Tabs */}
              <div className="md:col-span-2 flex flex-col">
                {amenities.map((a, i) => (
                  <button
                    key={a.label}
                    onClick={() => setActiveIndex(i)}
                    className={`text-left px-8 py-6 md:py-0 md:flex-1 flex flex-col justify-center border-b border-primary-foreground/10 last:border-b-0 transition-all duration-300 ${
                      activeIndex === i
                        ? "bg-primary-foreground/5"
                        : "hover:bg-primary-foreground/[0.02]"
                    }`}
                  >
                    <p className={`font-body text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                      activeIndex === i ? "text-primary-foreground" : "text-primary-foreground/50"
                    }`}>
                      {a.label}
                    </p>
                    <AnimatePresence>
                      {activeIndex === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="font-body text-xs text-primary-foreground/40 leading-relaxed mt-3 overflow-hidden"
                        >
                          {a.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;