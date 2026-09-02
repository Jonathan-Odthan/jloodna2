(function () {
  const CART_KEY = 'jl_cart';

  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    document.dispatchEvent(new CustomEvent('jl:cart-changed'));
  }

  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(i => i.product_id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ product_id: productId, qty });
    saveCart(cart);
  }

  function updateCartQty(productId, qty) {
    let cart = getCart();
    if (qty <= 0) cart = cart.filter(i => i.product_id !== productId);
    else { const item = cart.find(i => i.product_id === productId); if (item) item.qty = qty; }
    saveCart(cart);
  }

  function removeFromCart(productId) { updateCartQty(productId, 0); }
  function clearCart() { saveCart([]); }
  function cartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }

  function cartDetails() {
    const currency = window.JL_I18N.currentCurrency();
    return getCart().map(item => {
      const p = window.JL_STORE.getProductById(item.product_id);
      if (!p) return null;
      const price = window.JL_STORE.convert(p.price_htg, currency);
      return { ...p, qty: item.qty, price, priceHtg: p.price_htg };
    }).filter(Boolean);
  }

  function updateCartBadge() {
    document.querySelectorAll('.jl-cart-count').forEach(el => {
      const count = cartCount();
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  window.JL_CART = { getCart, saveCart, addToCart, updateCartQty, removeFromCart, clearCart, cartCount, cartDetails, updateCartBadge };
  document.addEventListener('DOMContentLoaded', updateCartBadge);
})();
