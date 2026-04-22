-- Create contact_leads table to store contact form submissions
CREATE TABLE public.contact_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  typology TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact form
CREATE POLICY "Anyone can create a contact lead"
ON public.contact_leads
FOR INSERT
TO public
WITH CHECK (true);

-- Contact leads are not publicly readable (admin-only via service role)
CREATE POLICY "Contact leads are not publicly readable"
ON public.contact_leads
FOR SELECT
TO public
USING (false);