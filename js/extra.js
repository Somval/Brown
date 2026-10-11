/* Contact form: opens WhatsApp with the message ready to send. The number is set on the form (data-whatsapp). */
(() => {
    const f = document.getElementById('contactForm');
    if (f) f.onsubmit = e => { e.preventDefault(); const d = new FormData(f), t = 'Hello Brown Skin Care, my name is ' + d.get('name') + '. ' + d.get('message') + ' (My phone: ' + d.get('phone') + ')'; window.open('https://wa.me/' + (f.dataset.whatsapp || '2348085030533') + '?text=' + encodeURIComponent(t), '_blank') };
})();
