const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create new order
router.post('/orders', async (req, res) => {
  try {
    const { items, subtotal, tax, total, customerName, customerEmail } = req.body;
    
    // Generate unique order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    const order = new Order({
      orderId,
      items,
      subtotal,
      tax,
      total,
      customerName: customerName || 'Guest User',
      customerEmail: customerEmail || ''
    });
    
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all orders
router.get('/orders', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single order
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;