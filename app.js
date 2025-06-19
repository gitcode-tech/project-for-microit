import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const addToCart = (product) => {
    const exists = cart.find(item => item.productId === product._id);
    if (exists) {
      setCart(
        cart.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, productId: product._id, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const handleCheckout = () => {
    // Calculate total
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    // Send order to backend
    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, totalPrice })
    })
    .then(res => res.json())
    .then(data => {
      alert('Order placed successfully!');
      setCart([]);
      setShowCart(false);
    });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ backgroundColor: '#00796b', padding: '10px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
        <h1>My eCommerce</h1>
        <button onClick={() => setShowCart(!showCart)} style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#004d40', color: 'white', border: 'none' }}>
          Cart ({cart.length})
        </button>
      </header>

      {showCart ? (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.productId} style={{ marginBottom: '10px' }}>
                    {item.name} - ${item.price} x {item.quantity}
                    <button onClick={() => removeFromCart(item.productId)} style={{ marginLeft: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                  </li>
                ))}
              </ul>
              <button onClick={handleCheckout} style={{ padding: '10px', backgroundColor: '#00796b', color: 'white', border: 'none', borderRadius: '5px' }}>Checkout</button>
            </>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
          {products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', width: '200px', margin: '10px', padding: '10px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)} style={{ padding: '8px', backgroundColor: '#00796b', color: 'white', border: 'none', borderRadius: '5px' }}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
