(function () {
  function headerHTML() {
    return `
    <div class="jl-topbar">
      <div class="container">
        <span><span class="lang-ht">📞 Tanpri kontakte nou pou nenpòt kesyon</span><span class="lang-es">📞 Contáctanos si tienes alguna pregunta</span></span>
        <span><span class="lang-ht">🚚 Livrezon nan tout Ayiti ak Sendomeng</span><span class="lang-es">🚚 Envíos a toda Haití y República Dominicana</span></span>
      </div>
    </div>
    <header class="jl-header">
      <div class="container">
        <a href="/index.html" class="jl-logo">JLOODNA<span>.</span></a>
        <form class="jl-search" action="/shop.html" method="get">
          <input type="text" name="q" data-i18n-placeholder="search_placeholder" placeholder="Chèche yon pwodwi...">
          <button type="submit">🔍</button>
        </form>
        <div class="jl-header-actions">
          <div class="lang-switch">
            <button class="lang-switch-btn" data-lang="ht">🇭🇹 Kreyòl</button>
            <button class="lang-switch-btn" data-lang="es">🇩🇴 Español</button>
          </div>
          <a href="/cart.html" style="position:relative"><span class="icon">🛒</span><span data-i18n="cart">Panyen</span><span class="jl-cart-count">0</span></a>
        </div>
      </div>
      <nav class="jl-catnav"><div class="container" id="jl-catnav-list"></div></nav>
    </header>`;
  }

  function footerHTML() {
    return `
    <footer class="jl-footer">
      <div class="container jl-footer-grid">
        <div>
          <h4>JLOODNA</h4>
          <p class="lang-ht" style="font-size:.85rem;max-width:220px">Boutik ki fè pi fasil pou ou achte sa ou bezwen, kèlkeswa kote w ye.</p>
          <p class="lang-es" style="font-size:.85rem;max-width:220px">La tienda que facilita comprar lo que necesitas, estés donde estés.</p>
        </div>
        <div>
          <h4 data-i18n="nav_shop">Boutik</h4>
          <a href="/shop.html" data-i18n="nav_shop">Boutik</a>
          <a href="/cart.html" data-i18n="cart">Panyen</a>
          <a href="/track.html" data-i18n="track_order">Swiv kòmand</a>
        </div>
        <div>
          <h4 data-i18n="about_us">Konsènan nou</h4>
          <a href="/about.html" data-i18n="about_us">Konsènan nou</a>
          <a href="/faq.html" data-i18n="faq">FAQ</a>
          <a href="/terms.html" data-i18n="terms">Kondisyon</a>
          <a href="/privacy.html" data-i18n="privacy">Konfidansyalite</a>
          <a href="/returns.html" data-i18n="returns">Politik Retou</a>
        </div>
        <div>
          <h4 data-i18n="contact_us">Kontakte nou</h4>
          <a href="/contact.html" data-i18n="contact_us">Kontakte nou</a>
        </div>
      </div>
      <div class="jl-footer-bottom">© <span id="jl-year"></span> JLOODNA | Global Trading — <span data-i18n="footer_rights">Tout dwa rezève.</span></div>
    </footer>`;
  }

  function categoryNav() {
    const el = document.getElementById('jl-catnav-list');
    if (!el) return;
    const cats = window.JL_STORE.getCategories();
    el.innerHTML = cats.map(c => `<a href="/shop.html?category=${c.id}"><span class="lang-ht">${c.name_ht}</span><span class="lang-es">${c.name_es}</span></a>`).join('');
  }

  function mount() {
    const headerMount = document.getElementById('jl-header');
    const footerMount = document.getElementById('jl-footer');
    if (headerMount) headerMount.innerHTML = headerHTML();
    if (footerMount) footerMount.innerHTML = footerHTML();
    const yearEl = document.getElementById('jl-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    categoryNav();
    window.JL_I18N.applyTranslations();
    window.JL_CART.updateCartBadge();
  }

  document.addEventListener('DOMContentLoaded', mount);
})();
