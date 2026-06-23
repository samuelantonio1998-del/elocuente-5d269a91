import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const KEY = "show_unit_prices";

export const useShowPrices = () => {
  const [show, setShow] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", KEY)
        .maybeSingle();
      if (!cancelled) {
        setShow(data?.value === false ? false : true);
        setLoading(false);
      }
    })();

    const channel = supabase
      .channel("app_settings_show_prices")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_settings", filter: `key=eq.${KEY}` },
        (payload) => {
          const v = (payload.new as { value?: unknown } | null)?.value;
          setShow(v === false ? false : true);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const update = async (next: boolean) => {
    setShow(next);
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key: KEY, value: next as unknown as never }, { onConflict: "key" });
    if (error) {
      console.error("Failed to update show_unit_prices", error);
    }
  };

  return { showPrices: show, setShowPrices: update, loading };
};
