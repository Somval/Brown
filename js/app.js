/* Behaviour only: slider, menu, cart, shop filters, product page. No content lives here:
   products, services, reviews and articles are written directly in the HTML files. */
(() => {
   const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
   const money = n => '₦' + Number(n).toLocaleString('en-NG');
   const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
   /* ---------- cart (saved in the visitor's browser) ---------- */
   let mem = {}; const KEY = 'bsc_cart2';
   const Cart = {
      get() { try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch (e) { return mem } },
      set(c) { mem = c; try { localStorage.setItem(KEY, JSON.stringify(c)) } catch (e) { } count() },
      add(p, q) { const c = this.get(), o = c[p.id] || Object.assign({}, p, { qty: 0 }); o.qty = Math.min(o.qty + q, p.stock || 99); c[p.id] = o; this.set(c) }
   };
   function count() { const n = Object.values(Cart.get()).reduce((a, r) => a + (r.qty || 0), 0); $$('#cartCount').forEach(e => e.textContent = n) }
   let tt; function toast(m) { const t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 1800) }
   function observe() {
      if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(e => e.classList.add('in')); return }
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .1 }); $$('.reveal:not(.in)').forEach(el => io.observe(el))
   }
   /* ---------- hero slider + navbar ---------- */
   const sl = $$('.slide'), nav = $('.site-nav');
   if (sl.length) {
      let i = 0, t; const d = $('.dots'), hero = $('.hero');
      sl.forEach((_, n) => { const b = document.createElement('button'); b.setAttribute('aria-label', 'Slide ' + (n + 1)); b.innerHTML = '<i></i>'; b.onclick = () => go(n); d.appendChild(b) });
      const dots = [...d.children];
      function go(n) {
         i = (n + sl.length) % sl.length; sl.forEach((s, k) => s.classList.toggle('on', k === i)); dots.forEach((b, k) => { b.classList.remove('on'); if (k === i) { void b.offsetWidth; b.classList.add('on') } });
         clearTimeout(t); if (!(window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches)) t = setTimeout(() => go(i + 1), 6000)
      }
      $('.prev').onclick = () => go(i - 1); $('.next').onclick = () => go(i + 1);
      let x0; hero.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
      hero.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)) }); go(0)
   }
   const solid = () => nav.classList.toggle('solid', scrollY > 40); solid(); addEventListener('scroll', solid, { passive: true });
   document.addEventListener('show.bs.collapse', () => nav.classList.add('solid')); document.addEventListener('hidden.bs.collapse', solid);
   /* ---------- add to bag: any element with data-add + data-id/name/price/image/url/stock ---------- */
   document.addEventListener('click', e => {
      const b = e.target.closest('[data-add]'); if (!b) return; const d = b.dataset, w = b.closest('.buy'), q = w ? +$('input', w).value || 1 : 1;
      Cart.add({ id: d.id, name: d.name, price: +d.price, image: d.image, url: d.url, stock: +d.stock || 99 }, q); toast('Added to your bag')
   });
   /* ---------- shop page: filters, search, sort (reads data-* on each product card) ---------- */
   const grid = $('#grid');
   if (grid && $('#fCon')) {
      const u = new URLSearchParams(location.search), C = u.get('cat') || '', K = u.get('concern') || '', Qraw = (u.get('q') || '').trim(), Q = Qraw.toLowerCase(), S = u.get('sort') || '';
      const link = (k, v) => { const x = new URLSearchParams({ cat: C, concern: K, q: Qraw, sort: S }); x.set(k, v);[...x].forEach(([a, b]) => { if (!b) x.delete(a) }); const s = x.toString(); return 'shop.html' + (s ? '?' + s : '') };
      $$('[data-filter]').forEach(a => { const k = a.dataset.filter, v = a.dataset.value; a.href = link(k, v); a.classList.toggle('on', (k === 'concern' ? K : C) === v) });
      const cols = $$(':scope > .col', grid); let n = 0;
      cols.forEach(c => { const d = c.dataset, show = (!C || d.cat === C) && (!K || d.concern === K) && (!Q || ((d.name || '') + ' ' + (d.tag || '')).toLowerCase().includes(Q)); c.hidden = !show; if (show) n++ });
      const by = { price_asc: (a, b) => a.dataset.price - b.dataset.price, price_desc: (a, b) => b.dataset.price - a.dataset.price, new: (a, b) => b.dataset.order - a.dataset.order }[S] || ((a, b) => a.dataset.order - b.dataset.order);
      cols.sort(by).forEach(c => grid.appendChild(c));
      $('#hCat').value = C; $('#hCon').value = K; $('#q').value = Qraw; $('#sort').value = S; $('#sort').onchange = () => $('#tools').submit();
      $('#cnt').textContent = n + ' product' + (n == 1 ? '' : 's'); $('#none').hidden = n > 0
   }
   /* ---------- product page: quantity stepper + photo thumbnails ---------- */
   $$('.qty').forEach(q => { const i = $('input', q); $$('button', q).forEach(b => b.onclick = () => { i.value = Math.min(+i.max || 99, Math.max(1, (+i.value || 1) + +b.dataset.s)) }) });
   const mi = $('.gal .ph.big img'), tb = $$('.thumbs button'); tb.forEach(b => b.onclick = () => { mi.src = b.dataset.src; tb.forEach(x => x.classList.toggle('on', x === b)) });
   /* ---------- cart page ---------- */
   const R = $('#cart');
   if (R) {
      const draw = () => {
         const c = Cart.get(), rows = Object.values(c).filter(r => r && r.qty > 0);
         if (!rows.length) { R.innerHTML = '<p class="empty">Your cart is empty. <a href="shop.html">Browse the collection</a></p>'; return }
         const total = rows.reduce((a, r) => a + r.price * r.qty, 0);
         R.innerHTML = `<div class="row g-4 g-xl-5"><div class="col-lg-7">${rows.map(r => `<div class="citem row g-3 align-items-center"><div class="col-auto"><img src="${esc(r.image)}" alt=""></div><div class="col"><a href="${esc(r.url)}">${esc(r.name)}</a><br><small>${money(r.price)}</small></div><div class="col-12 col-sm-auto order-3 order-sm-2"><input type="number" min="1" max="${r.stock || 99}" value="${r.qty}" data-id="${esc(r.id)}" aria-label="Quantity"> <button class="rm" data-rm="${esc(r.id)}">Remove</button></div><div class="col-auto order-2 order-sm-3 citem-total">${money(r.price * r.qty)}</div></div>`).join('')}<p class="total">Total <b>${money(total)}</b></p></div>
 <div class="col-lg-5"><form class="checkout" id="co"><h2>Delivery details</h2><input name="name" placeholder="Full name" required><input name="phone" placeholder="Phone number" required><input name="email" type="email" placeholder="Email" required><input name="city" placeholder="City" required><textarea name="address" placeholder="Delivery address" required></textarea><button class="bt dark">Pay with Paystack</button>
 
 </form></div></div>`;
         $$('input[data-id]', R).forEach(i => i.onchange = () => { const c = Cart.get(), r = c[i.dataset.id]; r.qty = Math.max(1, Math.min(+i.value || 1, r.stock || 99)); Cart.set(c); draw() });
         $$('[data-rm]', R).forEach(b => b.onclick = () => { const c = Cart.get(); delete c[b.dataset.rm]; Cart.set(c); draw() });
         $('#co').onsubmit = e => { e.preventDefault(); Cart.set({}); R.innerHTML = 
         // '<p class="ok">Thank you! This is the design preview, so no payment was taken. Order details will be saved once the back end is connected.</p>
         '<a class="bt dark" href="index.html">Back to the shop</a>' }
      }; draw()
   }
   count(); observe();
})();
{/* <p class="demo">Design preview: online payment will be connected when the PHP back end is added.</p> */}