import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import LocationSection from "@/components/LocationSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import ApartmentsSection from "@/components/ApartmentsSection";
import GallerySection from "@/components/GallerySection";
import PhasesSection from "@/components/PhasesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Index = () => {
  return (
    <main className="scroll-smooth">
      <Seo
        title="Elocuente — Apartamentos Contemporâneos em Marinha Grande"
        description="Novo empreendimento residencial em Albergaria, Marinha Grande. Apartamentos T2 e T3 entre Leiria e o Atlântico, com tipologias, plantas e disponibilidade."
        path="/"
        image="/og-home.jpg"
      />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <LocationSection />
      <ApartmentsSection />
      <AvailabilitySection />
      <GallerySection />
      <PhasesSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
