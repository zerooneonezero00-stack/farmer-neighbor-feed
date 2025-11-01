-- Create farms table
CREATE TABLE public.farms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  farm_name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0.0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Farms are viewable by everyone" 
ON public.farms 
FOR SELECT 
USING (true);

CREATE POLICY "Farmers can create their own farms" 
ON public.farms 
FOR INSERT 
WITH CHECK (auth.uid() = farmer_id);

CREATE POLICY "Farmers can update their own farms" 
ON public.farms 
FOR UPDATE 
USING (auth.uid() = farmer_id);

CREATE POLICY "Farmers can delete their own farms" 
ON public.farms 
FOR DELETE 
USING (auth.uid() = farmer_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_farms_updated_at
BEFORE UPDATE ON public.farms
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();