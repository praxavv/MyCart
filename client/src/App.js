// In App.js


import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/Cart';
import Login from './components/Login';

function App() {
 const numberOfStars = 200; // Adjust the number of stars
 const stars = [...Array(numberOfStars)].map((_, i) => {
 const x = Math.random() * 100 + 'vw';
 const y = Math.random() * 100 + 'vh';
 const size = Math.random() * 4 + 'px';
 const animationDelay = Math.random() * 2 + 's';


 return (
 <div
 key={i}
 className="star"
 style={{
 top: y,
 left: x,
 width: size,
 height: size,
 animationDelay: animationDelay,
 }}
 ></div>
 );
 });
 const [isAuthenticated, setIsAuthenticated] = useState(false);

 useEffect(() => {
   setIsAuthenticated(!!localStorage.getItem('token'));
 }, []);

 const handleLogout = () => {
   localStorage.removeItem('token');
   setIsAuthenticated(false);
 };

 const handleAuth = () => {
   setIsAuthenticated(true);
 };
 return (
 <Router>
 <div className="App">
 {stars}
 <nav className="main-nav">
 <Link to="/">Products</Link> |{' '}
 <Link to="/cart">Cart</Link> |{' '}
 {isAuthenticated ? (
   <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#39ff14', cursor: 'pointer' }}>Logout</button>
 ) : (
   <Link to="/login">Login / Register</Link>
 )}
 </nav>
 <main>
 <Routes>
 <Route path="/" element={<ProductList />} />
 <Route path="/cart" element={<Cart />} />
 <Route path="/login" element={<Login onLogin={handleAuth} />} />
 </Routes>
 </main>
 </div>
 </Router>
 );
}


export default App;
