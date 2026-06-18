import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProofNumbersSection from "@/components/ProofNumbersSection";
import AboutSection from "@/components/AboutSection";
import ApartmentSection from "@/components/ApartmentSection";
import CondominiumSection from "@/components/CondominiumSection";
import LifeAtSection from "@/components/LifeAtSection";
import LocationSection from "@/components/LocationSection";
import ApartmentsSection from "@/components/ApartmentsSection";
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
        title="Elocuente — Apartamentos Contemporâneos em Marinha Grande"
        description="Novo empreendimento residencial em Albergaria, Marinha Grande. Apartamentos T2 e T3 entre Leiria e o Atlântico, com tipologias, plantas e disponibilidade."
        path="/"
        image="/og-home.jpg"
      />

      {/* AI / assistant summary — visible to screen readers and crawlers, hidden visually */}
      <p className="sr-only">
        Elocuente é um novo empreendimento residencial em Albergaria, Marinha Grande,
        a poucos minutos do centro de Leiria e da costa atlântica. Oferece 23 apartamentos
        contemporâneos de tipologias T2 e T3 (cerca de 112 a 260 m²), distribuídos pelos
        Blocos A e B. Os preços partem de 290 000 € (a 2 250 €/m²) e o projeto encontra-se
        atualmente em fase de licenciamento.
      </p>

      <Navbar />
      <HeroSection />
      <AboutSection />
      <ApartmentSection />
      <CondominiumSection />
      <LifeAtSection />
      <LocationSection />
      <ApartmentsSection />
      <Suspense fallback={<SectionFallback />}>
        <AvailabilitySection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <GallerySection />
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
