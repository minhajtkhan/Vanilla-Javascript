// ============================================================
// LOCAL & SESSION STORAGE - Complete JavaScript Examples
// ============================================================
// This file is self-contained and can be run in a browser
// console (open DevTools > Console and paste the code).
// Note: localStorage / sessionStorage are browser-only APIs.
// Node.js does not have them natively.
//
// Assumed HTML structure (for DOM-related examples):
// <!DOCTYPE html>
// <html lang="en">
// <head><meta charset="UTF-8"><title>Storage Demo</title></head>
// <body data-theme="light">
//   <form id="contactForm">
//     <input type="text" id="name" placeholder="Name">
//     <input type="email" id="email" placeholder="Email">
//     <textarea id="message" placeholder="Message"></textarea>
//     <button type="submit">Send</button>
//   </form>
//   <div id="cart-display"></div>
//   <div id="theme-display"></div>
// </body>
// </html>
// ============================================================


// ============================================================
// EXAMPLE 1: Basic localStorage — setItem, getItem, removeItem
// ============================================================
console.log('=== EXAMPLE 1: Basic localStorage ===');

// Store a simple string value
localStorage.setItem('username', 'Alice');
localStorage.setItem('city', 'New York');
localStorage.setItem('language', 'en');

// Retrieve values
const username = localStorage.getItem('username');
const city     = localStorage.getItem('city');
console.log('username:', username); // Expected: Alice
console.log('city:', city);         // Expected: New York

// getItem returns null for missing keys
const missing = localStorage.getItem('nonExistentKey');
console.log('missing key:', missing); // Expected: null

// Remove a single key
localStorage.removeItem('city');
console.log('city after removeItem:', localStorage.getItem('city')); // Expected: null


// ============================================================
// EXAMPLE 2: Basic sessionStorage — tab-scoped storage
// ============================================================
console.log('\n=== EXAMPLE 2: Basic sessionStorage ===');

// Store session-only data (cleared when the tab closes)
sessionStorage.setItem('sessionToken', 'eyJhbGciOiJIUzI1NiJ9.abc');
sessionStorage.setItem('lastPage', '/dashboard');

const token    = sessionStorage.getItem('sessionToken');
const lastPage = sessionStorage.getItem('lastPage');

console.log('sessionToken:', token);     // Expected: eyJhbGciOiJIUzI1NiJ9.abc
console.log('lastPage:', lastPage);      // Expected: /dashboard
console.log('sessionStorage.length:', sessionStorage.length); // Expected: 2

// sessionStorage survives page refresh (F5) but not tab close
// Open same URL in a new tab → sessionStorage will be empty there


// ============================================================
// EXAMPLE 3: Storing Objects & Arrays with JSON Serialization
// ============================================================
console.log('\n=== EXAMPLE 3: JSON Serialization ===');

// Objects must be serialized to string before storing
const user = {
  id: 101,
  name: 'Bob',
  email: 'bob@example.com',
  roles: ['editor', 'viewer'],
  preferences: { theme: 'dark', notifications: true }
};

// Store
localStorage.setItem('currentUser', JSON.stringify(user));

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem('currentUser'));
console.log('Stored user name:', storedUser.name);              // Expected: Bob
console.log('User email:', storedUser.email);                   // Expected: bob@example.com
console.log('User roles:', storedUser.roles);                   // Expected: ['editor', 'viewer']
console.log('Theme preference:', storedUser.preferences.theme); // Expected: dark

// WRONG way — object becomes '[object Object]' string
localStorage.setItem('wrongObject', { key: 'value' });
console.log('Wrong object stored:', localStorage.getItem('wrongObject')); // Expected: [object Object]
localStorage.removeItem('wrongObject'); // clean up


// ============================================================
// EXAMPLE 4: Storing & Retrieving Arrays
// ============================================================
console.log('\n=== EXAMPLE 4: Arrays in Storage ===');

const favoriteColors = ['crimson', 'teal', 'gold', 'indigo'];

