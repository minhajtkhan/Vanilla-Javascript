# Local & Session Storage in JavaScript

## Introduction

Modern web applications often need to store data on the client side — whether to remember user preferences, persist a shopping cart between page reloads, or cache API responses. JavaScript provides two built-in Web Storage APIs for this purpose:

- **`localStorage`** — stores data with **no expiration**; it persists even after the browser is closed and reopened.
- **`sessionStorage`** — stores data for the **duration of the page session**; it is cleared when the tab or browser is closed.

Both APIs share the same interface and are part of the **Web Storage API** (defined by the HTML Living Standard). They are synchronous, key-value stores that only accept **strings** as values.

> **Key Difference from Cookies:** Web Storage data is never sent to the server automatically, unlike cookies. It is purely client-side.

---

## 1. The Web Storage API — Core Methods

Both `localStorage` and `sessionStorage` expose the same five methods and one property:

| Method / Property | Description |
|---|---|
| `setItem(key, value)` | Stores a key-value pair |
| `getItem(key)` | Retrieves the value for a key (returns `null` if not found) |
| `removeItem(key)` | Removes a specific key-value pair |
| `clear()` | Removes **all** key-value pairs in this storage |
| `key(index)` | Returns the key at the given numeric index |
| `length` | The number of key-value pairs currently stored |

### Basic Syntax

```js
// localStorage
localStorage.setItem('username', 'Alice');
const name = localStorage.getItem('username'); // 'Alice'
localStorage.removeItem('username');
localStorage.clear();

// sessionStorage
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token'); // 'abc123'
```

---

## 2. Storing & Retrieving Strings

The simplest use case — storing primitive string values:

```js
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
console.log(theme); // 'dark'

// If the key doesn't exist, getItem returns null
const missing = localStorage.getItem('nonExistentKey');
console.log(missing); // null
```

---

## 3. Storing Objects and Arrays (JSON Serialization)

Web Storage only stores **strings**, so to store objects or arrays you must serialize them to JSON using `JSON.stringify()` and deserialize with `JSON.parse()`.

```js
const user = { name: 'Alice', age: 30, role: 'admin' };

// Serialize and store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve and deserialize
const storedUser = JSON.parse(localStorage.getItem('user'));
console.log(storedUser.name); // 'Alice'
console.log(storedUser.role); // 'admin'
```

> **Pitfall:** If you store an object directly without `JSON.stringify()`, it will be stored as `"[object Object]"` — a useless string. Always serialize!

---

## 4. localStorage vs sessionStorage — Lifespan & Scope

| Feature | `localStorage` | `sessionStorage` |
|---|---|---|
| **Lifespan** | Persists indefinitely (until cleared) | Cleared when tab/window closes |
| **Scope** | Shared across all tabs of the same origin | Isolated to the current tab |
| **Storage Limit** | ~5–10 MB (browser-dependent) | ~5 MB (browser-dependent) |
| **Server Access** | Never sent to server | Never sent to server |
| **Origin Isolation** | Yes (same-origin policy) | Yes (same-origin policy) |

```js
// sessionStorage example — survives page refresh, not tab close
sessionStorage.setItem('formDraft', JSON.stringify({ step: 2, email: 'bob@example.com' }));

// Even after F5 refresh, the data is still there:
const draft = JSON.parse(sessionStorage.getItem('formDraft'));
console.log(draft.step);  // 2
console.log(draft.email); // 'bob@example.com'

// But open the same URL in a NEW tab — sessionStorage is empty there.
```

---

## 5. Practical Example — User Preferences (Theme + Language)

A very common use case: remembering UI preferences across sessions.

```js
// Save preferences
function savePreferences(theme, language) {
  const prefs = { theme, language, savedAt: new Date().toISOString() };
  localStorage.setItem('userPreferences', JSON.stringify(prefs));
}

// Load preferences with defaults
function loadPreferences() {
  const raw = localStorage.getItem('userPreferences');
  if (!raw) {
    return { theme: 'light', language: 'en' }; // defaults
  }
  return JSON.parse(raw);
}

// Apply to the DOM
function applyPreferences() {
  const prefs = loadPreferences();
  document.body.setAttribute('data-theme', prefs.theme);
  console.log(`Applying theme: ${prefs.theme}, language: ${prefs.language}`);
}

savePreferences('dark', 'fr');
applyPreferences(); // Applying theme: dark, language: fr
```

---

## 6. Practical Example — Shopping Cart

A shopping cart that persists across page reloads:

```js
// Add item to cart
function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Remove item from cart
function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Get total
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Clear cart
function clearCart() {
  localStorage.removeItem('cart');
}

// Usage
addToCart({ id: 1, name: 'Laptop', price: 999.99 });
addToCart({ id: 2, name: 'Mouse', price: 29.99 });
addToCart({ id: 1, name: 'Laptop', price: 999.99 }); // quantity becomes 2

console.log(getCart());
// [ { id:1, name:'Laptop', price:999.99, quantity:2 }, { id:2, name:'Mouse', price:29.99, quantity:1 } ]

console.log('Total: $' + getCartTotal().toFixed(2)); // Total: $2029.97
```

---

## 7. Practical Example — Form Auto-Save Draft

Using `sessionStorage` to save form state so users don't lose data on accidental refresh:

