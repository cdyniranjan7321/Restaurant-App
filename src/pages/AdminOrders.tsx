import AdminLayout from "@/components/AdminLayout";
import { sampleOrders } from "@/data/menuData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AdminOrders = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? sampleOrders : sampleOrders.filter(o => o.status === filter);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">{sampleOrders.length} total orders</p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Filter" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="preparing">Preparing</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filtered.map(order => (
          <div key={order.id} className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{order.id}</h3>
                <p className="text-sm text-muted-foreground">{order.customerName} · {order.date}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                order.status === "delivered" ? "bg-green-100 text-green-800" :
                order.status === "preparing" ? "bg-amber-100 text-amber-800" :
                order.status === "ready" ? "bg-blue-100 text-blue-800" :
                "bg-muted text-muted-foreground"
              }`}>{order.status}</span>
            </div>
            <div className="mb-4 space-y-2">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">{item.quantity}x {item.name}</span>
                  <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-lg font-bold text-foreground">Total: ${order.total.toFixed(2)}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Update Status</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