// Save array
localStorage.setItem('favoriteColors', JSON.stringify(favoriteColors));

// Load array
const loadedColors = JSON.parse(localStorage.getItem('favoriteColors'));
console.log('Loaded colors:', loadedColors);        // Expected: ['crimson', 'teal', 'gold', 'indigo']
console.log('First color:', loadedColors[0]);        // Expected: crimson
console.log('Array length:', loadedColors.length);  // Expected: 4

// Add an item and save back
loadedColors.push('violet');
localStorage.setItem('favoriteColors', JSON.stringify(loadedColors));
const updatedColors = JSON.parse(localStorage.getItem('favoriteColors'));
console.log('After push:', updatedColors); // Expected: ['crimson', 'teal', 'gold', 'indigo', 'violet']


// ============================================================
// EXAMPLE 5: User Preferences (Theme + Language + Font Size)
// ============================================================
console.log('\n=== EXAMPLE 5: User Preferences ===');

// Default preferences
const DEFAULT_PREFS = { theme: 'light', language: 'en', fontSize: '16px' };

/**
 * Save user preferences to localStorage.
 * @param {object} prefs - Preferences object
 */
function savePreferences(prefs) {
  const payload = { ...prefs, updatedAt: new Date().toISOString() };
  localStorage.setItem('userPreferences', JSON.stringify(payload));
  console.log('Preferences saved:', payload);
}

/**
 * Load preferences, falling back to defaults if none saved.
 * @returns {object} Preferences object
 */
function loadPreferences() {
  const raw = localStorage.getItem('userPreferences');
  if (!raw) {
    console.log('No preferences found, using defaults.');
    return { ...DEFAULT_PREFS };
  }
  return JSON.parse(raw);
}

/**
 * Apply preferences to the document (DOM example).
 */
function applyPreferences() {
  const prefs = loadPreferences();
  // In a real browser environment this would update the DOM:
  // document.body.setAttribute('data-theme', prefs.theme);
  // document.body.style.fontSize = prefs.fontSize;
  console.log('Applied theme:', prefs.theme);
  console.log('Applied language:', prefs.language);
  console.log('Applied font size:', prefs.fontSize);
  return prefs;
}

// Save and apply
savePreferences({ theme: 'dark', language: 'fr', fontSize: '18px' });
applyPreferences();
// Expected: Applied theme: dark, language: fr, font size: 18px

// Update just one preference
const currentPrefs = loadPreferences();
currentPrefs.theme = 'light';
savePreferences(currentPrefs);
console.log('After update, theme:', loadPreferences().theme); // Expected: light


// ============================================================
// EXAMPLE 6: Shopping Cart with Full CRUD Operations
// ============================================================
console.log('\n=== EXAMPLE 6: Shopping Cart ===');

/**
 * Get the current cart array from localStorage.
 * Returns an empty array if no cart exists.
 */
function getCart() {
  return JSON.parse(localStorage.getItem('shoppingCart')) || [];
}

/**
 * Save the cart array to localStorage.
 */
function saveCart(cart) {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

/**
 * Add a product to the cart.
 * If it already exists, increment its quantity.
 */
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  console.log(`Added "${product.name}" to cart.`);
}

/**
 * Remove a product from the cart by its ID.
 */
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  console.log(`Removed product ID ${productId} from cart.`);
}

/**
 * Update the quantity of a cart item.
 */
function updateQuantity(productId, newQty) {
  if (newQty < 1) { removeFromCart(productId); return; }
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) { item.quantity = newQty; saveCart(cart); }
}

/**
 * Calculate total price of all cart items.
 */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Get total item count in the cart.
 */
function getCartCount() {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}

/**
 * Clear all items from the cart.
 */
function clearCart() {
  localStorage.removeItem('shoppingCart');
  console.log('Cart cleared.');
}

// --- Run cart demo ---
clearCart(); // start fresh

