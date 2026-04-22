
DROP POLICY IF EXISTS "Public can read reserved unit ids" ON public.reservations;
DROP VIEW IF EXISTS public.reserved_units;

CREATE OR REPLACE FUNCTION public.get_reserved_unit_ids()
RETURNS TABLE(unit_id text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT r.unit_id FROM public.reservations r;
$$;

GRANT EXECUTE ON FUNCTION public.get_reserved_unit_ids() TO anon, authenticated;
