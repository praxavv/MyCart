// In App.js


import React from 'react';
import ProductList from './components/ProductList';
import './App.css';


function App() {
 const numberOfStars = 100; // Adjust the number of stars
 const stars = [...Array(numberOfStars)].map((_, i) => {
 const x = Math.random() * 100 + 'vw';
 const y = Math.random() * 100 + 'vh';
 const size = Math.random() * 3 + 'px';
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


 return (
 <div className="App">
 {stars} {/* Render the star elements */}
 <main>
 <ProductList />
 </main>
 </div>
 );
}


export default App;
