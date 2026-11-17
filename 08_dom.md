# The Document Object Model (DOM) — A Complete Guide

## Introduction

The **Document Object Model (DOM)** is a programming interface provided by browsers that represents an HTML (or XML) document as a **tree of nodes**. Every element, attribute, and piece of text in your HTML becomes a **node** in this tree, and JavaScript can read, create, update, or delete any of those nodes at runtime — making web pages dynamic and interactive.

When a browser loads an HTML page, it parses the markup and builds the DOM tree in memory. JavaScript accesses this tree through the global `document` object.

```
document
└── <html>
    ├── <head>
    │   └── <title>
    └── <body>
        ├── <h1>
        ├── <p>
        └── <div>
            └── <button>
```

---

## 1. Selecting Elements

Before you can manipulate anything, you need to **select** the element(s) you want to work with.

### `getElementById`
Returns a **single element** whose `id` matches the given string. Returns `null` if not found.

```js
const title = document.getElementById('main-title');
console.log(title); // <h1 id="main-title">...</h1>
```

### `querySelector`
Returns the **first element** that matches a CSS selector string.

```js
const btn = document.querySelector('.btn-primary');
const firstLi = document.querySelector('ul > li:first-child');
```

### `querySelectorAll`
Returns a **static NodeList** of **all** elements matching a CSS selector.

```js
const allCards = document.querySelectorAll('.card');
allCards.forEach(card => console.log(card.textContent));
```

### `getElementsByClassName` / `getElementsByTagName`
Return **live HTMLCollections** (they update automatically if the DOM changes).

```js
const items = document.getElementsByClassName('item'); // live
const paragraphs = document.getElementsByTagName('p'); // live
```

> **Tip:** Prefer `querySelector` / `querySelectorAll` for their flexibility with CSS selectors. Use `getElementById` when you need raw speed on a unique element.

---

## 2. Reading & Modifying Content

### `textContent`
Gets or sets the **plain text** inside an element (strips all HTML tags).

```js
const el = document.querySelector('h1');
console.log(el.textContent); // "Hello World"
el.textContent = 'Welcome!';
```

### `innerHTML`
Gets or sets the **HTML markup** inside an element. Can be used to inject HTML strings.

```js
const box = document.querySelector('#box');
box.innerHTML = '<strong>Bold text</strong> and <em>italic</em>';
```

> **⚠️ Security Warning:** Never inject **user-supplied** data via `innerHTML` — this opens the door to **Cross-Site Scripting (XSS)** attacks. Use `textContent` for plain user data.

### `innerText`
Similar to `textContent` but is **layout-aware** — it respects CSS visibility and returns only rendered text.

```js
const el = document.querySelector('p');
console.log(el.innerText); // Only visible text
```

---

## 3. Manipulating Attributes

### `getAttribute` / `setAttribute` / `removeAttribute`

```js
const img = document.querySelector('img');
console.log(img.getAttribute('src')); // 'photo.jpg'
img.setAttribute('alt', 'A beautiful photo');
img.removeAttribute('title');
```

### Direct property access
Most HTML attributes map directly to DOM properties:

```js
const input = document.querySelector('input');
console.log(input.value);     // current value
console.log(input.disabled);  // true / false
console.log(input.checked);   // true / false (checkbox)

input.placeholder = 'Enter your name...';
input.disabled = true;
```

### `dataset` — data-* attributes

```js
// HTML: <button data-id="42" data-role="admin">Click</button>
const btn = document.querySelector('button');
console.log(btn.dataset.id);   // '42'
console.log(btn.dataset.role); // 'admin'
btn.dataset.status = 'active'; // sets data-status="active"
```

---

## 4. Styling Elements

### Inline styles via `element.style`

```js
const box = document.querySelector('.box');
box.style.backgroundColor = 'coral';
box.style.width = '200px';
box.style.transform = 'rotate(45deg)';
```

### CSS Classes: `classList`
The preferred way to change styles — keeps JS and CSS concerns separate.

```js
const el = document.querySelector('.card');
el.classList.add('active');          // add a class
el.classList.remove('hidden');       // remove a class
el.classList.toggle('dark-mode');    // add if absent, remove if present
el.classList.replace('old', 'new');  // swap classes
console.log(el.classList.contains('active')); // true
```

---

## 5. Creating & Inserting Elements

### `createElement` + `appendChild`

```js
const ul = document.querySelector('ul');
const li = document.createElement('li');
li.textContent = 'New list item';
li.classList.add('item');
ul.appendChild(li); // inserts at the end
```

### `prepend`, `append`, `before`, `after`

```js
const container = document.querySelector('#container');
const newDiv = document.createElement('div');
newDiv.textContent = 'I am first!';

container.prepend(newDiv);     // insert as FIRST child
container.append(newDiv);      // insert as LAST child
container.before(newDiv);      // insert BEFORE the container
container.after(newDiv);       // insert AFTER the container
```

### `insertAdjacentHTML`
Insert raw HTML at a specific position relative to an element.

```js
const list = document.querySelector('ul');
list.insertAdjacentHTML('beforeend', '<li class="item">Appended item</li>');
list.insertAdjacentHTML('afterbegin', '<li class="item">Prepended item</li>');
```

Positions: `'beforebegin'`, `'afterbegin'`, `'beforeend'`, `'afterend'`

### `cloneNode`

```js
const original = document.querySelector('.card');
const clone = original.cloneNode(true); // true = deep clone (includes children)
document.querySelector('#gallery').appendChild(clone);
```

---

## 6. Removing Elements

