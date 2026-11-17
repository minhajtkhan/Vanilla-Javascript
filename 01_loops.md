# JavaScript Loops

## Introduction

Loops are one of the most fundamental constructs in programming. They allow you to **execute a block of code repeatedly** without having to write it multiple times. In JavaScript, loops are essential for iterating over arrays, objects, strings, and more — automating repetitive tasks efficiently.

By the end of this lecture, you will understand:
- All major loop types in JavaScript
- When and why to use each one
- How to control loop flow with `break` and `continue`
- Common pitfalls and best practices

---

## 1. The `for` Loop

The `for` loop is the most classic loop. It is best used when you **know in advance** how many times you want to iterate.

### Syntax

```js
for (initialization; condition; update) {
  // code to execute
}
```

- **Initialization**: Runs once before the loop starts (e.g., `let i = 0`)
- **Condition**: Checked before each iteration; loop runs while `true`
- **Update**: Runs after each iteration (e.g., `i++`)

### Example 1 — Counting 1 to 5

```js
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5
```

### Example 2 — Iterating Over an Array

```js
const fruits = ['apple', 'banana', 'cherry'];
for (let i = 0; i < fruits.length; i++) {
  console.log(`Fruit at index ${i}: ${fruits[i]}`);
}
// Output:
// Fruit at index 0: apple
// Fruit at index 1: banana
// Fruit at index 2: cherry
```

### Example 3 — Looping Backwards

```js
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5 4 3 2 1
```

---

## 2. The `while` Loop

The `while` loop runs as long as a condition is `true`. It is best used when you **don't know in advance** how many iterations are needed.

### Syntax

```js
while (condition) {
  // code to execute
}
```

> ⚠️ **Warning**: Always ensure the condition eventually becomes `false`, or you'll create an **infinite loop** that crashes your program.

### Example 4 — Basic `while` Loop

```js
let count = 0;
while (count < 5) {
  console.log('Count:', count);
  count++;
}
// Output: Count: 0, Count: 1, Count: 2, Count: 3, Count: 4
```

### Example 5 — User Input Simulation

```js
let attempts = 0;
const maxAttempts = 3;
while (attempts < maxAttempts) {
  console.log(`Attempt ${attempts + 1} of ${maxAttempts}`);
  attempts++;
}
console.log('Done!');
```

---

## 3. The `do...while` Loop

The `do...while` loop is similar to `while`, but it **always executes the body at least once** before checking the condition.

### Syntax

```js
do {
  // code to execute
} while (condition);
```

### Example 6 — `do...while` Basics

```js
let num = 10;
do {
  console.log('num is:', num);
  num++;
} while (num < 5);
// Output: num is: 10
// (Runs once even though condition is false from the start)
```

### Example 7 — Menu Prompt Pattern

```js
let userChoice;
let tries = 0;
do {
  tries++;
  userChoice = tries === 2 ? 'quit' : 'continue'; // simulating input
  console.log(`User chose: ${userChoice}`);
} while (userChoice !== 'quit');
console.log('Exited after', tries, 'tries');
```

---

## 4. The `for...of` Loop

The `for...of` loop is a modern ES6+ loop for **iterating over iterable objects** like arrays, strings, Sets, and Maps. It's cleaner and more readable than a classic `for` loop.

### Syntax

```js
for (const item of iterable) {
  // use item
}
```

### Example 8 — Iterating an Array

```js
const colors = ['red', 'green', 'blue'];
for (const color of colors) {
  console.log(color);
}
// Output: red, green, blue
```

### Example 9 — Iterating a String

```js
const word = 'Hello';
for (const char of word) {
  console.log(char);
}
// Output: H e l l o
```

### Example 10 — Iterating a Map

```js
const scores = new Map([
  ['Alice', 95],
  ['Bob', 87],
  ['Carol', 92]
]);
for (const [name, score] of scores) {
  console.log(`${name}: ${score}`);
}
```

---

## 5. The `for...in` Loop

The `for...in` loop iterates over the **enumerable properties (keys)** of an object. It's designed for plain objects, not arrays.

### Syntax

```js
for (const key in object) {
  // use key and object[key]
}
```

> ⚠️ **Tip**: Avoid using `for...in` on arrays because it iterates over all enumerable properties, not just numeric indices.

### Example 11 — Looping Over an Object

```js
const person = { name: 'Alice', age: 30, city: 'New York' };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Alice
// age: 30
// city: New York
```

---

## 6. Loop Control: `break` and `continue`

### `break` — Exit the Loop Early

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// Output: 0 1 2 3 4
```

### `continue` — Skip the Current Iteration

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i);
}
// Output: 1 3 5 7 9
```

---

## 7. Nested Loops

You can place loops inside loops. This is commonly used for 2D data like matrices or grids.

### Example 12 — Multiplication Table

```js
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
}
```

> 💡 **Performance Tip**: Nested loops with large datasets can be slow (O(n²) complexity). Try to minimize nesting where possible.

---

## 8. Looping with Array Methods (Functional Style)

Modern JavaScript encourages using **array methods** as an alternative to manual loops. These are more declarative and often more readable.

| Method | Purpose |
|---|---|
| `forEach()` | Iterate without returning a value |
| `map()` | Transform each element, return new array |
| `filter()` | Keep elements that pass a test |
| `reduce()` | Accumulate a single value |
| `find()` | Return first matching element |
| `some()` | Return `true` if any element passes |
| `every()` | Return `true` if all elements pass |

### Example 13 — `forEach`

```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(n => console.log(n * 2));
// Output: 2 4 6 8 10
```

### Example 14 — `map` and `filter`

```js
const nums = [1, 2, 3, 4, 5, 6];
const evenDoubled = nums
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(evenDoubled); // [4, 8, 12]
```

---

## 9. Common Pitfalls & Tips

### ❌ Off-by-One Errors

```js
// Wrong: misses the last element
for (let i = 0; i < arr.length - 1; i++) { ... }

// Correct
for (let i = 0; i < arr.length; i++) { ... }
```

### ❌ Infinite Loops

```js
// Wrong: i never changes!
let i = 0;
while (i < 5) {
  console.log(i);
  // forgot: i++;
}
```

### ❌ Using `var` Instead of `let` in Loops

```js
// Problem with var (function-scoped)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // logs 3, 3, 3
}

// Fixed with let (block-scoped)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // logs 0, 1, 2
}
```

### ✅ When to Use Which Loop

| Scenario | Recommended Loop |
|---|---|
| Known iteration count | `for` |
| Unknown iteration count | `while` |
| Must run at least once | `do...while` |
| Iterate array/iterable values | `for...of` |
| Iterate object keys | `for...in` |
| Transform/filter arrays | Array methods (`map`, `filter`) |

---

## Summary

JavaScript offers a rich set of looping constructs:

- **`for`** – Classic, index-based, best for arrays and known counts
- **`while`** – Condition-based, runs until false
- **`do...while`** – Like `while` but always runs once
- **`for...of`** – Modern, clean iteration over iterables
- **`for...in`** – Key iteration over objects
- **`break` / `continue`** – Fine-grained flow control
- **Array methods** – Functional, expressive alternatives

Mastering loops is essential for writing efficient, readable JavaScript. Practice each type and choose the one that best fits your use case!
