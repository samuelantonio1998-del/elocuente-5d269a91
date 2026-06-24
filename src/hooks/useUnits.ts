import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { units as fallback, type Unit, type UnitStatus } from "@/data/units";

export function useUnits() {
  const [units, setUnits] = useState<Unit[]>(fallback);
  const [loading, setLoading] = useState(true);

  const channelRef = useRef<string | null>(null);
  if (!channelRef.current) {
    channelRef.current = `units-changes-${Math.random().toString(36).slice(2, 9)}`;
  }

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const { data, error } = await supabase
        .from("units")
        .select("id,building,floor,type,area,parking,orientation,status,sort_order,price,floor_plan_url,planta_img_path")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (error) {
        console.error("Failed to load units", error);
      } else if (data) {
        setUnits(
          data.map((u: any) => ({
            id: u.id,
            building: u.building,
            floor: u.floor,
            type: u.type,
            area: u.area,
            parking: u.parking,
            orientation: u.orientation,
            status: u.status as UnitStatus,
            price: u.price,
            floorPlanUrl: u.floor_plan_url,
            plantaImgPath: u.planta_img_path,
          }))
        );
      }
      setLoading(false);
    };

    load();

    const channelName = channelRef.current!;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "units" },
        () => load()
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { units, loading };
}
