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
 * E-commerce UX Sandbox - Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeModal = document.getElementById('closeModal');
const checkoutForm = document.getElementById('checkoutForm');
const payAmount = document.getElementById('payAmount');
const successOverlay = document.getElementById('successOverlay');
const continueShopping = document.getElementById('continueShopping');

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupListeners();
});

function setupListeners() {
  cartBtn.addEventListener('click', toggleCart);
  closeCart.addEventListener('click', toggleCart);
  checkoutBtn.addEventListener('click', openCheckout);
  closeModal.addEventListener('click', () => checkoutModal.classList.remove('active'));
  
  checkoutForm.addEventListener('submit', handlePayment);
  continueShopping.addEventListener('click', () => {
    successOverlay.classList.remove('active');
    cart = [];
    updateCartUI();
  });
}

// Render Products
function renderProducts() {
  productGrid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-image">${p.emoji}</div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p style="color:#666; font-size:0.9rem; margin-top:0.5rem;">${p.desc}</p>
        <span class="price">$${p.price.toFixed(2)}</span>
        <button onclick="addToCart(${p.id})" class="add-btn">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// Cart Logic
window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCartUI();
  
  // Visual feedback: Open cart
  cartSidebar.classList.add('open');
};

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.length;
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  payAmount.textContent = `$${total.toFixed(2)}`;
  
  checkoutBtn.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is empty.</p>`;
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div style="flex:1;">
        <h4>${item.name}</h4>
        <span>$${item.price.toFixed(2)}</span>
      </div>
      <button onclick="removeFromCart(${index})" style="color:red; font-size:1.2rem;">×</button>
    </div>
  `).join('');
}

function toggleCart() {
  cartSidebar.classList.toggle('open');
}

// Checkout Logic (Mock)
function openCheckout() {
  toggleCart(); // Close sidebar
  checkoutModal.classList.add('active');
}

function handlePayment(e) {
  e.preventDefault();
  
  // Simulate processing
  const btn = checkoutForm.querySelector('button[type="submit"]');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Processing...';
  btn.disabled = true;

  setTimeout(() => {
    checkoutModal.classList.remove('active');
    successOverlay.classList.add('active');
    btn.innerHTML = originalText;
    btn.disabled = false;
    checkoutForm.reset();
  }, 1500);
}
