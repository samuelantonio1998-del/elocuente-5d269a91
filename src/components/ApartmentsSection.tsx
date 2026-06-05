import { Building2, ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { units, type Unit, type UnitStatus } from "@/data/units";
import { useReservedUnits } from "@/hooks/useReservedUnits";

const ApartmentsSection = () => {
  const { t } = useLanguage();
  const reservedIds = useReservedUnits();

  const getStatus = (u: Unit): UnitStatus => (reservedIds.has(u.id) ? "reserved" : u.status);
  const floorLabel = (f: number) => (f === 0 ? t("availability.groundFloor") : `${f}º`);

  const blocks = [
    { key: "A", units: units.filter((u) => u.building === "A") },
    { key: "B", units: units.filter((u) => u.building === "B") },
  ];

  return (
    <section id="apartamentos" className="bg-cream-dark">
      <div className="py-28 md:py-40 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-20">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("apartments.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("apartments.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("apartments.desc")}
            </p>
          </AnimatedSection>

          {blocks.map((block, bi) => (
            <div key={block.key} className={bi > 0 ? "mt-20" : ""}>
              <AnimatedSection className="flex items-center gap-4 mb-8">
                <Building2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl md:text-3xl text-foreground">
                  {t("apartments.block")} {block.key}
                </h3>
                <div className="flex-1 h-px bg-border" />
                <span className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
                  {block.units.length} {t("apartments.unitsCount")}
                </span>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {block.units.map((u) => {
                    const status = getStatus(u);
                    const reserved = status === "reserved";
                    return (
                      <div
                        key={u.id}
                        className="bg-background border border-border/60 flex flex-col group hover:border-foreground/30 transition-colors duration-500"
                      >
                        {/* Floor plan placeholder */}
                        <div className="relative aspect-[4/3] bg-cream-dark/50 flex items-center justify-center overflow-hidden">
                          <svg
                            viewBox="0 0 100 75"
                            className="w-2/3 h-2/3 text-foreground/15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.8"
                          >
                            <rect x="5" y="5" width="90" height="65" />
                            <line x1="55" y1="5" x2="55" y2="45" />
                            <line x1="5" y1="45" x2="55" y2="45" />
                            <line x1="55" y1="30" x2="95" y2="30" />
                            <line x1="30" y1="45" x2="30" y2="70" />
                          </svg>
                          <span className="absolute top-3 left-3 font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground/70">
                            {t("availability.floorPlan.soon")}
                          </span>
                          <span
                            className={`absolute top-3 right-3 px-2.5 py-1 font-body text-[9px] tracking-[0.2em] uppercase ${
                              reserved
                                ? "bg-muted text-muted-foreground"
                                : "bg-secondary text-secondary-foreground"
                            }`}
                          >
                            {reserved
                              ? t("availability.status.reserved")
                              : t("availability.status.available")}
                          </span>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-baseline justify-between mb-4">
                            <h4 className="font-heading text-2xl text-foreground">{u.type}</h4>
                            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                              Ref {u.id}
                            </span>
                          </div>
                          <div className="space-y-1.5 mb-6 font-body text-sm text-muted-foreground">
                            <p>
                              <span className="text-foreground">{u.area}</span>
                            </p>
                            <p>
                              {t("availability.col.floor")}:{" "}
                              <span className="text-foreground">{floorLabel(u.floor)}</span>
                            </p>
                          </div>
                          <a
                            href="#contacto"
                            className="mt-auto inline-flex items-center justify-between gap-2 px-4 py-3 border border-foreground/15 font-body text-[10px] tracking-[0.25em] uppercase text-foreground hover:bg-foreground hover:text-background transition-all duration-500"
                          >
                            {t("apartments.cardCta")}
                            <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApartmentsSection;
