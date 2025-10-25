import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";

interface FarmerCardProps {
  name: string;
  location: string;
  rating: number;
  image: string;
  specialties: string[];
}

export const FarmerCard = ({ name, location, rating, image, specialties }: FarmerCardProps) => {
  return (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {specialties.map((specialty, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <Button className="w-full">View Profile</Button>
      </div>
    </div>
  );
};
