CREATE POLICY "Floor plans are publicly readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'floor-plans');

CREATE POLICY "Admins can upload floor plans"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'floor-plans' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update floor plans"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'floor-plans' AND has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'floor-plans' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete floor plans"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'floor-plans' AND has_role(auth.uid(), 'admin'));