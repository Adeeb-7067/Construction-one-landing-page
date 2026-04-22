-- Add length + format constraints to harden against abuse
ALTER TABLE public.vendor_signups
  ADD CONSTRAINT vendor_signups_business_name_len CHECK (char_length(business_name) BETWEEN 2 AND 120),
  ADD CONSTRAINT vendor_signups_contact_name_len CHECK (char_length(contact_name) BETWEEN 2 AND 80),
  ADD CONSTRAINT vendor_signups_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND char_length(email) <= 255),
  ADD CONSTRAINT vendor_signups_phone_len CHECK (char_length(phone) BETWEEN 7 AND 20),
  ADD CONSTRAINT vendor_signups_city_len CHECK (char_length(city) BETWEEN 2 AND 80),
  ADD CONSTRAINT vendor_signups_category_valid CHECK (category IN ('cement','steel','bricks','sand','tiles','plumbing','electrical','tools','paints','other')),
  ADD CONSTRAINT vendor_signups_message_len CHECK (message IS NULL OR char_length(message) <= 1000);

-- Replace the always-true insert policy with one that enforces validation explicitly
DROP POLICY IF EXISTS "Anyone can submit vendor signups" ON public.vendor_signups;

CREATE POLICY "Anyone can submit valid vendor signups"
ON public.vendor_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(business_name) BETWEEN 2 AND 120
  AND char_length(contact_name) BETWEEN 2 AND 80
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(email) <= 255
  AND char_length(phone) BETWEEN 7 AND 20
  AND char_length(city) BETWEEN 2 AND 80
  AND category IN ('cement','steel','bricks','sand','tiles','plumbing','electrical','tools','paints','other')
  AND (message IS NULL OR char_length(message) <= 1000)
);