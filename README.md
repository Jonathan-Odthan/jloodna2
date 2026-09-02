# JLOODNA | Global Trading — Sit Estatik (HTML/CSS/JS pou)

Yon boutik sou entènèt **100% estatik** — pa gen Node.js, pa gen serveur, pa gen baz done
pou enstale. Ou ka mete l sou **GitHub Pages** oswa **Netlify** gratis.

Bilingwis Kreyòl/Español, HTG/DOP, panyen, checkout (PayPal + peye lè livre), ak yon
panel admin pou jere pwodwi san w pa oblije ekri kòd.

---

## 1. Estrikti fichye yo

```
jloodna-static/
├── index.html, shop.html, product.html, cart.html, checkout.html, ...
├── admin.html              ← panel pou jere boutik la
├── data/products.js        ← "baz done" pwodwi ak kategori (yon senp fichye JS)
├── js/config.js            ← modpas admin, PayPal Client ID, EmailJS, to echanj
├── js/                     ← tout lojik sit la (panyen, tradiksyon, kòmand, admin)
├── css/                    ← style
├── locales/                ← tradiksyon ht.json / es.json
└── img/products/           ← imaj egzanp
```

---

## 2. Deplwaye sou GitHub Pages

1. Kreye yon repo GitHub tou nèf (pa egzanp `jloodna-shop`).
2. Telechaje **tout** dosye `jloodna-static/` ladan l (drag & drop sou paj GitHub la, oswa `git push`).
3. Ale nan **Settings → Pages** → chwazi branch `main`, dosye `/root` → **Save**.
4. Apre kèk minit, sit ou ap disponib sou `https://<non-itilizatè>.github.io/jloodna-shop/`.

## 3. Deplwaye sou Netlify (pi senp toujou)

