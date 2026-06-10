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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Reservation {
  id: string;
  unit_id: string;
  building: string;
  typology: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  price: number;
  created_at: string;
}

const STATUS_OPTIONS = ["pending", "confirmed", "cancelled"];
const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

const AdminReservationsTab = () => {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("id,unit_id,building,typology,first_name,last_name,email,phone,status,price,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows(data as Reservation[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("reservations").update({ status }).eq("id", id);
    if (error) {
      setRows(prev);
      toast({ title: "Erro a actualizar", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Reserva actualizada", description: STATUS_LABEL[status] });
  };

  const remove = async (id: string) => {
    if (!confirm("Eliminar esta reserva?")) return;
    const { error } = await supabase.from("reservations").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro a eliminar", description: error.message, variant: "destructive" });
      return;
    }
    setRows((rs) => rs.filter((r) => r.id !== id));
    toast({ title: "Reserva eliminada" });
  };

  const filtered = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  if (loading) return <p className="text-sm text-muted-foreground">A carregar…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os estados</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} reserva(s)</span>
      </div>

      <div className="border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Fracção</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-[170px]">Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="whitespace-nowrap text-xs">
                  {new Date(r.created_at).toLocaleString("pt-PT")}
                </TableCell>
                <TableCell className="font-medium">{r.unit_id}</TableCell>
                <TableCell>{r.first_name} {r.last_name}</TableCell>
                <TableCell className="text-xs">
                  <div>{r.email}</div>
                  <div className="text-muted-foreground">{r.phone}</div>
                </TableCell>
                <TableCell>{Number(r.price).toLocaleString("pt-PT")} €</TableCell>
                <TableCell>
                  <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Sem reservas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminReservationsTab;