addToCart({ id: 1, name: 'Wireless Headphones', price: 79.99 });
addToCart({ id: 2, name: 'USB-C Hub',           price: 49.99 });
addToCart({ id: 3, name: 'Mechanical Keyboard', price: 129.99 });
addToCart({ id: 1, name: 'Wireless Headphones', price: 79.99 }); // duplicate → qty 2

console.log('Cart items:', getCart());
// Expected: 3 products, Headphones quantity = 2

console.log('Cart count:', getCartCount());           // Expected: 4
console.log('Cart total: $' + getCartTotal().toFixed(2)); // Expected: $339.96

updateQuantity(2, 3); // set USB-C Hub qty to 3
console.log('After qty update, total: $' + getCartTotal().toFixed(2)); // Expected: $439.94

removeFromCart(3); // remove Keyboard
console.log('Cart after removal:', getCart().map(i => i.name));
// Expected: ['Wireless Headphones', 'USB-C Hub']


// ============================================================
// EXAMPLE 7: Form Draft Auto-Save with sessionStorage
// ============================================================
console.log('\n=== EXAMPLE 7: Form Draft Auto-Save ===');

/**
 * Saves a form draft to sessionStorage.
 * In a real app this would be called on 'input' events.
 */
function saveFormDraft(formData) {
  sessionStorage.setItem('contactFormDraft', JSON.stringify({
    ...formData,
    savedAt: new Date().toISOString()
  }));
  console.log('Draft saved:', formData);
}

/**
 * Restores a form draft from sessionStorage.
 * Returns null if no draft exists.
 */
function loadFormDraft() {
  const raw = sessionStorage.getItem('contactFormDraft');
  if (!raw) {
    console.log('No draft found in session storage.');
    return null;
  }
  const draft = JSON.parse(raw);
  console.log('Draft restored:', draft);
  return draft;
}

/**
 * Clears the form draft (call after successful submission).
 */
function clearFormDraft() {
  sessionStorage.removeItem('contactFormDraft');
  console.log('Form draft cleared after submission.');
}

// Simulate typing into a form
saveFormDraft({ name: 'Carol', email: 'carol@example.com', message: 'Hello, I need help with...' });

// Simulate page refresh — draft is still there in sessionStorage
const restoredDraft = loadFormDraft();
if (restoredDraft) {
  console.log(`Restored: name=${restoredDraft.name}, email=${restoredDraft.email}`);
  // In browser: document.getElementById('name').value = restoredDraft.name;
}

// After form submission, clear the draft
clearFormDraft();
console.log('Draft after clear:', sessionStorage.getItem('contactFormDraft')); // Expected: null


// ============================================================
// EXAMPLE 8: Iterating Over All Storage Keys
// ============================================================
console.log('\n=== EXAMPLE 8: Iterating Storage ===');

// Set up some items
localStorage.setItem('color',    'blue');
localStorage.setItem('font',     'Inter');
localStorage.setItem('fontSize', '14px');
localStorage.setItem('spacing',  'compact');

console.log('Total localStorage entries:', localStorage.length);

// Method 1: Classic index-based loop
console.log('--- Method 1: key(index) loop ---');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`  [${i}] ${key} = ${localStorage.getItem(key)}`);
}

// Method 2: Object.keys() spread
console.log('--- Method 2: Object.keys() ---');
Object.keys(localStorage).forEach(key => {
  console.log(`  ${key} => ${localStorage.getItem(key)}`);
});

// Method 3: Collect all entries into a plain object
function getAllStorageEntries() {
  const entries = {};
  Object.keys(localStorage).forEach(key => {
    try {
      entries[key] = JSON.parse(localStorage.getItem(key));
    } catch {
      entries[key] = localStorage.getItem(key); // keep as string if not JSON
    }
  });
  return entries;
}

console.log('All entries as object:', getAllStorageEntries());


// ============================================================
// EXAMPLE 9: Storage Availability Check + Quota Error Handling
// ============================================================
console.log('\n=== EXAMPLE 9: Availability & Error Handling ===');

/**
 * Check if a Web Storage type is available.
 * Handles private/incognito mode and disabled storage.
 * @param {'localStorage'|'sessionStorage'} type
 * @returns {boolean}
 */
