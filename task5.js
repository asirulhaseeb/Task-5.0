

// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 99.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIr8FMYCmtzjJXraMplEdUi0dVMh0Qt2C-qg&s"
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Fitness tracker with heart rate monitor and GPS",
        price: 129.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNFiOBAf4U50WlqDdPNu6RL1aMyxfP2smNA&s"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        description: "Portable speaker with 20-hour battery life",
        price: 59.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkzm330_QXVLpQJnT6jKW3ixSYYI9Vka9t6Q&s"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        description: "Durable backpack with USB charging port",
        price: 49.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-mzgfKfb6X6aQqVdhh73FggmddXsRR16_6w&s"
    },
    {
        id: 5,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with silent clicks",
        price: 29.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR9oc9u8zzMC-mZttwRLJrzHIdtubQDbiaHg&s"
    },
    {
        id: 6,
        name: "External Hard Drive",
        description: "1TB portable hard drive with USB 3.0",
        price: 69.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5ECsPvCyLbtlw2wP3Eitxt3vdNzYv3leJiQ&s"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close-cart');

const checkoutButton = document.getElementById('checkout-Button');
const orderConfirmation = document.getElementById('order-confirmation');

// Display Products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
    
      // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        // Optionally clear the cart here
        cart = [];
        updateCart();

        // Show confirmation message
        // orderConfirmation.style.display = 'block';

        // Optionally auto-hide message after a few seconds
        setTimeout(() => {
            orderConfirmation.style.display = 'none';
            closeCartModal(); // Close the cart modal
        }, 3000);
    } else {
        alert("Your cart is empty.");
    }
});

// Add to Cart Function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update Cart Function
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Quantity Adjustment Functions
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

function removeItem(e) {
    const productId = parseInt(e.currentTarget.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Cart Modal Functions
function openCart() {
    cartModal.style.display = 'flex';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

// Event Listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartModal);

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCartModal();
    }
});

// Initialize the page
displayProducts();


 