```js
// Modern approach
const el = document.querySelector('.old-banner');
el.remove();

// Legacy approach (for older browser support)
el.parentNode.removeChild(el);
```

---

## 7. Traversing the DOM

You can navigate between nodes using traversal properties:

| Property | Description |
|---|---|
| `parentElement` | The parent element |
| `children` | Live HTMLCollection of child **elements** |
| `firstElementChild` | First child element |
| `lastElementChild` | Last child element |
| `nextElementSibling` | Next sibling element |
| `previousElementSibling` | Previous sibling element |
| `childNodes` | All child **nodes** (includes text/comment nodes) |

```js
const list = document.querySelector('ul');
console.log(list.children);            // HTMLCollection of <li>s
console.log(list.firstElementChild);   // first <li>
console.log(list.lastElementChild);    // last <li>

const firstItem = list.firstElementChild;
console.log(firstItem.nextElementSibling); // second <li>
console.log(firstItem.parentElement);      // <ul>
```

---

## 8. Events & Event Listeners

DOM events allow JavaScript to react to user interactions.

### `addEventListener`

```js
const btn = document.querySelector('#my-btn');
btn.addEventListener('click', function(event) {
  console.log('Button clicked!');
  console.log(event.target); // the element that triggered the event
});
```

### Common Events

| Event | Trigger |
|---|---|
| `click` | Mouse click |
| `dblclick` | Double click |
| `mouseover` / `mouseout` | Mouse enters/leaves |
| `keydown` / `keyup` / `keypress` | Keyboard key |
| `submit` | Form submitted |
| `input` / `change` | Input value changes |
| `load` | Page/resource fully loaded |
| `DOMContentLoaded` | DOM ready (before images/CSS load) |
| `scroll` | User scrolls |
| `focus` / `blur` | Element gains/loses focus |

### The Event Object

```js
document.addEventListener('keydown', (e) => {
  console.log(e.key);        // 'Enter', 'a', 'ArrowUp', etc.
  console.log(e.ctrlKey);    // true if Ctrl was held
  console.log(e.target);     // element that triggered the event
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

### `removeEventListener`
To remove a listener, pass the **same named function reference**:

```js
function handleClick() {
  console.log('clicked');
}
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // removes it
```

### Event Delegation
Instead of attaching listeners to every child, attach **one listener to a parent**. This is efficient and handles dynamically added elements:

```js
const ul = document.querySelector('#todo-list');
ul.addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    e.target.classList.toggle('completed');
  }
});
```

### Preventing Default Behaviour

```js
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault(); // stop page from reloading
  // handle form data with JS
});

const link = document.querySelector('a');
link.addEventListener('click', (e) => {
  e.preventDefault(); // stop navigation
});
```

---

## 9. Forms & Input Handling

```js
const form = document.querySelector('#signup-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert('All fields are required!');
    return;
  }
  console.log({ name, email });
});

// Live input feedback
nameInput.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});
```

---

## 10. `DOMContentLoaded` vs `load`

```js
// Fires when HTML is fully parsed (before CSS/images)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready!');
  init(); // safe to query elements now
});

// Fires when EVERYTHING (images, stylesheets) is loaded
window.addEventListener('load', () => {
  console.log('Page fully loaded!');
});
```

> **Tip:** Place `<script>` tags at the bottom of `<body>`, or use `DOMContentLoaded`, so elements exist before your JS tries to select them.

---

## Common Pitfalls

1. **Selecting elements before the DOM is ready** — always wrap in `DOMContentLoaded` or place scripts at the end of `<body>`.
2. **Using `innerHTML` with user input** — XSS vulnerability. Use `textContent` instead.
3. **Forgetting `NodeList` is not an `Array`** — use `Array.from(nodeList)` or spread `[...nodeList]` to get array methods.
4. **Confusing `children` (HTMLCollection, elements only) with `childNodes` (NodeList, includes text nodes)**.
5. **Memory leaks from unremoved event listeners** — always `removeEventListener` when no longer needed (e.g., in cleanup functions).
6. **Modifying the DOM in loops is slow** — batch changes using a `DocumentFragment` or build HTML strings, then set `innerHTML` once.
7. **`live` vs `static` collections** — `getElementsByClassName` returns a live collection (can cause infinite loops if you add elements while iterating). `querySelectorAll` is static.

---

## Performance Tip: DocumentFragment

When adding many elements, use a `DocumentFragment` to minimize reflows:

```js
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // no DOM reflow yet
}
document.querySelector('ul').appendChild(fragment); // ONE reflow
```

---

## Summary

| Task | Method(s) |
|---|---|
| Select one element | `getElementById`, `querySelector` |
| Select many elements | `querySelectorAll`, `getElementsByClassName` |
| Read/write text | `textContent`, `innerText` |
| Read/write HTML | `innerHTML`, `insertAdjacentHTML` |
| Manage attributes | `getAttribute`, `setAttribute`, `dataset` |
| Manage classes | `classList.add/remove/toggle/contains` |
| Inline styles | `element.style.property` |
| Create elements | `createElement`, `cloneNode` |
| Insert elements | `appendChild`, `prepend`, `append`, `before`, `after` |
| Remove elements | `element.remove()` |
| Traverse tree | `parentElement`, `children`, `nextElementSibling` |
| Handle events | `addEventListener`, `removeEventListener` |
| Event delegation | Listen on parent, check `e.target` |
| Prevent default | `e.preventDefault()` |

Mastering the DOM unlocks the ability to build everything from interactive forms and dynamic lists to full-featured single-page applications — all without any frameworks.