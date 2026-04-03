const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Create order
  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.order;
  },

  // Get all orders
  getOrders: async (status = 'all') => {
    const response = await fetch(`${API_BASE_URL}/orders?status=${status}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.orders;
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.order;
  },

  // Get single order
  getOrder: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.order;
  },

  // Track order by orderId
  trackOrder: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/track/${orderId}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.order;
  },

  // Delete order
  deleteOrder: async (orderId) => {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data;
  },

  // Get admin stats
  getAdminStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);
    const data = await response.json();
    if (!data.success) throw new Error(data.error);
    return data.stats;
  }
};