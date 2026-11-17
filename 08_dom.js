/*
 ============================================================
  JAVASCRIPT DOM — Complete Examples
 ============================================================

  ASSUMED HTML STRUCTURE
  ----------------------
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Examples</title>
    <style>
      .hidden   { display: none; }
      .active   { background: coral; }
      .completed{ text-decoration: line-through; opacity: 0.5; }
      .card     { border: 1px solid #ccc; padding: 16px; margin: 8px; }
      .highlight{ background: yellow; }
    </style>
  </head>
  <body>
    <h1 id="main-title">Hello, DOM!</h1>

    <p class="intro">Welcome to the DOM examples page.</p>
    <p class="intro">There are many things you can do with the DOM.</p>

    <img id="hero-img" src="photo.jpg" alt="Hero" title="Hero image" />

    <input id="name-input" type="text" placeholder="Your name" />
    <input id="email-input" type="email" placeholder="Your email" />

    <form id="signup-form">
      <input id="form-name" type="text" placeholder="Name" />
      <input id="form-email" type="email" placeholder="Email" />
      <button type="submit">Sign Up</button>
    </form>

    <ul id="todo-list">
      <li class="todo-item" data-id="1">Buy groceries</li>
      <li class="todo-item" data-id="2">Walk the dog</li>
      <li class="todo-item" data-id="3">Read a book</li>
    </ul>

    <div id="card-container">
      <div class="card" data-category="tech">Card One</div>
      <div class="card" data-category="health">Card Two</div>
      <div class="card" data-category="tech">Card Three</div>
    </div>

    <div id="output-box"></div>
    <button id="my-btn" data-action="greet">Click Me</button>
    <a id="my-link" href="https://example.com">Example Link</a>

    <script src="dom-examples.js"></script>
  </body>
  </html>
*/

'use strict';

