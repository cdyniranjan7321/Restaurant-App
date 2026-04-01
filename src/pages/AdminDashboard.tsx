import AdminLayout from "@/components/AdminLayout";
import { useMenu } from "@/context/MenuContext";
import { sampleOrders } from "@/data/menuData";
import { DollarSign, ShoppingBag, UtensilsCrossed, TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, change }: { icon: any; label: string; value: string; change: string }) => (
  <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-6 w-6 text-primary" />
      </div>
    </div>
    <p className="mt-3 text-xs text-accent">{change}</p>
  </div>
);

const AdminDashboard = () => {
  const { menuItems } = useMenu();
  const totalRevenue = sampleOrders.reduce((s, o) => s + o.total, 0);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Chef! Here's your overview.</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} change="+12% from last week" />
        <StatCard icon={ShoppingBag} label="Total Orders" value={sampleOrders.length.toString()} change="+5 today" />
        <StatCard icon={UtensilsCrossed} label="Menu Items" value={menuItems.length.toString()} change={`${menuItems.filter(i => i.isAvailable).length} available`} />
        <StatCard icon={TrendingUp} label="Avg. Order" value={`$${(totalRevenue / sampleOrders.length).toFixed(2)}`} change="+8% this month" />
      </div>

      {/* Recent orders */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map(o => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{o.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{o.customerName}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">${o.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      o.status === "delivered" ? "bg-green-100 text-green-800" :
                      o.status === "preparing" ? "bg-amber-100 text-amber-800" :
                      o.status === "ready" ? "bg-blue-100 text-blue-800" :
                      "bg-muted text-muted-foreground"
                    }`}>{o.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
