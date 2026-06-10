import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import type { UnitStatus } from "@/data/units";

interface Row {
  id: string;
  building: string;
  floor: number;
  type: string;
  area: string;
  orientation: string;
  status: UnitStatus;
  sort_order: number;
}

const STATUS_OPTIONS: UnitStatus[] = ["available", "reserved", "sold"];
const STATUS_LABEL: Record<UnitStatus, string> = {
  available: "Disponível",
  reserved: "Reservada",
  sold: "Vendida",
};

const AdminUnitsTab = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data, error } = await supabase
      .from("units")
      .select("id,building,floor,type,area,orientation,status,sort_order")
      .order("sort_order", { ascending: true });
    if (error) {
      toast({ title: "Erro ao carregar fracções", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows(data as Row[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: string, status: UnitStatus) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("units").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      toast({ title: "Erro a actualizar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `Fracção ${id} actualizada`, description: STATUS_LABEL[status] });
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">A carregar…</p>;
  }

  return (
    <div className="border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fracção</TableHead>
            <TableHead>Edifício</TableHead>
            <TableHead>Piso</TableHead>
            <TableHead>Tipologia</TableHead>
            <TableHead>ABP</TableHead>
            <TableHead>Orientação</TableHead>
            <TableHead className="w-[180px]">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.id}</TableCell>
              <TableCell>{r.building}</TableCell>
              <TableCell>{r.floor === 0 ? "R/C" : `${r.floor}º`}</TableCell>
              <TableCell>{r.type}</TableCell>
              <TableCell>{r.area}</TableCell>
              <TableCell>{r.orientation}</TableCell>
              <TableCell>
                <Select
                  value={r.status}
                  onValueChange={(v) => updateStatus(r.id, v as UnitStatus)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminUnitsTab;
