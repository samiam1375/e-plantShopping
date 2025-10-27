import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const itemCost = parseFloat(item.cost.substring(1)); // Remove '$' and parse to float
      total += itemCost * item.quantity;
    });
    return total.toFixed(2); // Format to 2 decimal places
  };

  // This function is called when the "Continue Shopping" button is clicked
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default form submission or link navigation
    onContinueShopping(); // Call the onContinueShopping function passed from the parent
  };

  // Function for checkout shopping
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    // --- USAGE OF updateQuantity ACTION ---
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // If the item's quantity is greater than 1, dispatch updateQuantity to decrease it
    if (item.quantity > 1) {
      // --- USAGE OF updateQuantity ACTION ---
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Else if the quantity would drop to 0, dispatch the removeItem action
      // --- USAGE OF removeItem ACTION ---
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    // --- USAGE OF removeItem ACTION ---
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1)); // Remove '$' and parse to float
    return (itemCost * item.quantity).toFixed(2); // Format to 2 decimal places
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
