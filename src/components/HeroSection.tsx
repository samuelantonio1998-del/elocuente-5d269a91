import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/render-front.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Monte Grande Residences - Vista exterior do empreendimento"
        className="absolute inset-0 w-full h-full object-cover scale-105"
        width={1920}
        height={1080}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-[11px] md:text-xs tracking-[0.6em] uppercase text-primary-foreground/70 mb-8"
        >
          Bem-vindo
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-primary-foreground leading-none tracking-wide"
        >
          Bem-vindo
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="w-16 h-px bg-primary-foreground/40 my-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="font-body text-[11px] md:text-sm tracking-[0.5em] uppercase text-primary-foreground/60"
        >
          Residences
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-primary-foreground/50">
            Scroll Down
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