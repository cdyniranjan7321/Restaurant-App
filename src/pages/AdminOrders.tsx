import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Loader2, Eye, Trash2, RefreshCw } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  customerEmail: string;
  createdAt: string;
  updatedAt: string;
}

const AdminOrders = () => {
  const [filter, setFilter] = useState<string>("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders(filter);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await api.getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingStatus(orderId);
    try {
      await api.updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders(); // Refresh the orders list
      fetchStats(); // Refresh stats
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await api.deleteOrder(orderId);
        toast.success('Order deleted successfully');
        fetchOrders(); // Refresh the orders list
        fetchStats(); // Refresh stats
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order');
      }
    }
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "preparing": return "bg-amber-100 text-amber-800";
      case "ready": return "bg-blue-100 text-blue-800";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      preparing: 'Preparing',
      ready: 'Ready for Pickup',
      delivered: 'Delivered'
    };
    return statusMap[status] || status;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading orders...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Preparing</p>
            <p className="text-2xl font-bold text-amber-600">{stats.preparingOrders}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Ready</p>
            <p className="text-2xl font-bold text-blue-600">{stats.readyOrders}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      )}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Orders Management</h1>
          <p className="text-muted-foreground">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              fetchOrders();
              fetchStats();
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {order.orderId}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {order.customerName} • {order.customerEmail && `${order.customerEmail} • `}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusBadge(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="mb-4 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-muted-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-3">
                <div>
                  <span className="text-lg font-bold text-foreground">
                    Total: ${order.total.toFixed(2)}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    Subtotal: ${order.subtotal.toFixed(2)} + Tax: ${order.tax.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Select 
                    value={order.status} 
                    onValueChange={(newStatus) => handleStatusUpdate(order._id, newStatus)}
                    disabled={updatingStatus === order._id}
                  >
                    <SelectTrigger className="w-40">
                      {updatingStatus === order._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SelectValue placeholder="Update Status" />
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="preparing">Preparing</SelectItem>
                      <SelectItem value="ready">Ready for Pickup</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;