import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type SiteImagePathState = {
  storagePath: string | null;
  legacyUrl: string | null;
  status: "loading" | "ready";
};

type SiteImagesMap = Record<string, SiteImagePathState>;

type PendingPaths = Record<string, string | null>;

export type ResolvedSiteImage = {
  src: string | null;
  storagePath: string | null;
  renderKey: string;
  isLoading: boolean;
  isResolved: boolean;
  isOverride: boolean;
};

interface SiteImagesContextValue {
  map: SiteImagesMap;
  loaded: boolean;
  revision: number;
  refresh: (pendingPaths?: PendingPaths) => Promise<void>;
}

const SiteImagesContext = createContext<SiteImagesContextValue>({
  map: {},
  loaded: false,
  revision: 0,
  refresh: async () => {},
});

const SIGN_TTL = 60 * 60 * 24; // 24h

export const SiteImagesProvider = ({ children }: { children: ReactNode }) => {
  const [map, setMap] = useState<SiteImagesMap>({});
  const [loaded, setLoaded] = useState(false);
  const [revision, setRevision] = useState(0);

  const load = useCallback(async (pendingPaths?: PendingPaths) => {
    if (pendingPaths) {
      setLoaded(true);
      setMap((prev) => {
        const next = { ...prev };
        Object.entries(pendingPaths).forEach(([key, storagePath]) => {
          next[key] = { storagePath, legacyUrl: null, status: "loading" };
        });
        return next;
      });
    }

    const { data, error } = await supabase
      .from("site_images")
      .select("key, storage_path, url");
    if (error || !data) {
      setLoaded(true);
      return;
    }

    const next: SiteImagesMap = {};

    for (const row of data) {
      if (row.storage_path) {
        next[row.key] = { storagePath: row.storage_path, legacyUrl: null, status: "ready" };
      } else if (row.url) {
        next[row.key] = { storagePath: null, legacyUrl: row.url, status: "ready" };
      }
    }

    if (pendingPaths) {
      Object.entries(pendingPaths).forEach(([key, storagePath]) => {
        const confirmed = next[key]?.storagePath === storagePath;
        if (storagePath && !confirmed) {
          next[key] = { storagePath, legacyUrl: null, status: "loading" };
        } else if (storagePath === null && next[key]?.storagePath) {
          delete next[key];
        }
      });
    }

    setMap(next);
    setLoaded(true);
    setRevision((value) => value + 1);
  }, []);

  useEffect(() => {
    load();
    // refresh every 12h in long sessions to avoid expired signed URLs
    const id = setInterval(load, 1000 * 60 * 60 * 12);
    return () => clearInterval(id);
  }, [load]);

  return (
    <SiteImagesContext.Provider value={{ map, loaded, revision, refresh: load }}>
      {children}
    </SiteImagesContext.Provider>
  );
};

export const useSiteImage = (key: string, fallback: string): ResolvedSiteImage => {
  const { map, loaded, revision } = useContext(SiteImagesContext);
  const entry = map[key];
  const storagePath = entry?.storagePath ?? null;
  const [signed, setSigned] = useState<{
    storagePath: string;
    src: string | null;
    status: "loading" | "ready";
  } | null>(null);

  useEffect(() => {
    if (!loaded || entry?.status === "loading" || !storagePath) return;

    let cancelled = false;
    setSigned((current) =>
      current?.storagePath === storagePath
        ? current
        : { storagePath, src: null, status: "loading" }
    );

    supabase.storage
      .from("site-images")
      .createSignedUrl(storagePath, SIGN_TTL)
      .then(({ data }) => {
        if (!cancelled) {
          setSigned({ storagePath, src: data?.signedUrl ?? null, status: "ready" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [loaded, entry?.status, storagePath, revision]);

  if (!loaded || entry?.status === "loading") {
    return {
      src: null,
      storagePath,
      renderKey: storagePath ?? `${key}:loading`,
      isLoading: true,
      isResolved: false,
      isOverride: !!storagePath,
    };
  }

  if (storagePath) {
    const src = signed?.storagePath === storagePath ? signed.src : null;
    const isResolved = signed?.storagePath === storagePath && signed.status === "ready";

    return {
      src,
      storagePath,
      renderKey: storagePath,
      isLoading: !isResolved,
      isResolved,
      isOverride: true,
    };
  }

  const legacyUrl = entry?.legacyUrl ?? null;
  const src = legacyUrl || fallback || null;

  return {
    src,
    storagePath: null,
    renderKey: legacyUrl ? `${key}:legacy` : `${key}:fallback`,
    isLoading: false,
    isResolved: true,
    isOverride: !!legacyUrl,
  };
};

export const useSiteImagesContext = () => useContext(SiteImagesContext);
