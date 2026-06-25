import { useLanguage } from "@/i18n/LanguageContext";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";


const ProofNumbersSection = () => {
  const { t } = useLanguage();

  const items = [
    { value: "23", label: t("proof.residences") },
    { value: "2", label: t("proof.buildings") },
    { value: "2", label: t("proof.parking") },
    { value: "115–260 m²", label: t("proof.areas") },
    { value: "30 m²", label: t("proof.balcony") },
    { value: "2028", label: t("proof.delivery") },
  ];

  return (
    <section
      aria-label="Números do empreendimento"
      className="bg-cream section-py border-y border-charcoal/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <StaggerGroup as="ul" stagger={0.08} delayChildren={0.05} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {items.map((item, i) => (
            <StaggerItem
              key={i}
              as="li"
              variant="fade-up"
              className="flex flex-col items-center text-center px-3 md:px-4 py-5 md:py-0 md:border-r md:border-charcoal/15 md:last:border-r-0"
            >
              <span className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal font-light tracking-tight whitespace-nowrap">
                {item.value}
              </span>
              <span className="mt-3 font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-charcoal/60 leading-relaxed">
                {item.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

    </section>
  );
};

export default ProofNumbersSection;
