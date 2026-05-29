import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export type SelectorStatus = "available" | "reserved" | "sold" | "soon";

export interface SelectorUnit {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  status: SelectorStatus;
}

interface BuildingSelectorProps {
  units: SelectorUnit[];
  activeBuilding: "A" | "B";
  onBuildingChange: (b: "A" | "B") => void;
  onUnitClick: (unitId: string) => void;
  highlightType?: string; // "all" | "T2" | "T3"
}

const statusFill: Record<SelectorStatus, string> = {
  available: "hsl(var(--sage))",
  reserved: "hsl(var(--brass))",
  sold: "hsl(var(--muted-foreground) / 0.4)",
  soon: "transparent",
};

const statusStroke: Record<SelectorStatus, string> = {
  available: "hsl(var(--sage))",
  reserved: "hsl(var(--brass))",
  sold: "hsl(var(--muted-foreground) / 0.5)",
  soon: "hsl(var(--foreground) / 0.45)",
};

const BuildingSelector = ({
  units,
  activeBuilding,
  onBuildingChange,
  onUnitClick,
  highlightType = "all",
}: BuildingSelectorProps) => {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<SelectorUnit | null>(null);

  const buildingUnits = units.filter((u) => u.building === activeBuilding);
  // Group by floor, descending (top floor first visually)
  const floors = [2, 1, 0];
  const floorLabel = (f: number) => (f === 0 ? t("availability.groundFloor") : `${f}º`);

  // Layout constants
  const W = 720;
  const padX = 60;
  const floorH = 110;
  const floorGap = 14;
  const headerH = 36;
  const totalH = headerH + floors.length * (floorH + floorGap);

  const buttons: Array<{ key: "A" | "B"; label: string }> = [
    { key: "A", label: t("selector.buildingA") },
    { key: "B", label: t("selector.buildingB") },
  ];

  return (
    <div className="w-full">
      {/* Building toggle */}
      <div className="flex justify-center gap-1 mb-8">
        {buttons.map((b) => (
          <button
            key={b.key}
            onClick={() => onBuildingChange(b.key)}
            className={`px-8 py-3 font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-300 border ${
              activeBuilding === b.key
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
        {[
          { k: "available", color: statusFill.available, dashed: false },
          { k: "reserved", color: statusFill.reserved, dashed: false },
          { k: "sold", color: statusFill.sold, dashed: false },
          { k: "soon", color: "transparent", dashed: true },
        ].map((item) => (
          <div key={item.k} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4"
              style={{
                background: item.color,
                border: `1px ${item.dashed ? "dashed" : "solid"} ${
                  statusStroke[item.k as SelectorStatus]
                }`,
              }}
            />
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              {t(`selector.legend.${item.k}`)}
            </span>
          </div>
        ))}
      </div>

      {/* SVG schematic */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${totalH}`}
          className="w-full h-auto block mx-auto max-w-3xl"
          role="img"
          aria-label={`${t("selector.buildingA")} schematic`}
        >
          {/* Building frame */}
          <rect
            x={padX - 18}
            y={headerH - 8}
            width={W - 2 * (padX - 18)}
            height={floors.length * (floorH + floorGap) - floorGap + 16}
            fill="hsl(var(--cream-dark) / 0.5)"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />

          {/* Rooftop */}
          <line
            x1={padX - 28}
            x2={W - padX + 28}
            y1={headerH - 14}
            y2={headerH - 14}
            stroke="hsl(var(--foreground) / 0.5)"
            strokeWidth={1}
          />

          {floors.map((f, fi) => {
            const floorUnits = buildingUnits
              .filter((u) => u.floor === f)
              .sort((a, b) => a.id.localeCompare(b.id));
            const yTop = headerH + fi * (floorH + floorGap);
            const innerW = W - 2 * padX;
            const cellW = floorUnits.length > 0 ? innerW / floorUnits.length : innerW;

            return (
              <g key={f}>
                {/* Floor label */}
                <text
                  x={padX - 30}
                  y={yTop + floorH / 2 + 4}
                  textAnchor="end"
                  className="font-body"
                  fill="hsl(var(--muted-foreground))"
                  fontSize={11}
                  letterSpacing={1.6}
                >
                  {floorLabel(f).toUpperCase()}
                </text>

                {/* Floor baseline */}
                <line
                  x1={padX}
                  x2={W - padX}
                  y1={yTop + floorH}
                  y2={yTop + floorH}
                  stroke="hsl(var(--border))"
                  strokeWidth={1}
                />

                {floorUnits.map((u, ui) => {
                  const x = padX + ui * cellW + 4;
                  const w = cellW - 8;
                  const dimmed =
                    highlightType !== "all" && u.type !== highlightType;
                  const fill = statusFill[u.status];
                  const stroke = statusStroke[u.status];
                  const dashed = u.status === "soon";
                  return (
                    <g
                      key={u.id}
                      style={{ cursor: "pointer", opacity: dimmed ? 0.25 : 1 }}
                      onClick={() => onUnitClick(u.id)}
                      onMouseEnter={() => setHovered(u)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <rect
                        x={x}
                        y={yTop + 8}
                        width={w}
                        height={floorH - 16}
                        fill={fill}
                        fillOpacity={u.status === "available" ? 0.35 : u.status === "reserved" ? 0.55 : 1}
                        stroke={stroke}
                        strokeWidth={hovered?.id === u.id ? 2 : 1}
                        strokeDasharray={dashed ? "4 3" : undefined}
                      />
                      <text
                        x={x + w / 2}
                        y={yTop + floorH / 2 - 2}
                        textAnchor="middle"
                        fill="hsl(var(--foreground))"
                        fontSize={13}
                        className="font-body"
                        style={{ pointerEvents: "none" }}
                      >
                        {u.id}
                      </text>
                      <text
                        x={x + w / 2}
                        y={yTop + floorH / 2 + 14}
                        textAnchor="middle"
                        fill="hsl(var(--muted-foreground))"
                        fontSize={10}
                        letterSpacing={1.2}
                        className="font-body"
                        style={{ pointerEvents: "none" }}
                      >
                        {u.type} · {u.area}
                      </text>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Ground line */}
          <line
            x1={padX - 40}
            x2={W - padX + 40}
            y1={totalH - 2}
            y2={totalH - 2}
            stroke="hsl(var(--foreground) / 0.4)"
            strokeWidth={1}
          />
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 font-body text-[10px] tracking-[0.2em] uppercase"
            >
              {hovered.id} · {hovered.type} · {hovered.area}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuildingSelector;
