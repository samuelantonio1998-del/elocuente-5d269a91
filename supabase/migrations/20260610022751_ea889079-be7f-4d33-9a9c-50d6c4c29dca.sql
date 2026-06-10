ALTER TABLE public.units
  ADD COLUMN IF NOT EXISTS price numeric,
  ADD COLUMN IF NOT EXISTS floor_plan_url text;