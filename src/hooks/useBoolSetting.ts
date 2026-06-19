import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useBoolSetting = (key: string, defaultValue = true) => {
  const [value, setValue] = useState<boolean>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("app_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (!cancelled) {
        setValue(data?.value === false ? false : data?.value === true ? true : defaultValue);
        setLoading(false);
      }
    })();

    const channel = supabase
      .channel(`app_settings_${key}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "app_settings", filter: `key=eq.${key}` },
        (payload) => {
          const v = (payload.new as { value?: unknown } | null)?.value;
          setValue(v === false ? false : v === true ? true : defaultValue);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [key, defaultValue]);

  const update = async (next: boolean) => {
    setValue(next);
    const { error } = await supabase
      .from("app_settings")
      .upsert({ key, value: next as unknown as never }, { onConflict: "key" });
    if (error) console.error(`Failed to update ${key}`, error);
  };

  return { value, setValue: update, loading };
};
