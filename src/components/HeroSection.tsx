import { motion } from "framer-motion";
import heroImage from "@/assets/hero-building.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Empreendimento Aurora - Vista exterior ao pôr do sol"
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
          className="font-heading text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-wide"
        >
          AURORA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="font-heading text-lg md:text-xl text-primary-foreground/80 italic mt-4 max-w-xl"
        >
          Onde a elegância encontra a vida moderna
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
