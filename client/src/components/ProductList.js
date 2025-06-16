import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products'); // Your backend API endpoint
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products. Please try again later.');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array means this runs once on component mount

    if (loading) {
        return <div className="loading-message">Loading products...</div>; // Add class for styling
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>; // Add class for styling
    }

    return (
        <div>
            {/* Added className for the main heading */}
            <h2 className="products-heading">Our Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.map((product) => (
                    // Added className for the product card wrapper
                    <div key={product._id} className="product-card">
                        {/* Added className for product name */}
                        <h3 className="product-title">{product.name}</h3>
                        {/* Added className for description */}
                        <p className="product-description">{product.description}</p>
                        {/* Added className for price */}
                        <p className="product-price"><strong>Price: ${product.price.toFixed(2)}</strong></p>
                        {/* Added className for stock */}
                        <p className="product-stock">In Stock: {product.countInStock}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
                        )}
                        {/* Added className for the button */}
                        <button className="add-to-cart-button">Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
