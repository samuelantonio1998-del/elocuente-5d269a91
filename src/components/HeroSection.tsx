import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/render-front.jpg";
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
        src={heroImage}
        alt="Vista exterior do empreendimento Elocuente"
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover opacity-55 will-change-transform"
        width={1920}
        height={1080}
        fetchPriority="high"
      />

      {/* Top gradient — hides printed credits on render and grounds the navbar */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent" />
      {/* Bottom gradient — guarantees headline legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-start justify-end h-full text-left px-6 md:px-16 lg:px-24 pb-20 md:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="inline-block px-4 py-1.5 border border-gold/60 text-gold font-body text-[10px] tracking-[0.35em] uppercase mb-8"
        >
          {t("hero.badge")}
        </motion.span>

        <SplitText
          as="h1"
          text={t("hero.subtitle")}
          delay={1.2}
          stagger={0.08}
          className="font-body font-light text-2xl md:text-4xl lg:text-5xl text-white tracking-wide max-w-4xl leading-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.35)]"
        />

        {/* Credits */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-10 right-6 md:right-16 lg:right-24 font-body text-[10px] tracking-[0.25em] uppercase text-primary-foreground/40"
        >
          Estudo prévio · Imagem indicativa · Tiago Frazão Arquitetos
        </motion.span>




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
