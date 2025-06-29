// script.js

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  if (productList) {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>KSH ${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(card);
    });
  }
  updateCartCount();
  renderCart();
});

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) cartCountEl.textContent = count;
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  if (!cartItemsEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const product = products.find(p => p.id === item.id);
    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.innerHTML = `
      ${product.name} x${item.quantity} - KSH ${itemTotal}
      <button onclick="removeItem(${item.id})" style="margin-left:10px;">Remove</button>
    `;
    cartItemsEl.appendChild(div);
  });

  if (cartTotalEl) cartTotalEl.textContent = total;
}

function removeItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function checkout() {
  alert("Thank you for shopping with us!");
  localStorage.removeItem("cart");
  window.location.reload();
}

function clearCart() {
  localStorage.removeItem("cart");
  window.location.reload();
}

