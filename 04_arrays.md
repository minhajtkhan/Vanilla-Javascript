# JavaScript Arrays: A Complete Guide

## Introduction

Arrays are one of the most fundamental and powerful data structures in JavaScript. An array is an **ordered, indexed collection** of values. Those values can be anything — numbers, strings, objects, other arrays, or even functions. Arrays in JavaScript are dynamic (they can grow or shrink), zero-indexed, and come packed with a rich set of built-in methods.

Whether you're building a to-do list, processing API data, or transforming datasets, arrays are at the heart of almost every JavaScript application.

---

## 1. Creating Arrays

There are two primary ways to create an array:

### Array Literal (Preferred)
```js
const fruits = ['apple', 'banana', 'cherry'];
```

### Array Constructor
```js
const numbers = new Array(1, 2, 3);
const empty = new Array(5); // creates an array with 5 empty slots
```

> **Tip:** Always prefer the array literal syntax `[]`. The constructor can behave unexpectedly — `new Array(3)` creates 3 empty slots, NOT an array with the number 3.

---

## 2. Accessing and Modifying Elements

Arrays are **zero-indexed** — the first element is at index `0`.

```js
const colors = ['red', 'green', 'blue'];

console.log(colors[0]); // 'red'
console.log(colors[2]); // 'blue'
console.log(colors[colors.length - 1]); // 'blue' (last element)

// Modifying an element
colors[1] = 'yellow';
console.log(colors); // ['red', 'yellow', 'blue']
```

### The `length` Property
```js
console.log(colors.length); // 3
```

---

## 3. Adding and Removing Elements

| Method | Description | Mutates? |
|---|---|---|
| `push()` | Add to end | ✅ Yes |
| `pop()` | Remove from end | ✅ Yes |
| `unshift()` | Add to beginning | ✅ Yes |
| `shift()` | Remove from beginning | ✅ Yes |
| `splice()` | Add/remove at any index | ✅ Yes |

```js
const stack = ['a', 'b', 'c'];

stack.push('d');       // ['a', 'b', 'c', 'd']
stack.pop();           // ['a', 'b', 'c']
stack.unshift('z');    // ['z', 'a', 'b', 'c']
stack.shift();         // ['a', 'b', 'c']

// splice(startIndex, deleteCount, ...itemsToInsert)
stack.splice(1, 1, 'X', 'Y'); // removes 'b', inserts 'X', 'Y'
// Result: ['a', 'X', 'Y', 'c']
```

---

## 4. Iterating Over Arrays

### `for` Loop (Classic)
```js
const nums = [10, 20, 30];
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
```

### `for...of` Loop (Modern, Clean)
```js
for (const num of nums) {
  console.log(num);
}
```

### `forEach()` Method
```js
nums.forEach((num, index) => {
  console.log(`Index ${index}: ${num}`);
});
```

> **Pitfall:** `forEach` does **not** return a value and cannot be stopped early with `break`. Use a `for` loop if you need to exit early.

---

## 5. Transforming Arrays

### `map()` — Transform Each Element
`map()` creates a **new array** by applying a function to each element.

```js
const prices = [10, 20, 30];
const discounted = prices.map(price => price * 0.9);
console.log(discounted); // [9, 18, 27]
```

### `filter()` — Keep Elements That Pass a Test
`filter()` creates a **new array** with elements that return `true` from the callback.

```js
const ages = [12, 18, 25, 16, 30];
const adults = ages.filter(age => age >= 18);
console.log(adults); // [18, 25, 30]
```

### `reduce()` — Accumulate to a Single Value
`reduce()` processes the array and returns a **single accumulated value**.

```js
const cart = [15, 25, 10, 5];
const total = cart.reduce((accumulator, current) => accumulator + current, 0);
console.log(total); // 55
```

`reduce(callback, initialValue)` — always provide an `initialValue` to avoid bugs with empty arrays.

---

## 6. Searching and Finding

| Method | Returns | Description |
|---|---|---|
| `find()` | Element or `undefined` | First element matching condition |
| `findIndex()` | Index or `-1` | Index of first matching element |
| `indexOf()` | Index or `-1` | Index of exact value |
| `includes()` | Boolean | Checks if value exists |
| `some()` | Boolean | At least one element matches |
| `every()` | Boolean | All elements match |

```js
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' }
];

const bob = users.find(u => u.name === 'Bob');
console.log(bob); // { id: 2, name: 'Bob' }

const bobIndex = users.findIndex(u => u.name === 'Bob');
console.log(bobIndex); // 1

const scores = [80, 92, 55, 70];
console.log(scores.includes(92));          // true
console.log(scores.some(s => s < 60));    // true  (55 fails)
console.log(scores.every(s => s >= 50));  // true
```

