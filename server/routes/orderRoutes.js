const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'No products in order.' });
    }
    const order = new Order({
      user: user || null, // If user is not provided, set as null
      products,
      totalAmount,
      status: 'pending',
      orderDate: new Date()
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
