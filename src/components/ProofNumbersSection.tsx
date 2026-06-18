import { useLanguage } from "@/i18n/LanguageContext";

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
      className="bg-cream py-14 md:py-20 border-y border-charcoal/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ul className="grid grid-cols-2 md:grid-cols-6 gap-y-10 gap-x-6">
          {items.map((item, i) => (
            <li
              key={i}
              className={`flex flex-col items-center text-center md:px-4 ${
                i < items.length - 1
                  ? "md:border-r md:border-charcoal/15 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(6n)]:border-r-0"
                  : ""
              }`}
            >
              <span className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal font-light tracking-tight whitespace-nowrap">
                {item.value}
              </span>
              <span className="mt-3 font-body text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-charcoal/60">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProofNumbersSection;
