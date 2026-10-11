BROWN SKIN CARE - static website (HTML, CSS, JavaScript). No server needed: open index.html in Chrome.

ALL CONTENT IS IN THE HTML FILES. JavaScript only handles behaviour (slider, cart, shop filters, animations).

WHERE TO EDIT THINGS
  Products ....... a product appears in 3 places - keep them in sync:
                   1) index.html  (section "Our favourites")        one <div class="col"> block per product
                   2) shop.html   (the #grid)                       same block + data-cat, data-concern, data-price, data-name, data-tag, data-order
                   3) product-<name>.html                           the full product page (price, text, benefits, how to use, ingredients, photos)
                   The "Add to bag" button carries the product details (data-id, data-name, data-price, data-image, data-url, data-stock).
                   Change a price: edit the number in the card(s), the data-price/data-... attributes, and the product page.
  Add a product .. copy a card block + copy a product-*.html page, then change the text, image and a new unique data-id.
  Remove a product delete its card block in index.html and shop.html, and delete its product-*.html file.
  Sold out ....... replace the <button class="quick" ...> with <span class="sold">Sold out</span>
  Categories / concerns ... the filter buttons are at the top of shop.html; each product's data-cat / data-concern must match a button's data-value.
  Services ....... services.html (all 4) and the first 3 on index.html. Edit the Book on WhatsApp link text if you rename a service.
  Reviews ........ index.html (section "What our customers say"). Replace the sample reviews, then delete the <span class="sample">Sample</span> tags.
  Journal ........ journal.html (article cards + ingredient guide); each article is its own file: article-*.html
  About / contact . about.html, contact.html (FAQ is plain HTML). Add the shop address and opening hours where the comment says so.
  Phone / WhatsApp number ... search all files for 2348085030533 and 0808 503 0533 and replace them.
  Hero slides .... text is in index.html (class="slide"); photos are img/slide-N.jpg (desktop 1920x1080) and img/slide-N-m.jpg (phone 1080x2340).
  Logo ........... img/logo-*.png

FILES
  css/style.css, css/pages.css, css/motion.css   styling (Bootstrap 5.3.3 is in vendor/, used for the grid and menu)
  js/app.js      slider, menu, cart, shop filters, product page   (no content inside)
  js/extra.js    contact form -> opens WhatsApp
  js/motion.js   animations (intro curtain, word-by-word headlines, golden dust, scroll reveals, tilt, fly-to-cart)
                 Respects the visitor's "reduce motion" setting. To remove the intro, delete the <div class="preloader"> block from the pages.

NOTE: only product 1 (Luxy Glowing Body Milk) uses the client's real label text. The other products, the services, the reviews
and the journal articles are SAMPLE text to replace/confirm with the client.
