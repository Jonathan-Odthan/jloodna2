/**
 * Jesyon kòmand pou sit estatik la:
 * 1) Anrejistre kòmand nan localStorage (vizib nan admin.html — sèlman sou menm navigatè a).
 * 2) Voye yon imel notifikasyon bay ADMIN_EMAIL atravè EmailJS (si konfigire nan config.js) —
 *    se sa ki fè admin lan resevwa notifikasyon pou VRE, kèlkeswa aparèy kliyan an itilize.
 */
(function () {
  const ORDERS_KEY = 'jl_orders';

  function getOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; } catch (e) { return []; }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function nextOrderNumber() {
    const count = getOrders().length;
    return `JL-${10000 + count + 1}`;
  }

  function emailIsConfigured() {
    const c = window.JL_CONFIG;
    return Boolean(c.EMAILJS_PUBLIC_KEY && c.EMAILJS_SERVICE_ID && c.EMAILJS_TEMPLATE_ID);
  }

  async function sendEmailNotification(order) {
    if (!emailIsConfigured() || typeof emailjs === 'undefined') {
      console.warn('[JLOODNA] EmailJS pa konfigire — notifikasyon imel pa voye. Wè js/config.js.');
      return { sent: false, reason: 'not_configured' };
    }
    const itemsText = order.items.map(i => `${i.qty}x ${i.name_ht} — ${window.JL_STORE.formatMoney(i.unit_price_htg * i.qty, 'HTG')}`).join('\n');
    const params = {
      to_email: window.JL_CONFIG.ADMIN_EMAIL,
      order_number: order.order_number,
      customer_name: order.full_name,
      phone: order.phone,
      whatsapp: order.whatsapp || '—',
      address: `${order.address}, ${order.city || ''}`,
      payment_method: order.payment_method === 'cash_on_delivery' ? 'Peye lè livre' : 'PayPal',
      total: window.JL_STORE.formatMoney(order.total_htg, 'HTG'),
      items_list: itemsText,
      notes: order.delivery_notes || '—',
    };
    try {
      await emailjs.send(window.JL_CONFIG.EMAILJS_SERVICE_ID, window.JL_CONFIG.EMAILJS_TEMPLATE_ID, params, window.JL_CONFIG.EMAILJS_PUBLIC_KEY);
      return { sent: true };
    } catch (err) {
      console.error('[JLOODNA] Erè EmailJS:', err);
      return { sent: false, reason: 'error', error: err };
    }
  }

  /**
   * Kreye yon kòmand apati panyen kliyan an. Rekalkile pri yo apati baz done pwodwi a
   * (jamè fè konfyans a yon pri ki ta ka soti dirèkteman nan yon fòm oswa yon varyab kliyan
   * ka modifye — men sonje: san sèvè, yon itilizatè teknik ka toujou modifye JS lokal la;
   * se yon limit ki egziste pou tout sit 100% estatik san backend).
   */
  async function createOrder(formData) {
    const cart = window.JL_CART.getCart();
    if (!cart.length) throw new Error('Panyen an vid.');

    const items = [];
    let subtotalHtg = 0;
    for (const c of cart) {
      const p = window.JL_STORE.getProductById(c.product_id);
      if (!p) continue;
      const qty = Math.max(1, c.qty);
      items.push({ product_id: p.id, name_ht: p.name_ht, name_es: p.name_es, sku: p.sku, qty, unit_price_htg: p.price_htg });
      subtotalHtg += p.price_htg * qty;
    }
    if (!items.length) throw new Error('Panyen an vid.');

    const shippingHtg = Number(formData.shipping_fee_htg) || 0;
    const discountHtg = Number(formData.discount_htg) || 0;
    const totalHtg = subtotalHtg - discountHtg + shippingHtg;

    const order = {
      order_number: nextOrderNumber(),
      full_name: formData.full_name,
      phone: formData.phone,
      whatsapp: formData.whatsapp || null,
      address: formData.address,
      city: formData.city || null,
      delivery_notes: formData.delivery_notes || null,
      currency: formData.currency || 'HTG',
      items, subtotal_htg: subtotalHtg, shipping_htg: shippingHtg, discount_htg: discountHtg, total_htg: totalHtg,
      coupon_code: formData.coupon_code || null,
      payment_method: formData.payment_method,
      payment_status: formData.payment_method === 'paypal' ? 'paid' : 'pending',
      paypal_transaction_id: formData.paypal_transaction_id || null,
      order_status: 'new',
      created_at: new Date().toISOString(),
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);

    // Diminye stòk lokalman (avètisman: chanjman sa a rete sou navigatè admin lan
    // jiskaske li re-ekspòte products.js apati panel admin epi re-deplwaye l).
    const products = window.JL_STORE.getProducts();
    for (const item of items) {
      const p = products.find(pp => pp.id === item.product_id);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
    }
    window.JL_STORE.saveProductsOverride(products);

    await sendEmailNotification(order);
    return order;
  }

  window.JL_ORDERS = { getOrders, saveOrders, createOrder, emailIsConfigured };
})();
