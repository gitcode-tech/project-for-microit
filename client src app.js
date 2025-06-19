import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#e8f0f2', padding: '20px' }}>
      <header style={{ backgroundColor: '#00796b', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>ShopEase</h1>
      </header>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {products.map(prod => (
          <div key={prod._id} style={{ backgroundColor: 'white', width: '250px', margin: '10px', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={prod.image} alt={prod.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3>{prod.name}</h3>
            <p style={{ color: '#555' }}>Price: ${prod.price}</p>
            <button style={{ backgroundColor: '#00796b', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
