import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { FarmerCard } from "@/components/FarmerCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Farm {
  id: string;
  farm_name: string;
  location: string;
  rating: number;
  image_url: string;
  specialties: string[];
}

export default function Farms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFarms();
  }, []);

  const fetchFarms = async () => {
    try {
      const { data, error } = await supabase
        .from("farms")
        .select("*")
        .order("rating", { ascending: false });

      if (error) throw error;

      setFarms(data || []);
    } catch (error) {
      toast.error("Failed to load farms");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Browse Local Farms</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover fresh, locally-sourced produce from trusted farmers in your community
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-card animate-pulse" />
            ))}
          </div>
        ) : farms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No farms available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {farms.map((farm) => (
              <div key={farm.id} onClick={() => navigate(`/farms/${farm.id}`)}>
                <FarmerCard
                  name={farm.farm_name}
                  location={farm.location}
                  rating={farm.rating}
                  image={farm.image_url || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop"}
                  specialties={farm.specialties || []}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
