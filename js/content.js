/* SAMPLE CONTENT: the services, reviews and article texts below are drafts written for the design preview.
   Replace them with the client's real services and customer reviews. Set SHOW_SAMPLE_BADGES=false to hide the "Sample" tags. */
const SHOW_SAMPLE_BADGES = true;
const SERVICES = [
   { name: "Skin consultation", desc: "Talk through your skin type and concerns and get honest product and routine recommendations.", points: ["Discuss your skin type and goals", "Product recommendations for your routine", "A simple plan you can follow at home"] },
   { name: "Facial treatment", desc: "A relaxing facial to cleanse, refresh and nourish the skin.", points: ["Gentle cleansing", "Nourishing care suited to your skin type", "A calm, relaxing session"] },
   { name: "Body treatment", desc: "An exfoliating and moisturising treatment for smooth, comfortable skin.", points: ["Gentle exfoliation", "Rich moisture for dry areas", "Skin that feels soft and refreshed"] },
   { name: "Skin repair care", desc: "A guided care plan for everyday concerns such as dryness and uneven tone.", points: ["Review of your current routine", "Care steps chosen around your concerns", "Follow-up advice on WhatsApp"] }];
const REVIEWS = [
   { name: "Amaka O.", place: "Lagos", stars: 5, product: "Luxy Glowing Body Milk", text: "I use the body milk after every shower and my skin feels soft all day." },
   { name: "Chidi E.", place: "Abuja", stars: 5, product: "Ordering", text: "Ordering on WhatsApp was easy and my package arrived quickly." },
   { name: "Tolu A.", place: "Ibadan", stars: 5, product: "Gentle Facial Cleanser", text: "The routine steps made everything simple to follow, and my skin feels clean and comfortable." }];
const ARTICLES = [
   {
      slug: "simple-routine-for-brown-skin", title: "A simple morning and night routine", cat: "Routine", read: "3 min read", img: "img/journal-1.jpg", excerpt: "You do not need ten products. Four steps, done consistently, go a long way.",
      body: [{ p: "A good routine does not need ten products. Four steps, done consistently, go a long way: cleanse, treat, nourish and protect." }, { h: "Morning", p: "Cleanse gently with water or a mild cleanser, apply any treatment you use, moisturise, then finish with sun protection." }, { h: "Night", p: "Cleanse to remove the day, apply your treatment, and moisturise to help your skin hold on to water overnight." }, { h: "A tip for starting out", p: "Introduce one new product at a time and give it a couple of weeks, so you can tell what is working for your skin." }], cta: { t: "Shop the collection", href: "shop.html" }
   },
   {
      slug: "sun-protection-every-skin-tone", title: "Why sun protection matters for every skin tone", cat: "Protection", read: "2 min read", img: "img/journal-2.jpg", excerpt: "Melanin gives some natural protection, but not complete protection.",
      body: [{ p: "Melanin gives brown skin some natural protection from the sun, but not complete protection. Sun exposure can also darken existing dark marks and make skin tone look uneven." }, { h: "Make it a daily habit", p: "Apply sun protection to exposed skin every morning and reapply as directed on the product label. Choose a texture you enjoy, because the best sun protection is the one you will actually use." }, { h: "Do not forget the extras", p: "Hats, sunglasses and shade all help, especially in the middle of the day." }], cta: { t: "Shop protection", href: "shop.html?cat=protection" }
   },
   {
      slug: "how-to-choose-a-cleanser", title: "How to choose a cleanser for your skin type", cat: "Cleansing", read: "2 min read", img: "img/journal-3.jpg", excerpt: "A good cleanser leaves skin clean and comfortable, never tight.",
      body: [{ p: "A good cleanser removes dirt, sweat and product without leaving your skin feeling tight or stripped." }, { h: "Dry or tight-feeling skin", p: "Look for creamy or lotion-style cleansers that feel gentle and leave skin comfortable." }, { h: "Oily or combination skin", p: "Gel cleansers can feel fresh and light. Choose one that still leaves your skin feeling comfortable after rinsing." }, { h: "Sensitive skin", p: "Fragrance-free formulas are usually a safe place to start. Patch test new products on a small area first." }, { h: "How often", p: "Cleansing once or twice a day is enough for most people." }], cta: { t: "Shop cleansers", href: "shop.html?cat=cleansers" }
   },
   {
      slug: "body-milk-butter-or-cream", title: "Body milk, butter or cream: what is the difference?", cat: "Body care", read: "2 min read", img: "img/journal-4.jpg", excerpt: "Lighter or richer? Here is how to pick the right texture.",
      body: [{ p: "Body products mostly differ in how rich they feel." }, { h: "Body milk and lotion", p: "Lighter textures that absorb quickly, which makes them easy to use every day and in warm weather." }, { h: "Creams", p: "A little richer, good for skin that feels dry between applications." }, { h: "Butters", p: "The richest option, ideal for very dry areas such as elbows, knees and heels." }, { h: "When to apply", p: "Apply within a few minutes of bathing, while your skin is still slightly damp, to help lock in moisture." }], cta: { t: "Shop body care", href: "shop.html?cat=creams" }
   }];
