import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";
import apt1 from "@/assets/apt-1.png.asset.json";
import apt2 from "@/assets/apt-2.png.asset.json";

const tipologias = [
  {
    key: "t2" as const,
    title: "T2",
    area: "115–137 m²",
    image: apt1,
    siteKey: "apartment.1" as const,
  },
  {
    key: "t3" as const,
    title: "T3",
    area: "148–260 m²",
    image: apt2,
    siteKey: "apartment.2" as const,
  },
];

const TipologiaCard = ({
  tlog,
  delay,
}: {
  tlog: (typeof tipologias)[number];
  delay: number;
}) => {
  const { t } = useLanguage();
  const img = useSiteImage(tlog.siteKey, tlog.image.url);

  return (
    <AnimatedSection delay={delay}>
      <div className="group border border-border overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={img}
            alt={`Tipologia ${tlog.title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="font-heading text-2xl text-foreground">
              {tlog.title}
            </h3>
            <span className="font-body text-sm text-muted-foreground">
              {tlog.area}
            </span>
          </div>
          <p className="font-body text-sm text-muted-foreground leading-[1.9]">
            {t(`apartments.${tlog.key}.desc`)}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
};

const TipologiasSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const current = tipologias[active];
  const imageUrl = useSiteImage(current.siteKey, current.image.url);

  const prev = () =>
    setActive((i) => (i - 1 + tipologias.length) % tipologias.length);
  const next = () => setActive((i) => (i + 1) % tipologias.length);

  return (
    <section id="tipologias" className="py-16 md:py-24 bg-background">
      <div className="px-8 lg:px-16 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
            {t("availability.label")}
          </p>
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
            Tipologias
          </h2>
          <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
            {t("apartments.desc")}
          </p>
        </AnimatedSection>

        {/* Desktop: side-by-side cards */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {tipologias.map((tlog, i) => (
            <TipologiaCard key={tlog.key} tlog={tlog} delay={0.1 * i} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <AnimatedSection delay={0.1}>
            <div className="relative border border-border overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Tipologia ${current.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-heading text-2xl text-foreground">
                        {current.title}
                      </h3>
                      <span className="font-body text-sm text-muted-foreground">
                        {current.area}
                      </span>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-[1.9]">
                      {t(`apartments.${current.key}.desc`)}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={prev}
                aria-label="Anterior"
                className="absolute left-4 top-[35%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 hover:bg-background text-foreground transition-colors"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={next}
                aria-label="Seguinte"
                className="absolute right-4 top-[35%] -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 hover:bg-background text-foreground transition-colors"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {tipologias.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ir para tipologia ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === active ? "bg-foreground" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default TipologiasSection;
