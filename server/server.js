// server/server.js (or server/index.js)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON requests

// Basic route (can be removed later if not needed)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Use API routes
app.use('/api/products', productRoutes); // All routes in productRoutes will be prefixed with /api/products
app.use('/api/users', userRoutes);     // All routes in userRoutes will be prefixed with /api/users
app.use('/api/orders', orderRoutes);   // All routes in orderRoutes will be prefixed with /api/orders

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
