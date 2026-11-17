// ============================================================
// JavaScript Functions — Complete Examples
// Topic: Functions
// Run in: Node.js (node functions.js) or Browser Console
// ============================================================


// ─────────────────────────────────────────────
// EXAMPLE 1: Basic Function Declaration
// Function declarations are hoisted — can be called before defined
// ─────────────────────────────────────────────

console.log('=== EXAMPLE 1: Function Declaration ===');

// Calling before definition works because of hoisting
console.log(greetUser('Alice')); // Hello, Alice!

function greetUser(name) {
  return `Hello, ${name}!`;
}

console.log(greetUser('Bob'));   // Hello, Bob!


// ─────────────────────────────────────────────
// EXAMPLE 2: Function Expression
// Stored in a variable; NOT hoisted
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 2: Function Expression ===');

const square = function(n) {
  return n * n;
};

console.log(square(4));   // 16
console.log(square(9));   // 81
console.log(square(12));  // 144


// ─────────────────────────────────────────────
// EXAMPLE 3: Arrow Functions
// Shorter syntax; implicitly returns for single expressions
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 3: Arrow Functions ===');

// Single-expression implicit return
const double = n => n * 2;
const add    = (a, b) => a + b;

console.log(double(7));       // 14
console.log(add(3, 8));       // 11

// Multi-line arrow function (requires braces + explicit return)
const describeNumber = (n) => {
  if (n > 0) return `${n} is positive`;
  if (n < 0) return `${n} is negative`;
  return `${n} is zero`;
};

console.log(describeNumber(5));   // 5 is positive
console.log(describeNumber(-3));  // -3 is negative
console.log(describeNumber(0));   // 0 is zero


// ─────────────────────────────────────────────
// EXAMPLE 4: Default Parameters
// Fallback values when arguments are not provided
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 4: Default Parameters ===');

function createProfile(name = 'Anonymous', role = 'Guest', age = 0) {
  return `Name: ${name} | Role: ${role} | Age: ${age}`;
}

console.log(createProfile('Alice', 'Admin', 30));  // Name: Alice | Role: Admin | Age: 30
console.log(createProfile('Bob'));                 // Name: Bob | Role: Guest | Age: 0
console.log(createProfile());                      // Name: Anonymous | Role: Guest | Age: 0


// ─────────────────────────────────────────────
// EXAMPLE 5: Rest Parameters (...args)
// Accept any number of arguments as an array
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 5: Rest Parameters ===');

function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAll(1, 2, 3));           // 6
console.log(sumAll(10, 20, 30, 40));    // 100
console.log(sumAll(5));                 // 5
console.log(sumAll());                  // 0

// Rest with named leading params
function introduce(greeting, ...names) {
  return `${greeting}, ${names.join(' and ')}!`;
}

console.log(introduce('Hello', 'Alice', 'Bob', 'Carol')); // Hello, Alice and Bob and Carol!


// ─────────────────────────────────────────────
// EXAMPLE 6: Scope — Global vs Local
// Variables inside a function are not accessible outside
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 6: Scope ===');

const globalMessage = 'I am global';

function scopeDemo() {
  const localMessage = 'I am local';
  console.log('Inside function - global:', globalMessage); // ✅
  console.log('Inside function - local:', localMessage);   // ✅
}

scopeDemo();
console.log('Outside function - global:', globalMessage);  // ✅

// Uncommenting the next line would throw ReferenceError:
// console.log(localMessage); // ❌ ReferenceError

// Block scope with let
function blockScopeDemo() {
  if (true) {
    let blockVar = 'block scoped';
    var funcVar  = 'function scoped';
    console.log('Inside block - blockVar:', blockVar); // ✅
  }
  // console.log(blockVar); // ❌ ReferenceError
  console.log('Outside block - funcVar:', funcVar);    // ✅ (var leaks to function scope)
}

blockScopeDemo();


// ─────────────────────────────────────────────
// EXAMPLE 7: Closures
// Inner functions remember variables from their outer scope
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 7: Closures ===');

// Counter factory using closure
function makeCounter(start = 0) {
  let count = start;
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
    reset()     { count = start; return count; },
    value()     { return count; }
  };
}

const counterA = makeCounter(0);
const counterB = makeCounter(10); // Independent counter

console.log(counterA.increment()); // 1
console.log(counterA.increment()); // 2
console.log(counterA.increment()); // 3
console.log(counterA.decrement()); // 2
console.log(counterA.reset());     // 0

console.log(counterB.increment()); // 11  (independent!)
console.log(counterB.value());     // 11