```js
const formFields = ['name', 'email', 'message'];

// Save draft on input
document.querySelectorAll('form input, form textarea').forEach(el => {
  el.addEventListener('input', () => {
    const draft = {};
    formFields.forEach(field => {
      draft[field] = document.getElementById(field)?.value || '';
    });
    sessionStorage.setItem('contactFormDraft', JSON.stringify(draft));
  });
});

// Restore draft on page load
function restoreFormDraft() {
  const draft = JSON.parse(sessionStorage.getItem('contactFormDraft'));
  if (draft) {
    formFields.forEach(field => {
      const el = document.getElementById(field);
      if (el) el.value = draft[field] || '';
    });
    console.log('Form draft restored!');
  }
}

// Clear draft after successful submission
function onFormSubmit() {
  sessionStorage.removeItem('contactFormDraft');
  console.log('Draft cleared after submission.');
}
```

---

## 8. Iterating Over Storage Items

You can loop over all keys in storage using `length` and `key(index)`:

```js
localStorage.setItem('color', 'blue');
localStorage.setItem('font', 'Arial');
localStorage.setItem('fontSize', '16px');

// Method 1: Using key() and length
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}

// Method 2: Spread localStorage keys (modern)
Object.keys(localStorage).forEach(key => {
  console.log(`${key} =>`, localStorage.getItem(key));
});
```

---

## 9. The `storage` Event — Cross-Tab Communication

When `localStorage` is modified in one tab, other tabs on the same origin receive a `storage` event. This enables basic cross-tab communication.

```js
// In Tab A — listen for changes
window.addEventListener('storage', (event) => {
  console.log('Key changed:', event.key);
  console.log('Old value:', event.oldValue);
  console.log('New value:', event.newValue);
  console.log('Storage area:', event.storageArea === localStorage ? 'localStorage' : 'sessionStorage');

  if (event.key === 'logout') {
    // Log out all tabs when one tab logs out
    console.log('Logging out due to change in another tab...');
  }
});

// In Tab B — trigger the event
localStorage.setItem('logout', Date.now().toString());
```

> **Note:** The `storage` event does NOT fire in the tab that made the change — only in other tabs.

---

## 10. Handling Storage Quota Errors

Storage is limited (~5MB typically). Attempting to store too much throws a `QuotaExceededError`:

```js
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      console.error('Storage quota exceeded! Consider clearing old data.');
      // Optional: clear least important items and retry
    } else {
      console.error('Storage error:', e);
    }
    return false;
  }
}

const success = safeSetItem('bigData', JSON.stringify({ /* large object */ }));
if (!success) {
  console.log('Could not save data to localStorage.');
}
```

---

## 11. Building a Storage Utility Helper

A reusable wrapper that handles JSON parsing, error handling, and optional expiry:

```js
const Storage = {
  set(key, value, ttlSeconds = null) {
    const payload = {
      value,
      expiry: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null
    };
    try {
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to write to localStorage', e);
    }
  },

  get(key) {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      const payload = JSON.parse(raw);
      if (payload.expiry && Date.now() > payload.expiry) {
        localStorage.removeItem(key); // expired
        return null;
      }
      return payload.value;
    } catch {
      return null;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  }
};

// Usage
Storage.set('sessionToken', 'xyz789', 3600); // expires in 1 hour
console.log(Storage.get('sessionToken')); // 'xyz789'

Storage.set('greeting', 'Hello!');
console.log(Storage.get('greeting')); // 'Hello!'
```

---

## Common Pitfalls & Tips

### ⚠️ Pitfall 1: Forgetting JSON Serialization
```js
// WRONG
localStorage.setItem('obj', { a: 1 }); // stores '[object Object]'

// CORRECT
localStorage.setItem('obj', JSON.stringify({ a: 1 }));
```

### ⚠️ Pitfall 2: Not Handling `null` from `getItem`
```js
// If key doesn't exist, getItem returns null
// JSON.parse(null) returns null — but always guard:
const data = JSON.parse(localStorage.getItem('key') || 'null') ?? defaultValue;
```

### ⚠️ Pitfall 3: Storing Sensitive Data
Never store passwords, tokens, or PII in Web Storage — it is accessible by any JavaScript on the same origin, making it vulnerable to XSS attacks. Use `HttpOnly` cookies for sensitive session data.

### ⚠️ Pitfall 4: Storage Is Synchronous
All Web Storage operations block the main thread. Avoid storing very large objects in a tight loop — use IndexedDB for large or structured datasets.

### ⚠️ Pitfall 5: Private/Incognito Mode
In private/incognito browsing, `localStorage` may behave like `sessionStorage` or throw errors in some older browsers. Always wrap in try/catch.

### ✅ Tip: Check Storage Availability
```js
function isStorageAvailable(type) {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

console.log(isStorageAvailable('localStorage'));  // true or false
console.log(isStorageAvailable('sessionStorage')); // true or false
```

---

## Summary

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Persists after close | ✅ Yes | ❌ No |
| Shared across tabs | ✅ Yes | ❌ No (tab-isolated) |
| Cross-tab events | ✅ `storage` event | ❌ No |
| Use for | Preferences, carts, long-term cache | Form drafts, temp state, one-session data |

**Key Takeaways:**
- Always use `JSON.stringify` / `JSON.parse` for non-string values.
- Use `localStorage` for data that should persist long-term.
- Use `sessionStorage` for temporary, tab-specific state.
- Never store sensitive data (passwords, tokens) in Web Storage.
- Wrap storage operations in `try/catch` for robustness.
- Use the `storage` event for lightweight cross-tab communication.
- Consider a utility wrapper to add features like TTL/expiry.
