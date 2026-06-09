import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/render-front.jpg";
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

      <div className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 lg:px-24 pb-20 md:pb-28">
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
          transition={{ duration: 1.2, delay: 1.5 }}
          className="font-body font-light text-2xl md:text-4xl lg:text-5xl text-white tracking-wide max-w-3xl leading-snug"
        >
          {t("hero.subtitle")}
        </motion.h1>



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
