import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminUnitsTab from "@/components/admin/AdminUnitsTab";
import AdminReservationsTab from "@/components/admin/AdminReservationsTab";
import AdminContactsTab from "@/components/admin/AdminContactsTab";

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("units");

  useEffect(() => {
    document.title = "Admin · Elocuente";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/admin/login", { replace: true });
  }, [loading, user, navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-muted-foreground font-body text-sm">
        A carregar…
      </main>
    );
  }

  if (!user) return null;

  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-heading text-2xl">Sem permissões</h1>
        <p className="font-body text-sm text-muted-foreground max-w-md">
          A conta {user.email} não tem acesso de administrador. Peça a um administrador para
          promover esta conta.
        </p>
        <Button onClick={signOut} variant="outline">Sair</Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              Elocuente
            </p>
            <h1 className="font-heading text-xl text-foreground">Backoffice</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-muted-foreground hidden md:inline">
              {user.email}
            </span>
            <Button onClick={signOut} variant="outline" size="sm">Sair</Button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="units">Fracções</TabsTrigger>
            <TabsTrigger value="reservations">Reservas</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
          </TabsList>
          <TabsContent value="units"><AdminUnitsTab /></TabsContent>
          <TabsContent value="reservations"><AdminReservationsTab /></TabsContent>
          <TabsContent value="contacts"><AdminContactsTab /></TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default AdminDashboard;
