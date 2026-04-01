export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  isPopular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "preparing" | "ready" | "delivered";
  customerName: string;
  date: string;
}

export const categories = ["All", "Starters", "Mains", "Pasta", "Desserts", "Drinks"];

export const initialMenuItems: MenuItem[] = [
  { id: "1", name: "Bruschetta al Pomodoro", description: "Toasted ciabatta with fresh tomatoes, basil, garlic & extra virgin olive oil", price: 12.5, category: "Starters", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop", isAvailable: true, isPopular: true },
  { id: "2", name: "Carpaccio di Manzo", description: "Thinly sliced raw beef with arugula, parmesan & truffle oil", price: 16.0, category: "Starters", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", isAvailable: true },
  { id: "3", name: "Grilled Ribeye Steak", description: "12oz prime ribeye with roasted vegetables & red wine jus", price: 38.0, category: "Mains", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop", isAvailable: true, isPopular: true },
  { id: "4", name: "Pan-Seared Salmon", description: "Atlantic salmon with asparagus, lemon butter & dill sauce", price: 32.0, category: "Mains", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", isAvailable: true },
  { id: "5", name: "Lamb Shank Osso Buco", description: "Slow-braised lamb shank with gremolata & saffron risotto", price: 36.0, category: "Mains", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop", isAvailable: true, isPopular: true },
  { id: "6", name: "Tagliatelle al Tartufo", description: "Fresh egg pasta with black truffle, butter & parmesan", price: 28.0, category: "Pasta", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop", isAvailable: true },
  { id: "7", name: "Lobster Linguine", description: "Linguine with lobster tail, cherry tomatoes & white wine", price: 34.0, category: "Pasta", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop", isAvailable: true },
  { id: "8", name: "Tiramisu Classico", description: "Traditional Italian tiramisu with mascarpone & espresso", price: 14.0, category: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop", isAvailable: true, isPopular: true },
  { id: "9", name: "Panna Cotta", description: "Vanilla bean panna cotta with mixed berry compote", price: 12.0, category: "Desserts", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop", isAvailable: true },
  { id: "10", name: "Espresso Martini", description: "Vodka, Kahlúa, fresh espresso & vanilla syrup", price: 16.0, category: "Drinks", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop", isAvailable: true },
  { id: "11", name: "Negroni", description: "Gin, Campari & sweet vermouth with orange peel", price: 14.0, category: "Drinks", image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400&h=300&fit=crop", isAvailable: true },
  { id: "12", name: "Roasted Duck Breast", description: "Duck breast with cherry reduction, fondant potato & green beans", price: 35.0, category: "Mains", image: "https://images.unsplash.com/photo-1432139509613-5c4255a1d996?w=400&h=300&fit=crop", isAvailable: false },
];

export const sampleOrders: Order[] = [
  { id: "ORD-001", items: [{ ...initialMenuItems[0], quantity: 2 }, { ...initialMenuItems[2], quantity: 1 }], total: 63.0, status: "preparing", customerName: "John Smith", date: "2026-03-29 19:30" },
  { id: "ORD-002", items: [{ ...initialMenuItems[5], quantity: 1 }, { ...initialMenuItems[7], quantity: 2 }], total: 56.0, status: "pending", customerName: "Emma Wilson", date: "2026-03-29 19:45" },
  { id: "ORD-003", items: [{ ...initialMenuItems[3], quantity: 1 }, { ...initialMenuItems[9], quantity: 1 }], total: 48.0, status: "ready", customerName: "Michael Brown", date: "2026-03-29 18:15" },
  { id: "ORD-004", items: [{ ...initialMenuItems[4], quantity: 2 }], total: 72.0, status: "delivered", customerName: "Sarah Davis", date: "2026-03-29 17:00" },
];
