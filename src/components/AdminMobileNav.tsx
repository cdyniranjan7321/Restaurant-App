import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Settings, ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/menu", icon: UtensilsCrossed, label: "Menu Items" },
  { to: "/admin/orders", icon: ClipboardList, label: "Orders" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminMobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-sidebar lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-sidebar-primary" />
          <span className="font-display text-base font-bold text-sidebar-foreground">Rasa Admin</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="text-sidebar-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      {open && (
        <nav className="space-y-1 px-3 pb-4">
          {adminLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                location.pathname === l.to ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <l.icon className="h-4 w-4" /> {l.label}
            </Link>
          ))}
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/50">
            <ArrowLeft className="h-4 w-4" /> Back to Restaurant
          </Link>
        </nav>
      )}
    </div>
  );
};

export default AdminMobileNav;
