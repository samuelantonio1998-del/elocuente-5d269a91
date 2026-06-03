import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import LocationSection from "@/components/LocationSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import GallerySection from "@/components/GallerySection";
import ApartmentsSection from "@/components/ApartmentsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="scroll-smooth">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <LocationSection />
      <AvailabilitySection />
      <GallerySection />
      <ApartmentsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
