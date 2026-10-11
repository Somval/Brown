(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches, root = document.documentElement;
  const safe = f => { try { f() } catch (e) { console.warn('motion:', e) } };
  const nav = $('.site-nav'), hero = $('.hero');
  /* intro: release the hero delay once the curtain has lifted */
  safe(() => { if (root.classList.contains('has-pre')) setTimeout(() => root.classList.remove('has-pre'), 2500) });
  /* hero headlines: word-by-word reveal */
  safe(() => {
    let k = 0; const split = n => {
      [...n.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          if (!c.textContent.trim()) return; const f = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(w => {
            if (!w) return; if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(' ')); return }
            const o = document.createElement('span'); o.className = 'w'; o.setAttribute('aria-hidden', 'true'); o.style.setProperty('--k', k++); const i = document.createElement('span'); i.textContent = w; o.appendChild(i); f.appendChild(o)
          }); c.replaceWith(f)
        } else if (c.nodeType === 1) split(c)
      })
    };
    $$('.slide .cap h1,.slide .cap h2').forEach(h => { h.setAttribute('aria-label', [...h.childNodes].map(n => n.textContent.trim()).filter(Boolean).join(' ')); k = 0; split(h) })
  });
  /* progress bar, smart navbar, hero parallax */
  let bar = null, last = 0, tick = false;
  safe(() => {
    bar = document.createElement('div'); bar.className = 'scrollbar'; document.body.appendChild(bar);
    const run = () => {
      const y = scrollY, max = root.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      if (hero && !RM && innerWidth > 860 && y < innerHeight * 1.3) hero.style.setProperty('--py', (y * .22).toFixed(1) + 'px');
      if (nav && !RM) { const d = y - last; if (!$('.navbar-collapse.show')) { if (y > 260 && d > 6) nav.classList.add('nav-hide'); else if (d < -6 || y < 120) nav.classList.remove('nav-hide') } } last = y; tick = false
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(run) } }, { passive: true }); run()
  });
  /* scroll reveals: directions, stagger, wipes, eyebrow lines */
  safe(() => {
    $$('.story .col-md-5, .sbox').forEach(e => e.classList.add(e.classList.contains('sbox') ? 'from-right' : 'from-left'));
    $$('.spot').forEach(e => e.classList.add('zoom'));
    $$('.row').forEach(r => [...r.children].forEach((c, i) => { if (c.classList.contains('reveal') || c.querySelector('.reveal')) c.style.setProperty('--d', Math.min(i, 8) * 85 + 'ms') }));
    $$('.steps li,.how li').forEach((li, i) => li.style.setProperty('--i', i % 4));
    $$('.story .pic,.story .art,.pic,.art,.article img.cover').forEach(e => e.classList.add('wipe'));
    document.addEventListener('transitionend', e => { if (e.propertyName === 'opacity' && e.target.classList && e.target.classList.contains('reveal')) e.target.style.transitionDelay = '0s' });
    const eb = $$('.wrap .eyebrow'), wp = $$('.wipe'), map = new Map(); wp.forEach(w => { const p = w.parentElement; map.set(p, (map.get(p) || []).concat(w)) });
    if (RM || !('IntersectionObserver' in window)) { eb.concat(wp).forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const t = e.target; (map.get(t) || [t]).forEach(x => x.classList.add('in')); io.unobserve(t) } }), { threshold: .25 });
    eb.forEach(e => io.observe(e)); map.forEach((_, p) => io.observe(p))
  });
  /* golden dust over the hero */
  safe(() => {
    if (!hero || RM) return; const c = document.createElement('canvas'); c.className = 'dust'; c.setAttribute('aria-hidden', 'true'); hero.appendChild(c);
    const x = c.getContext('2d'), dpr = Math.min(devicePixelRatio || 1, 2), N = innerWidth < 700 ? 16 : 34; let W, H, run = false, P = [];
    const size = () => { W = c.width = hero.clientWidth * dpr; H = c.height = hero.clientHeight * dpr };
    const mk = init => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 20, r: (Math.random() * 2.2 + .6) * dpr, s: (Math.random() * .35 + .12) * dpr, a: Math.random() * .5 + .15, p: Math.random() * 6.28, dx: (Math.random() - .5) * .25 * dpr });
    size(); P = Array.from({ length: N }, () => mk(true));
    const frame = t => {
      if (!run) return; x.clearRect(0, 0, W, H); for (const p of P) {
        p.y -= p.s; p.x += p.dx + Math.sin(t / 1800 + p.p) * .25 * dpr; if (p.y < -20) Object.assign(p, mk(false));
        const al = p.a * (.6 + .4 * Math.sin(t / 900 + p.p)), g = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4); g.addColorStop(0, 'rgba(255,214,150,' + al + ')'); g.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = g; x.beginPath(); x.arc(p.x, p.y, p.r * 4, 0, 6.283); x.fill()
      } requestAnimationFrame(frame)
    };
    const go = v => { const was = run; run = v && !document.hidden; if (run && !was) requestAnimationFrame(frame) };
    new IntersectionObserver(es => go(es[0].isIntersecting)).observe(hero); addEventListener('resize', size); document.addEventListener('visibilitychange', () => go(hero.getBoundingClientRect().bottom > 0))
  });
  /* tilt on product images (mouse devices only) */
  safe(() => {
    if (RM || !matchMedia('(hover:hover)').matches) return; $$('.pcard .ph').forEach(el => {
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5; el.style.transition = 'transform .1s'; el.style.transform = 'perspective(700px) rotateY(' + px * 8 + 'deg) rotateX(' + -py * 8 + 'deg)' });
      el.addEventListener('pointerleave', () => { el.style.transition = 'transform .5s'; el.style.transform = '' })
    })
  });
  /* add to bag: product flies to the cart, badge bumps */
  safe(() => {
    const badge = $('#cartCount'); if (badge) new MutationObserver(() => { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump') }).observe(badge, { childList: true, characterData: true, subtree: true });
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-add]'); if (!b || RM) return;
      const img = (b.closest('.pcard') && $('.ph img', b.closest('.pcard'))) || $('.gal .ph.big img'), cart = $('.cart'); if (!img || !cart) return;
      if (nav) nav.classList.remove('nav-hide'); const s = img.getBoundingClientRect(), t = cart.getBoundingClientRect(), f = img.cloneNode(); f.className = 'fly';
      Object.assign(f.style, { left: s.left + 'px', top: s.top + 'px', width: s.width + 'px', height: s.height + 'px' }); document.body.appendChild(f);
      const dx = t.left + t.width / 2 - (s.left + s.width / 2), dy = t.top + t.height / 2 - (s.top + s.height / 2);
      f.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx * .55 + 'px,' + (dy * .55 - 70) + 'px) scale(.4)', opacity: .95, offset: .55 }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.04)', opacity: .2 }], { duration: 850, easing: 'cubic-bezier(.5,0,.3,1)' }).onfinish = () => f.remove()
    })
  });
  /* soft fade between pages */
  safe(() => {
    if (RM) return; document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || a.target || a.hasAttribute('download')) return; const h = a.getAttribute('href');
      if (!h || h[0] === '#' || /^(tel:|mailto:|https?:|javascript:)/.test(h)) return; const u = new URL(a.href, location.href); if (u.pathname === location.pathname && u.hash) return;
      e.preventDefault(); root.classList.add('leaving'); setTimeout(() => { location.href = a.href }, 240)
    });
    addEventListener('pageshow', e => { if (e.persisted) root.classList.remove('leaving') })
  });
})();