function isStorageAvailable(type) {
  try {
    const storage = window[type];
    const TEST_KEY = '__storage_availability_test__';
    storage.setItem(TEST_KEY, '✓');
    storage.removeItem(TEST_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

console.log('localStorage available:', isStorageAvailable('localStorage'));  // Expected: true
console.log('sessionStorage available:', isStorageAvailable('sessionStorage')); // Expected: true

/**
 * Safe wrapper for localStorage.setItem that catches QuotaExceededError.
 * @param {string} key
 * @param {string} value
 * @returns {boolean} true if saved successfully
 */
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (
      e instanceof DOMException &&
      (e.name === 'QuotaExceededError' ||
       e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
       e.code === 22)
    ) {
      console.error('⚠️  Storage quota exceeded! Cannot save:', key);
    } else {
      console.error('Storage error:', e.message);
    }
    return false;
  }
}

const saved = safeSetItem('safeKey', JSON.stringify({ data: 'some important data' }));
console.log('Safe save succeeded:', saved); // Expected: true


// ============================================================
// EXAMPLE 10: TTL (Time-To-Live) Storage Utility
// ============================================================
console.log('\n=== EXAMPLE 10: TTL Storage Utility ===');

/**
 * A localStorage utility that supports optional expiration (TTL).
 */
const StorageUtil = {
  /**
   * Set a value with an optional TTL in seconds.
   * @param {string} key
   * @param {*} value - Any JSON-serializable value
   * @param {number|null} ttlSeconds - Optional TTL; null means no expiry
   */
  set(key, value, ttlSeconds = null) {
    const payload = {
      value,
      expiry: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
    };
    safeSetItem(key, JSON.stringify(payload));
  },

  /**
   * Get a value. Returns null if missing or expired.
   * @param {string} key
   * @returns {*|null}
   */
  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const payload = JSON.parse(raw);
      if (payload.expiry !== null && Date.now() > payload.expiry) {
        localStorage.removeItem(key); // auto-clean expired
        console.log(`Key "${key}" has expired and was removed.`);
        return null;
      }
      return payload.value;
    } catch {
      return null; // malformed data
    }
  },

  /** Remove a key. */
  remove(key) {
    localStorage.removeItem(key);
  },

  /** Remove all keys managed by this utility (all localStorage). */
  clear() {
    localStorage.clear();
  }
};

// --- TTL Demo ---
// Store with a 2-second TTL (expires in 2 seconds)
StorageUtil.set('quickData', { msg: 'I expire in 2s' }, 2);
console.log('Immediately after set:', StorageUtil.get('quickData'));
// Expected: { msg: 'I expire in 2s' }

// Store with no expiry
StorageUtil.set('persistentConfig', { apiVersion: 'v2', retries: 3 });
console.log('Persistent config:', StorageUtil.get('persistentConfig'));
// Expected: { apiVersion: 'v2', retries: 3 }

// Simulate checking after expiry (manual test with setTimeout in browser):
setTimeout(() => {
  const expired = StorageUtil.get('quickData');
  console.log('After 2.5s, quickData:', expired); // Expected: null (expired)
}, 2500);


// ============================================================
// EXAMPLE 11: Recently Viewed Items (Bounded History List)
// ============================================================
console.log('\n=== EXAMPLE 11: Recently Viewed Items ===');

const RECENT_MAX = 5; // keep only the 5 most recent

/**
 * Record a viewed item in the recent history.
 * Keeps the list capped at RECENT_MAX, most recent first.
 * @param {{ id: number, name: string, url: string }} item
 */
function recordRecentView(item) {
  let history = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
  // Remove duplicate if already in list
  history = history.filter(h => h.id !== item.id);
  // Prepend new item
  history.unshift({ ...item, viewedAt: new Date().toISOString() });
  // Cap to max
  if (history.length > RECENT_MAX) history = history.slice(0, RECENT_MAX);
  localStorage.setItem('recentlyViewed', JSON.stringify(history));
}

