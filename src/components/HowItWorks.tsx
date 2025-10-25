import { Users, ShoppingBag, Truck } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Find Local Farmers",
    description: "Browse profiles of verified farmers in your area and see what's fresh and available"
  },
  {
    icon: ShoppingBag,
    title: "Order Directly",
    description: "Connect with farmers directly, choose your vegetables, and place your order"
  },
  {
    icon: Truck,
    title: "Get Fresh Produce",
    description: "Receive farm-fresh vegetables delivered to your door or pick up at the farm"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to get fresh, organic vegetables from your local farmers
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className="relative p-8 rounded-2xl bg-card shadow-card hover:shadow-soft transition-all duration-300 border border-border"
              >
                <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-soft">
                  {index + 1}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6 mt-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
