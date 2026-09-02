(function () {
  const AUTH_KEY = 'jl_admin_authed';
  let editingProductId = null;
  let pendingImages = [];

  // ===================== CONNEXION =====================
  function checkAuth() {
    if (sessionStorage.getItem(AUTH_KEY) === '1') showAdmin();
  }

  document.getElementById('login-btn').addEventListener('click', () => {
    const pwd = document.getElementById('admin-password').value;
    if (pwd === window.JL_CONFIG.ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      showAdmin();
    } else {
      document.getElementById('login-alert').innerHTML = '<div class="jl-alert error">Modpas pa kòrèk.</div>';
    }
  });
  document.getElementById('admin-password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('login-btn').click();
  });
  document.getElementById('logout-btn').addEventListener('click', () => {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  });

  function showAdmin() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-shell').style.display = 'grid';
    renderAll();
  }

  // ===================== NAVIGATION ONGLETS =====================
  document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
  });

  function renderAll() {
    renderDashboard();
    renderProductsTable();
    renderCategorySelect();
    renderCategoriesTable();
    renderOrdersTable();
    renderSettings();
  }

  // ===================== DASHBOARD =====================
  function renderDashboard() {
    const orders = window.JL_ORDERS.getOrders();
    const products = window.JL_STORE.getProducts();
    const totalRevenue = orders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + o.total_htg, 0);
    const pending = orders.filter(o => o.order_status === 'new').length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);
    const outStock = products.filter(p => p.stock <= 0);

    document.getElementById('dash-stats').innerHTML = `
      <div class="stat-box"><div class="num">${orders.length}</div><div class="label">Kòmand (aparèy sa a)</div></div>
      <div class="stat-box"><div class="num">${pending}</div><div class="label">Nouvo kòmand</div></div>
      <div class="stat-box"><div class="num">${window.JL_STORE.formatMoney(totalRevenue, 'HTG')}</div><div class="label">Vant konfime</div></div>
      <div class="stat-box"><div class="num">${products.length}</div><div class="label">Pwodwi total</div></div>
      <div class="stat-box"><div class="num">${outStock.length}</div><div class="label">San stòk</div></div>`;

    document.getElementById('dash-low-stock').innerHTML = lowStock.length
      ? lowStock.map(p => `<p>⚠️ <strong>${p.name_ht}</strong> — rete ${p.stock}</p>`).join('')
      : '<p style="color:var(--ink-soft)">Pa gen pwodwi ak stòk fèb kounye a.</p>';

    document.getElementById('orders-badge').textContent = pending;
  }

  // ===================== PRODUITS =====================
  function renderProductsTable() {
    const products = window.JL_STORE.getProducts();
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = products.map(p => `
      <tr>
        <td><img class="thumb" src="${(p.images && p.images[0]) || '/img/products/placeholder-1.svg'}"></td>
        <td>${p.name_ht}</td>
        <td>${p.sku}</td>
        <td>${window.JL_STORE.formatMoney(p.price_htg, 'HTG')}</td>
        <td>${p.stock}</td>
        <td><span class="status-pill ${p.status === 'active' ? 'delivered' : 'cancelled'}">${p.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="JL_ADMIN.editProduct(${p.id})">✏️</button>
          <button class="btn btn-sm btn-danger" onclick="JL_ADMIN.deleteProduct(${p.id})">🗑️</button>
        </td>
      </tr>`).join('') || '<tr><td colspan="7" style="text-align:center;color:var(--ink-soft)">Pa gen pwodwi.</td></tr>';
  }

  function renderCategorySelect() {
    const cats = window.JL_STORE.getCategories();
    document.getElementById('f-category').innerHTML = cats.map(c => `<option value="${c.id}">${c.name_ht}</option>`).join('');
  }

  document.getElementById('new-product-btn').addEventListener('click', () => openProductForm(null));
  document.getElementById('cancel-product-btn').addEventListener('click', () => closeProductForm());

  function openProductForm(product) {
    editingProductId = product ? product.id : null;
    pendingImages = product ? [...(product.images || [])] : [];
    document.getElementById('product-form-title').textContent = product ? 'Modifye pwodwi' : 'Ajoute pwodwi';
    document.getElementById('f-name-ht').value = product ? product.name_ht : '';
    document.getElementById('f-name-es').value = product ? product.name_es : '';
    document.getElementById('f-sku').value = product ? product.sku : '';
    document.getElementById('f-brand').value = product ? (product.brand || '') : '';
    document.getElementById('f-price').value = product ? product.price_htg : '';
    document.getElementById('f-old-price').value = product ? (product.old_price_htg || '') : '';
    document.getElementById('f-stock').value = product ? product.stock : 0;
    document.getElementById('f-category').value = product ? product.category_id : '';
    document.getElementById('f-desc-ht').value = product ? (product.description_ht || '') : '';
    document.getElementById('f-desc-es').value = product ? (product.description_es || '') : '';
    document.getElementById('f-featured').checked = product ? !!product.is_featured : false;
    document.getElementById('f-new').checked = product ? !!product.is_new : true;
    document.getElementById('f-active').checked = product ? product.status === 'active' : true;
    document.getElementById('f-images').value = '';
    renderImagePreview();
    document.getElementById('product-form-card').style.display = '';
    document.getElementById('product-form-card').scrollIntoView({ behavior: 'smooth' });
  }

  function closeProductForm() {
    document.getElementById('product-form-card').style.display = 'none';
    editingProductId = null;
    pendingImages = [];
  }

  function renderImagePreview() {
    document.getElementById('img-preview').innerHTML = pendingImages.map((src, i) =>
      `<div style="position:relative"><img src="${src}"><button type="button" onclick="JL_ADMIN.removeImage(${i})" style="position:absolute;top:-6px;right:-6px;background:var(--danger);color:white;border:none;border-radius:50%;width:18px;height:18px;font-size:.65rem;line-height:1">×</button></div>`
    ).join('');
  }

  document.getElementById('f-images').addEventListener('change', (e) => {
    const files = [...e.target.files];
    let loaded = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        pendingImages.push(reader.result); // base64 data URL — mache 100% sou sit estatik
        loaded++;
        if (loaded === files.length) renderImagePreview();
      };
      reader.readAsDataURL(file);
    });
  });

  function removeImage(index) {
    pendingImages.splice(index, 1);
    renderImagePreview();
  }

  document.getElementById('save-product-btn').addEventListener('click', () => {
    const nameHt = document.getElementById('f-name-ht').value.trim();
    const nameEs = document.getElementById('f-name-es').value.trim();
    const sku = document.getElementById('f-sku').value.trim();
    const price = Number(document.getElementById('f-price').value);
    if (!nameHt || !nameEs || !sku || !price) {
      alert('Tanpri ranpli non (kreyòl/español), SKU ak pri.');
      return;
    }
    const products = window.JL_STORE.getProducts();
    const data = {
      name_ht: nameHt, name_es: nameEs, sku,
      brand: document.getElementById('f-brand').value.trim() || null,
      price_htg: price,
      old_price_htg: document.getElementById('f-old-price').value ? Number(document.getElementById('f-old-price').value) : null,
      stock: Number(document.getElementById('f-stock').value) || 0,
      category_id: Number(document.getElementById('f-category').value) || null,
      description_ht: document.getElementById('f-desc-ht').value,
      description_es: document.getElementById('f-desc-es').value,
      is_featured: document.getElementById('f-featured').checked,
      is_new: document.getElementById('f-new').checked,
      status: document.getElementById('f-active').checked ? 'active' : 'inactive',
      images: pendingImages.length ? pendingImages : ['/img/products/placeholder-1.svg'],
    };

    if (editingProductId) {
      const idx = products.findIndex(p => p.id === editingProductId);
      products[idx] = { ...products[idx], ...data };
    } else {
      data.id = window.JL_STORE.nextProductId();
      data.slug = window.JL_STORE.slugify(nameHt) + '-' + data.id;
      products.push(data);
    }
    window.JL_STORE.saveProductsOverride(products);
    closeProductForm();
    renderProductsTable();
    renderDashboard();
  });

  function editProduct(id) {
    const p = window.JL_STORE.getProductById(id);
    if (p) openProductForm(p);
  }

  function deleteProduct(id) {
    if (!confirm('Efase pwodwi sa a?')) return;
    const products = window.JL_STORE.getProducts().filter(p => p.id !== id);
    window.JL_STORE.saveProductsOverride(products);
    renderProductsTable();
    renderDashboard();
  }

  // ===================== CATÉGORIES =====================
  function renderCategoriesTable() {
    const cats = window.JL_STORE.getCategories();
    document.querySelector('#categories-table tbody').innerHTML = cats.map(c => `
      <tr><td>${c.name_ht}</td><td>${c.name_es}</td>
      <td><button class="btn btn-sm btn-danger" onclick="JL_ADMIN.deleteCategory(${c.id})">🗑️</button></td></tr>`).join('')
      || '<tr><td colspan="3" style="text-align:center;color:var(--ink-soft)">Pa gen kategori.</td></tr>';
  }

  document.getElementById('add-category-btn').addEventListener('click', () => {
    const nameHt = document.getElementById('cat-name-ht').value.trim();
    const nameEs = document.getElementById('cat-name-es').value.trim();
    if (!nameHt || !nameEs) { alert('Ranpli non kategori a nan de lang yo.'); return; }
    const cats = window.JL_STORE.getCategories();
    const id = cats.length ? Math.max(...cats.map(c => c.id)) + 1 : 1;
    cats.push({ id, name_ht: nameHt, name_es: nameEs, slug: window.JL_STORE.slugify(nameHt) });
    window.JL_STORE.saveCategoriesOverride(cats);
    document.getElementById('cat-name-ht').value = '';
    document.getElementById('cat-name-es').value = '';
    renderCategoriesTable();
    renderCategorySelect();
  });

  function deleteCategory(id) {
    if (!confirm('Efase kategori sa a?')) return;
    const cats = window.JL_STORE.getCategories().filter(c => c.id !== id);
    window.JL_STORE.saveCategoriesOverride(cats);
    renderCategoriesTable();
    renderCategorySelect();
  }

  // ===================== COMMANDES =====================
  const STATUS_OPTIONS = ['new', 'confirmed', 'preparing', 'shipped', 'delivering', 'delivered', 'cancelled', 'returned'];
  function renderOrdersTable() {
    const orders = window.JL_ORDERS.getOrders();
    document.querySelector('#orders-table tbody').innerHTML = orders.map(o => `
      <tr>
        <td>${o.order_number}</td>
        <td>${o.full_name}<br><small style="color:var(--ink-soft)">${o.phone}</small></td>
        <td>${window.JL_STORE.formatMoney(o.total_htg, 'HTG')}</td>
        <td>${o.payment_method === 'cash_on_delivery' ? 'Peye lè livre' : 'PayPal'}</td>
        <td><select onchange="JL_ADMIN.updateOrderStatus('${o.order_number}', this.value)">
          ${STATUS_OPTIONS.map(s => `<option value="${s}" ${s === o.order_status ? 'selected' : ''}>${s}</option>`).join('')}
        </select></td>
        <td>${new Date(o.created_at).toLocaleString()}</td>
      </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--ink-soft)">Pa gen kòmand sou aparèy sa a.</td></tr>';
  }

  function updateOrderStatus(orderNumber, status) {
    const orders = window.JL_ORDERS.getOrders();
    const order = orders.find(o => o.order_number === orderNumber);
    if (order) { order.order_status = status; window.JL_ORDERS.saveOrders(orders); }
    renderDashboard();
  }

  // ===================== DÉPLOIEMENT / EXPORT =====================
  document.getElementById('export-btn').addEventListener('click', () => {
    const products = window.JL_STORE.getProducts();
    const categories = window.JL_STORE.getCategories();
    const content = `/**\n * BAZ DONE PWODWI JLOODNA — ekspòte otomatikman nan panel admin.\n */\nwindow.JL_CATEGORIES = ${JSON.stringify(categories, null, 2)};\n\nwindow.JL_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`;
    const blob = new Blob([content], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'products.js';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('reset-preview-btn').addEventListener('click', () => {
    if (!confirm('Sa ap efase tout chanjman previzyalizasyon lokal ou yo (ki poko deplwaye). Kontinye?')) return;
    window.JL_STORE.clearProductsOverride();
    localStorage.removeItem('jl_categories_override');
    renderAll();
  });

  // ===================== PARAMÈTRES =====================
  function renderSettings() {
    document.getElementById('set-email').textContent = window.JL_CONFIG.ADMIN_EMAIL;
    document.getElementById('set-rate').value = window.JL_STORE.getRate();
    document.getElementById('set-emailjs-status').textContent = window.JL_ORDERS.emailIsConfigured() ? '✅ Konfigire' : '⚠️ Poko konfigire';
    document.getElementById('set-paypal-status').textContent = window.JL_CONFIG.PAYPAL_CLIENT_ID ? '✅ Client ID prezan' : '⚠️ Pa konfigire';
  }

  document.getElementById('save-rate-btn').addEventListener('click', () => {
    const rate = Number(document.getElementById('set-rate').value);
    if (rate > 0) { window.JL_STORE.setRate(rate); alert('To echanj anrejistre.'); }
  });

  window.JL_ADMIN = { editProduct, deleteProduct, deleteCategory, updateOrderStatus, removeImage };

  document.addEventListener('DOMContentLoaded', checkAuth);
})();
