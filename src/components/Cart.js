import React, { useState } from 'react';
import './Cart.css';
const Cart = () => {
  // Sample data of books in the cart (this would typically come from the state or an API)
  const [cartItems, setCartItems] = useState([
    { id: 1, title: 'Harry Potter and the Sorcerer\'s Stone', price: 19.99, quantity: 2 },
    { id: 2, title: 'The Hobbit', price: 14.99, quantity: 1 },
    { id: 3, title: 'The Hunger Games', price: 12.99, quantity: 3 }
  ]);

  // Function to calculate the total price of the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <div className="cart-item">
              <span className="book-title">{item.title}</span>
              <span className="book-quantity">Quantity: {item.quantity}</span>
              <span className="book-price">Price: ${item.price.toFixed(2)}</span>
              <span className="book-total">Total: ${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total Price: ${calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default Cart;