// Closure for private banking data
function bankAccount(initialBalance) {
  let balance = initialBalance;
  const history = [];

  return {
    deposit(amount) {
      balance += amount;
      history.push(`+${amount}`);
      return `Deposited $${amount}. Balance: $${balance}`;
    },
    withdraw(amount) {
      if (amount > balance) return 'Insufficient funds!';
      balance -= amount;
      history.push(`-${amount}`);
      return `Withdrew $${amount}. Balance: $${balance}`;
    },
    getBalance()  { return `Balance: $${balance}`; },
    getHistory()  { return history.join(', '); }
  };
}

const myAccount = bankAccount(100);
console.log(myAccount.deposit(50));     // Deposited $50. Balance: $150
console.log(myAccount.withdraw(30));    // Withdrew $30. Balance: $120
console.log(myAccount.withdraw(200));   // Insufficient funds!
console.log(myAccount.getBalance());    // Balance: $120
console.log(myAccount.getHistory());    // +50, -30


// ─────────────────────────────────────────────
// EXAMPLE 8: Higher-Order Functions
// Functions that accept or return other functions
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 8: Higher-Order Functions ===');

// A function that takes another function as argument
function applyTwice(fn, value) {
  return fn(fn(value));
}

const addThree = x => x + 3;
console.log(applyTwice(addThree, 7));  // 13  (7+3+3)
console.log(applyTwice(double, 5));    // 20  (5*2*2)

// A function that RETURNS a function (function factory)
function makeMultiplier(factor) {
  return (number) => number * factor;
}

const triple  = makeMultiplier(3);
const times10 = makeMultiplier(10);

console.log(triple(7));   // 21
console.log(times10(4));  // 40

// Built-in higher-order array methods
const products = [
  { name: 'Laptop',  price: 999,  inStock: true  },
  { name: 'Mouse',   price: 29,   inStock: true  },
  { name: 'Monitor', price: 399,  inStock: false },
  { name: 'Keyboard',price: 79,   inStock: true  },
  { name: 'Webcam',  price: 149,  inStock: false },
];

// .filter() — keep only in-stock items
const available = products.filter(p => p.inStock);
console.log('In-stock items:', available.map(p => p.name)); // Laptop, Mouse, Keyboard

// .map() — extract prices
const prices = products.map(p => p.price);
console.log('All prices:', prices); // [999, 29, 399, 79, 149]

// .reduce() — total value of in-stock items
const stockValue = available.reduce((sum, p) => sum + p.price, 0);
console.log('Total stock value: $' + stockValue); // $1107

// Chaining filter + map
const cheapInStock = products
  .filter(p => p.inStock && p.price < 100)
  .map(p => `${p.name} ($${p.price})`);
console.log('Affordable in-stock:', cheapInStock); // Mouse ($29), Keyboard ($79)


// ─────────────────────────────────────────────
// EXAMPLE 9: Callbacks
// Passing functions to be called at a later time
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 9: Callbacks ===');

function processData(data, transformFn, logFn) {
  const result = transformFn(data);
  logFn(result);
  return result;
}

const shout   = str => str.toUpperCase() + '!!!';
const whisper = str => str.toLowerCase() + '...';
const log     = val => console.log('Processed:', val);

processData('Hello World', shout,   log); // Processed: HELLO WORLD!!!
processData('Hello World', whisper, log); // Processed: hello world...

// Simulating async behavior with setTimeout callback
console.log('Start');
setTimeout(() => {
  console.log('Callback fired after 0ms delay (async!)');
}, 0);
console.log('End'); // "End" prints before the callback


// ─────────────────────────────────────────────
// EXAMPLE 10: Immediately Invoked Function Expressions (IIFE)
// Runs the moment it is defined; great for encapsulation
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 10: IIFE ===');

// Classic IIFE
const appVersion = (function() {
  const version = '2.4.1';
  const buildDate = '2026-11-17';
  console.log(`App initialized — v${version} (${buildDate})`);
  return version;
})();

console.log('Version exposed:', appVersion); // 2.4.1
// version and buildDate are NOT accessible here

// Arrow IIFE with parameter
const baseUrl = (() => {
  const env = 'production'; // Could come from config
  return env === 'production'
    ? 'https://api.example.com'
    : 'http://localhost:3000';
})();

console.log('Base URL:', baseUrl); // https://api.example.com


// ─────────────────────────────────────────────
// EXAMPLE 11: Recursion
// A function that calls itself; always needs a base case
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 11: Recursion ===');

