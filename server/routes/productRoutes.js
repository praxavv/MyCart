// server/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming your Product model is here

// @desc    Get all products
// @route  GET /api/products
// @access Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get product by ID
// @route  GET /api/products/:id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// @desc    Create a product
// @route  POST /api/products
// @access Private (or Public, depending on your app design)
router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl, countInStock } = req.body;

        // Basic validation (you might want more robust validation)
        if (!name || !description || !price || !countInStock) {
            return res.status(400).json({ message: 'Missing required fields: name, description, price, countInStock' });
        }

        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            countInStock
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ADD THIS PUT ROUTE:
// @desc    Update a product by ID
// @route  PUT /api/products/:id
// @access Private (e.g., admin only)
router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, imageUrl, countInStock } = req.body;
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update product fields. Using '|| product.field' ensures fields not provided in the body
        // retain their original values.
        product.name = name !== undefined ? name : product.name;
        product.description = description !== undefined ? description : product.description;
        product.price = price !== undefined ? price : product.price;
        product.imageUrl = imageUrl !== undefined ? imageUrl : product.imageUrl;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

        const updatedProduct = await product.save(); // Save the updated product

        res.status(200).json(updatedProduct);

    } catch (error) {
        console.error(error);
        // Handle specific Mongoose validation errors if needed
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Product ID format' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
