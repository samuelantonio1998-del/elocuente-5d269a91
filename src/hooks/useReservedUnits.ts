import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useReservedUnits() {
  const [reservedIds, setReservedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.rpc("get_reserved_unit_ids");
      if (cancelled) return;
      if (error) {
        console.error("Failed to load reserved units", error);
        return;
      }
      setReservedIds(new Set((data ?? []).map((r: { unit_id: string }) => r.unit_id)));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return reservedIds;
}
