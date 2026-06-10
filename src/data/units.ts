export type UnitStatus = "available" | "reserved" | "sold";

export const PRICE_PER_SQM = 2250;
export const MIN_PRICE = 290000;

export interface Unit {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  parking: number;
  orientation: string;
  status: UnitStatus;
}

// Fallback list (used only if DB is unreachable). DB is source of truth.
export const units: Unit[] = [
  { id: "A01", building: "A", floor: 0, type: "T2", area: "132 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "A02", building: "A", floor: 0, type: "T3", area: "130 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "A03", building: "A", floor: 0, type: "T2", area: "120 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "A04", building: "A", floor: 0, type: "T2", area: "140 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "A05", building: "A", floor: 1, type: "T2", area: "133 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "A06", building: "A", floor: 1, type: "T2", area: "118 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "A07", building: "A", floor: 1, type: "T2", area: "132 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "A08", building: "A", floor: 1, type: "T2", area: "138 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "A09", building: "A", floor: 2, type: "T2", area: "133 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "A10", building: "A", floor: 2, type: "T2", area: "120 m²", parking: 2, orientation: "Norte / Nascente", status: "available" },
  { id: "A11", building: "A", floor: 2, type: "T3", area: "260 m²", parking: 2, orientation: "Sul / Poente / Norte", status: "available" },
  { id: "B01", building: "B", floor: 0, type: "T2", area: "118 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B02", building: "B", floor: 0, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "B03", building: "B", floor: 0, type: "T2", area: "115 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B04", building: "B", floor: 0, type: "T2", area: "122 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "B05", building: "B", floor: 1, type: "T2", area: "127 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B06", building: "B", floor: 1, type: "T2", area: "118 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "B07", building: "B", floor: 1, type: "T2", area: "112 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B08", building: "B", floor: 1, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "B09", building: "B", floor: 2, type: "T2", area: "128 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B10", building: "B", floor: 2, type: "T2", area: "117 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
  { id: "B11", building: "B", floor: 2, type: "T2", area: "122 m²", parking: 2, orientation: "Sul / Nascente", status: "available" },
  { id: "B12", building: "B", floor: 2, type: "T2", area: "119 m²", parking: 2, orientation: "Norte / Poente", status: "available" },
];

export const getUnitPrice = (unit: Pick<Unit, "area">) =>
  Math.max(parseFloat(unit.area) * PRICE_PER_SQM, MIN_PRICE);
