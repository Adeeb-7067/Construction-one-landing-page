-- Vendor signup submissions
CREATE TABLE public.vendor_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vendor_signups ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a signup
CREATE POLICY "Anyone can submit vendor signups"
ON public.vendor_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT/UPDATE/DELETE policies — only admin (service role) can read