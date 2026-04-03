const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
// MongoDB config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nbjez6j.mongodb.net/?appName=Cluster0`;
// IMPORTANT: Replace <db_password> with your actual password

// Create a MongoClient with a MongoClientOptions object
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
let ordersCollection;

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas!");
    
    // Get reference to your database and collection
    db = client.db("Rasa_Restaurant_App"); // Create/use this database
    ordersCollection = db.collection("orders");
    
    // Create indexes for better query performance
    await ordersCollection.createIndex({ orderId: 1 });
    await ordersCollection.createIndex({ status: 1 });
    await ordersCollection.createIndex({ createdAt: -1 });
    
    console.log("✅ Database and collections ready");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

// Call the connection function
connectToMongoDB();

// ============= API ROUTES =============

// Generate unique order ID
function generateOrderId() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, subtotal, tax, total, customerName, customerEmail } = req.body;
    
    const order = {
      orderId: generateOrderId(),
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: subtotal,
      tax: tax,
      total: total,
      status: 'pending',
      customerName: customerName || 'Guest User',
      customerEmail: customerEmail || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await ordersCollection.insertOne(order);
    
    res.status(201).json({ 
      success: true, 
      order: { ...order, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all orders with optional status filter
app.get('/api/orders', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await ordersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: status,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, order: result });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order by orderId (for customer tracking)
app.get('/api/orders/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await ordersCollection.findOne({ orderId: orderId });
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error tracking order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete order (admin only)
app.delete('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Dashboard stats
app.get('/api/admin/stats', async (req, res) => {
  try {
    const totalOrders = await ordersCollection.countDocuments();
    const pendingOrders = await ordersCollection.countDocuments({ status: 'pending' });
    const preparingOrders = await ordersCollection.countDocuments({ status: 'preparing' });
    const readyOrders = await ordersCollection.countDocuments({ status: 'ready' });
    const deliveredOrders = await ordersCollection.countDocuments({ status: 'delivered' });
    
    // Get total revenue
    const revenueResult = await ordersCollection.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]).toArray();
    
    const totalRevenue = revenueResult[0]?.total || 0;
    
    res.json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        preparingOrders,
        readyOrders,
        deliveredOrders,
        totalRevenue
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await client.close();
  process.exit(0);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});