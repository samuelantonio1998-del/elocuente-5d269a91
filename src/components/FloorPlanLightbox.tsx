import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Plus, Minus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  storagePath: string | null;
  unitId?: string;
  open: boolean;
  onClose: () => void;
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const STEP = 0.5;

const FloorPlanLightbox = ({ storagePath, unitId, open, onClose }: Props) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sign URL when opening
  useEffect(() => {
    if (!open || !storagePath) return;
    let cancelled = false;
    setSrc(null);
    setLoading(true);
    setZoom(1);
    supabase.storage
      .from("floor-plans")
      .createSignedUrl(storagePath, 60 * 60)
      .then(({ data }) => {
        if (cancelled) return;
        setSrc(data?.signedUrl ?? null);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, storagePath]);

  // ESC to close + lock body scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, z + STEP));
      if (e.key === "-") setZoom((z) => Math.max(MIN_ZOOM, z - STEP));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const onWheel = (e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    setZoom((z) => {
      const next = z + (e.deltaY < 0 ? STEP : -STEP);
      return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next));
    });
  };

  if (!open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={unitId ? `Planta da fracção ${unitId}` : "Planta"}
    >
      {/* Header controls */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-body text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-white/80">
          {unitId ? `Fracção ${unitId}` : ""}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - STEP))}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Diminuir zoom"
            className="size-9 inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <Minus size={16} strokeWidth={1.5} />
          </button>
          <span className="font-body text-[10px] tracking-[0.2em] text-white/80 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + STEP))}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Aumentar zoom"
            className="size-9 inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <Plus size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="size-9 inline-flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors ml-2"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        ref={scrollRef}
        className="w-full h-full overflow-auto flex items-center justify-center p-6 md:p-16"
        style={{ touchAction: "pinch-zoom" }}
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
      >
        {loading && (
          <Loader2 className="animate-spin text-white/60" size={32} strokeWidth={1.2} />
        )}
        {!loading && src && (
          <img
            key={storagePath || "plan"}
            src={src}
            alt={unitId ? `Planta da fracção ${unitId}` : "Planta"}
            draggable={false}
            className="select-none"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 150ms ease-out",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        )}
        {!loading && !src && (
          <p className="font-body text-sm text-white/70">Não foi possível carregar a planta.</p>
        )}
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default FloorPlanLightbox;
