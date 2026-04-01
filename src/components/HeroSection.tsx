
import heroDish from "@/assets/hero-dish.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroDish} alt="Fine dining dish" width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-dark opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[85vh] items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4 flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
              <span className="ml-2 text-sm font-medium text-cream-dark">Fine Dining Experience</span>
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-cream md:text-7xl">
              Where Every Bite Tells a <span className="text-gradient-gold">Story</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-cream-dark">
              Experience the art of gastronomy at La Maison. Crafted with passion, served with elegance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                <Link to="/menu">
                  Explore Menu <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream/10">
                <Link to="/menu">Reserve a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