1. Ale sou [netlify.com](https://netlify.com) → kreye yon kont gratis.
2. Sou paj "Sites", **drag & drop** dosye `jloodna-static/` a dirèkteman nan navigatè a.
3. Netlify ba ou yon lyen touswit (pa egzanp `jloodna.netlify.app`). Ou ka chanje non an nan paramèt.
4. Pou mete ajou pita: re-drag&drop dosye a ankò, oswa konekte l ak GitHub pou deplwaman otomatik.

---

## 4. Jere pwodwi san w pa ekri kòd (panel admin)

1. Ale sou `/admin.html` (pa egzanp `https://jloodna.netlify.app/admin.html`).
2. Antre modpas la (defini nan `js/config.js`, valè kounye a: `@JLoodna-2002`).
3. Nan tab **"Pwodwi"**: klike **"+ Ajoute pwodwi"**, ranpli fòm lan (non an de lang,
   pri, stòk, imaj — ou ka chwazi imaj dirèkteman nan telefòn/òdinatè ou), epi **Anrejistre**.
4. Chanjman yo parèt **touswit nan navigatè ou** (previzyalizasyon), men yo **poko vizib
   pou lòt kliyan**.
5. Ale nan tab **"🚀 Deplwaye"** → klike **"⬇️ Telechaje products.js"**.
6. Ranplase fichye `data/products.js` nan repo GitHub ou (klike sou fichye a → "Edit"
   oswa "Upload file" → glise nouvo vèsyon an) — oswa, si w sou Netlify, drag & drop
   tout dosye a ankò.
7. Nan kèk segond, chanjman yo vizib pou tout moun.

> 💡 Sa vle di: chak fwa ou ajoute/modifye yon pwodwi, ou telechaje epi re-telechaje
> yon sèl fichye (`products.js`) — pa gen okenn lòt kòd pou touche.

---

## 5. Resevwa yon notifikasyon IMEL pou chak nouvo kòmand

San yon backend, sèl fason pou resevwa yon notifikasyon otomatik kèlkeswa aparèy
kliyan an itilize se atravè **[EmailJS](https://www.emailjs.com)** — gratis, san kòd.

1. Kreye yon kont gratis sou emailjs.com.
2. **Email Services** → konekte kont Gmail ou (`jloodna@gmail.com`) → kopye **Service ID**.
3. **Email Templates** → kreye yon modèl ki gen varyab sa yo nan kò mesaj la:
   `{{order_number}}`, `{{customer_name}}`, `{{phone}}`, `{{whatsapp}}`, `{{address}}`,
   `{{payment_method}}`, `{{total}}`, `{{items_list}}`, `{{notes}}` → kopye **Template ID**.
4. **Account → General** → kopye **Public Key**.
5. Louvri `js/config.js`, ranpli:
   ```js
   EMAILJS_PUBLIC_KEY: 'xxxxxxxx',
   EMAILJS_SERVICE_ID: 'service_xxxx',
   EMAILJS_TEMPLATE_ID: 'template_xxxx',
   ```
6. Telechaje fichye a sou GitHub/Netlify. Se tout — chak kòmand ap voye yon imel
   otomatikman bay `jloodna@gmail.com`.

San etap sa a, kòmand yo toujou anrejistre (kliyan an wè konfimasyon an), men **ou p ap
resevwa imel** — se poutèt sa n rekòmande fòtman konfigire l.

---

## 6. PayPal — enpòtan pou konprann

Sit sa a se yon sit **100% estatik san serveur**. Sa vle di entegrasyon PayPal la
itilize sèlman **Client ID** la (piblik) pou montre bouton PayPal yo, epi peman an
konplete/kapte **dirèkteman nan navigatè kliyan an** (`actions.order.capture()`),
san okenn verifikasyon adisyonèl sou yon sèvè.

⚠️ **JAMÈ mete yon "Client Secret" PayPal nan okenn fichye JS ki deplwaye piblikman** —
nenpòt moun ki gade kòd sous paj la ta ka wè l epi itilize l pou aksede kont PayPal
biznis ou (kreye/kapte lòd, elatriye). Se pou rezon sa a nou pa mete Client Secret ou
te bay la a nan okenn fichye.

**Rekòmandasyon sekirite:** menm si Client Secret la pa nan sit la, li te ekri nan
konvèsasyon sa a — pa prekosyon, ale sou [developer.paypal.com](https://developer.paypal.com)
epi **jenere yon nouvo Client Secret** pou app ou a (Client ID la li menm pa yon sekrè,
li ka rete piblik san danje).

**Limit teknik ki egziste pou tout sit san backend:** paske total la kalkile bò kliyan
an (JavaScript nan navigatè a), yon itilizatè ki gen konesans teknik ta ka ouvri
"console" navigatè a epi eseye modifye montan an anvan l voye l bay PayPal. Pou yon
boutik ki fè anpil volim vant, nou rekòmande — pita — ajoute yon ti sèvè (menm yon
"serverless function" gratis tankou Netlify Functions) ki verifye montan an anvan l
konfime peman an. Pou kounye a, peye lè livre (kach) pa gen risk sa a menm.

---

## 7. Chanje modpas admin

Louvri `js/config.js`, chanje liy:
```js
ADMIN_PASSWORD: '@JLoodna-2002',
```
Sonje: modpas sa a se yon pwoteksyon **lejè** sèlman — kòd la vizib pou nenpòt moun ki
konsilte sous paj la. Pa itilize l pou pwoteje enfòmasyon vrèman sansib.

---

## 8. Limit yon sit 100% estatik (onèt ak ou)

- **Pa gen kont kliyan/koneksyon** — chak kòmand se yon "kòmand envite" (yo bay non/telefòn/adrès).
- **Panyen ak kòmand yo estoke lokalman** (`localStorage`) sou aparèy kliyan an — si l chanje
  navigatè oswa efase done navigasyon, li pèdi istorik li. Notifikasyon imel se sous
  prensipal pou admin.
- **Estòk pa "sekwonize" ant kliyan** an tan reyèl — de kliyan ka achte dènye pyès la an
  menm tan (ka rive nan nenpòt ti boutik san sistèm santral tou).
- **Chanjman pwodwi mande yon ti etap manyèl** (telechaje + re-telechaje `products.js`) —
  se pri pou pa gen okenn sèvè pou peye/jere.

Si pita ou vle otomatize sa a nèt (chanjman pwodwi ki vizib pou tout moun san w pa
telechaje anyen, kont kliyan reyèl, verifikasyon PayPal sou sèvè), n ap bezwen ajoute yon
ti baz done an liy (pa egzanp Firebase oswa Supabase, tou de gen yon plan gratis) — mande
nou lè w pare pou etap sa a.
