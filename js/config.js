/**
 * KONFIGIRASYON JLOODNA
 * ⚠️ Fichye sa a ap chaje nan navigatè kliyan an — pa janm mete okenn "sekrè" ladan l
 * (pa gen modpas serveur, pa gen "client secret" PayPal, elatriye). Wè README.md pou plis detay.
 */
window.JL_CONFIG = {
  SHOP_NAME: 'JLOODNA | Global Trading',
  ADMIN_EMAIL: 'jloodna@gmail.com',

  // Modpas pou antre nan panel admin (admin.html). Se yon pwoteksyon LEJÈ sèlman —
  // nenpòt moun ki gade kòd sous paj la ka wè l. Pou chanje l, modifye liy anba a.
  ADMIN_PASSWORD: '@JLoodnA#20-02',

  // PayPal — SÈLMAN "Client ID" la (piblik) ka ale isit la. JAMÈ "Client Secret" la.
  PAYPAL_CLIENT_ID: 'AdI4wGqusD1U_r2ng3TxPlIUpNdHFN0CkoVc1bTtUuGumlKeItEm7kgy74gym9w-rPs4-D0lANzmZq5j',

  // EmailJS (www.emailjs.com) — sèvis GRATIS ki voye imel dirèkteman soti nan navigatè a,
  // san bezwen sèvè. Kreye yon kont gratis, epi mete 3 valè piblik yo anba a.
  // San yo, notifikasyon imel yo p ap voye (men kòmand yo ap toujou anrejistre).
  EMAILJS_PUBLIC_KEY: '',
  EMAILJS_SERVICE_ID: '',
  EMAILJS_TEMPLATE_ID: '',

  // To echanj HTG → DOP (ajistab nan panel admin, Paramèt)
  EXCHANGE_RATE_HTG_DOP: 0.44,
};
