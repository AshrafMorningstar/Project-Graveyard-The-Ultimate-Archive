/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * E-commerce Sandbox Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus, CreditCard, Check } from 'lucide-react';
import { clsx } from 'clsx';
import './index.css';

// --- DATA ---
const PRODUCT = {
  id: 'p1',
  name: 'Luxe Wireless Headphones',
  price: 29900, // cents
  description: 'Experience pure sound with industry-leading noise cancellation and premium comfort designed for all-day listening.',
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
  ],
  colors: [
    { name: 'Midnight Black', hex: '#171717' },
    { name: 'Silver Cloud', hex: '#E5E5E5' },
    { name: 'Rose Gold', hex: '#F4C2C2' }
  ]
};

// --- COMPONENTS ---

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, checkout }) => {
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  return (
    <>
      <div className={clsx("drawer-overlay", isOpen && "open")} onClick={onClose} />
      <div className={clsx("drawer", isOpen && "open")}>
        <div className="drawer-header">
          <h2>Your Bag ({cart.length})</h2>
          <button onClick={onClose}><X /></button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{textAlign: 'center', opacity: 0.5}}>Your bag is empty.</p>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${item.color}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p style={{fontSize: '14px', color: '#666'}}>{item.color}</p>
                  <p>${(item.price / 100).toFixed(2)}</p>
                  <div style={{display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center'}}>
                    <button onClick={() => updateQuantity(idx, -1)} style={{padding: '4px'}}><Minus size={14}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(idx, 1)} style={{padding: '4px'}}><Plus size={14}/></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 600}}>
              <span>Total</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const CheckoutModal = ({ isOpen, onClose, cart, clearCart }) => {
  const [step, setStep] = useState('pay'); // pay | success
  const [loading, setLoading] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      clearCart();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay open" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{background: 'white', padding: '40px', borderRadius: '16px', maxWidth: '500px', width: '90%'}} onClick={e => e.stopPropagation()}>
        {step === 'pay' ? (
          <form onSubmit={handlePay}>
            <h2 style={{marginBottom: '24px'}}>Secure Checkout</h2>
            <div style={{marginBottom: '16px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>Card Number</label>
              <div style={{display: 'flex', border: '1px solid #ddd', borderRadius: '8px', padding: '12px', alignItems: 'center', gap: '8px'}}>
                <CreditCard size={20} color="#666"/>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  style={{border: 'none', width: '100%', outline: 'none', fontSize: '16px'}}
                  required
                />
              </div>
              <p style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>* This is a mock payment sandbox. Do not use real cards.</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>Expiry</label>
                <input type="text" placeholder="MM/YY" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} required/>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 500}}>CVC</label>
                <input type="text" placeholder="123" style={{width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px'}} required/>
              </div>
            </div>
            <button type="submit" className="checkout-btn" disabled={loading}>
              {loading ? 'Processing...' : `Pay Now`}
            </button>
            <button type="button" onClick={onClose} style={{width: '100%', marginTop: '12px', padding: '12px', background: 'none', border: 'none', textDecoration: 'underline'}}>Cancel</button>
          </form>
        ) : (
          <div style={{textAlign: 'center'}}>
            <div style={{width: '64px', height: '64px', background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px'}}>
              <Check color="white" size={32} />
            </div>
            <h2>Order Confirmed!</h2>
            <p style={{color: '#666', margin: '12px 0 24px'}}>Thank you for testing this mock checkout flow.</p>
            <button onClick={onClose} className="checkout-btn">Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- APP ---

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Product State
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [activeImage, setActiveImage] = useState(0);

  // Load cart from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('luxe_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('luxe_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = () => {
    setCart(prev => {
      // Check if item exists
      const existing = prev.findIndex(item => item.id === PRODUCT.id && item.color === selectedColor.name);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing].quantity += 1;
        return copy;
      }
      return [...prev, {
        id: PRODUCT.id,
        name: PRODUCT.name,
        price: PRODUCT.price,
        image: PRODUCT.images[0],
        color: selectedColor.name,
        quantity: 1
      }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (idx, delta) => {
    setCart(prev => {
      const copy = [...prev];
      copy[idx].quantity += delta;
      if (copy[idx].quantity <= 0) copy.splice(idx, 1);
      return copy;
    });
  };

  return (
    <>
      <div className="container" style={{paddingTop: '24px'}}>
        <nav style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1 style={{fontSize: '24px', fontWeight: 800, letterSpacing: '-1px'}}>LUXE AUDIO</h1>
          <button onClick={() => setIsCartOpen(true)} style={{position: 'relative', background: 'none', border: 'none'}}>
            <ShoppingBag />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: -5, right: -5, 
                background: 'black', color: 'white', 
                fontSize: '10px', width: '18px', height: '18px', 
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.reduce((a,b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </nav>

        <div className="grid-layout">
          {/* Gallery */}
          <div>
            <img src={PRODUCT.images[activeImage]} alt="Product" className="gallery-main" />
            <div className="gallery-thumbs">
              {PRODUCT.images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  className={clsx("thumb", activeImage === idx && "active")}
                  onClick={() => setActiveImage(idx)}
                  alt={`View ${idx}`}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <span className="product-tag">New Release</span>
            <h1 className="product-title">{PRODUCT.name}</h1>
            <p className="product-price">${(PRODUCT.price / 100).toFixed(2)}</p>
            <p style={{marginBottom: '32px', color: '#666', lineHeight: 1.6}}>{PRODUCT.description}</p>

            <div className="variant-selector">
              <span className="variant-label">Color: {selectedColor.name}</span>
              <div className="color-options">
                {PRODUCT.colors.map(c => (
                  <button 
                    key={c.name}
                    className={clsx("color-btn", selectedColor.name === c.name && "active")}
                    style={{backgroundColor: c.hex}}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Select ${c.name}`}
                  />
                ))}
              </div>
            </div>

            <button className="add-to-cart" onClick={addToCart}>
              Add to Bag - ${(PRODUCT.price / 100).toFixed(2)}
            </button>

            <div style={{marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #eee'}}>
              <div style={{display: 'flex', gap: '12px', fontSize: '14px', color: '#666'}}>
                <span>🚚 Free Shipping</span>
                <span>🛡️ 2-Year Warranty</span>
                <span>↩️ 30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        updateQuantity={updateQuantity}
        checkout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        clearCart={() => setCart([])}
      />
    </>
  );
}

export default App;