const GLOSSARY = [
   { t: "Emollient", d: "An ingredient that softens and smooths the skin, such as shea butter and squalane." },
   { t: "Fragrance-free", d: "A product with no added perfume. A good choice if your skin is sensitive." },
   { t: "Glycerin", d: "A humectant found in many moisturisers and cleansers. It helps skin hold on to water." },
   { t: "Humectant", d: "An ingredient that attracts water to the skin. Glycerin and hyaluronic acid are common examples." },
   { t: "Hyaluronic acid", d: "A humectant that can hold a lot of water. It is used to give skin a plump, hydrated feel." },
   { t: "Niacinamide", d: "A form of vitamin B3, often used to support the skin barrier and the look of even skin tone." },
   { t: "Occlusive", d: "An ingredient that forms a protective layer on the skin to slow water loss, such as petrolatum and some plant butters and waxes." },
   { t: "Shea butter", d: "A rich plant butter from the nut of the shea tree. It is an emollient that helps soften dry skin." },
   { t: "Squalane", d: "A lightweight, non-greasy emollient that helps skin feel soft." },
   { t: "Vitamin C", d: "An antioxidant often used to help skin look brighter. It can irritate some skin, so introduce it slowly." }];
const EXTRA = (() => {
   const $ = (s, r = document) => r.querySelector(s), esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
   const badge = SHOW_SAMPLE_BADGES ? '<span class="sample">Sample</span>' : '';
   const wa = m => 'https://wa.me/' + SITE.whatsapp + '?text=' + encodeURIComponent(m);
   const svc = (s, i, full) => `<div class="col"><div class="svc h-100 reveal"><div class="svc-top"><span class="num">0${i + 1}</span>${badge}</div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p>${full ? `<ul class="ticks">${s.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}<a class="bt dark" href="${wa('Hello Brown Skin Care, I would like to book: ' + s.name)}">Book on WhatsApp</a></div></div>`;
   const rev = r => `<div class="col"><div class="rev reveal"><div class="stars" aria-label="${r.stars} out of 5">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div><q>${esc(r.text)}</q><div class="who"><span><b>${esc(r.name)}</b><br><small>${esc(r.place)} · ${esc(r.product)}</small></span>${badge}</div></div></div>`;
   const art = a => `<div class="col"><a class="jcard reveal" href="article.html?slug=${a.slug}"><img loading="lazy" src="${a.img}" alt=""><span class="cat">${esc(a.cat)} · ${esc(a.read)}</span><h3>${esc(a.title)}</h3><p>${esc(a.excerpt)}</p></a></div>`;
   return {
      home() {
         const a = $('#svcTeaser'); if (a) a.innerHTML = SERVICES.slice(0, 3).map((s, i) => svc(s, i, false)).join('');
         const b = $('#reviews'); if (b) b.innerHTML = REVIEWS.map(rev).join(''); const c = $('#journalTeaser'); if (c) c.innerHTML = ARTICLES.slice(0, 3).map(art).join('')
      },
      services() { $('#svcList').innerHTML = SERVICES.map((s, i) => svc(s, i, true)).join('') },
      journal() {
         $('#jList').innerHTML = ARTICLES.map(art).join('');
         $('#gloss').innerHTML = GLOSSARY.map((g, i) => `<details><summary>${esc(g.t)}</summary><div><p>${esc(g.d)}</p></div></details>`).join('')
      },
      article() {
         const a = ARTICLES.find(x => x.slug === new URLSearchParams(location.search).get('slug')), R = $('#article');
         if (!a) { R.innerHTML = '<h1>Article not found</h1><p><a href="journal.html">Back to the journal</a></p>'; return }
         document.title = a.title + ' | Brown Skin Care';
         R.innerHTML = `<nav class="crumbs"><a href="index.html">Home</a> / <a href="journal.html">Journal</a> / ${esc(a.cat)}</nav><span class="eyebrow">${esc(a.cat)}</span><h1>${esc(a.title)}</h1><p class="meta2">${esc(a.read)}</p><img class="cover" src="${a.img}" alt="">${a.body.map(b => (b.h ? `<h2>${esc(b.h)}</h2>` : '') + `<p>${esc(b.p)}</p>`).join('')}<p><a class="bt dark" href="${a.cta.href}">${esc(a.cta.t)}</a></p><p class="note2">General information only, not medical advice. For ongoing skin concerns, please see a doctor or dermatologist.</p>`;
         $('#more').innerHTML = ARTICLES.filter(x => x !== a).slice(0, 3).map(art).join('')
      }
   }
})();
