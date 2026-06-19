import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Upload, RotateCcw, Loader2 } from "lucide-react";
import { SITE_IMAGES, SITE_IMAGE_SECTIONS } from "@/lib/siteImagesRegistry";
import { useSiteImagesContext } from "@/hooks/useSiteImages";

const MAX_BYTES = 25 * 1024 * 1024; // 25MB

type Row = {
  key: string;
  section: string;
  label: string;
  url: string | null;
  storage_path: string | null;
  alt: string | null;
};

const AdminImagesTab = () => {
  const { map, refresh } = useSiteImagesContext();
  const [rows, setRows] = useState<Record<string, Row>>({});
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_images")
      .select("key, section, label, url, storage_path, alt");
    if (error) {
      toast({ title: "Erro a carregar", description: error.message, variant: "destructive" });
    }
    const byKey: Record<string, Row> = {};
    (data ?? []).forEach((r: any) => { byKey[r.key] = r; });
    setRows(byKey);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const grouped = useMemo(() => {
    return SITE_IMAGE_SECTIONS.map((section) => ({
      section,
      entries: SITE_IMAGES.filter((e) => e.section === section),
    }));
  }, []);

  const handleFile = async (key: string, section: string, label: string, file: File) => {
    if (file.size > MAX_BYTES) {
      toast({ title: "Ficheiro demasiado grande", description: "Máximo 25 MB.", variant: "destructive" });
      return;
    }
    setBusyKey(key);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const safeKey = key.replace(/[^a-z0-9._-]/gi, "-");
      const path = `${safeKey}/${Date.now()}.${ext}`;

      // upload
      const { error: upErr } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: false, contentType: file.type || undefined });
      if (upErr) throw upErr;

      // delete old file if existed
      const prev = rows[key]?.storage_path;

      // upsert row
      const { error: dbErr } = await supabase
        .from("site_images")
        .upsert({
          key,
          section,
          label,
          url: "",
          storage_path: path,
        }, { onConflict: "key" });
      if (dbErr) throw dbErr;

      if (prev && prev !== path) {
        await supabase.storage.from("site-images").remove([prev]);
      }

      toast({ title: "Imagem atualizada", description: label });
      await load();
      await refresh();
    } catch (e: any) {
      toast({ title: "Falha no upload", description: e.message, variant: "destructive" });
    } finally {
      setBusyKey(null);
      const input = inputRefs.current[key];
      if (input) input.value = "";
    }
  };

  const handleReset = async (key: string, label: string) => {
    if (!confirm(`Repor imagem original de "${label}"?`)) return;
    setBusyKey(key);
    try {
      const prev = rows[key]?.storage_path;
      const { error } = await supabase.from("site_images").delete().eq("key", key);
      if (error) throw error;
      if (prev) await supabase.storage.from("site-images").remove([prev]);
      toast({ title: "Reposto", description: `${label} voltou à imagem original.` });
      await load();
      await refresh();
    } catch (e: any) {
      toast({ title: "Falha", description: e.message, variant: "destructive" });
    } finally {
      setBusyKey(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground font-body text-sm py-12 justify-center">
        <Loader2 className="w-4 h-4 animate-spin" /> A carregar…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <p className="font-body text-xs text-muted-foreground">
        Substitua qualquer imagem do site. Os ficheiros originais (no código) servem de fallback —
        carregue em <strong>Repor</strong> para voltar ao original.
      </p>

      {grouped.map(({ section, entries }) => (
        <section key={section} className="space-y-4">
          <h3 className="font-heading text-lg text-foreground border-b border-border pb-2">
            {section}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entries.map((entry) => {
              const row = rows[entry.key];
              const hasOverride = !!row?.storage_path;
              const previewUrl = map[entry.key];
              const isBusy = busyKey === entry.key;

              return (
                <div key={entry.key} className="border border-border rounded-md overflow-hidden bg-background">
                  <div className="relative aspect-[4/3] bg-muted">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={entry.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                        Original
                      </div>
                    )}
                    {hasOverride && (
                      <span className="absolute top-2 right-2 text-[9px] tracking-[0.2em] uppercase bg-gold text-charcoal px-2 py-0.5">
                        Personalizada
                      </span>
                    )}
                  </div>
                  <div className="p-3 space-y-2">
                    <div>
                      <p className="font-body text-sm text-foreground leading-tight">{entry.label}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{entry.key}</p>
                    </div>
                    <Input
                      ref={(el) => { inputRefs.current[entry.key] = el; }}
                      type="file"
                      accept="image/*"
                      disabled={isBusy}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(entry.key, entry.section, entry.label, f);
                      }}
                      className="text-xs"
                    />
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isBusy}
                        onClick={() => inputRefs.current[entry.key]?.click()}
                        className="flex-1"
                      >
                        {isBusy ? (
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        ) : (
                          <Upload className="w-3 h-3 mr-1" />
                        )}
                        Substituir
                      </Button>
                      {hasOverride && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          disabled={isBusy}
                          onClick={() => handleReset(entry.key, entry.label)}
                        >
                          <RotateCcw className="w-3 h-3 mr-1" /> Repor
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default AdminImagesTab;
