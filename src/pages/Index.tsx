import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedFarmers } from "@/components/FeaturedFarmers";
import { CallToAction } from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedFarmers />
        <CallToAction />
      </main>
    </div>
  );
};

export default Index;
