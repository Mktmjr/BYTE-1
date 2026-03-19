/* ═══════════════════════════════════════
   BYTE — app.js
   Meal data, cart logic, filters, checkout
   ═══════════════════════════════════════ */

/* ── MEAL DATA ── */
const meals = [
  {
    id: 1,
    name: "Slaw Wrap",
    vendor: "Pedros",
    price: 39.90,
    category: ["Wraps"],
    image: "assets/Slaw-wrap.png",
    score: 7.8,
    vegan: false,
    description: "Fresh slaw wrapped in a soft tortilla."
  },
  {
    id: 2,
    name: "Slaw Wrap, Chips & PET Buddy",
    vendor: "Pedros",
    price: 59.90,
    category: ["Wraps", "Meals"],
    image: "assets/Slaw-wrap-meal.png",
    score: 7.5,
    vegan: false,
    description: "Slaw wrap with chips and a drink — the full meal deal."
  },
  {
    id: 3,
    name: "Pasta-bly",
    vendor: "Mo's Open Table",
    price: 45.60,
    category: ["Pasta"],
    image: "assets/Pasta-bly.png",
    score: 8.1,
    vegan: false,
    description: "A hearty pasta dish with fresh ingredients."
  },
  {
    id: 4,
    name: "Veg Burger",
    vendor: "Nandos",
    price: 60.00,
    category: ["Burgers", "Vegan"],
    image: "assets/Veggie-Burg.png",
    score: 8.0,
    vegan: true,
    description: "Plant-based burger with Nando's signature flavour."
  },
  {
    id: 5,
    name: "Nandos Salad",
    vendor: "Nandos",
    price: 50.00,
    category: ["Salads"],
    image: "assets/Nand-Salad.png",
    score: 9.0,
    vegan: false,
    description: "Fresh garden salad with a Nando's peri-peri dressing."
  },
  {
    id: 6,
    name: "Grilled Chicken Salad",
    vendor: "Nandos",
    price: 60.00,
    category: ["Salads"],
    image: "assets/Grill-chic-sal.png",
    score: 9.2,
    vegan: false,
    description: "Flame-grilled chicken over a crisp fresh salad."
  },
  {
    id: 7,
    name: "Streetwise 2 Pap & Morogo",
    vendor: "KFC",
    price: 54.90,
    category: ["Meals"],
    image: "assets/Stret-w2.png",
    score: 7.6,
    vegan: false,
    description: "KFC streetwise with traditional pap and morogo."
  },
  {
    id: 8,
    name: "Large Spicy Rice",
    vendor: "KFC",
    price: 19.90,
    category: ["Meals"],
    image: "assets/Lrg-Spc-Ric.png",
    score: 7.2,
    vegan: false,
    description: "KFC's signature large spicy rice — a satisfying side."
  },
  {
    id: 9,
    name: "Regular Spicy Rice",
    vendor: "KFC",
    price: 14.90,
    category: ["Meals"],
    image: "assets/Lrg-Spc-Ric.png",
    score: 7.2,
    vegan: false,
    description: "KFC's signature regular spicy rice."
  },
  {
    id: 10,
    name: "Tangy & Cheesy Tomato Toastie",
    vendor: "Spurs",
    price: 44.95,
    category: ["Meals", "Vegan"],
    image: "assets/toa-chee-toma.png",
    score: 7.9,
    vegan: true,
    description: "Tangy tomato and melted cheese on toasted bread."
  },
  {
    id: 11,
    name: "Bacon, Egg & Cheese Toastie",
    vendor: "Spurs",
    price: 44.95,
    category: ["Meals"],
    image: "assets/Bac-chee-eg.png",
    score: 7.4,
    vegan: false,
    description: "Classic bacon, egg and cheese on a toasted roll."
  },
  {
    id: 12,
    name: "Coconut Milk Smoothie",
    vendor: "Ola Tia",
    price: 17.80,
    category: ["Drinks", "Vegan"],
    image: "assets/Coconut.png",
    score: 9.1,
    vegan: true,
    description: "Creamy coconut milk smoothie — naturally dairy-free."
  },
  {
    id: 13,
    name: "Strawberry Milkshake",
    vendor: "Ola Tia",
    price: 18.80,
    category: ["Drinks", "Vegan"],
    image: "assets/Strawberry.png",
    score: 8.8,
    vegan: true,
    description: "Fresh strawberry milkshake, thick and delicious."
  },
  {
    id: 14,
    name: "Blueberry Milkshake",
    vendor: "Ola Tia",
    price: 18.80,
    category: ["Drinks", "Vegan"],
    image: "assets/Blueberry.png",
    score: 8.9,
    vegan: true,
    description: "Rich blueberry milkshake packed with antioxidants."
  },
  {
    id: 15,
    name: "Chickpea Sandwich",
    vendor: "Ola Tia",
    price: 25.50,
    category: ["Sandwiches", "Vegan"],
    image: "assets/Chk-pea-sandw.png",
    score: 9.3,
    vegan: true,
    description: "Hearty chickpea sandwich — high protein, fully plant-based."
  }
];

