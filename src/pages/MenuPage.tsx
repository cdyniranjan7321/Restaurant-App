import { useState } from "react";
import { categories } from "@/data/menuData";
import { useMenu } from "@/context/MenuContext";
import MenuCard from "@/components/MenuCard";
import UserNavbar from "@/components/UserNavbar";

const MenuPage = () => {
  const { menuItems } = useMenu();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? menuItems : menuItems.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="mb-2 font-display text-4xl font-bold text-foreground">Our Menu</h1>
          <p className="text-muted-foreground">Carefully crafted dishes for every palate</p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-warm"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">No items in this category yet.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
