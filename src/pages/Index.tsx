import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ApartmentsSection from "@/components/ApartmentsSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import LocationSection from "@/components/LocationSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ApartmentsSection />
      <AvailabilitySection />
      <AmenitiesSection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;