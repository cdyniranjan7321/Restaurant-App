import UserNavbar from "@/components/UserNavbar";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed successfully! 🎉");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <UserNavbar />
        <div className="flex flex-col items-center justify-center py-32">
          <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Start adding some delicious items!</p>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/menu">Browse Menu</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <UserNavbar />
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Your Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-card p-4 shadow-sm">
                <img src={item.image} alt={item.name} className="h-24 w-24 rounded-md object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="text-lg font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border border-border bg-card p-6 shadow-warm">
            <h2 className="mb-4 font-display text-xl font-semibold text-foreground">Order Summary</h2>
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between text-sm text-muted-foreground">
              <span>Tax (10%)</span><span>${(total * 0.1).toFixed(2)}</span>
            </div>
            <div className="my-4 border-t border-border" />
            <div className="mb-6 flex justify-between text-lg font-bold text-foreground">
              <span>Total</span><span>${(total * 1.1).toFixed(2)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold" size="lg">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
