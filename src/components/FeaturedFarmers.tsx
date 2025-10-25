import { FarmerCard } from "./FarmerCard";

const farmers = [
  {
    name: "Green Valley Farm",
    location: "Portland, OR",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    specialties: ["Organic", "Tomatoes", "Lettuce"]
  },
  {
    name: "Sunrise Orchards",
    location: "Seattle, WA",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
    specialties: ["Berries", "Herbs", "Peppers"]
  },
  {
    name: "Harvest Moon Farm",
    location: "Eugene, OR",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    specialties: ["Root Vegetables", "Squash", "Greens"]
  }
];

export const FeaturedFarmers = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Farmers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet some of our trusted local farmers providing fresh produce to your community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {farmers.map((farmer, index) => (
            <FarmerCard key={index} {...farmer} />
          ))}
        </div>
      </div>
    </section>
  );
};
