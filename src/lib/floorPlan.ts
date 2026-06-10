import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export async function openFloorPlan(path: string) {
  // path may be a full URL (legacy/public) or a storage key inside the floor-plans bucket
  if (/^https?:\/\//i.test(path)) {
    window.open(path, "_blank", "noopener,noreferrer");
    return;
  }
  const { data, error } = await supabase.storage
    .from("floor-plans")
    .createSignedUrl(path, 60 * 60);
  if (error || !data) {
    toast({ title: "Não foi possível abrir a planta", description: error?.message, variant: "destructive" });
    return;
  }
  window.open(data.signedUrl, "_blank", "noopener,noreferrer");
}
