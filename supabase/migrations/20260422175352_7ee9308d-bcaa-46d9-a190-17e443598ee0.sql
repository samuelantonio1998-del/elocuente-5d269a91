
CREATE OR REPLACE VIEW public.reserved_units
WITH (security_invoker = true)
AS
SELECT DISTINCT unit_id
FROM public.reservations;

GRANT SELECT ON public.reserved_units TO anon, authenticated;

-- Allow public to read unit_id from reservations (needed for security_invoker view)
CREATE POLICY "Public can read reserved unit ids"
ON public.reservations
FOR SELECT
TO public
USING (true);
