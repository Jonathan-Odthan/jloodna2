/**
 * Kouch "baz done" pou sit la. Sous prensipal la se /data/products.js (fichye ki
 * deplwaye sou GitHub/Netlify — tout vizitè wè li). Si admin fè chanjman nan panel
 * admin.html sou menm navigatè a, yon "override" anrejistre nan localStorage pou l ka
 * previzyalize chanjman yo touswit, san li pa oblije re-deplwaye.
 */
(function () {
  const OVERRIDE_KEY = 'jl_products_override';
  const CATEGORY_OVERRIDE_KEY = 'jl_categories_override';
  const RATE_OVERRIDE_KEY = 'jl_rate_override';

  function getProducts() {
    try {
      const override = localStorage.getItem(OVERRIDE_KEY);
      if (override) return JSON.parse(override);
    } catch (e) { /* ignore */ }
    return window.JL_PRODUCTS || [];
  }

  function saveProductsOverride(products) {
    localStorage.setItem(OVERRIDE_KEY, JSON.stringify(products));
  }

  function clearProductsOverride() {
    localStorage.removeItem(OVERRIDE_KEY);
  }

  function getCategories() {
    try {
      const override = localStorage.getItem(CATEGORY_OVERRIDE_KEY);
      if (override) return JSON.parse(override);
    } catch (e) { /* ignore */ }
    return window.JL_CATEGORIES || [];
  }

  function saveCategoriesOverride(categories) {
    localStorage.setItem(CATEGORY_OVERRIDE_KEY, JSON.stringify(categories));
  }

  function getProductBySlug(slug) {
    return getProducts().find(p => p.slug === slug) || null;
  }

  function getProductById(id) {
    return getProducts().find(p => p.id === Number(id)) || null;
  }

  function getRate() {
    const override = localStorage.getItem(RATE_OVERRIDE_KEY);
    return override ? Number(override) : (window.JL_CONFIG.EXCHANGE_RATE_HTG_DOP || 0.44);
  }

  function setRate(rate) {
    localStorage.setItem(RATE_OVERRIDE_KEY, String(rate));
  }

  function convert(amountHtg, currency) {
    if (currency === 'DOP') return Math.round(amountHtg * getRate() * 100) / 100;
    return amountHtg;
  }

  function formatMoney(amount, currency) {
    const rounded = Math.round(amount);
    const withCommas = rounded.toLocaleString('en-US');
    return currency === 'DOP' ? `RD$ ${withCommas}` : `G ${withCommas}`;
  }

  function nextProductId() {
    const products = getProducts();
    return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  function slugify(str) {
    return String(str).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  window.JL_STORE = {
    getProducts, saveProductsOverride, clearProductsOverride,
    getCategories, saveCategoriesOverride,
    getProductBySlug, getProductById,
    getRate, setRate, convert, formatMoney,
    nextProductId, slugify,
  };
})();