// Wait for the DOM to be fully parsed before running any code
document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     EXAMPLE 1 — Selecting Elements
     ============================================================ */
  console.log('--- EXAMPLE 1: Selecting Elements ---');

  // getElementById — returns a single element or null
  const mainTitle = document.getElementById('main-title');
  console.log('getElementById:', mainTitle.tagName);       // H1
  console.log('id:', mainTitle.id);                        // main-title

  // querySelector — first element matching a CSS selector
  const firstIntro = document.querySelector('.intro');
  console.log('querySelector (.intro):', firstIntro.textContent);
  // "Welcome to the DOM examples page."

  // querySelectorAll — static NodeList of ALL matches
  const allIntros = document.querySelectorAll('.intro');
  console.log('querySelectorAll count:', allIntros.length); // 2
  allIntros.forEach((p, i) => console.log(`  intro[${i}]:`, p.textContent));

  // getElementsByClassName — live HTMLCollection
  const cards = document.getElementsByClassName('card');
  console.log('getElementsByClassName count:', cards.length); // 3

  // getElementsByTagName — live HTMLCollection
  const listItems = document.getElementsByTagName('li');
  console.log('getElementsByTagName <li> count:', listItems.length); // 3


  /* ============================================================
     EXAMPLE 2 — Reading & Modifying Text Content
     ============================================================ */
  console.log('\n--- EXAMPLE 2: Text Content ---');

  // Read textContent (plain text, ignores HTML tags)
  console.log('Original title:', mainTitle.textContent); // Hello, DOM!

  // Write textContent — safely replaces text (no HTML interpretation)
  mainTitle.textContent = 'Welcome to DOM Mastery!';
  console.log('Updated title:', mainTitle.textContent); // Welcome to DOM Mastery!

  // innerHTML — reads/writes raw HTML markup
  const outputBox = document.getElementById('output-box');
  outputBox.innerHTML = '<strong>Bold</strong> and <em>italic</em> text.';
  console.log('innerHTML set on #output-box');

  // ⚠️ NEVER do this with user data (XSS risk):
  // outputBox.innerHTML = userInput; // DANGEROUS
  // SAFE alternative:
  // outputBox.textContent = userInput; // treats everything as plain text


  /* ============================================================
     EXAMPLE 3 — Attributes & dataset
     ============================================================ */
  console.log('\n--- EXAMPLE 3: Attributes & dataset ---');

  const img = document.getElementById('hero-img');

  // getAttribute / setAttribute / removeAttribute
  console.log('src:', img.getAttribute('src'));    // photo.jpg
  console.log('alt:', img.getAttribute('alt'));    // Hero

  img.setAttribute('src', 'new-photo.jpg');
  img.setAttribute('alt', 'A beautiful landscape');
  console.log('Updated src:', img.getAttribute('src'));  // new-photo.jpg
  console.log('Updated alt:', img.getAttribute('alt'));  // A beautiful landscape

  img.removeAttribute('title');
  console.log('title after removal:', img.getAttribute('title')); // null

  // Direct property access (faster for standard attributes)
  const nameInput = document.getElementById('name-input');
  nameInput.placeholder = 'Enter your full name';
  nameInput.disabled = false;
  console.log('placeholder:', nameInput.placeholder); // Enter your full name

  // data-* attributes via dataset
  const todoItems = document.querySelectorAll('.todo-item');
  todoItems.forEach(item => {
    console.log(`Todo id=${item.dataset.id}: ${item.textContent}`);
    // Todo id=1: Buy groceries
    // Todo id=2: Walk the dog
    // Todo id=3: Read a book
  });

  // Set a new data attribute dynamically
  const btn = document.getElementById('my-btn');
  btn.dataset.status = 'ready';
  console.log('btn data-status:', btn.dataset.status);   // ready
  console.log('btn data-action:', btn.dataset.action);   // greet (from HTML)


  /* ============================================================
     EXAMPLE 4 — Styling: style & classList
     ============================================================ */
  console.log('\n--- EXAMPLE 4: Styling ---');

  // Inline style via element.style (camelCase property names)
  outputBox.style.backgroundColor = '#f0f8ff';
  outputBox.style.padding = '12px';
  outputBox.style.borderRadius = '8px';
  outputBox.style.fontSize = '16px';
  console.log('Applied inline styles to #output-box');

  // classList — the preferred way (keeps CSS in .css files)
  const firstCard = document.querySelector('.card');

  firstCard.classList.add('highlight');
  console.log('Has highlight:', firstCard.classList.contains('highlight')); // true

  firstCard.classList.remove('highlight');
  console.log('Has highlight after remove:', firstCard.classList.contains('highlight')); // false

  firstCard.classList.toggle('active'); // adds 'active'
  console.log('Has active after toggle:', firstCard.classList.contains('active')); // true

  firstCard.classList.toggle('active'); // removes 'active'
  console.log('Has active after 2nd toggle:', firstCard.classList.contains('active')); // false

  firstCard.classList.add('old-class');
  firstCard.classList.replace('old-class', 'new-class');
  console.log('Has new-class:', firstCard.classList.contains('new-class')); // true


  /* ============================================================
     EXAMPLE 5 — Creating & Inserting Elements
     ============================================================ */
  console.log('\n--- EXAMPLE 5: Creating & Inserting Elements ---');

  const todoList = document.getElementById('todo-list');

  // createElement + textContent + classList + appendChild
  const newLi = document.createElement('li');
  newLi.textContent = 'Learn DOM manipulation';
  newLi.classList.add('todo-item');
  newLi.dataset.id = '4';
  todoList.appendChild(newLi); // added to the END
  console.log('Appended new <li>. Total items:', todoList.children.length); // 4

  // prepend — insert as FIRST child
  const urgentLi = document.createElement('li');
  urgentLi.textContent = '🔴 URGENT: Call dentist';
  urgentLi.classList.add('todo-item');
  urgentLi.dataset.id = '0';
  todoList.prepend(urgentLi);
  console.log('Prepended urgent item. First item:', todoList.firstElementChild.textContent);
  // 🔴 URGENT: Call dentist

  // insertAdjacentHTML — insert HTML at precise positions
  // Positions: 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend'
  todoList.insertAdjacentHTML(
    'beforeend',
    '<li class="todo-item" data-id="5">🌟 Bonus: Review pull requests</li>'
  );
  console.log('Inserted via insertAdjacentHTML. Total:', todoList.children.length);

  // cloneNode(true) — deep clone (includes all children & attributes)
  const cardContainer = document.getElementById('card-container');
  const originalCard = document.querySelector('.card');
  const clonedCard = originalCard.cloneNode(true);
  clonedCard.textContent = 'Cloned Card';
  cardContainer.appendChild(clonedCard);
  console.log('Cloned a card. Total cards now:', document.querySelectorAll('.card').length); // 4


  /* ============================================================
     EXAMPLE 6 — Removing Elements
     ============================================================ */
  console.log('\n--- EXAMPLE 6: Removing Elements ---');

  // Modern: element.remove()
  const cloneToRemove = cardContainer.lastElementChild;
  console.log('Removing:', cloneToRemove.textContent); // Cloned Card
  cloneToRemove.remove();
  console.log('Cards after removal:', document.querySelectorAll('.card').length); // 3

  // Legacy: parentNode.removeChild(child) — still works in all environments
  const secondCard = document.querySelectorAll('.card')[1];
  secondCard.parentNode.removeChild(secondCard);
  console.log('Cards after legacy removal:', document.querySelectorAll('.card').length); // 2


  /* ============================================================
     EXAMPLE 7 — DOM Traversal
     ============================================================ */
  console.log('\n--- EXAMPLE 7: DOM Traversal ---');

  const list = document.getElementById('todo-list');

  // children — HTMLCollection of child ELEMENTS (no text/comment nodes)
  console.log('Number of children:', list.children.length);

  // firstElementChild / lastElementChild
  console.log('First child:', list.firstElementChild.textContent);
  console.log('Last child:', list.lastElementChild.textContent);

  // nextElementSibling / previousElementSibling
  const second = list.children[1];
  console.log('Second child:', second.textContent);
  console.log('Its next sibling:', second.nextElementSibling.textContent);
  console.log('Its prev sibling:', second.previousElementSibling.textContent);

  // parentElement
  console.log('Parent of list:', list.parentElement.tagName); // BODY

  // childNodes — includes TEXT nodes (whitespace!) — usually not what you want
  console.log('childNodes length (includes whitespace):', list.childNodes.length);
  // Will be more than list.children.length due to text nodes


  /* ============================================================
     EXAMPLE 8 — Events & Event Listeners
     ============================================================ */
  console.log('\n--- EXAMPLE 8: Events ---');

  // Basic click listener
  btn.addEventListener('click', function (event) {
    console.log('Button clicked!');
    console.log('event.type:', event.type);         // click
    console.log('event.target:', event.target.id);  // my-btn
    console.log('data-action:', event.target.dataset.action); // greet
    outputBox.textContent = `Hello! You clicked the "${event.target.dataset.action}" button.`;
  });
  console.log('Click listener attached to #my-btn');

  // Keyboard event
  const nameInputEl = document.getElementById('name-input');
  nameInputEl.addEventListener('keydown', (e) => {
    // log key info without cluttering (only shown when user types)
    if (e.key === 'Enter') {
      console.log('Enter pressed in name input! Value:', e.target.value);
    }
  });

  // Mouseover / mouseout
  const titleEl = document.getElementById('main-title');
  titleEl.addEventListener('mouseover', () => {
    titleEl.style.color = 'coral';
  });
  titleEl.addEventListener('mouseout', () => {
    titleEl.style.color = '';
  });
  console.log('Mouseover/mouseout on h1 attached');

  // Prevent default — stop link navigation
  const myLink = document.getElementById('my-link');
  myLink.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Link click intercepted — navigation prevented!');
  });

  // removeEventListener — must use a named function reference
  function oneTimeHandler() {
    console.log('This runs only once, then removes itself!');
    btn.removeEventListener('click', oneTimeHandler);
  }
  // Note: This is registered as a SECOND click handler on the button.
  // Both click handlers run on the first click; oneTimeHandler removes itself after.
  btn.addEventListener('click', oneTimeHandler);


  /* ============================================================
     EXAMPLE 9 — Event Delegation
     ============================================================ */
  console.log('\n--- EXAMPLE 9: Event Delegation ---');

  // Instead of attaching a listener to EACH <li>,
  // we attach ONE listener to the parent <ul>.
  // This also handles dynamically added <li> elements!
  const todoListEl = document.getElementById('todo-list');

  todoListEl.addEventListener('click', (e) => {
    // Check that the click target is an <li> (not the <ul> itself)
    if (e.target.matches('li.todo-item')) {
      e.target.classList.toggle('completed');
      const done = e.target.classList.contains('completed');
      console.log(`Todo "${e.target.textContent}" marked as ${done ? 'done' : 'pending'}`);
    }
  });
  console.log('Delegated click listener attached to #todo-list (handles all <li> items)');


  /* ============================================================
     EXAMPLE 10 — Form Handling
     ============================================================ */
  console.log('\n--- EXAMPLE 10: Form Handling ---');

  const signupForm = document.getElementById('signup-form');
  const formName  = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');

  // Live input feedback
  formName.addEventListener('input', (e) => {
    // Fires on every keystroke
    // console.log('Name typing:', e.target.value); // too noisy for demo
  });

  // Form submit — preventDefault stops page reload
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // ← critical: stops full-page form submission

    const name  = formName.value.trim();
    const email = formEmail.value.trim();

    // Simple validation
    if (!name || !email) {
      outputBox.textContent = '⚠️ Please fill in all fields.';
      outputBox.style.color = 'red';
      console.log('Form validation failed — empty fields');
      return;
    }

    if (!email.includes('@')) {
      outputBox.textContent = '⚠️ Please enter a valid email address.';
      outputBox.style.color = 'red';
      console.log('Form validation failed — invalid email');
      return;
    }

    // Success
    const userData = { name, email, submittedAt: new Date().toISOString() };
    console.log('Form submitted successfully:', userData);
    outputBox.textContent = `✅ Welcome, ${name}! Confirmation sent to ${email}.`;
    outputBox.style.color = 'green';

    // Reset form fields
    signupForm.reset();
  });
  console.log('Form submit handler attached to #signup-form');


  /* ============================================================
     EXAMPLE 11 — DocumentFragment (Performance)
     ============================================================ */
  console.log('\n--- EXAMPLE 11: DocumentFragment ---');

  // ❌ Slow way: append one element at a time (causes multiple reflows)
  // for (let i = 0; i < 50; i++) { ul.appendChild(li); }

  // ✅ Fast way: build in a fragment, then insert ONCE (one reflow)
  const fragment = document.createDocumentFragment();
  const colorList = document.createElement('ul');
  colorList.id = 'color-list';

  const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
  colors.forEach(color => {
    const li = document.createElement('li');
    li.textContent = color;
    li.style.color = color.toLowerCase();
    fragment.appendChild(li);
  });

  colorList.appendChild(fragment); // ONE DOM insertion
  document.body.appendChild(colorList);
  console.log('Color list built with DocumentFragment — single DOM reflow');
  console.log('Colors added:', colors.join(', '));


  /* ============================================================
     EXAMPLE 12 — Reading Computed Styles
     ============================================================ */
  console.log('\n--- EXAMPLE 12: Computed Styles ---');

  // element.style only reads INLINE styles
  // getComputedStyle reads the FINAL computed value from all CSS sources
  const computedTitle = window.getComputedStyle(mainTitle);
  console.log('Computed font-size:', computedTitle.fontSize);       // e.g., '32px'
  console.log('Computed font-weight:', computedTitle.fontWeight);   // e.g., 'bold' or '700'
  console.log('Computed display:', computedTitle.display);          // 'block'
  console.log('Computed color:', computedTitle.color);              // 'rgb(...)'

  // getBoundingClientRect — position & size relative to the viewport
  const rect = mainTitle.getBoundingClientRect();
  console.log('Title top:', rect.top);
  console.log('Title left:', rect.left);
  console.log('Title width:', rect.width);
  console.log('Title height:', rect.height);


  /* ============================================================
     EXAMPLE 13 — NodeList vs Array
     ============================================================ */
  console.log('\n--- EXAMPLE 13: NodeList vs Array ---');

  const nodeList = document.querySelectorAll('.todo-item');
  console.log('NodeList is not an Array:', !Array.isArray(nodeList));  // true
  console.log('But it IS iterable with forEach:', typeof nodeList.forEach); // function

  // Convert to a real Array to use all array methods
  const itemsArray = Array.from(nodeList);
  console.log('Is now an Array:', Array.isArray(itemsArray));  // true

  // Now you can use .map(), .filter(), .reduce(), etc.
  const texts = itemsArray.map(li => li.textContent);
  console.log('All todo texts:', texts);

  // Spread syntax alternative
  const spreadArray = [...document.querySelectorAll('.todo-item')];
  const longTodos = spreadArray.filter(li => li.textContent.length > 15);
  console.log('Todos with more than 15 chars:', longTodos.map(li => li.textContent));


  /* ============================================================
     EXAMPLE 14 — Scroll & Intersection Observer (bonus)
     ============================================================ */
  console.log('\n--- EXAMPLE 14: Scroll events & smooth scrolling ---');

  // Smooth scroll to an element
  function scrollToElement(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log(`Smooth-scrolling to: ${selector}`);
    }
  }
  // Demonstration call (would scroll to the form in a real browser):
  // scrollToElement('#signup-form');
  console.log('scrollToElement() helper defined (call it to scroll smoothly to any selector)');

  // Track scroll position
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const direction = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
    // console.log(`Scrolling ${direction} — Y: ${window.scrollY}px`); // uncomment to test
  });
  console.log('Scroll direction tracker attached (check console while scrolling)');


  /* ============================================================
     SUMMARY LOG
     ============================================================ */
  console.log('\n=== DOM Examples Loaded Successfully ===');
  console.log('Open the page in a browser and interact with:');
  console.log('  • The button (#my-btn) — triggers click events');
  console.log('  • The <li> items       — click to toggle completed state');
  console.log('  • The form (#signup-form) — try submitting with/without data');
  console.log('  • The <h1> title       — hover to change color');
  console.log('  • The link (#my-link)  — click (navigation is prevented)');

}); // end DOMContentLoaded
