import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import renderDetail from "@/assets/render-detail.jpg";
import renderGarden from "@/assets/render-garden.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const ApartmentsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();

  const typologies = [
    {
      type: "T2",
      price: t("apartments.t2.price"),
      desc: t("apartments.t2.desc"),
      image: renderDetail,
    },
    {
      type: "T3",
      price: t("apartments.t3.price"),
      desc: t("apartments.t3.desc"),
      image: renderGarden,
    },
  ];

  return (
    <section id="apartamentos" className="bg-cream-dark">
      <div className="py-28 md:py-40 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("apartments.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("apartments.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("apartments.desc")}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex justify-center gap-1 mb-12">
              {typologies.map((ty, i) => (
                <button
                  key={ty.type}
                  onClick={() => setActiveIndex(i)}
                  className={`px-10 py-3.5 font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-300 ${
                    activeIndex === i
                      ? "bg-foreground text-background"
                      : "bg-transparent text-muted-foreground border border-border hover:border-foreground/30"
                  }`}
                >
                  {ty.type}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-0"
            >
              <div className="h-[350px] md:h-[550px] overflow-hidden">
                <img
                  src={typologies[activeIndex].image}
                  alt={`Apartamento ${typologies[activeIndex].type}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center bg-background px-8 md:px-16 py-12 md:py-0">
                <div>
                  <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-3">
                    {typologies[activeIndex].type}
                  </h3>
                  <p className="font-body text-[11px] tracking-[0.2em] text-gold mb-8">
                    {typologies[activeIndex].price}
                  </p>
                  <p className="font-body text-muted-foreground text-sm leading-[2] mb-10 max-w-sm">
                    {typologies[activeIndex].desc}
                  </p>
                  <a
                    href="#contacto"
                    className="inline-block px-8 py-3.5 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                  >
                    {t("apartments.cta")}
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ApartmentsSection;
