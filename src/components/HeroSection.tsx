import { ChevronDown } from "lucide-react";
import heroAsset from "@/assets/hero-sketch.png.asset.json";
import logoWhiteAsset from "@/assets/elocuente-261-logo-white.png.asset.json";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-charcoal">
      <img
        src={heroAsset.url}
        alt="Vista exterior do empreendimento Elocuente"
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        width={1920}
        height={1080}
        fetchPriority="high"
        decoding="async"
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-charcoal/85 via-charcoal/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <img
          src={logoWhiteAsset.url}
          alt="Elocuente 261"
          className="w-[280px] md:w-[440px] lg:w-[560px] h-auto [filter:drop-shadow(0_2px_20px_rgba(0,0,0,0.45))]"
        />
      </div>

      <a
        href="#numeros"
        aria-label="Scroll down"
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-10 text-white/70 hover:text-white transition-colors"
      >
        <ChevronDown size={28} strokeWidth={1.5} />
      </a>
    </section>
  );
};

export default HeroSection;
