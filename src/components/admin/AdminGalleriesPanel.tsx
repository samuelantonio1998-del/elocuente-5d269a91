import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Upload, Loader2, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { SITE_GALLERIES, SITE_GALLERY_SECTIONS } from "@/lib/siteGalleriesRegistry";

const MAX_BYTES = 25 * 1024 * 1024;
const SIGN_TTL = 60 * 60 * 24;

type GalleryRow = {
  id: string;
  gallery_key: string;
  storage_path: string;
  sort_order: number;
  alt_text: string | null;
};

type Thumb = { url: string | null; loading: boolean };

const GalleryCard = ({
  galleryKey,
  label,
  section,
}: {
  galleryKey: string;
  label: string;
  section: string;
}) => {
  const [rows, setRows] = useState<GalleryRow[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, Thumb>>({});
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const refreshThumbs = useCallback(async (data: GalleryRow[]) => {
    const paths = data.map((r) => r.storage_path);
    if (!paths.length) {
      setThumbs({});
      return;
    }
    const { data: signed } = await supabase.storage
      .from("site-images")
      .createSignedUrls(paths, SIGN_TTL);
    const map: Record<string, Thumb> = {};
    (signed ?? []).forEach((s, i) => {
      map[paths[i]] = { url: s.signedUrl ?? null, loading: false };
    });
    setThumbs(map);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await (supabase as any)
      .from("site_gallery_images")
      .select("id, gallery_key, storage_path, sort_order, alt_text")
      .eq("gallery_key", galleryKey)
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Erro a carregar", description: error.message, variant: "destructive" });
    }
    const list = (data ?? []) as GalleryRow[];
    setRows(list);
    await refreshThumbs(list);
    setLoading(false);
  }, [galleryKey, refreshThumbs]);

  useEffect(() => {
    load();
  }, [load]);

  const handleFiles = async (files: FileList) => {
    setBusy(true);
    const baseOrder = rows.length
      ? Math.max(...rows.map((r) => r.sort_order)) + 1
      : 0;
    let order = baseOrder;
    const failures: string[] = [];

    for (const file of Array.from(files)) {
      if (file.size > MAX_BYTES) {
        failures.push(`${file.name} (>25MB)`);
        continue;
      }
      try {
        const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
        const path = `gallery/${galleryKey}/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("site-images")
          .upload(path, file, { upsert: false, contentType: file.type || undefined });
        if (upErr) throw upErr;
        const { error: dbErr } = await (supabase as any)
          .from("site_gallery_images")
          .insert({ gallery_key: galleryKey, storage_path: path, sort_order: order });
        if (dbErr) throw dbErr;
        order += 1;
      } catch (e: any) {
        failures.push(`${file.name}: ${e.message}`);
      }
    }

    if (failures.length) {
      toast({
        title: "Alguns ficheiros falharam",
        description: failures.join("\n"),
        variant: "destructive",
      });
    } else {
      toast({ title: "Imagens adicionadas", description: label });
    }
    await load();
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = async (row: GalleryRow) => {
    if (!confirm("Remover esta imagem da galeria?")) return;
    setBusy(true);
    try {
      const { error } = await (supabase as any)
        .from("site_gallery_images")
        .delete()
        .eq("id", row.id);
      if (error) throw error;
      await supabase.storage.from("site-images").remove([row.storage_path]);
      await load();
    } catch (e: any) {
      toast({ title: "Falha", description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    setBusy(true);
    const a = rows[index];
    const b = rows[target];
    try {
      // Swap sort_order. Use temporary value to avoid unique-like collisions if any.
      await (supabase as any).from("site_gallery_images").update({ sort_order: -1 }).eq("id", a.id);
      await (supabase as any).from("site_gallery_images").update({ sort_order: a.sort_order }).eq("id", b.id);
      await (supabase as any).from("site_gallery_images").update({ sort_order: b.sort_order }).eq("id", a.id);
      await load();
    } catch (e: any) {
      toast({ title: "Falha a reordenar", description: e.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-border rounded-md bg-background p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-body text-sm text-foreground">{label}</p>
          <p className="font-mono text-[10px] text-muted-foreground">{galleryKey}</p>
          <p className="font-body text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            {section}
          </p>
        </div>
        <div>
          <Input
            ref={inputRef}
            type="file"
            multiple
            accept="image/*"
            disabled={busy}
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {busy ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Upload className="w-3 h-3 mr-1" />}
            Adicionar
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground font-body text-xs py-6 justify-center">
          <Loader2 className="w-3 h-3 animate-spin" /> A carregar…
        </div>
      ) : rows.length === 0 ? (
        <p className="font-body text-xs text-muted-foreground py-6 text-center">
          Sem imagens — adicione as primeiras.
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {rows.map((row, i) => {
            const thumb = thumbs[row.storage_path];
            return (
              <li key={row.id} className="relative border border-border rounded overflow-hidden bg-muted">
                <div className="aspect-square bg-muted">
                  {thumb?.url ? (
                    <img
                      key={row.storage_path}
                      src={thumb.url}
                      alt={row.alt_text ?? label}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[9px] text-muted-foreground">
                      …
                    </div>
                  )}
                </div>
                <div className="absolute top-1 left-1 flex gap-1">
                  <button
                    type="button"
                    disabled={busy || i === 0}
                    onClick={() => move(i, -1)}
                    className="bg-background/80 hover:bg-background disabled:opacity-40 rounded p-1"
                    aria-label="Mover para cima"
                  >
                    <ArrowUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={busy || i === rows.length - 1}
                    onClick={() => move(i, 1)}
                    className="bg-background/80 hover:bg-background disabled:opacity-40 rounded p-1"
                    aria-label="Mover para baixo"
                  >
                    <ArrowDown className="w-3 h-3" />
                  </button>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => handleRemove(row)}
                  className="absolute top-1 right-1 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded p-1"
                  aria-label="Remover"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <span className="absolute bottom-1 right-1 bg-background/80 rounded px-1 text-[9px] font-mono">
                  #{i + 1}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const AdminGalleriesPanel = () => {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-heading text-xl text-foreground">Galerias</h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Secções com várias imagens. Carregue, remova e reordene. As imagens só ficam visíveis no
          site público quando ligarmos cada galeria à respetiva secção (etapa seguinte).
        </p>
      </div>

      {SITE_GALLERY_SECTIONS.map((section) => (
        <section key={section} className="space-y-4">
          <h3 className="font-heading text-lg text-foreground border-b border-border pb-2">
            {section}
          </h3>
          <div className="space-y-4">
            {SITE_GALLERIES.filter((g) => g.section === section).map((g) => (
              <GalleryCard
                key={g.key}
                galleryKey={g.key}
                label={g.label}
                section={g.section}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AdminGalleriesPanel;