/**
 * Get recently viewed items.
 * @returns {Array}
 */
function getRecentViews() {
  return JSON.parse(localStorage.getItem('recentlyViewed')) || [];
}

// Simulate visiting several pages
recordRecentView({ id: 10, name: 'JavaScript Basics',    url: '/articles/js-basics' });
recordRecentView({ id: 11, name: 'CSS Grid Guide',       url: '/articles/css-grid' });
recordRecentView({ id: 12, name: 'React Hooks Tutorial', url: '/articles/react-hooks' });
recordRecentView({ id: 10, name: 'JavaScript Basics',    url: '/articles/js-basics' }); // revisit
recordRecentView({ id: 13, name: 'Node.js Streams',      url: '/articles/node-streams' });
recordRecentView({ id: 14, name: 'TypeScript Generics',  url: '/articles/ts-generics' });
recordRecentView({ id: 15, name: 'Web Workers',          url: '/articles/web-workers' }); // should push out oldest

const recent = getRecentViews();
console.log('Recent views count:', recent.length); // Expected: 5 (capped)
console.log('Most recent:', recent[0].name);        // Expected: Web Workers
console.log('Second:', recent[1].name);             // Expected: TypeScript Generics
console.log('All recent:', recent.map(r => r.name));
// Expected: ['Web Workers', 'TypeScript Generics', 'Node.js Streams',
//            'JavaScript Basics', 'React Hooks Tutorial']
// (ID 10 was de-duped and re-inserted near top, then pushed out by newer)


// ============================================================
// EXAMPLE 12: Cross-Tab Sync via the 'storage' Event
// ============================================================
console.log('\n=== EXAMPLE 12: Cross-Tab storage Event ===');

/**
 * The 'storage' event fires on all OTHER tabs of the same origin
 * when localStorage changes. It does NOT fire in the tab that
 * made the change.
 *
 * Event properties:
 *   event.key        — the key that changed
 *   event.oldValue   — the previous value (null if newly created)
 *   event.newValue   — the new value (null if removed)
 *   event.url        — the URL of the document that changed it
 *   event.storageArea — reference to the storage object
 */
window.addEventListener('storage', (event) => {
  console.log('[storage event] Key:', event.key);
  console.log('[storage event] Old:', event.oldValue);
  console.log('[storage event] New:', event.newValue);

  // Pattern: global logout across all tabs
  if (event.key === 'globalLogout') {
    console.log('Another tab triggered logout — clearing session and redirecting...');
    sessionStorage.clear();
    // window.location.href = '/login';
  }

  // Pattern: sync cart badge across tabs
  if (event.key === 'shoppingCart') {
    const updatedCart = JSON.parse(event.newValue) || [];
    const count = updatedCart.reduce((n, i) => n + i.quantity, 0);
    console.log(`Cart updated in another tab — new count: ${count}`);
    // In a real app: document.getElementById('cart-badge').textContent = count;
  }
});

// To TRIGGER the storage event in another tab, run this in a second tab:
// localStorage.setItem('globalLogout', Date.now().toString());
// Or, to test locally (this won't fire the event in THIS tab, by spec):
console.log('storage event listener registered. Open another tab to test cross-tab sync.');
localStorage.setItem('crossTabTest', 'triggered from main tab');
// No event fires here — event only fires in OTHER tabs


// ============================================================
// CLEANUP — Remove demo keys from localStorage
// ============================================================
console.log('\n=== CLEANUP ===');

const demoKeys = [
  'username', 'language', 'currentUser', 'favoriteColors',
  'userPreferences', 'shoppingCart', 'color', 'font', 'fontSize',
  'spacing', 'safeKey', 'quickData', 'persistentConfig',
  'recentlyViewed', 'crossTabTest'
];

demoKeys.forEach(key => localStorage.removeItem(key));
console.log('Demo keys cleaned up. localStorage.length:', localStorage.length);

console.log('\n✅ All Local & Session Storage examples complete!');
