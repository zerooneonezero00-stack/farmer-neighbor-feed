import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-farm.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(to right, hsla(var(--background) / 0.95), hsla(var(--background) / 0.7)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 backdrop-blur-sm mb-6">
            <Sprout className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">Farm to Your Table</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Connect with
            <span className="block bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Local Farmers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Buy fresh vegetables directly from farmers in your area. 
            No middlemen, just pure, organic goodness delivered with care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="text-lg group"
              onClick={() => navigate(user ? '/' : '/auth')}
            >
              Browse Farmers
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg"
              onClick={() => navigate(user ? '/profile' : '/auth')}
            >
              I'm a Farmer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
