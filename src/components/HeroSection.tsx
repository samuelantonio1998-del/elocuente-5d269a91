import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import heroAsset from "@/assets/hero-new.png.asset.json";
import { useLanguage } from "@/i18n/LanguageContext";
import SplitText from "./motion/SplitText";

const HeroSection = () => {
  const { t } = useLanguage();
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
        src={heroAsset.url}
        alt="Vista exterior do empreendimento Elocuente"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover opacity-55 will-change-transform"
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      {/* Top gradient — grounds the navbar */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent" />
      {/* Bottom gradient — guarantees headline legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 lg:px-24 pb-20 md:pb-28"
      >
        <SplitText
          as="h1"
          text={t("hero.title")}
          delay={0.8}
          stagger={0.05}
          className="font-heading font-light text-4xl md:text-6xl lg:text-7xl text-white tracking-tight max-w-5xl leading-[1.05] [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-6 font-body font-light text-base md:text-lg lg:text-xl text-white/90 tracking-wide max-w-3xl [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
        >
          {t("hero.tagline2")}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;