// Factorial: n! = n × (n-1) × ... × 1
function factorial(n) {
  if (n <= 1) return 1; // Base case — MUST have this!
  return n * factorial(n - 1);
}

console.log('5! =', factorial(5));  // 120
console.log('10! =', factorial(10)); // 3628800

// Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13...
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(7):', fibonacci(7)); // 13
const fibSeq = Array.from({ length: 8 }, (_, i) => fibonacci(i));
console.log('Fibonacci sequence:', fibSeq); // [0, 1, 1, 2, 3, 5, 8, 13]

// Flatten a nested array recursively
function flattenArray(arr) {
  return arr.reduce((flat, item) =>
    Array.isArray(item) ? flat.concat(flattenArray(item)) : flat.concat(item)
  , []);
}

const nested = [1, [2, 3], [4, [5, [6, 7]]], 8];
console.log('Flattened:', flattenArray(nested)); // [1, 2, 3, 4, 5, 6, 7, 8]


// ─────────────────────────────────────────────
// EXAMPLE 12: Pure Functions & Function Composition
// Pure: same input always gives same output, no side effects
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 12: Pure Functions & Composition ===');

// Pure functions
const trimStr       = str => str.trim();
const toLower       = str => str.toLowerCase();
const replaceSpaces = str => str.replace(/\s+/g, '-');
const removeSpecial = str => str.replace(/[^a-z0-9-]/g, '');

// Compose: pipe output of one function into the next
function pipe(...fns) {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
}

const createSlug = pipe(trimStr, toLower, replaceSpaces, removeSpecial);

console.log(createSlug('  Hello, World!  '));          // hello-world
console.log(createSlug('  JavaScript Functions 101')); // javascript-functions-101
console.log(createSlug('  The "Big" O(n) Notation  ')); // the-big-on-notation

// Impure vs Pure comparison
let taxRate = 0.1; // External state

// IMPURE — depends on external variable
function calculateTaxImpure(price) {
  return price * taxRate; // taxRate can change!
}

// PURE — all inputs are explicit
function calculateTax(price, rate) {
  return price * rate; // Always predictable
}

console.log('Tax (impure):', calculateTaxImpure(100)); // 10 (but fragile)
console.log('Tax (pure):',   calculateTax(100, 0.1)); // 10 (always reliable)


// ─────────────────────────────────────────────
// EXAMPLE 13: Memoization
// Cache results of expensive function calls
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 13: Memoization ===');

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log(`  [cache hit] key: ${key}`);
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    console.log(`  [computed]  key: ${key} → ${result}`);
    return result;
  };
}

const memoFib = memoize(function fib(n) {
  if (n <= 1) return n;
  return memoFib(n - 1) + memoFib(n - 2);
});

console.log('Fib(6):', memoFib(6)); // computed fresh
console.log('Fib(6):', memoFib(6)); // served from cache
console.log('Fib(7):', memoFib(7)); // partial cache use


// ─────────────────────────────────────────────
// EXAMPLE 14: Arguments Object vs Rest Params
// (Classic vs Modern approach to variadic functions)
// ─────────────────────────────────────────────

console.log('\n=== EXAMPLE 14: Arguments Object vs Rest Params ===');

// Old style: 'arguments' is array-like, NOT a real array
function oldStyleSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

// Modern style: rest params is a true Array
function modernSum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log('Old style:', oldStyleSum(1, 2, 3, 4, 5)); // 15
console.log('Modern:  ', modernSum(1, 2, 3, 4, 5));    // 15

// Rest params can use all array methods directly
function topThree(...scores) {
  return scores.sort((a, b) => b - a).slice(0, 3);
}

console.log('Top 3 scores:', topThree(55, 90, 72, 88, 61, 95, 77)); // [95, 90, 88]


// ─────────────────────────────────────────────
// SUMMARY LOG
// ─────────────────────────────────────────────

console.log('\n=== ALL EXAMPLES COMPLETE ===');
console.log([
  'Ex 1:  Function Declaration (hoisting)',
  'Ex 2:  Function Expression',
  'Ex 3:  Arrow Functions',
  'Ex 4:  Default Parameters',
  'Ex 5:  Rest Parameters',
  'Ex 6:  Scope',
  'Ex 7:  Closures',
  'Ex 8:  Higher-Order Functions (map/filter/reduce)',
  'Ex 9:  Callbacks',
  'Ex 10: IIFE',
  'Ex 11: Recursion (factorial, fibonacci, flatten)',
  'Ex 12: Pure Functions & Composition',
  'Ex 13: Memoization',
  'Ex 14: Arguments vs Rest Params',
].join('\n'));
