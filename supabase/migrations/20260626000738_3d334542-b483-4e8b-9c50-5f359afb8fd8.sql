
CREATE TABLE IF NOT EXISTS public.site_gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_key TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_gallery_images_key_order_idx
  ON public.site_gallery_images (gallery_key, sort_order);

GRANT SELECT ON public.site_gallery_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_gallery_images TO authenticated;
GRANT ALL ON public.site_gallery_images TO service_role;

ALTER TABLE public.site_gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are publicly readable"
  ON public.site_gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert gallery images"
  ON public.site_gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update gallery images"
  ON public.site_gallery_images FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete gallery images"
  ON public.site_gallery_images FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_gallery_images_updated_at
  BEFORE UPDATE ON public.site_gallery_images
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
