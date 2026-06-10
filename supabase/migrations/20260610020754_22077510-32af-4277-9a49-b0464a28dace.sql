
-- 1. Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 2. Units table
CREATE TABLE public.units (
  id text PRIMARY KEY,
  building text NOT NULL,
  floor integer NOT NULL,
  type text NOT NULL,
  area text NOT NULL,
  parking integer NOT NULL DEFAULT 2,
  orientation text NOT NULL,
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available','reserved','sold')),
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.units TO anon;
GRANT SELECT ON public.units TO authenticated;
GRANT ALL ON public.units TO service_role;

ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Units are publicly readable"
  ON public.units FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert units"
  ON public.units FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update units"
  ON public.units FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete units"
  ON public.units FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
CREATE TRIGGER units_set_updated_at
  BEFORE UPDATE ON public.units
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed 23 units
INSERT INTO public.units (id, building, floor, type, area, parking, orientation, sort_order) VALUES
  ('A01','A',0,'T2','132 m²',2,'Sul / Nascente',1),
  ('A02','A',0,'T2','130 m²',2,'Norte / Poente',2),
  ('A03','A',0,'T2','120 m²',2,'Sul / Nascente',3),
  ('A04','A',0,'T2','140 m²',2,'Norte / Poente',4),
  ('A05','A',1,'T2','133 m²',2,'Sul / Nascente',5),
  ('A06','A',1,'T2','118 m²',2,'Norte / Poente',6),
  ('A07','A',1,'T2','132 m²',2,'Sul / Nascente',7),
  ('A08','A',1,'T2','138 m²',2,'Norte / Poente',8),
  ('A09','A',2,'T2','133 m²',2,'Sul / Nascente',9),
  ('A10','A',2,'T2','120 m²',2,'Norte / Nascente',10),
  ('A11','A',2,'T3','260 m²',2,'Sul / Poente / Norte',11),
  ('B01','B',0,'T2','118 m²',2,'Sul / Nascente',12),
  ('B02','B',0,'T2','119 m²',2,'Norte / Poente',13),
  ('B03','B',0,'T2','115 m²',2,'Sul / Nascente',14),
  ('B04','B',0,'T2','122 m²',2,'Norte / Poente',15),
  ('B05','B',1,'T2','127 m²',2,'Sul / Nascente',16),
  ('B06','B',1,'T2','118 m²',2,'Norte / Poente',17),
  ('B07','B',1,'T2','112 m²',2,'Sul / Nascente',18),
  ('B08','B',1,'T2','119 m²',2,'Norte / Poente',19),
  ('B09','B',2,'T2','128 m²',2,'Sul / Nascente',20),
  ('B10','B',2,'T2','117 m²',2,'Norte / Poente',21),
  ('B11','B',2,'T2','122 m²',2,'Sul / Nascente',22),
  ('B12','B',2,'T2','119 m²',2,'Norte / Poente',23);

-- 3. Admin policies on reservations
CREATE POLICY "Admins can view all reservations"
  ON public.reservations FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update reservations"
  ON public.reservations FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete reservations"
  ON public.reservations FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. Admin policies on contact_leads
CREATE POLICY "Admins can view all contact leads"
  ON public.contact_leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact leads"
  ON public.contact_leads FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 5. Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.units;
ALTER TABLE public.units REPLICA IDENTITY FULL;
