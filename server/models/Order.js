const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // References the User model
        ref: 'User', // The name of the model being referenced
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, // References the Product model
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1 // Quantity must be at least 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0 // Total amount cannot be negative
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'], // Allowed values for status
        default: 'pending' // Default status for new orders
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
