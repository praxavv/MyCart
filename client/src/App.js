// C:\Users\praxa\mycart\client\src\App.js
import React from 'react';
import ProductList from './components/ProductList'; // Import the ProductList component
import './App.css'; // Assuming you have some basic styling or default App.css

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My E-commerce Store</h1>
      </header>
      <main>
        <ProductList /> {/* Render the ProductList component here */}
      </main>
    </div>
  );
}

export default App;
