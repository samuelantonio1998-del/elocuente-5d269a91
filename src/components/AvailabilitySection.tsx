import { useState } from "react";
import { FileText } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";
import ReservationDialog from "./ReservationDialog";
import PaymentTermsDialog from "./PaymentTermsDialog";
import { units, getUnitPrice, type Unit, type UnitStatus } from "@/data/units";
import { useReservedUnits } from "@/hooks/useReservedUnits";

const AvailabilitySection = () => {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [filterBuilding, setFilterBuilding] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const reservedIds = useReservedUnits();

  const getStatus = (unit: Unit): UnitStatus => (reservedIds.has(unit.id) ? "reserved" : unit.status);

  const filtered = units.filter((u) => {
    if (filterBuilding !== "all" && u.building !== filterBuilding) return false;
    if (filterType !== "all" && u.type !== filterType) return false;
    return true;
  });

  const floorLabel = (f: number) => (f === 0 ? t("availability.groundFloor") : `${f}º`);

  const handleReserve = (unit: Unit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };


  return (
    <section id="disponibilidades" className="bg-background">
      <div className="py-28 md:py-40 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <p className="font-body text-[10px] md:text-[11px] tracking-[0.5em] uppercase text-muted-foreground mb-4">
              {t("availability.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              {t("availability.title")}
            </h2>
            <p className="font-body text-muted-foreground leading-[2] text-sm md:text-base max-w-2xl mx-auto">
              {t("availability.desc")}
            </p>
            <button
              type="button"
              onClick={() => setPaymentOpen(true)}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 border border-foreground/20 font-body text-[10px] tracking-[0.3em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <FileText size={14} strokeWidth={1.5} aria-hidden="true" />
              {t("availability.paymentTerms")}
            </button>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <select
                value={filterBuilding}
                onChange={(e) => setFilterBuilding(e.target.value)}
                aria-label={t("availability.building")}
                className="px-4 py-2.5 bg-transparent border border-border font-body text-[11px] tracking-[0.15em] uppercase text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
              >
                <option value="all">{t("availability.allBuildings")}</option>
                <option value="A">{t("availability.building")} A</option>
                <option value="B">{t("availability.building")} B</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                aria-label={t("availability.col.type")}
                className="px-4 py-2.5 bg-transparent border border-border font-body text-[11px] tracking-[0.15em] uppercase text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
              >
                <option value="all">{t("availability.allTypes")}</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
              </select>
            </div>
          </AnimatedSection>

          {/* Desktop table */}
          <AnimatedSection delay={0.2} className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    {["id", "building", "floor", "type", "area", "orientation", "parking", "status"].map((col) => (
                      <th
                        key={col}
                        className="py-4 px-3 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium"
                      >
                        {t(`availability.col.${col}`)}
                      </th>
                    ))}
                    <th className="py-4 px-3 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      {t("availability.col.price")}
                    </th>
                    <th className="py-4 px-3 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      {t("availability.col.floorPlan")}
                    </th>
                    <th className="py-4 px-3 font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((unit) => {
                    const status = getStatus(unit);
                    const isReserved = status === "reserved";
                    return (
                    <tr key={unit.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-3 font-body text-sm text-foreground font-medium">{unit.id}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{t("availability.building")} {unit.building}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{floorLabel(unit.floor)}</td>
                      <td className="py-4 px-3 font-body text-sm text-foreground font-medium">{unit.type}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.area}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.orientation}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.parking}</td>
                      <td className="py-4 px-3">
                        <span
                          className={`inline-block px-3 py-1 font-body text-[10px] tracking-[0.15em] uppercase ${
                            isReserved
                              ? "bg-muted text-muted-foreground"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {isReserved ? t("availability.status.reserved") : t("availability.status.unknown")}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="font-body text-sm text-gold font-medium">
                          {formatPrice(getUnitPrice(unit))}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <span className="inline-block px-3 py-1 font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground border border-border/50">
                          {t("availability.floorPlan.soon")}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <button
                          onClick={() => handleReserve(unit)}
                          disabled={isReserved}
                          className="px-4 py-2 bg-gold text-background font-body text-[10px] tracking-[0.15em] uppercase hover:bg-gold/90 transition-colors whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold"
                        >
                          {t("availability.reserve")}
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={11} className="py-12 text-center font-body text-sm text-muted-foreground">
                        {t("availability.noResults")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedSection>

          {/* Mobile card layout */}
          <AnimatedSection delay={0.2} className="md:hidden">
            <div className="space-y-4">
              {filtered.map((unit) => {
                const status = getStatus(unit);
                const isReserved = status === "reserved";
                return (
                <div key={unit.id} className="border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-xl text-foreground">{unit.type}</span>
                      <span className="font-body text-xs text-muted-foreground">Ref {unit.id}</span>
                    </div>
                    <span
                      className={`inline-block px-2.5 py-1 font-body text-[9px] tracking-[0.15em] uppercase ${
                        isReserved
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {isReserved ? t("availability.status.reserved") : t("availability.status.unknown")}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.building")}
                      </p>
                      <p className="font-body text-sm text-foreground">{t("availability.building")} {unit.building}</p>
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.floor")}
                      </p>
                      <p className="font-body text-sm text-foreground">{floorLabel(unit.floor)}</p>
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.area")}
                      </p>
                      <p className="font-body text-sm text-foreground">{unit.area}</p>
                    </div>
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.parking")}
                      </p>
                      <p className="font-body text-sm text-foreground">{unit.parking}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.orientation")}
                      </p>
                      <p className="font-body text-sm text-foreground">{unit.orientation}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div>
                      <p className="font-body text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-1">
                        {t("availability.col.price")}
                      </p>
                      <p className="font-heading text-lg text-gold">{formatPrice(getUnitPrice(unit))}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-1 font-body text-[9px] tracking-[0.1em] uppercase text-muted-foreground border border-border/50">
                        {t("availability.floorPlan.soon")}
                      </span>
                      <button
                        onClick={() => handleReserve(unit)}
                        disabled={isReserved}
                        className="px-4 py-2.5 bg-gold text-background font-body text-[10px] tracking-[0.15em] uppercase hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold"
                      >
                        {t("availability.reserve")}
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
              {filtered.length === 0 && (
                <p className="py-12 text-center font-body text-sm text-muted-foreground">
                  {t("availability.noResults")}
                </p>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      <ReservationDialog
        unit={selectedUnit ? { ...selectedUnit, price: getUnitPrice(selectedUnit) } : null}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <PaymentTermsDialog open={paymentOpen} onOpenChange={setPaymentOpen} />
    </section>
  );
};

export default AvailabilitySection;
