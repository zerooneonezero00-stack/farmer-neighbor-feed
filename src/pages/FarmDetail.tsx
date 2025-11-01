import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface Farm {
  id: string;
  farm_name: string;
  description: string;
  location: string;
  rating: number;
  image_url: string;
  specialties: string[];
  farmer_id: string;
}

interface Profile {
  full_name: string;
  email: string;
  phone: string;
}

export default function FarmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farm, setFarm] = useState<Farm | null>(null);
  const [farmer, setFarmer] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFarmDetails();
  }, [id]);

  const fetchFarmDetails = async () => {
    try {
      const { data: farmData, error: farmError } = await supabase
        .from("farms")
        .select("*")
        .eq("id", id)
        .single();

      if (farmError) throw farmError;

      setFarm(farmData);

      const { data: farmerData, error: farmerError } = await supabase
        .from("profiles")
        .select("full_name, email, phone")
        .eq("id", farmData.farmer_id)
        .single();

      if (farmerError) throw farmerError;

      setFarmer(farmerData);
    } catch (error) {
      toast.error("Failed to load farm details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="h-96 rounded-2xl bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  if (!farm) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-xl text-muted-foreground">Farm not found</p>
          <Button onClick={() => navigate("/farms")} className="mt-4">
            Back to Farms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/farms")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Farms
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <img
              src={farm.image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop"}
              alt={farm.farm_name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold">{farm.farm_name}</h1>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-6 h-6 fill-current" />
                <span className="text-2xl font-medium text-foreground">{farm.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{farm.location}</span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {farm.description || "No description available"}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {farm.specialties && farm.specialties.length > 0 ? (
                  farm.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full text-sm font-medium bg-accent text-accent-foreground"
                    >
                      {specialty}
                    </span>
                  ))
                ) : (
                  <p className="text-muted-foreground">No specialties listed</p>
                )}
              </div>
            </div>

            {farmer && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Contact</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Farmer:</strong> {farmer.full_name}</p>
                  <p><strong>Email:</strong> {farmer.email}</p>
                  {farmer.phone && <p><strong>Phone:</strong> {farmer.phone}</p>}
                </div>
              </div>
            )}

            <Button size="lg" className="w-full">
              Contact Farmer
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
