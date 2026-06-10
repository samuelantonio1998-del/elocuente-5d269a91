import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  typology: string | null;
  message: string | null;
  created_at: string;
}

const AdminContactsTab = () => {
  const [rows, setRows] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_leads")
      .select("id,name,email,phone,typology,message,created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erro ao carregar", description: error.message, variant: "destructive" });
    } else if (data) {
      setRows(data as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Eliminar este contacto?")) return;
    const { error } = await supabase.from("contact_leads").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro a eliminar", description: error.message, variant: "destructive" });
      return;
    }
    setRows((rs) => rs.filter((r) => r.id !== id));
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.phone, r.message, r.typology]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(s))
    );
  }, [rows, q]);

  if (loading) return <p className="text-sm text-muted-foreground">A carregar…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Pesquisar nome, email, mensagem…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-sm text-muted-foreground">{filtered.length} contacto(s)</span>
      </div>

      <div className="border border-border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Tipologia</TableHead>
              <TableHead>Mensagem</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="whitespace-nowrap text-xs">
                  {new Date(r.created_at).toLocaleString("pt-PT")}
                </TableCell>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.phone || "—"}</TableCell>
                <TableCell>{r.typology || "—"}</TableCell>
                <TableCell className="max-w-[320px] text-xs whitespace-pre-wrap">{r.message || "—"}</TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                  Sem contactos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminContactsTab;
