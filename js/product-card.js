function renderProductCard(p) {
  const currency = window.JL_I18N.currentCurrency();
  const price = window.JL_STORE.convert(p.price_htg, currency);
  const oldPrice = p.old_price_htg ? window.JL_STORE.convert(p.old_price_htg, currency) : null;
  const img = (p.images && p.images[0]) || '/img/products/placeholder-1.svg';
  const badge = oldPrice ? `<span class="jl-badge">-${Math.round((1 - price / oldPrice) * 100)}%</span>`
    : (p.is_new ? '<span class="jl-badge new" data-i18n="new_products">Nouvo</span>' : '');
  const oldPriceHtml = oldPrice ? `<span class="old">${window.JL_STORE.formatMoney(oldPrice, currency)}</span>` : '';
  const outOfStock = p.stock <= 0;
  return `
  <div class="jl-card">
    <a href="./product.html?slug=${p.slug}" class="jl-card-img">
      <img src="${img}" alt="${p.name_ht}" loading="lazy">
      ${badge}
    </a>
    <div class="jl-card-body">
      <h3><a href="./product.html?slug=${p.slug}"><span class="lang-ht">${p.name_ht}</span><span class="lang-es">${p.name_es}</span></a></h3>
      <div class="jl-price"><span class="now">${window.JL_STORE.formatMoney(price, currency)}</span>${oldPriceHtml}</div>
      <button class="btn btn-teal btn-sm" ${outOfStock ? 'disabled' : ''} onclick="window.JL_CART.addToCart(${p.id},1); this.textContent='✓'">
        <span data-i18n="${outOfStock ? 'out_of_stock' : 'add_to_cart'}">${outOfStock ? 'Pa gen stòk' : 'Ajoute nan panyen'}</span>
      </button>
    </div>
  </div>`;
}
