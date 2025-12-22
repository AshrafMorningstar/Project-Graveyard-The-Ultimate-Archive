/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * E-Commerce Sandbox - Logic
 * Author: Ashraf Morningstar
 */

class Store {
    constructor() {
        this.state = {
            qty: 1,
            selectedColor: 'Midnight Black',
            cart: [],
            coupon: null,
            isCheckoutOpen: false,
            currentImage: 0
        };
        
        this.product = {
            id: 'qx1',
            name: 'Quantum X1 Noise Cancelling',
            price: 299.00
        };
        
        this.images = [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80"
        ];

        this.init();
    }

    init() {
        this.loadCart();
        this.bindEvents();
        this.renderCart();
    }

    bindEvents() {
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.state.selectedColor = btn.dataset.color;
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }

    setImage(index) {
        this.state.currentImage = index;
        document.getElementById('productImage').src = this.images[index];
        document.querySelectorAll('.thumb').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    updateQty(delta) {
        const newQty = this.state.qty + delta;
        if (newQty >= 1) {
            this.state.qty = newQty;
            document.getElementById('qtyDisplay').textContent = newQty;
        }
    }

    addToCart() {
        const item = {
            id: Date.now(), // unique ID for cart instance
            productId: this.product.id,
            name: this.product.name,
            color: this.state.selectedColor,
            price: this.product.price,
            qty: this.state.qty,
            image: this.images[0]
        };

        this.state.cart.push(item);
        this.saveCart();
        this.renderCart();
        this.toggleCart(true);
        
        // Reset qty
        this.state.qty = 1;
        document.getElementById('qtyDisplay').textContent = 1;
    }

    removeFromCart(id) {
        this.state.cart = this.state.cart.filter(item => item.id !== id);
        this.saveCart();
        this.renderCart();
    }

    toggleCart(forceOpen) {
        const overlay = document.getElementById('cartOverlay');
        if (forceOpen === true) {
            overlay.classList.add('open');
        } else {
            overlay.classList.toggle('open');
        }
    }

    renderCart() {
        const container = document.getElementById('cartItems');
        const countBadge = document.getElementById('cartCount');
        
        countBadge.textContent = this.state.cart.length;

        if (this.state.cart.length === 0) {
            container.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
            this.updateTotals();
            return;
        }

        container.innerHTML = this.state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p style="font-size: 12px; color: #666; margin-bottom: 4px;">${item.color} x ${item.qty}</p>
                    <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <button onclick="store.removeFromCart(${item.id})" style="margin-left: auto; height: fit-content; border: none; background: none; color: #999; cursor: pointer;">×</button>
            </div>
        `).join('');

        this.updateTotals();
    }

    updateTotals() {
        const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        let discount = 0;

        if (this.state.coupon === 'SAVE20') {
            discount = subtotal * 0.2;
            document.getElementById('discountRow').classList.remove('hidden');
            document.getElementById('discountAmt').textContent = `-$${discount.toFixed(2)}`;
        } else {
            document.getElementById('discountRow').classList.add('hidden');
        }

        const total = subtotal - discount;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('finalTotal').textContent = `$${total.toFixed(2)}`;
    }

    applyCoupon() {
        const input = document.getElementById('couponInput');
        if (input.value.toUpperCase() === 'SAVE20') {
            this.state.coupon = 'SAVE20';
            this.renderCart(); // re-render totals
            alert('Coupon Applied!');
        } else {
            alert('Invalid coupon. Try SAVE20');
        }
    }

    saveCart() {
        localStorage.setItem('quantumCart', JSON.stringify(this.state.cart));
    }

    loadCart() {
        const saved = localStorage.getItem('quantumCart');
        if (saved) {
            this.state.cart = JSON.parse(saved);
        }
    }

    startCheckout() {
        if (this.state.cart.length === 0) return alert('Cart is empty');
        this.toggleCart(false);
        document.getElementById('checkoutModal').classList.add('open');
    }

    nextCheckoutStep() {
        document.getElementById('step1').classList.add('hidden');
        document.getElementById('step2').classList.remove('hidden');
    }

    processOrder() {
        // Mock processing
        const btn = document.querySelector('#step2 button');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;

        setTimeout(() => {
            document.getElementById('step2').classList.add('hidden');
            document.getElementById('step3').classList.remove('hidden');
            
            // Clear cart
            this.state.cart = [];
            this.saveCart();
            this.renderCart();
        }, 1500);
    }
}

const store = new Store();
