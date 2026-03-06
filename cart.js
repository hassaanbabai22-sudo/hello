// Site-wide Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if(item) { item.quantity++; } else { cart.push({name, price, quantity:1}); }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    toggleCart(true);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if(!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item,index)=>{
        total += item.price*item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `${item.name} x${item.quantity} - Rs. ${item.price*item.quantity} <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(div);
    });
    if(cartTotal) cartTotal.innerText = total;
}

function toggleCart(show=null){
    const popup = document.getElementById('cart-popup');
    if(!popup) return;
    if(show!==null){ popup.style.display = show ? 'flex':'none'; }
    else { popup.style.display = popup.style.display==='flex'?'none':'flex'; }
}

function checkout() {
    if(cart.length===0){ alert('Cart is empty!'); return; }
    alert('Proceeding to Buy Now with total Rs. '+document.getElementById('cart-total').innerText);
    // Redirect to payment page here if needed
}

// Initialize Cart on page load
document.addEventListener('DOMContentLoaded', renderCart);
