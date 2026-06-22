import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import heroAsset from "@/assets/hero-sketch.png.asset.json";
import Logo from "@/components/Logo";
import { useLanguage } from "@/i18n/LanguageContext";
import { useSiteImage } from "@/hooks/useSiteImages";

const HeroSection = () => {
  const { t } = useLanguage();
  const heroImage = useSiteImage("hero.main", heroAsset.url);
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
      {heroImage.src && heroImage.isResolved && (
        <motion.img
          key={heroImage.renderKey}
          src={heroImage.src}
          alt="Vista exterior do empreendimento Elocuente"
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 w-full h-full object-cover opacity-55 will-change-transform"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      )}

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6"
      >
        {/* Logótipo Elocuente */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary-foreground [filter:drop-shadow(0_2px_20px_rgba(0,0,0,0.45))]"
        >
          <Logo height={64} className="w-[280px] md:w-[440px] lg:w-[560px] h-auto" />
        </motion.div>
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
