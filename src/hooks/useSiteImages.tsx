import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteImagesMap = Record<string, string>;

interface SiteImagesContextValue {
  map: SiteImagesMap;
  refresh: () => Promise<void>;
}

const SiteImagesContext = createContext<SiteImagesContextValue>({
  map: {},
  refresh: async () => {},
});

const SIGN_TTL = 60 * 60 * 24; // 24h

export const SiteImagesProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<SiteImagesMap>({});

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("site_images")
      .select("key, storage_path, url");
    if (error || !data) return;

    const next: SiteImagesMap = {};
    const toSign: { key: string; path: string }[] = [];

    for (const row of data) {
      if (row.storage_path) {
        toSign.push({ key: row.key, path: row.storage_path });
      } else if (row.url) {
        next[row.key] = row.url;
      }
    }

    if (toSign.length > 0) {
      const { data: signed } = await supabase.storage
        .from("site-images")
        .createSignedUrls(
          toSign.map((s) => s.path),
          SIGN_TTL
        );
      if (signed) {
        toSign.forEach((s) => {
          const found = signed.find((x) => x.path === s.path);
          if (found?.signedUrl) next[s.key] = found.signedUrl;
        });
      }
    }

    setMap(next);
  }, []);

  useEffect(() => {
    load();
    // refresh every 12h in long sessions to avoid expired signed URLs
    const id = setInterval(load, 1000 * 60 * 60 * 12);
    return () => clearInterval(id);
  }, [load]);

  return (
    <SiteImagesContext.Provider value={{ map, refresh: load }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImage = (key: string, fallback: string): string => {
  const { map } = useContext(SiteImagesContext);
  return map[key] ?? fallback;
};

export const useSiteImagesContext = () => useContext(SiteImagesContext);
