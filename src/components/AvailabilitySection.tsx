import { useEffect, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCurrency } from "@/hooks/useCurrency";
import ReservationDialog from "./ReservationDialog";
import { supabase } from "@/integrations/supabase/client";

type UnitStatus = "unknown" | "reserved";
const PRICE_PER_SQM = 2250;
const MIN_PRICE = 290000;

interface Unit {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  parking: number;
  orientation: string;
  status: UnitStatus;
}

const units: Unit[] = [
  { id: "A01", building: "A", floor: 0, type: "T2", area: "132 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A02", building: "A", floor: 0, type: "T2", area: "130 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A03", building: "A", floor: 0, type: "T2", area: "120 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A04", building: "A", floor: 0, type: "T2", area: "140 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A05", building: "A", floor: 1, type: "T2", area: "133 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A06", building: "A", floor: 1, type: "T2", area: "118 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A07", building: "A", floor: 1, type: "T2", area: "132 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A08", building: "A", floor: 1, type: "T2", area: "138 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A09", building: "A", floor: 2, type: "T2", area: "133 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A10", building: "A", floor: 2, type: "T2", area: "120 m²", parking: 2, orientation: "Norte / Nascente", status: "unknown" },
  { id: "A11", building: "A", floor: 2, type: "T3", area: "260 m²", parking: 2, orientation: "Sul / Poente / Norte", status: "unknown" },
  { id: "B01", building: "B", floor: 0, type: "T2", area: "118 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B02", building: "B", floor: 0, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B03", building: "B", floor: 0, type: "T2", area: "115 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B04", building: "B", floor: 0, type: "T2", area: "122 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B05", building: "B", floor: 1, type: "T2", area: "127 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B06", building: "B", floor: 1, type: "T2", area: "118 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B07", building: "B", floor: 1, type: "T2", area: "112 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B08", building: "B", floor: 1, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B09", building: "B", floor: 2, type: "T2", area: "128 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B10", building: "B", floor: 2, type: "T2", area: "117 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B11", building: "B", floor: 2, type: "T2", area: "122 m²", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B12", building: "B", floor: 2, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "unknown" },
];

const getUnitPrice = (unit: Unit) => Math.max(parseFloat(unit.area) * PRICE_PER_SQM, MIN_PRICE);

const AvailabilitySection = () => {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [filterBuilding, setFilterBuilding] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reservedIds, setReservedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc("get_reserved_unit_ids");
      if (cancelled) return;
      if (error) {
        console.error("Failed to load reserved units", error);
        return;
      }
      setReservedIds(new Set((data ?? []).map((r: { unit_id: string }) => r.unit_id)));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <select
                value={filterBuilding}
                onChange={(e) => setFilterBuilding(e.target.value)}
                className="px-4 py-2.5 bg-transparent border border-border font-body text-[11px] tracking-[0.15em] uppercase text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
              >
                <option value="all">{t("availability.allBuildings")}</option>
                <option value="A">{t("availability.building")} A</option>
                <option value="B">{t("availability.building")} B</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
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
              {filtered.map((unit) => (
                <div key={unit.id} className="border border-border p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-xl text-foreground">{unit.type}</span>
                      <span className="font-body text-xs text-muted-foreground">Ref {unit.id}</span>
                    </div>
                    <span className="inline-block px-2.5 py-1 font-body text-[9px] tracking-[0.15em] uppercase bg-secondary text-secondary-foreground">
                      {t("availability.status.unknown")}
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
                        className="px-4 py-2.5 bg-gold text-background font-body text-[10px] tracking-[0.15em] uppercase hover:bg-gold/90 transition-colors"
                      >
                        {t("availability.reserve")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
    </section>
  );
};

export default AvailabilitySection;
