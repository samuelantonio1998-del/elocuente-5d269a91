import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroAsset from "@/assets/hero-sketch.png.asset.json";
import logoAsset from "@/assets/elocuente-logo-transparent.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const LOGO_SRC = logoAsset.url;

const HeroSection = () => {
  const { t } = useLanguage();
  const heroSrc = useSiteImage("hero.main", heroAsset.url);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1.05, 1.05] : [1.05, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -40]);

  return (
    <section ref={ref} id="hero" className="relative h-screen w-full overflow-hidden bg-charcoal">
      <motion.img
        src={heroSrc}
        alt="Vista exterior do empreendimento Elocuente"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover opacity-55 will-change-transform"
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

      {/* Top-right CTA */}
      <motion.a
        href="#contacto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-6 right-6 md:top-8 md:right-10 z-20 text-[11px] font-body tracking-[0.2em] uppercase whitespace-nowrap px-5 py-2.5 bg-gold text-charcoal hover:bg-gold/90 transition-all duration-300 shadow-lg"
      >
        {t("nav.cta")}
      </motion.a>

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Logótipo Elocuente (imagem) */}
        <motion.img
          src={LOGO_SRC}
          alt="Elocuente"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[280px] md:w-[440px] lg:w-[560px] h-auto select-none [filter:drop-shadow(0_2px_20px_rgba(0,0,0,0.35))]"
          draggable={false}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#numeros"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 text-white/70 hover:text-white transition-colors"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} strokeWidth={1.5} />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;
