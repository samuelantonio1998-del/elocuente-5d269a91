import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/render-side.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Vista exterior do empreendimento Elocuente"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-charcoal/50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-block px-4 py-1.5 border border-gold/60 text-gold font-body text-[10px] tracking-[0.35em] uppercase mb-8"
        >
          {t("hero.badge")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="font-heading text-5xl md:text-7xl xl:text-8xl text-primary-foreground leading-[1.05] tracking-wide"
        >
          {t("hero.name")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="font-heading italic text-xl md:text-2xl text-primary-foreground/90 mt-6"
        >
          {t("hero.tagline")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="font-body text-sm md:text-base text-primary-foreground/75 tracking-wide max-w-xl mt-5"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="flex flex-col sm:flex-row gap-3 mt-12"
        >
          <a
            href="#contacto"
            className="px-8 py-3.5 bg-gold text-charcoal font-body text-[10px] tracking-[0.3em] uppercase hover:bg-gold/90 transition-all duration-500"
          >
            {t("hero.cta1")}
          </a>
          <a
            href="#disponibilidades"
            className="px-8 py-3.5 border border-primary-foreground/40 text-primary-foreground font-body text-[10px] tracking-[0.3em] uppercase hover:bg-primary-foreground hover:text-charcoal transition-all duration-500"
          >
            {t("hero.cta2")}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-primary-foreground/50">
            {t("hero.scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-primary-foreground/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
