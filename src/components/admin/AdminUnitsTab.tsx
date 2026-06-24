import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { getUnitPrice, type UnitStatus } from "@/data/units";
import { useShowPrices } from "@/hooks/useShowPrices";
import { useShowReserve } from "@/hooks/useShowReserve";
import { Switch } from "@/components/ui/switch";
import { Upload, FileText, Trash2, Loader2, Image as ImageIcon } from "lucide-react";

interface Row {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  orientation: string;
  status: UnitStatus;
  sort_order: number;
  price: number | null;
  floor_plan_url: string | null;
  planta_img_path: string | null;
}

const STATUS_OPTIONS: UnitStatus[] = ["available", "reserved", "sold"];
const STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Disponível",
  reserved: "Reservada",
  sold: "Vendida",
};

const eurosFmt = new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const AdminUnitsTab = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadingImgId, setUploadingImgId] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const imgInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const { showPrices, setShowPrices } = useShowPrices();
  const { showReserve, setShowReserve } = useShowReserve();

  const load = async () => {
    const { data, error } = await supabase
      .from("units")
      .select("id,building,floor,type,area,orientation,status,sort_order,price,floor_plan_url,planta_img_path")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Erro ao carregar fracções", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows(data as Row[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const patch = async (id: string, changes: Partial<Row>, optimistic = true) => {
    const prev = rows;
    if (optimistic) setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...changes } : r)));
    const { error } = await supabase.from("units").update(changes as any).eq("id", id);
    if (error) {
      setRows(prev);
      toast({ title: "Erro a actualizar", description: error.message, variant: "destructive" });
      return false;
    }
    return true;
  };

  const updateStatus = async (id: string, status: UnitStatus) => {
    if (await patch(id, { status })) {
      toast({ title: `Fracção ${id} actualizada`, description: STATUS_LABEL[status] });
    }
  };

  const saveArea = async (id: string, areaRaw: string) => {
    const area = areaRaw.trim();
    if (!area) {
      toast({ title: "ABP inválida", variant: "destructive" });
      load();
      return;
    }
    if (await patch(id, { area })) {
      toast({ title: `ABP de ${id} actualizada`, description: area });
    }
  };

  const savePrice = async (id: string, priceRaw: string) => {
    const trimmed = priceRaw.replace(/\s|€/g, "").replace(",", ".").trim();
    let value: number | null = null;
    if (trimmed !== "") {
      const n = Number(trimmed);
      if (!Number.isFinite(n) || n < 0) {
        toast({ title: "Preço inválido", variant: "destructive" });
        load();
        return;
      }
      value = n;
    }
    if (await patch(id, { price: value })) {
      toast({
        title: `Preço de ${id} actualizado`,
        description: value == null ? "Cálculo automático" : eurosFmt.format(value),
      });
    }
  };

  const handleFile = async (id: string, file: File) => {
    if (file.type !== "application/pdf") {
      toast({ title: "Só é permitido PDF", variant: "destructive" });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({ title: "Ficheiro demasiado grande (máx. 20MB)", variant: "destructive" });
      return;
    }
    setUploadingId(id);
    const path = `units/${id}.pdf`;
    const { error: upErr } = await supabase.storage
      .from("floor-plans")
      .upload(path, file, { upsert: true, contentType: "application/pdf" });
    if (upErr) {
      toast({ title: "Erro no upload", description: upErr.message, variant: "destructive" });
      setUploadingId(null);
      return;
    }
    await patch(id, { floor_plan_url: path });
    toast({ title: `Planta de ${id} carregada` });
    setUploadingId(null);
  };

  const openPlan = async (path: string) => {
    const { data, error } = await supabase.storage.from("floor-plans").createSignedUrl(path, 60 * 60);
    if (error || !data) {
      toast({ title: "Erro a abrir", description: error?.message, variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const removePlan = async (id: string, path: string) => {
    if (!confirm(`Remover a planta da fracção ${id}?`)) return;
    await supabase.storage.from("floor-plans").remove([path]);
    await patch(id, { floor_plan_url: null });
    toast({ title: `Planta de ${id} removida` });
  };

  const handleImage = async (id: string, file: File, prevPath: string | null) => {
    if (!/^image\/(jpe?g|png|webp)$/i.test(file.type)) {
      toast({ title: "Só são permitidas imagens (JPEG/PNG/WebP)", variant: "destructive" });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast({ title: "Imagem demasiado grande (máx. 15MB)", variant: "destructive" });
      return;
    }
    setUploadingImgId(id);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `units/${id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("floor-plans")
      .upload(path, file, { upsert: false, contentType: file.type, cacheControl: "3600" });
    if (upErr) {
      toast({ title: "Erro no upload", description: upErr.message, variant: "destructive" });
      setUploadingImgId(null);
      return;
    }
    const ok = await patch(id, { planta_img_path: path });
    if (ok && prevPath && prevPath !== path) {
      await supabase.storage.from("floor-plans").remove([prevPath]);
    }
    toast({ title: `Imagem da planta de ${id} carregada` });
    setUploadingImgId(null);
  };

  const removeImage = async (id: string, path: string) => {
    if (!confirm(`Remover a imagem da planta da fracção ${id}?`)) return;
    await supabase.storage.from("floor-plans").remove([path]);
    await patch(id, { planta_img_path: null });
    toast({ title: `Imagem da planta de ${id} removida` });
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">A carregar…</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 border border-border p-4">
        <div>
          <p className="text-sm font-medium">Mostrar preços no site</p>
          <p className="text-xs text-muted-foreground">
            Quando desativado, a coluna “Valor” fica oculta na página pública de disponibilidades.
          </p>
        </div>
        <Switch
          checked={showPrices}
          onCheckedChange={(v) => {
            setShowPrices(v);
            toast({ title: v ? "Preços visíveis no site" : "Preços ocultos no site" });
          }}
        />
      </div>
      <div className="flex items-center justify-between gap-4 border border-border p-4">
        <div>
          <p className="text-sm font-medium">Mostrar botão de reservar no site</p>
          <p className="text-xs text-muted-foreground">
            Quando desativado, a coluna “Reservar” fica oculta na página pública de disponibilidades.
          </p>
        </div>
        <Switch
          checked={showReserve}
          onCheckedChange={(v) => {
            setShowReserve(v);
            toast({ title: v ? "Botão de reservar visível no site" : "Botão de reservar oculto no site" });
          }}
        />
      </div>
      <div className="border border-border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fracção</TableHead>
            <TableHead>Edif.</TableHead>
            <TableHead>Piso</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="w-[120px]">ABP</TableHead>
            <TableHead className="w-[160px]">Preço (€)</TableHead>
            <TableHead className="w-[220px]">Planta (PDF)</TableHead>
            <TableHead className="w-[240px]">Planta (Imagem)</TableHead>
            <TableHead className="w-[170px]">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const computed = getUnitPrice({ area: r.area, price: null });
            const uploading = uploadingId === r.id;
            const uploadingImg = uploadingImgId === r.id;
            return (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>{r.building}</TableCell>
                <TableCell>{r.floor === 0 ? "R/C" : `${r.floor}º`}</TableCell>
                <TableCell>{r.type}</TableCell>
                <TableCell>
                  <Input
                    defaultValue={r.area}
                    key={`area-${r.id}-${r.area}`}
                    onBlur={(e) => e.target.value !== r.area && saveArea(r.id, e.target.value)}
                    className="h-9"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    step={1000}
                    defaultValue={r.price ?? ""}
                    key={`price-${r.id}-${r.price ?? "auto"}`}
                    placeholder={`auto · ${eurosFmt.format(computed)}`}
                    onBlur={(e) => {
                      const v = e.target.value;
                      const current = r.price == null ? "" : String(r.price);
                      if (v !== current) savePrice(r.id, v);
                    }}
                    className="h-9"
                  />
                </TableCell>
                <TableCell>
                  <input
                    ref={(el) => (fileInputs.current[r.id] = el)}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(r.id, f);
                      e.target.value = "";
                    }}
                  />
                  {r.floor_plan_url ? (
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" onClick={() => openPlan(r.floor_plan_url!)} className="h-8 px-2">
                        <FileText className="size-3.5 mr-1" /> Ver
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => fileInputs.current[r.id]?.click()} disabled={uploading} className="h-8 px-2">
                        {uploading ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removePlan(r.id, r.floor_plan_url!)} className="h-8 px-2 text-destructive">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => fileInputs.current[r.id]?.click()} disabled={uploading} className="h-8">
                      {uploading ? <Loader2 className="size-3.5 mr-1 animate-spin" /> : <Upload className="size-3.5 mr-1" />}
                      Carregar PDF
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <input
                    ref={(el) => (imgInputs.current[r.id] = el)}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImage(r.id, f, r.planta_img_path);
                      e.target.value = "";
                    }}
                  />
                  {r.planta_img_path ? (
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[10px] text-muted-foreground truncate max-w-[110px]" title={r.planta_img_path}>
                        {r.planta_img_path.split("/").pop()}
                      </span>
                      <Button size="sm" variant="outline" onClick={() => imgInputs.current[r.id]?.click()} disabled={uploadingImg} className="h-8 px-2">
                        {uploadingImg ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeImage(r.id, r.planta_img_path!)} className="h-8 px-2 text-destructive">
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => imgInputs.current[r.id]?.click()} disabled={uploadingImg} className="h-8">
                      {uploadingImg ? <Loader2 className="size-3.5 mr-1 animate-spin" /> : <ImageIcon className="size-3.5 mr-1" />}
                      Carregar imagem
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v as UnitStatus)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default AdminUnitsTab;
