import { motion } from "framer-motion";
import { Building, MapPin, Home, Trees } from "lucide-react";
import heroImage from "@/assets/hero-building.jpg";

const infoItems = [
  { icon: Building, label: "Edifícios", value: "2 Blocos · 3 Pisos" },
  { icon: MapPin, label: "Localização", value: "Marinha Grande" },
  { icon: Home, label: "Tipologias", value: "T2 e T3" },
  { icon: Trees, label: "Estacionamento", value: "24 Lugares + Jardim" },
];

const HeroSection = () => {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={heroImage}
          alt="Monte Grande Residences - Vista exterior do empreendimento"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-charcoal/40" />

        <div className="relative z-10 flex flex-col items-center justify-start h-full pt-32 md:pt-40 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-xs md:text-sm tracking-[0.5em] uppercase text-primary-foreground/70 mb-4"
          >
            Novo Empreendimento
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-heading text-5xl md:text-7xl lg:text-[8rem] text-primary-foreground leading-none tracking-tight"
          >
            Monte Grande
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-primary-foreground/60 mt-4"
          >
            Rua do Fagundo · Albergaria · <span className="text-gold">Residences</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-primary-foreground/40 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Info Strip — Fercopor style */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-background border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {infoItems.map((item) => (
              <div key={item.label} className="py-10 md:py-14 px-6 md:px-10 text-center">
                <item.icon className="w-7 h-7 text-gold mx-auto mb-4 stroke-[1.5]" />
                <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mb-2">
                  {item.label}
                </p>
                <p className="font-heading text-base md:text-lg text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HeroSection;
