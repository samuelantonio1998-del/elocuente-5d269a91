import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";

type UnitStatus = "unknown";

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
  { id: "A08", building: "A", floor: 1, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A09", building: "A", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "A10", building: "A", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "A11", building: "A", floor: 2, type: "T3", area: "—", parking: 2, orientation: "Sul / Norte", status: "unknown" },
  { id: "B01", building: "B", floor: 0, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B02", building: "B", floor: 0, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B03", building: "B", floor: 0, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B04", building: "B", floor: 0, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B05", building: "B", floor: 1, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B06", building: "B", floor: 1, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B07", building: "B", floor: 1, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B08", building: "B", floor: 1, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B09", building: "B", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B10", building: "B", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
  { id: "B11", building: "B", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Sul / Nascente", status: "unknown" },
  { id: "B12", building: "B", floor: 2, type: "T2", area: "—", parking: 2, orientation: "Norte / Poente", status: "unknown" },
];

const AvailabilitySection = () => {
  const { t } = useLanguage();
  const [filterBuilding, setFilterBuilding] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filtered = units.filter((u) => {
    if (filterBuilding !== "all" && u.building !== filterBuilding) return false;
    if (filterType !== "all" && u.type !== filterType) return false;
    return true;
  });

  const floorLabel = (f: number) => (f === 0 ? t("availability.groundFloor") : `${f}º`);

  return (
    <section id="disponibilidades" className="bg-background">
      <div className="py-28 md:py-40 px-8 lg:px-16">
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

          <AnimatedSection delay={0.2}>
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
                    <th className="py-4 px-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((unit) => (
                    <tr key={unit.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-4 px-3 font-body text-sm text-foreground font-medium">{unit.id}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{t("availability.building")} {unit.building}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{floorLabel(unit.floor)}</td>
                      <td className="py-4 px-3 font-body text-sm text-foreground font-medium">{unit.type}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.area}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.orientation}</td>
                      <td className="py-4 px-3 font-body text-sm text-muted-foreground">{unit.parking}</td>
                      <td className="py-4 px-3">
                        <span className="inline-block px-3 py-1 font-body text-[10px] tracking-[0.15em] uppercase bg-secondary text-secondary-foreground">
                          {t("availability.status.unknown")}
                        </span>
                      </td>
                      <td className="py-4 px-3">
                        <a
                          href="#contacto"
                          className="font-body text-[10px] tracking-[0.2em] uppercase text-gold hover:text-foreground transition-colors"
                        >
                          {t("availability.inquire")}
                        </a>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-12 text-center font-body text-sm text-muted-foreground">
                        {t("availability.noResults")}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default AvailabilitySection;
