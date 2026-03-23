import { motion } from "framer-motion";
import heroImage from "@/assets/hero-building.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Monte Grande Residences - Vista exterior do empreendimento"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/80" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gold font-body text-sm tracking-[0.4em] uppercase mb-6"
        >
          Novo Empreendimento
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground tracking-wide"
        >
          MONTE GRANDE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heading text-2xl md:text-3xl text-primary-foreground/90 tracking-[0.2em] uppercase mt-2"
        >
          RESIDENCES
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-base md:text-lg text-primary-foreground/70 mt-6 max-w-xl tracking-wide"
        >
          Rua do Fagundo · Monte Grande
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-12"
        >
          <a
            href="#contacto"
            className="inline-block px-10 py-4 border border-gold text-gold font-body text-sm tracking-[0.3em] uppercase hover:bg-gold hover:text-charcoal transition-all duration-500"
          >
            Manifestar Interesse
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold/0 via-gold to-gold/0 animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
