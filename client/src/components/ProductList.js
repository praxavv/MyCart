// C:\Users\praxa\mycart\client\src\components\ProductList.js
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
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Our Products</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {products.map((product) => (
                    <div key={product._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '200px' }}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price: ${product.price.toFixed(2)}</strong></p>
                        <p>In Stock: {product.countInStock}</p>
                        {product.imageUrl && (
                            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', marginBottom: '10px' }} />
                        )}
                        <button>Add to Cart</button> {/* Placeholder for now */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