---

## 7. Sorting and Reversing

### `sort()` — Sorts In Place

> **Pitfall:** By default, `sort()` converts elements to **strings** and sorts lexicographically. This breaks numeric sorting!

```js
const letters = ['banana', 'apple', 'cherry'];
letters.sort();
console.log(letters); // ['apple', 'banana', 'cherry']

const nums = [10, 2, 100, 21];
nums.sort(); // WRONG: [10, 100, 2, 21] — string sort!
nums.sort((a, b) => a - b); // Correct ascending: [2, 10, 21, 100]
nums.sort((a, b) => b - a); // Descending: [100, 21, 10, 2]
```

### `reverse()` — Reverses In Place
```js
const arr = [1, 2, 3];
arr.reverse();
console.log(arr); // [3, 2, 1]
```

---

## 8. Flattening, Combining, and Slicing

### `concat()` — Merge Arrays
```js
const a = [1, 2];
const b = [3, 4];
const merged = a.concat(b); // [1, 2, 3, 4]
```

### Spread Operator `...` (Modern Alternative)
```js
const merged2 = [...a, ...b, 5]; // [1, 2, 3, 4, 5]
```

### `slice()` — Extract a Portion (Non-Mutating)
```js
const animals = ['cat', 'dog', 'fox', 'owl', 'bat'];
const middle = animals.slice(1, 4); // ['dog', 'fox', 'owl']
const last2 = animals.slice(-2);    // ['owl', 'bat']
```

### `flat()` and `flatMap()`
```js
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]

const sentences = ['Hello World', 'Foo Bar'];
const words = sentences.flatMap(s => s.split(' '));
console.log(words); // ['Hello', 'World', 'Foo', 'Bar']
```

---

## 9. Useful Utility Methods

### `Array.from()` — Create Array from Iterables
```js
const str = 'hello';
const chars = Array.from(str); // ['h', 'e', 'l', 'l', 'o']

const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(range); // [1, 2, 3, 4, 5]
```

### `Array.isArray()` — Type Checking
```js
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('hello'));   // false
```

### `join()` — Array to String
```js
const parts = ['Hello', 'World'];
console.log(parts.join(' '));  // 'Hello World'
console.log(parts.join('-'));  // 'Hello-World'
```

### `fill()` — Fill with a Value
```js
const grid = new Array(5).fill(0);
console.log(grid); // [0, 0, 0, 0, 0]
```

---

## 10. Destructuring Arrays

Array destructuring is a modern ES6+ syntax to unpack values into variables.

```js
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log(first);  // 10
console.log(second); // 20
console.log(rest);   // [30, 40, 50]

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1

// Skipping elements
const [,, third] = ['a', 'b', 'c'];
console.log(third); // 'c'
```

---

## 11. Common Pitfalls and Tips

1. **Mutation vs. Non-Mutation:** `push`, `pop`, `sort`, `splice`, `reverse` all mutate the original array. `map`, `filter`, `slice`, `concat` return a new array.

2. **Copying Arrays:** Don't use `const copy = original` — that just copies the reference!
   ```js
   const copy = [...original];       // Shallow copy (spread)
   const copy2 = original.slice();   // Also shallow copy
   const deep = JSON.parse(JSON.stringify(original)); // Deep copy (simple objects only)
   ```

3. **Sparse Arrays:** Avoid creating holes in arrays (`const a = [1,,3]`). They cause subtle bugs.

4. **`sort()` default:** Always pass a comparator when sorting numbers.

5. **`find` vs `filter`:** `find` returns the first matching element (or `undefined`). `filter` returns an array of all matching elements.

6. **Chaining:** `map`, `filter`, and `reduce` can be chained elegantly:
   ```js
   const result = [1,2,3,4,5]
     .filter(n => n % 2 !== 0)   // [1, 3, 5]
     .map(n => n * n)             // [1, 9, 25]
     .reduce((sum, n) => sum + n, 0); // 35
   ```

---

## Summary

| Category | Methods |
|---|---|
| **Create** | `[]`, `new Array()`, `Array.from()`, `Array.of()` |
| **Add/Remove** | `push`, `pop`, `shift`, `unshift`, `splice` |
| **Transform** | `map`, `filter`, `reduce`, `flatMap` |
| **Search** | `find`, `findIndex`, `indexOf`, `includes`, `some`, `every` |
| **Sort/Order** | `sort`, `reverse` |
| **Combine/Extract** | `concat`, `slice`, `flat`, spread `...` |
| **Utility** | `join`, `fill`, `forEach`, `Array.isArray` |

Arrays are the backbone of data manipulation in JavaScript. Mastering these methods — especially `map`, `filter`, and `reduce` — will make you dramatically more productive and write far more expressive, readable code.
