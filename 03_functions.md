# JavaScript Functions: A Complete Guide

## Introduction

Functions are the **building blocks of JavaScript**. They allow you to group reusable logic, avoid repetition (DRY — Don't Repeat Yourself), and structure your programs in a readable and maintainable way. Whether you're building a simple script or a complex application, mastering functions is essential.

In this lecture, we'll cover:
- What functions are and why they matter
- Different ways to declare and use functions
- Parameters, arguments, default values, and rest parameters
- Return values
- Scope and closures
- Arrow functions
- Higher-order functions and callbacks
- Immediately Invoked Function Expressions (IIFEs)
- Common pitfalls and best practices

---

## 1. What Is a Function?

A **function** is a named, reusable block of code designed to perform a specific task. You define it once, then call (invoke) it as many times as needed.

```js
// Define
function greet() {
  console.log('Hello, World!');
}

// Invoke
greet(); // Hello, World!
```

---

## 2. Function Declarations

The most traditional way to define a function. Function declarations are **hoisted** — meaning you can call them before they appear in the source code.

```js
sayHello(); // Works! Declaration is hoisted

function sayHello() {
  console.log('Hello!');
}
```

**Syntax:**
```js
function functionName(parameter1, parameter2) {
  // function body
  return value;
}
```

---

## 3. Function Expressions

A function can also be stored in a variable. These are **not hoisted** like declarations.

```js
const greet = function(name) {
  return `Hello, ${name}!`;
};

console.log(greet('Alice')); // Hello, Alice!
```

> **Note:** Calling a function expression before its definition throws a `ReferenceError`.

---

## 4. Parameters and Arguments

- **Parameters** are placeholders defined in the function signature.
- **Arguments** are the actual values passed when calling the function.

```js
function add(a, b) {       // a and b are parameters
  return a + b;
}

add(3, 5);                 // 3 and 5 are arguments → returns 8
```

### Default Parameters (ES6+)

You can provide default values so the function works even when arguments are omitted.

```js
function greet(name = 'Stranger') {
  return `Hello, ${name}!`;
}

console.log(greet());         // Hello, Stranger!
console.log(greet('Bob'));    // Hello, Bob!
```

### Rest Parameters

Use `...` to accept any number of arguments as an array.

```js
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

---

## 5. Return Values

Functions can return a value using the `return` keyword. Without `return`, the function returns `undefined`.

```js
function multiply(x, y) {
  return x * y;
}

const result = multiply(4, 6);
console.log(result); // 24
```

A function stops executing as soon as a `return` statement is hit.

```js
function checkAge(age) {
  if (age < 18) {
    return 'Minor';
  }
  return 'Adult';
}
```

---

## 6. Arrow Functions (ES6+)

Arrow functions offer a shorter syntax and **do not have their own `this`** binding (important for object-oriented code and callbacks).

```js
// Traditional
function square(x) {
  return x * x;
}

// Arrow Function
const square = (x) => x * x;

// Single parameter — parentheses optional
const double = x => x * 2;

// Multiple lines — need braces and explicit return
const add = (a, b) => {
  const sum = a + b;
  return sum;
};
```

> **Tip:** Arrow functions are ideal for short callbacks and functional methods like `.map()`, `.filter()`, and `.reduce()`.

---

## 7. Scope

Scope determines where variables are accessible.

- **Global Scope:** Accessible everywhere.
- **Function (Local) Scope:** Accessible only inside the function.
- **Block Scope (`let`/`const`):** Accessible only inside `{}` blocks.

```js
const globalVar = 'I am global';

function showScope() {
  const localVar = 'I am local';
  console.log(globalVar); // ✅ Accessible
  console.log(localVar);  // ✅ Accessible
}

showScope();
console.log(localVar); // ❌ ReferenceError
```

---

## 8. Closures

A **closure** is a function that remembers variables from its outer (enclosing) scope, even after that outer function has finished executing. This is one of JavaScript's most powerful features.

```js
function makeCounter() {
  let count = 0; // This variable is "closed over"

  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

Each call to `makeCounter()` creates a new, independent closure with its own `count`.

### Real-World Use Case: Private State

```js
function bankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount)  { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance()     { return balance; }
  };
}

const account = bankAccount(100);
account.deposit(50);
account.withdraw(30);
console.log(account.getBalance()); // 120
```

---

## 9. Higher-Order Functions

A **higher-order function** is a function that either:
1. Takes another function as an argument (a **callback**), or
2. Returns a function.

```js
// Taking a function as argument
function applyOperation(a, b, operation) {
  return operation(a, b);
}

const result = applyOperation(10, 5, (x, y) => x - y);
console.log(result); // 5
```

### Built-in Higher-Order Functions

```js
const numbers = [1, 2, 3, 4, 5];

// map — transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter — keep elements matching a condition
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce — accumulate to a single value
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(total); // 15
```

---

## 10. Immediately Invoked Function Expressions (IIFE)

An IIFE runs immediately after it is defined. It's useful for creating isolated scopes and avoiding polluting the global namespace.

```js
(function() {
  const secret = 'I run immediately!';
  console.log(secret);
})();

// secret is NOT accessible outside
```

Arrow function IIFE:
```js
(() => {
  console.log('Arrow IIFE!');
})();
```

---

## 11. Recursion

A function that calls **itself** is recursive. Every recursive function needs a **base case** to stop the recursion.

```js
function factorial(n) {
  if (n <= 1) return 1;        // Base case
  return n * factorial(n - 1); // Recursive call
}

console.log(factorial(5)); // 120  (5 × 4 × 3 × 2 × 1)
```

---

## 12. Function Composition

Composing functions means chaining them together so the output of one becomes the input of the next.

```js
const trim        = str => str.trim();
const toLowerCase = str => str.toLowerCase();
const removeSpaces = str => str.replace(/\s+/g, '-');

const createSlug = str => removeSpaces(toLowerCase(trim(str)));

console.log(createSlug('  Hello World  ')); // hello-world
```

---

## Common Pitfalls & Tips

| Pitfall | Explanation | Fix |
|---|---|---|
| Calling a function expression before declaration | `const fn = function(){}` is not hoisted | Move the call after the declaration |
| Forgetting `return` | Function returns `undefined` silently | Always double-check your return paths |
| Arrow functions and `this` | Arrow functions inherit `this` from surrounding context | Use regular functions for object methods |
| Infinite recursion | Missing base case in recursive function | Always define a base case first |
| Mutating function arguments | Passing objects/arrays passes by reference | Clone with spread (`...`) if needed |
| Too many parameters | Hard-to-read and error-prone function signatures | Use an options object: `function fn({ a, b, c })` |

---

## Summary

| Concept | Key Takeaway |
|---|---|
| **Declaration** | Hoisted; classic way to define a function |
| **Expression** | Not hoisted; stored in a variable |
| **Arrow Function** | Short syntax; no own `this` |
| **Parameters/Arguments** | Defaults and rest (`...args`) give flexibility |
| **Return** | Functions return `undefined` without an explicit return |
| **Scope** | Variables are local unless declared globally |
| **Closure** | Inner functions remember outer variables |
| **Higher-Order** | Functions that accept or return functions |
| **IIFE** | Self-invoking for isolated scope |
| **Recursion** | Function calling itself with a base case |

Mastering functions unlocks the full power of JavaScript — from simple utilities to advanced patterns like currying, memoization, and functional programming.