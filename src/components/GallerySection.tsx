import { useState, useRef } from "react";
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

const galleryImages = [
  { src: renderFront, alt: "Fachada principal" },
  { src: renderSide, alt: "Vista lateral" },
  { src: renderGarden, alt: "Jardim interior" },
  { src: renderAerial, alt: "Vista aérea" },
  { src: renderEntrance, alt: "Entrada principal" },
  { src: renderDetail, alt: "Detalhe das varandas" },
  { src: renderBack, alt: "Vista posterior" },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : null
    );

  const scrollGallery = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.6;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="galeria" className="py-28 md:py-40 bg-background">
      <div className="px-8 lg:px-16 mb-12">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              Galeria
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground">
              Imagens do projecto
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scrollGallery("left")}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollGallery("right")}
              className="w-12 h-12 border border-border flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-8 lg:px-16 overflow-x-auto hide-scrollbar"
      >
        {galleryImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="flex-shrink-0 relative overflow-hidden group cursor-pointer h-[350px] md:h-[500px] w-[300px] md:w-[400px]"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className="px-8 lg:px-16 mt-8">
        <p className="font-body text-[10px] tracking-[0.3em] text-muted-foreground">
          {galleryImages.length} imagens
        </p>
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
              className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              <ChevronRight size={32} />
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-center font-body text-xs text-primary-foreground/40 tracking-[0.2em]">
              {lightboxIndex + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;