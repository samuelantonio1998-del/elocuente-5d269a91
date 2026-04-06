CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_id TEXT NOT NULL,
  building TEXT NOT NULL,
  floor INTEGER NOT NULL,
  typology TEXT NOT NULL,
  area TEXT NOT NULL,
  orientation TEXT NOT NULL,
  parking INTEGER NOT NULL DEFAULT 2,
  price NUMERIC NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company_name TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT,
  nif TEXT,
  iban TEXT,
  bank_entity TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a reservation"
  ON public.reservations FOR INSERT WITH CHECK (true);

CREATE POLICY "Reservations are not publicly readable"
  ON public.reservations FOR SELECT USING (false);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();