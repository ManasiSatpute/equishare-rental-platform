import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { getTranslations } from '../services/api';

const Cart = () => {
  const { 
    language, 
    cart, 
    cartTotal, 
    cartItemsCount, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    addOrder 
  } = useAppContext();
  
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    days: 1,
    deliveryAddress: '',
    phone: '',
    notes: ''
  });
  
  const t = getTranslations(language);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const getTotalWithDays = () => {
    return cartTotal * orderDetails.days;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    const order = {
      id: Date.now(),
      items: cart.map(item => ({
        ...item,
        days: orderDetails.days
      })),
      total: getTotalWithDays(),
      days: orderDetails.days,
      deliveryAddress: orderDetails.deliveryAddress,
      phone: orderDetails.phone,
      notes: orderDetails.notes,
      status: 'pending',
      orderDate: new Date().toISOString()
    };
    
    addOrder(order);
    setShowCheckoutModal(false);
    setOrderDetails({ days: 1, deliveryAddress: '', phone: '', notes: '' });
    
    alert('Order placed successfully!');
  };

  const CheckoutModal = () => (
    <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '600px' }}
      >
        <div className="flex justify-between align-center mb-20">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button 
            onClick={() => setShowCheckoutModal(false)}
            className="btn btn-outline btn-sm"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleCheckout}>
          <div className="form-group">
            <label className="form-label">Rental Duration (Days)</label>
            <select
              className="form-control form-select"
              value={orderDetails.days}
              onChange={(e) => setOrderDetails({...orderDetails, days: parseInt(e.target.value)})}
              required
            >
              {[1,2,3,4,5,6,7,14,21,30].map(day => (
                <option key={day} value={day}>{day} {day === 1 ? 'day' : 'days'}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Address</label>
            <textarea
              className="form-control"
              value={orderDetails.deliveryAddress}
              onChange={(e) => setOrderDetails({...orderDetails, deliveryAddress: e.target.value})}
              required
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={orderDetails.phone}
              onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Special Notes (Optional)</label>
            <textarea
              className="form-control"
              value={orderDetails.notes}
              onChange={(e) => setOrderDetails({...orderDetails, notes: e.target.value})}
              rows="2"
            />
          </div>

          <div style={{ 
            background: 'var(--light-color)', 
            padding: '15px', 
            borderRadius: '5px',
            marginBottom: '20px'
          }}>
            <div className="flex justify-between mb-10">
              <span>Subtotal ({cartItemsCount} items):</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between mb-10">
              <span>Duration:</span>
              <span>{orderDetails.days} days</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span style={{ color: 'var(--primary-color)' }}>₹{getTotalWithDays()}</span>
            </div>
          </div>

          <div className="flex gap-10">
            <button 
              type="button"
              onClick={() => setShowCheckoutModal(false)}
              className="btn btn-outline flex-1"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn-success flex-1"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="text-center p-30" style={{ 
          background: 'var(--white)', 
          borderRadius: '10px',
          boxShadow: 'var(--shadow)'
        }}>
          <h2 className="text-2xl font-bold mb-20">Your Cart is Empty</h2>
          <p style={{ color: 'var(--secondary-color)', marginBottom: '30px' }}>
            Add some equipment to your cart to get started.
          </p>
          <a href="#home" className="btn btn-primary">
            Browse Equipment
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
      <div className="flex justify-between align-center mb-30">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <span style={{ color: 'var(--secondary-color)' }}>
          {cartItemsCount} items
        </span>
      </div>

      <div className="grid grid-cols-3 gap-20">
        {/* Cart Items */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ 
            background: 'var(--white)', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            padding: '20px'
          }}>
            {cart.map((item) => (
              <div 
                key={item.id} 
                style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '20px',
                  marginBottom: '20px'
                }}
              >
                <div className="flex gap-20">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h3 className="text-lg font-semibold mb-10">{item.name}</h3>
                    <p style={{ color: 'var(--secondary-color)', marginBottom: '10px' }}>
                      {item.category}
                    </p>
                    <p style={{ color: 'var(--secondary-color)', fontSize: '14px' }}>
                      📍 {item.location}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold mb-10" style={{ color: 'var(--primary-color)' }}>
                      ₹{item.pricePerDay * item.quantity}
                    </div>
                    
                    <div className="flex align-center gap-10 mb-10">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '5px 10px' }}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '30px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="btn btn-outline btn-sm"
                        style={{ padding: '5px 10px' }}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--danger-color)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        textDecoration: 'underline'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-right">
              <button
                onClick={clearCart}
                className="btn btn-outline"
                style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-color)' }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div>
          <div style={{ 
            background: 'var(--white)', 
            borderRadius: '10px',
            boxShadow: 'var(--shadow)',
            padding: '20px'
          }}>
            <h3 className="text-lg font-semibold mb-20">Order Summary</h3>
            
            <div className="flex justify-between mb-10">
              <span>Items ({cartItemsCount}):</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <div className="flex justify-between mb-10">
              <span>Per day rate:</span>
              <span>₹{cartTotal}</span>
            </div>
            
            <hr style={{ margin: '15px 0', border: '1px solid var(--border-color)' }} />
            
            <div className="flex justify-between font-bold text-lg mb-20">
              <span>Total (per day):</span>
              <span style={{ color: 'var(--primary-color)' }}>₹{cartTotal}</span>
            </div>
            
            <button 
              onClick={() => setShowCheckoutModal(true)}
              className="btn btn-success"
              style={{ width: '100%' }}
            >
              Proceed to Checkout
            </button>
            
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: 'var(--light-color)',
              borderRadius: '5px',
              fontSize: '14px',
              color: 'var(--secondary-color)'
            }}>
              <p><strong>Note:</strong> Final price will be calculated based on rental duration selected during checkout.</p>
            </div>
          </div>
        </div>
      </div>

      {showCheckoutModal && <CheckoutModal />}
    </div>
  );
};

export default Cart;