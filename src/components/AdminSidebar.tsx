import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Settings, ArrowLeft } from "lucide-react";

const adminLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/menu", icon: UtensilsCrossed, label: "Menu Items" },
  { to: "/admin/orders", icon: ClipboardList, label: "Orders" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-5">
        <UtensilsCrossed className="h-6 w-6 text-sidebar-primary" />
        <span className="font-display text-lg font-bold text-sidebar-foreground">Rasa</span>
        <span className="ml-1 rounded bg-sidebar-accent px-2 py-0.5 text-[10px] font-semibold text-sidebar-primary">ADMIN</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminLinks.map(l => {
          const active = location.pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
              }`}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border px-3 py-4">
        <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Restaurant
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
