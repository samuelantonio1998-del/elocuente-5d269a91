---
name: Site Images Repository
description: Backoffice tab to swap any site image per section; DB-driven overrides with code asset fallback
type: feature
---
Image management system in the backoffice ("Imagens" tab) that lets the admin replace any site image without code changes.

## Architecture
- **Storage bucket** `site-images` (private) — admin-only write, public read policy on storage.objects.
- **Table** `public.site_images` (key PK, section, label, url, storage_path, alt, updated_at). Public read; admin-only insert/update/delete via `has_role(auth.uid(), 'admin')`.
- **Registry** `src/lib/siteImagesRegistry.ts` — single source of truth for editable image keys/sections/labels.
- **Provider** `SiteImagesProvider` in `src/hooks/useSiteImages.tsx`, wraps app inside `LanguageProvider`. Fetches all rows once + batches `createSignedUrls` (24h TTL, refresh every 12h).
- **Hook** `useSiteImage(key, fallback)` — returns override URL or the imported asset URL as fallback.
- **Admin UI** `src/components/admin/AdminImagesTab.tsx` — grouped by section, preview + upload (25 MB max) + reset button.

## Keys in use
- `hero.main`
- `about.render-1/2/3` (shared by AboutSection + ArchitectureSection)
- `promoter.photo` (replaces placeholder div when set)
- `apartment.1/2`
- `condo.1/2/3`
- `life.1/2`
- `amenities.gardens/parking/balconies/security`

When adding a new editable image: add entry to `SITE_IMAGES` registry and wrap the URL in the component with `useSiteImage("new.key", defaultAsset.url)`.
