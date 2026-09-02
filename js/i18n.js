(function () {
  const LANG_KEY = 'jl_lang';
  const dictionaries = {};

  function currentLang() {
    return localStorage.getItem(LANG_KEY) || 'ht';
  }

  function currentCurrency() {
    return currentLang() === 'es' ? 'DOP' : 'HTG';
  }

  async function loadDict(lang) {
    if (dictionaries[lang]) return dictionaries[lang];
    const res = await fetch(`/locales/${lang}.json`);
    dictionaries[lang] = await res.json();
    return dictionaries[lang];
  }

  function t(key) {
    const dict = dictionaries[currentLang()] || {};
    return dict[key] || key;
  }

  function applyTranslations() {
    const lang = currentLang();
    document.documentElement.lang = lang;
    document.body.classList.toggle('lang-ht', lang === 'ht');
    document.body.classList.toggle('lang-es', lang === 'es');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.dispatchEvent(new CustomEvent('jl:lang-changed', { detail: { lang, currency: currentCurrency() } }));
  }

  async function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang === 'es' ? 'es' : 'ht');
    await loadDict(currentLang());
    applyTranslations();
  }

  function formatMoney(amount, currency) {
    const rounded = Math.round(amount);
    const withCommas = rounded.toLocaleString('en-US');
    return currency === 'DOP' ? `RD$ ${withCommas}` : `G ${withCommas}`;
  }

  document.addEventListener('DOMContentLoaded', async () => {
    await loadDict(currentLang());
    applyTranslations();
    document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  });

  window.JL_I18N = { t, currentLang, currentCurrency, setLang, formatMoney, applyTranslations };
})();
