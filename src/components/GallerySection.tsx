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

type GalleryCategory = "exteriores" | "interiores";

const categories: { key: GalleryCategory; label: string }[] = [
  { key: "exteriores", label: "Espaços Exteriores" },
  { key: "interiores", label: "Espaços Interiores" },
];

const galleryImages: Record<GalleryCategory, { src: string; alt: string; span?: string }[]> = {
  exteriores: [
    { src: renderHero, alt: "Vista principal do empreendimento", span: "col-span-2 row-span-2" },
    { src: renderFront, alt: "Fachada principal" },
    { src: renderSide, alt: "Vista lateral" },
    { src: renderAerial, alt: "Vista aérea", span: "col-span-2" },
    { src: renderBack, alt: "Vista posterior" },
  ],
  interiores: [
    { src: renderDetail, alt: "Detalhe das varandas" },
    { src: renderGarden, alt: "Jardim interior", span: "col-span-2 row-span-2" },
    { src: renderEntrance, alt: "Entrada principal" },
  ],
};

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("exteriores");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentImages = galleryImages[activeCategory];

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + currentImages.length) % currentImages.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % currentImages.length : null
    );

  return (
    <section id="galeria" className="py-28 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-gold font-body text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">
                Galeria
              </p>
              <h2 className="font-heading text-3xl md:text-5xl text-foreground">
                Imagens do projecto
              </h2>
            </div>

            <div className="flex gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-5 py-2.5 font-body text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    activeCategory === cat.key
                      ? "bg-foreground text-background"
                      : "bg-transparent text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[200px] md:auto-rows-[250px]"
          >
            {currentImages.map((img, i) => (
              <button
                key={`${activeCategory}-${i}`}
                onClick={() => setLightboxIndex(i)}
                className={`relative overflow-hidden group cursor-pointer ${img.span || ""}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
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
              src={currentImages[lightboxIndex].src}
              alt={currentImages[lightboxIndex].alt}
              className="max-w-[90vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-center font-body text-xs text-primary-foreground/40 tracking-[0.2em]">
              {lightboxIndex + 1} / {currentImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
