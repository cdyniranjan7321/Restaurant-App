import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";

interface Props {
  item: MenuItem;
}

const MenuCard = ({ item }: Props) => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-warm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.isPopular && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Star className="h-3 w-3" /> Popular
          </span>
        )}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <span className="rounded-full bg-background px-4 py-2 text-sm font-semibold text-foreground">Sold Out</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-start justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
          <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        <Button
          onClick={handleAdd}
          disabled={!item.isAvailable}
          size="sm"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-1 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;
