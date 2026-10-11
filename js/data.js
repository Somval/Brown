/* Placeholder catalogue: only product 1 uses the client label text. Replace the rest from real labels. Ingredients are left empty on purpose. */
/* Fill SITE.address and SITE.hours below (e.g. "12 Example Street, Lagos") to show a Visit us block on the Contact page. */
const SITE={"whatsapp": "2348085030533", "phone": "0808 503 0533", "address": "", "hours": ""};
const CATEGORIES=[{"id": 1, "name": "Serums", "slug": "serums"}, {"id": 2, "name": "Creams", "slug": "creams"}, {"id": 3, "name": "Cleansers", "slug": "cleansers"}, {"id": 4, "name": "Masks", "slug": "masks"}, {"id": 5, "name": "Protection", "slug": "protection"}, {"id": 6, "name": "Scrubs", "slug": "scrubs"}, {"id": 7, "name": "Soaps", "slug": "soaps"}];
const CONCERNS=[{"id": 1, "name": "Hyperpigmentation", "slug": "hyperpigmentation"}, {"id": 2, "name": "Hydration", "slug": "hydration"}, {"id": 3, "name": "Glow", "slug": "glow"}, {"id": 4, "name": "Anti-Aging", "slug": "anti-aging"}, {"id": 5, "name": "Brightening", "slug": "brightening"}, {"id": 6, "name": "Barrier", "slug": "barrier"}];
const PRODUCTS=[
 {
  "id": 1,
  "cat": 2,
  "con": 5,
  "name": "Luxy Glowing Body Milk",
  "tagline": "Intensive care for dry skin",
  "size": "500ml",
  "skin": "Dry skin",
  "sku": "BSC-BM-500",
  "desc": "Intensive care for dry skin. A brightening body milk that improves a healthy skin tone. Use day and night.",
  "benefits": [
   "Intensive care for dry skin",
   "Brightens and improves a healthy skin tone",
   "For day and night use"
  ],
  "ingredients": "",
  "how": "Pump onto clean skin and massage in. Use day and night.",
  "price": 15000,
  "stock": 50,
  "featured": true,
  "images": [
   "img/products/luxy-glowing-body-milk.jpg"
  ]
 },
 {
  "id": 2,
  "cat": 3,
  "con": 6,
  "name": "Gentle Facial Cleanser",
  "tagline": "Gentle daily cleansing for the face",
  "size": "200ml",
  "skin": "All skin types",
  "sku": "BSC-FC-200",
  "desc": "A gentle daily facial cleanser for all skin types.",
  "benefits": [
   "Gentle, everyday cleansing",
   "Suitable for all skin types",
   "Part of the Brown ritual"
  ],
  "ingredients": "",
  "how": "Massage onto damp skin, then rinse with water. Use morning and night.",
  "price": 6500,
  "stock": 40,
  "featured": true,
  "images": [
   "img/products/p-cleanser.svg"
  ]
 },
 {
  "id": 3,
  "cat": 2,
  "con": 5,
  "name": "Brightening Face Cream",
  "tagline": "Daily face cream for an even-looking tone",
  "size": "50g",
  "skin": "All skin types",
  "sku": "BSC-FCR-50",
  "desc": "A daily face cream to support an even, healthy-looking tone.",
  "benefits": [
   "Supports an even-looking tone",
   "Soft, comfortable finish",
   "Suitable for all skin types"
  ],
  "ingredients": "",
  "how": "Apply a small amount to clean skin morning and night.",
  "price": 9500,
  "stock": 30,
  "featured": true,
  "images": [
   "img/products/p-face-cream.svg"
  ]
 },
 {
  "id": 4,
  "cat": 6,
  "con": 3,
  "name": "Exfoliating Body Scrub",
  "tagline": "Smooth, refreshed skin",
  "size": "250g",
  "skin": "All skin types",
  "sku": "BSC-BS-250",
  "desc": "A body scrub to smooth and refresh the skin.",
  "benefits": [
   "Smooths the skin",
   "Leaves skin feeling fresh",
   "For use in the shower"
  ],
  "ingredients": "",
  "how": "Massage onto damp skin in circular motions, then rinse. Use 1 to 2 times a week.",
  "price": 7500,
  "stock": 35,
  "featured": true,
  "images": [
   "img/products/p-body-scrub.svg"
  ]
 },
 {
  "id": 5,
  "cat": 7,
  "con": 6,
  "name": "Herbal Bar Soap",
  "tagline": "A cleansing bar for face and body",
  "size": "100g",
  "skin": "All skin types",
  "sku": "BSC-SP-100",
  "desc": "A cleansing bar soap for face and body.",
  "benefits": [
   "Cleanses face and body",
   "Long-lasting bar",
   "Suitable for all skin types"
  ],
  "ingredients": "",
  "how": "Lather with water and rinse well.",
  "price": 2500,
  "stock": 80,
  "featured": true,
  "images": [
   "img/products/61sSYnrc1zL._AC_UF1000,1000_QL80_.jpg"
  ]
 },
 {
  "id": 6,
  "cat": 6,
  "con": 3,
  "name": "Radiance Face Scrub",
  "tagline": "A gentle polish for the face",
  "size": "100ml",
  "skin": "All skin types",
  "sku": "BSC-FS-100",
  "desc": "A gentle face scrub for smoother-feeling skin.",
  "benefits": [
   "Leaves skin feeling smooth",
   "Gentle on the face",
   "Use weekly"
  ],
  "ingredients": "",
  "how": "Massage gently onto damp skin, avoiding the eyes, then rinse. Use 1 to 2 times a week.",
  "price": 5500,
  "stock": 30,
  "featured": true,
  "images": [
   "img/products/61sSYnrc1zL._AC_UF1000,1000_QL80_.jpg"
  ]
 },
 {
  "id": 7,
  "cat": 2,
  "con": 2,
  "name": "Nourishing Body Butter",
  "tagline": "Rich comfort for dry skin",
  "size": "250g",
  "skin": "Dry skin",
  "sku": "BSC-BB-250",
  "desc": "A rich body butter for dry skin.",
  "benefits": [
   "Rich, comforting moisture",
   "For dry skin",
   "Softens the feel of skin"
  ],
  "ingredients": "",
  "how": "Massage into clean skin, focusing on dry areas.",
  "price": 8500,
  "stock": 25,
  "featured": true,
  "images": [
   "img/products/c09eb6056dd94042079265830f16a80b4e81772a.jpeg"
  ]
 },
 {
  "id": 8,
  "cat": 5,
  "con": 6,
  "name": "Daily Sun Lotion",
  "tagline": "Light lotion for sunny days",
  "size": "100ml",
  "skin": "All skin types",
  "sku": "BSC-SL-100",
  "desc": "A light daily lotion for sun-exposed days.",
  "benefits": [
   "Light, easy-to-wear feel",
   "Suitable for daily use",
   "Absorbs without a heavy feel"
  ],
  "ingredients": "",
  "how": "Apply evenly to exposed skin before going out. Reapply as directed on the label.",
  "price": 8000,
  "stock": 25,
  "featured": true,
  "images": [
   "img/products/de9feb65-39f7-4f87-a063-d50d5423272c-removebg-preview.webp"
  ]
 }
];
