
import HeroSection from "@/components/HeroSection";
import UserNavbar from "@/components/UserNavbar";
import MenuCard from "@/components/MenuCard";
import { useMenu } from "@/context/MenuContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Leaf, Award } from "lucide-react";

const Index = () => {
  const { menuItems } = useMenu();
  const popular = menuItems.filter(i => i.isPopular).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <HeroSection />

      {/* Features */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto grid gap-8 px-4 sm:grid-cols-3 lg:px-8">
          {[
            { icon: Leaf, title: "Farm to Table", desc: "Locally sourced, seasonal ingredients" },
            { icon: Award, title: "Award Winning", desc: "Michelin-recognized culinary team" },
            { icon: Clock, title: "Daily Specials", desc: "New creations every single day" },
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-4 rounded-lg bg-card p-6 shadow-sm" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* Add after Hero section or before Popular Dishes */}

<section className="relative overflow-hidden bg-gradient-to-r from-primary/90 to-accent/90 py-12">
  <div className="container mx-auto px-4 text-center lg:px-8">
    <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white mb-4">
      Chef's Special
    </span>
    <h2 className="font-display text-3xl font-bold text-white md:text-4xl mb-3">
      {menuItems.find(i => i.isPopular)?.name || "Signature Dish of the Day"}
    </h2>
    <p className="text-white/90 mb-6 max-w-2xl mx-auto">
      {menuItems.find(i => i.isPopular)?.description || "Experience our chef's masterpiece crafted with premium ingredients"}
    </p>
    <Button variant="secondary" asChild>
      <Link to="/menu">Order Now →</Link>
    </Button>
  </div>
</section>

      {/* Popular dishes */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">Popular Dishes</h2>
              <p className="mt-2 text-muted-foreground">Guest favorites you can't miss</p>
            </div>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
              <Link to="/menu">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */} 
<section className="py-16">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
        What Our Guests Say
      </h2>
      <p className="mt-2 text-muted-foreground">Loved by food lovers across the city</p>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        { name: "Sarah Johnson", rating: 5, text: "Amazing ambiance and even better food! The momos are a must-try.", date: "2 days ago" },
        { name: "Mike Chen", rating: 5, text: "Best restaurant in Pokhara! Great service and authentic flavors.", date: "1 week ago" },
        { name: "Priya Sharma", rating: 4, text: "Beautiful presentation and delicious fusion dishes. Will come back!", date: "3 days ago" },
      ].map((review, i) => (
        <div key={i} className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, j) => (
              <span key={j} className={`text-lg ${j < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
            ))}
          </div>
          <p className="text-foreground mb-4">"{review.text}"</p>
          <div>
            <p className="font-semibold text-foreground">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gradient-dark py-12 text-cream">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h3 className="mb-2 font-display text-2xl font-bold">Rasa</h3>
          <p className="mb-4 text-sm text-cream-dark">Pokhara-9 Chipledhunga, kaski District</p>
          <p className="text-xs text-cream-dark">© 2026 Rasa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
