import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

import renderHero from "@/assets/hero-building.jpg";
import renderFront from "@/assets/render-front.jpg";
import renderSide from "@/assets/render-side.jpg";
import renderGarden from "@/assets/render-garden.jpg";
import renderEntrance from "@/assets/render-entrance.jpg";
import renderDetail from "@/assets/render-detail.jpg";
import renderBack from "@/assets/render-back.jpg";
import renderAerial from "@/assets/render-aerial.jpg";

const images = [
  { src: renderHero, alt: "Vista frontal do empreendimento" },
  { src: renderFront, alt: "Fachada principal com varandas" },
  { src: renderSide, alt: "Vista lateral com jardim" },
  { src: renderGarden, alt: "Jardim interior e varandas" },
  { src: renderEntrance, alt: "Entrada e zona de acesso" },
  { src: renderDetail, alt: "Detalhe arquitectónico das varandas" },
  { src: renderBack, alt: "Vista posterior do edifício" },
  { src: renderAerial, alt: "Vista aérea do empreendimento" },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <section id="galeria" className="py-24 md:py-32 bg-charcoal text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="text-center mb-16">
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
            Galeria
          </p>
          <h2 className="font-heading text-4xl md:text-5xl">
            Imagens do projecto
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="relative overflow-hidden aspect-square group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500" />
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-gold transition-colors"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-primary-foreground/60 hover:text-gold transition-colors"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-primary-foreground/60 hover:text-gold transition-colors"
            >
              <ChevronRight size={36} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-center font-body text-sm text-primary-foreground/50 tracking-wider">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
