const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of a string
    },
    description: {
        type: String,
        required: false // Not explicitly stated as required, but good practice if available
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Price cannot be negative
    },
    imageUrl: {
        type: String,
        required: false // Not explicitly stated as required
    },
    stock: {
        type: Number,
        required: true,
        default: 10,
        min: 1 // Stock cannot be negative
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);
