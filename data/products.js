/**
 * BAZ DONE PWODWI JLOODNA
 * Se fichye sa a ki sèvi kòm "baz done" pou boutik la — se yon senp lis JavaScript.
 * Ou pa janm oblije modifye l ak men ou: itilize panel admin (admin.html) pou
 * ajoute/modifye/efase pwodwi, epi "Download products.js" ap ba ou yon nouvo vèsyon
 * fichye sa a pou ou telechaje sou GitHub oswa Netlify.
 */
window.JL_CATEGORIES = [
  { id: 1, name_ht: 'Elektwonik', name_es: 'Electrónica', slug: 'elektwonik' },
  { id: 2, name_ht: 'Rad ak Chosèt', name_es: 'Ropa y Calzado', slug: 'rad-ak-chose' },
  { id: 3, name_ht: 'Kay ak Kwizin', name_es: 'Hogar y Cocina', slug: 'kay-ak-kwizin' },
  { id: 4, name_ht: 'Bote ak Sante', name_es: 'Belleza y Salud', slug: 'bote-ak-sante' },
];

window.JL_PRODUCTS = [
  {
    id: 1, sku: 'JL-1001', slug: 'kask-bluetooth',
    name_ht: 'Kask Bluetooth San Fil', name_es: 'Auriculares Bluetooth Inalámbricos',
    description_ht: 'Kask bluetooth ki gen bon son ak batri ki dire lontan.',
    description_es: 'Auriculares Bluetooth con excelente sonido y larga duración de batería.',
    price_htg: 2500, old_price_htg: 3200, category_id: 1, brand: 'JL Tech',
    stock: 24, status: 'active', is_featured: true, is_new: false,
    images: ['/img/products/placeholder-1.svg'],
  },
  {
    id: 2, sku: 'JL-1002', slug: 'chaje-sole-potatif',
    name_ht: 'Chaje Solè Pòtatif', name_es: 'Cargador Solar Portátil',
    description_ht: 'Chaje ki fonksyone ak solèy, pratik pou vwayaj.',
    description_es: 'Cargador que funciona con energía solar, práctico para viajes.',
    price_htg: 1800, old_price_htg: null, category_id: 1, brand: 'SunCharge',
    stock: 15, status: 'active', is_featured: true, is_new: true,
    images: ['/img/products/placeholder-2.svg'],
  },
  {
    id: 3, sku: 'JL-2001', slug: 't-shirt-kolon',
    name_ht: 'T-shirt Kolon 100%', name_es: 'Camiseta 100% Algodón',
    description_ht: 'T-shirt konfòtab an kolon pou tout okazyon.',
    description_es: 'Camiseta cómoda de algodón para toda ocasión.',
    price_htg: 850, old_price_htg: null, category_id: 2, brand: 'JLOODNA Basics',
    stock: 60, status: 'active', is_featured: false, is_new: true,
    images: ['/img/products/placeholder-3.svg'],
  },
  {
    id: 4, sku: 'JL-3001', slug: 'blende-elektrik',
    name_ht: 'Blenndè Elektrik 5L', name_es: 'Licuadora Eléctrica 5L',
    description_ht: 'Blenndè pisan pou kwizin ou.',
    description_es: 'Licuadora potente para tu cocina.',
    price_htg: 4200, old_price_htg: 5000, category_id: 3, brand: 'HomeMax',
    stock: 8, status: 'active', is_featured: true, is_new: false,
    images: ['/img/products/placeholder-4.svg'],
  },
  {
    id: 5, sku: 'JL-4001', slug: 'krem-vizaj-natirel',
    name_ht: 'Krèm Vizaj Natirèl', name_es: 'Crema Facial Natural',
    description_ht: 'Krèm ki fèt ak engredyan natirèl pou po ou.',
    description_es: 'Crema hecha con ingredientes naturales para tu piel.',
    price_htg: 650, old_price_htg: null, category_id: 4, brand: 'Bèl Po',
    stock: 40, status: 'active', is_featured: false, is_new: true,
    images: ['/img/products/placeholder-1.svg'],
  },
];