/* ── STATE ── */
let cart = [];
let studentDiscount = true;
let deliveryMode = 'delivery';
let activeCategory = 'all';
let minScore = 7.0;
let maxPrice = 100;
let searchQuery = '';
let sortMode = 'default';
let activeVendors = ['Pedros', "Mo's Open Table", 'Nandos', 'KFC', 'Spurs', 'Ola Tia'];

const DELIVERY_FEE = 5.00;
const DISCOUNT_RATE = 0.25;

/* ── RENDER MEALS ── */
function getFilteredMeals() {
  let filtered = meals.filter(m => {
    const catMatch = activeCategory === 'all' || m.category.some(c => c.toLowerCase() === activeCategory.toLowerCase());
    const scoreMatch = m.score >= minScore;
    const priceMatch = m.price <= maxPrice;
    const vendorMatch = activeVendors.includes(m.vendor);
    const searchMatch = searchQuery === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return catMatch && scoreMatch && priceMatch && vendorMatch && searchMatch;
  });

  if (sortMode === 'score-high') filtered.sort((a, b) => b.score - a.score);
  else if (sortMode === 'price-low') filtered.sort((a, b) => a.price - b.price);
  else if (sortMode === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return filtered;
}

function renderMeals() {
  const grid = document.getElementById('meal-grid');
  const noResults = document.getElementById('no-results');
  const mealCount = document.getElementById('meal-count');
  const filtered = getFilteredMeals();

  mealCount.textContent = `${filtered.length} meal${filtered.length !== 1 ? 's' : ''} available`;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'block';
    return;
  }
  noResults.style.display = 'none';

  grid.innerHTML = filtered.map(m => {
    const discountedPrice = studentDiscount ? m.price * (1 - DISCOUNT_RATE) : m.price;
    const isVegan = m.category.includes('Vegan');
    return `
      <div class="meal-card" onclick="addToCart(${m.id})">
        <div class="meal-img-wrap">
          <img src="${m.image}" alt="${m.name}" loading="lazy" onerror="this.style.display='none'"/>
          <div class="byte-score-badge">⭐ ${m.score}</div>
          ${isVegan ? '<div class="vegan-badge">🌱 Vegan</div>' : ''}
        </div>
        <div class="meal-info">
          <div class="meal-vendor">${m.vendor}</div>
          <div class="meal-name">${m.name}</div>
          <div class="meal-cat">${m.category.join(' · ')}</div>
          <div class="meal-bottom">
            <div>
              <div class="meal-price">BWP ${discountedPrice.toFixed(2)}</div>
              ${studentDiscount ? `<div class="meal-price-student">BWP ${m.price.toFixed(2)}</div>` : ''}
            </div>
            <button class="add-btn" onclick="event.stopPropagation(); addToCart(${m.id})" title="Add to cart">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ── CART LOGIC ── */
function addToCart(id) {
  const meal = meals.find(m => m.id === id);
  if (!meal) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...meal, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  document.getElementById('cart-count').textContent = count;

  const cartItems = document.getElementById('cart-items');
  const cartFooter = document.getElementById('cart-footer');
  const cartEmpty = document.getElementById('cart-empty');

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartFooter.style.display = 'none';
    cartItems.innerHTML = '';
    cartItems.appendChild(cartEmpty);
    return;
  }

  cartEmpty.style.display = 'none';
  cartFooter.style.display = 'block';

  cartItems.innerHTML = cart.map(item => {
    const itemPrice = studentDiscount ? item.price * (1 - DISCOUNT_RATE) : item.price;
    return `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'"/>
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-vendor">${item.vendor}</div>
          <div class="cart-item-price">BWP ${(itemPrice * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
  }).join('');

  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, c) => {
    const p = studentDiscount ? c.price * (1 - DISCOUNT_RATE) : c.price;
    return sum + p * c.qty;
  }, 0);

  const originalTotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const discountAmt = originalTotal - subtotal;
  const deliveryFee = deliveryMode === 'delivery' ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  document.getElementById('subtotal').textContent = `BWP ${subtotal.toFixed(2)}`;
  document.getElementById('cart-total').textContent = `BWP ${total.toFixed(2)}`;
  document.getElementById('delivery-fee').textContent = deliveryMode === 'delivery' ? `BWP ${DELIVERY_FEE.toFixed(2)}` : 'Free';
  document.getElementById('delivery-label').textContent = deliveryMode === 'delivery' ? 'Delivery fee' : 'Pickup';

  const discountRow = document.getElementById('discount-row');
  if (studentDiscount && discountAmt > 0) {
    discountRow.style.display = 'flex';
    document.getElementById('discount-amt').textContent = `- BWP ${discountAmt.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }
}

/* ── CART OPEN/CLOSE ── */
function openCart() {
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

/* ── DELIVERY TOGGLE ── */
function setDelivery(mode) {
  deliveryMode = mode;
  document.getElementById('delivery-btn').classList.toggle('active', mode === 'delivery');
  document.getElementById('pickup-btn').classList.toggle('active', mode === 'pickup');
  const addressSection = document.getElementById('delivery-address-section');
  if (addressSection) addressSection.style.display = mode === 'delivery' ? 'block' : 'none';
  updateTotals();
}

/* ── STUDENT TOGGLE ── */
function toggleStudent() {
  studentDiscount = !studentDiscount;
  const btn = document.getElementById('student-toggle');
  btn.classList.toggle('active', studentDiscount);
  btn.textContent = studentDiscount ? '🎓 Student (25% off)' : '🎓 Student';
  renderMeals();
  updateCartUI();
}

/* ── CHECKOUT ── */
function openCheckout() {
  closeCart();
  const modal = document.getElementById('modal-overlay');
  modal.classList.add('open');

  const summary = document.getElementById('modal-summary');
  summary.innerHTML = cart.map(item => {
    const p = studentDiscount ? item.price * (1 - DISCOUNT_RATE) : item.price;
    return `<div class="modal-summary-item"><span>${item.name} x${item.qty}</span><span>BWP ${(p * item.qty).toFixed(2)}</span></div>`;
  }).join('');

  const subtotal = cart.reduce((sum, c) => {
    const p = studentDiscount ? c.price * (1 - DISCOUNT_RATE) : c.price;
    return sum + p * c.qty;
  }, 0);
  const deliveryFee = deliveryMode === 'delivery' ? DELIVERY_FEE : 0;
  document.getElementById('modal-total').textContent = `BWP ${(subtotal + deliveryFee).toFixed(2)}`;
}

function closeCheckout() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function placeOrder() {
  const name = document.getElementById('checkout-name').value.trim();
  const phone = document.getElementById('checkout-phone').value.trim();
  if (!name || !phone) {
    alert('Please fill in your name and phone number to place your order.');
    return;
  }
  closeCheckout();

  const ref = 'BYT-' + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('success-ref').textContent = `Order #${ref}`;
  document.getElementById('success-overlay').classList.add('open');

  cart = [];
  updateCartUI();
  renderMeals();
}

function closeSuccess() {
  document.getElementById('success-overlay').classList.remove('open');
}

/* ── FILTERS ── */
function initFilters() {
  // Category pills
  document.getElementById('category-filters').addEventListener('click', e => {
    if (!e.target.classList.contains('pill')) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    activeCategory = e.target.getAttribute('data-cat');
    renderMeals();
  });

  // Score slider
  const scoreSlider = document.getElementById('score-filter');
  scoreSlider.addEventListener('input', () => {
    minScore = parseFloat(scoreSlider.value);
    document.getElementById('score-val').textContent = minScore.toFixed(1);
    renderMeals();
  });

  // Price slider
  const priceSlider = document.getElementById('price-filter');
  priceSlider.addEventListener('input', () => {
    maxPrice = parseInt(priceSlider.value);
    document.getElementById('price-val').textContent = `BWP ${maxPrice}`;
    renderMeals();
  });

  // Vendor checkboxes
  document.getElementById('vendor-filters').addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;
    const vendor = e.target.value;
    if (e.target.checked) {
      if (!activeVendors.includes(vendor)) activeVendors.push(vendor);
    } else {
      activeVendors = activeVendors.filter(v => v !== vendor);
    }
    renderMeals();
  });

  // Search
  document.getElementById('search-input').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderMeals();
  });

  // Sort
  document.getElementById('sort-select').addEventListener('change', e => {
    sortMode = e.target.value;
    renderMeals();
  });

  // Reset
  document.getElementById('reset-filters').addEventListener('click', () => {
    activeCategory = 'all';
    minScore = 7.0;
    maxPrice = 100;
    searchQuery = '';
    sortMode = 'default';
    activeVendors = ['Pedros', "Mo's Open Table", 'Nandos', 'KFC', 'Spurs', 'Ola Tia'];
    document.getElementById('score-filter').value = 7;
    document.getElementById('score-val').textContent = '7.0';
    document.getElementById('price-filter').value = 100;
    document.getElementById('price-val').textContent = 'BWP 100';
    document.getElementById('search-input').value = '';
    document.getElementById('sort-select').value = 'default';
    document.querySelectorAll('.pill').forEach(p => p.classList.toggle('active', p.getAttribute('data-cat') === 'all'));
    document.querySelectorAll('#vendor-filters input').forEach(cb => cb.checked = true);
    renderMeals();
  });
}

/* ── EVENT LISTENERS ── */
function initEvents() {
  document.getElementById('cart-open').addEventListener('click', openCart);
  document.getElementById('cart-close').addEventListener('click', closeCart);
  document.getElementById('cart-overlay').addEventListener('click', closeCart);
  document.getElementById('checkout-btn').addEventListener('click', openCheckout);
  document.getElementById('modal-close').addEventListener('click', closeCheckout);
  document.getElementById('place-order-btn').addEventListener('click', placeOrder);
  document.getElementById('student-toggle').addEventListener('click', toggleStudent);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Set student badge active by default
  document.getElementById('student-toggle').classList.add('active');
  document.getElementById('student-toggle').textContent = '🎓 Student (25% off)';

  initFilters();
  initEvents();
  renderMeals();
});
