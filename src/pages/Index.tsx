import { lazy, Suspense } from "react";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProofNumbersSection from "@/components/ProofNumbersSection";
import PromoterSection from "@/components/PromoterSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import ApartmentSection from "@/components/ApartmentSection";
import CondominiumSection from "@/components/CondominiumSection";
import LifeAtSection from "@/components/LifeAtSection";
import LocationSection from "@/components/LocationSection";

import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Heavy below-the-fold sections — code-split
const AvailabilitySection = lazy(() => import("@/components/AvailabilitySection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const PhasesSection = lazy(() => import("@/components/PhasesSection"));

const SectionFallback = () => (
  <div className="py-28 text-center font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
    …
  </div>
);

const Index = () => {
  return (
    <main className="scroll-smooth">
      <Seo
        title="Elocuente — Residências Premium em Marinha Grande"
        description="Vinte e três residências premium T2 e T3 em Albergaria, Marinha Grande, à porta do pinhal de Leiria e do Atlântico. Acabamentos em mármore e madeira nobre. Desde 320.000 €."
        path="/"
        image="/og-home.jpg"
      />

      {/* AI / assistant summary — visible to screen readers and crawlers, hidden visually */}
      <p className="sr-only">
        Elocuente é um novo empreendimento residencial premium em Albergaria, Marinha Grande,
        a poucos minutos do centro de Leiria e da costa atlântica. Oferece 23 residências
        premium de tipologias T2 e T3 (cerca de 115 a 260 m²), distribuídas pelos Blocos A e B,
        com acabamentos em mármore e madeira nobre. Desde 320 000 €. Projeto atualmente em
        fase de licenciamento.
      </p>

      <Navbar />
      <HeroSection />
      <ProofNumbersSection />
      <PromoterSection />
      <LocationSection />
      <ArchitectureSection />
      <ApartmentSection />
      <CondominiumSection />
      <LifeAtSection />
      <Suspense fallback={<SectionFallback />}>
        <GallerySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AvailabilitySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <PhasesSection />
      </Suspense>
      <ContactSection />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
};

export default Index;
