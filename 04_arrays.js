// ============================================================
// JavaScript Arrays - Complete Code Examples
// Topic: Arrays
// Works in: Node.js (node arrays.js) or Browser Console
// ============================================================


// ─────────────────────────────────────────────
// EXAMPLE 1: Creating Arrays
// ─────────────────────────────────────────────
console.log('=== EXAMPLE 1: Creating Arrays ===');

// Array literal (preferred)
const fruits = ['apple', 'banana', 'cherry', 'date'];
console.log('Fruits:', fruits);

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);
console.log('Numbers:', numbers);

// PITFALL: new Array(n) creates n empty slots, NOT [n]
const tricky = new Array(3);
console.log('new Array(3):', tricky);         // [ <3 empty items> ]
console.log('new Array(3) length:', tricky.length); // 3

// Mixed types (JavaScript allows this)
const mixed = [42, 'hello', true, null, { key: 'value' }, [1, 2]];
console.log('Mixed array:', mixed);


// ─────────────────────────────────────────────
// EXAMPLE 2: Accessing and Modifying Elements
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 2: Accessing & Modifying Elements ===');

const colors = ['red', 'green', 'blue', 'yellow'];

// Zero-based indexing
console.log('First element  (index 0):', colors[0]);  // 'red'
console.log('Third element  (index 2):', colors[2]);  // 'blue'
console.log('Last element (length-1):', colors[colors.length - 1]); // 'yellow'

// at() method — supports negative indexing (ES2022)
console.log('Last element via at(-1):', colors.at(-1));  // 'yellow'
console.log('Second-to-last via at(-2):', colors.at(-2)); // 'blue'

// Modifying an element
colors[1] = 'purple';
console.log('After modifying index 1:', colors); // ['red', 'purple', 'blue', 'yellow']

// Accessing out-of-bounds returns undefined
console.log('Out of bounds (index 10):', colors[10]); // undefined


// ─────────────────────────────────────────────
// EXAMPLE 3: Adding and Removing Elements
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 3: Adding & Removing Elements ===');

const stack = ['a', 'b', 'c'];
console.log('Original:', [...stack]);

// push() — adds to END, returns new length
const newLen = stack.push('d', 'e');
console.log('After push(d, e):', stack, '| new length:', newLen);

// pop() — removes from END, returns removed element
const popped = stack.pop();
console.log('After pop():', stack, '| removed:', popped);

// unshift() — adds to BEGINNING, returns new length
stack.unshift('Z', 'Y');
console.log('After unshift(Z, Y):', stack);

// shift() — removes from BEGINNING, returns removed element
const shifted = stack.shift();
console.log('After shift():', stack, '| removed:', shifted);

// splice(start, deleteCount, ...items) — powerful in-place edit
const letters = ['a', 'b', 'c', 'd', 'e'];
const removed = letters.splice(1, 2, 'X', 'Y', 'Z');
console.log('After splice(1,2,X,Y,Z):', letters); // ['a','X','Y','Z','d','e']
console.log('splice() removed:', removed);         // ['b','c']


// ─────────────────────────────────────────────
// EXAMPLE 4: Iterating Over Arrays
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 4: Iterating Over Arrays ===');

const scores = [85, 92, 78, 95, 60];

// Classic for loop — most control
console.log('Classic for loop:');
for (let i = 0; i < scores.length; i++) {
  console.log(`  Index ${i}: ${scores[i]}`);
}

// for...of — clean, no index needed
console.log('for...of loop:');
for (const score of scores) {
  process.stdout ? process.stdout.write(score + ' ') : console.log(score);
}
console.log();

// forEach — callback with (element, index, array)
console.log('forEach with index:');
scores.forEach((score, index) => {
  console.log(`  [${index}] => ${score} ${score >= 90 ? '⭐' : ''}`);
});

// entries() — iterate with [index, value] pairs
console.log('Using entries():');
for (const [i, val] of scores.entries()) {
  console.log(`  entry ${i}: ${val}`);
}


// ─────────────────────────────────────────────
// EXAMPLE 5: map(), filter(), reduce()
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 5: map / filter / reduce ===');

const products = [
  { name: 'Laptop', price: 999, inStock: true },
  { name: 'Mouse',  price: 29,  inStock: true },
  { name: 'Monitor',price: 399, inStock: false },
  { name: 'Keyboard',price: 79, inStock: true },
  { name: 'Webcam', price: 149, inStock: false },
];

// map() — transform each element into a new array
const names = products.map(p => p.name);
console.log('Product names:', names);
// Expected: ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Webcam']

// map() with transformation
const discounted = products.map(p => ({
  ...p,
  price: parseFloat((p.price * 0.9).toFixed(2))
}));
console.log('Discounted prices:', discounted.map(p => `${p.name}: $${p.price}`));

// filter() — keep elements that satisfy condition
const inStock = products.filter(p => p.inStock);
console.log('In-stock products:', inStock.map(p => p.name));
// Expected: ['Laptop', 'Mouse', 'Keyboard']

// reduce() — accumulate to a single value
const totalValue = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log('Total value of in-stock items: $' + totalValue); // $1107

// reduce() — build an object from array
const stockMap = products.reduce((acc, p) => {
  acc[p.name] = p.inStock;
  return acc;
}, {});
console.log('Stock map:', stockMap);


// ─────────────────────────────────────────────
// EXAMPLE 6: Searching Arrays
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 6: Searching Arrays ===');

const users = [
  { id: 1, name: 'Alice',  role: 'admin' },
  { id: 2, name: 'Bob',    role: 'user'  },
  { id: 3, name: 'Carol',  role: 'user'  },
  { id: 4, name: 'Dave',   role: 'admin' },
];

// find() — returns FIRST matching element (or undefined)
const admin = users.find(u => u.role === 'admin');
console.log('First admin:', admin); // { id: 1, name: 'Alice', role: 'admin' }

// findIndex() — returns INDEX of first match (or -1)
const carolIdx = users.findIndex(u => u.name === 'Carol');
console.log('Carol is at index:', carolIdx); // 2

// indexOf() — exact value match (uses ===)
const simpleArr = ['cat', 'dog', 'fox', 'dog'];
console.log('indexOf dog:', simpleArr.indexOf('dog'));     // 1 (first occurrence)
console.log('lastIndexOf dog:', simpleArr.lastIndexOf('dog')); // 3

// includes() — boolean presence check
console.log('includes fox:', simpleArr.includes('fox'));   // true
console.log('includes owl:', simpleArr.includes('owl'));   // false

// some() — at least ONE element matches
console.log('Any admin?', users.some(u => u.role === 'admin'));      // true
console.log('Any moderator?', users.some(u => u.role === 'mod'));    // false

// every() — ALL elements match
console.log('All have an id?', users.every(u => u.id !== undefined)); // true
console.log('All admins?', users.every(u => u.role === 'admin'));     // false


// ─────────────────────────────────────────────
// EXAMPLE 7: Sorting and Reversing
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 7: Sorting & Reversing ===');

// String sort (default, alphabetical)
const animals = ['zebra', 'ant', 'mango', 'bear'];
animals.sort();
console.log('Sorted strings:', animals); // ['ant', 'bear', 'mango', 'zebra']

// PITFALL: Default sort is lexicographic — wrong for numbers!
const nums = [10, 2, 100, 21, 3];
console.log('Default (broken) number sort:', [...nums].sort());
// Expected WRONG: [10, 100, 2, 21, 3]

// Correct numeric sort with comparator
console.log('Ascending sort:', [...nums].sort((a, b) => a - b));
// Expected: [2, 3, 10, 21, 100]
console.log('Descending sort:', [...nums].sort((a, b) => b - a));
// Expected: [100, 21, 10, 3, 2]

// Sorting objects by a property
const students = [
  { name: 'Zara',  gpa: 3.5 },
  { name: 'Ahmed', gpa: 3.9 },
  { name: 'Bella', gpa: 3.2 },
];
students.sort((a, b) => b.gpa - a.gpa); // Sort by GPA descending
console.log('Students by GPA (desc):', students.map(s => `${s.name}:${s.gpa}`));
// Expected: ['Ahmed:3.9', 'Zara:3.5', 'Bella:3.2']

// reverse() — reverses in place
const seq = [1, 2, 3, 4, 5];
seq.reverse();
console.log('Reversed:', seq); // [5, 4, 3, 2, 1]


// ─────────────────────────────────────────────
// EXAMPLE 8: Combining, Slicing, and Flattening
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 8: Combining, Slicing & Flattening ===');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// concat() — merges arrays, returns new array
const merged = arr1.concat(arr2, arr3);
console.log('concat():', merged); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Spread operator — modern alternative
const spread = [...arr1, ...arr2, 99, ...arr3];
console.log('spread:', spread); // [1, 2, 3, 4, 5, 6, 99, 7, 8, 9]

// slice(start, end) — extracts WITHOUT mutation
const source = ['a', 'b', 'c', 'd', 'e', 'f'];
console.log('slice(1, 4):', source.slice(1, 4)); // ['b', 'c', 'd']
console.log('slice(-3):', source.slice(-3));      // ['d', 'e', 'f']
console.log('slice() (copy):', source.slice());   // full shallow copy
console.log('source unchanged:', source);         // original intact

// flat() — flattens nested arrays
const nested = [1, [2, 3], [4, [5, [6]]]];
console.log('flat(1):', nested.flat());    // [1, 2, 3, 4, [5, [6]]]
console.log('flat(2):', nested.flat(2));   // [1, 2, 3, 4, 5, [6]]
console.log('flat(Infinity):', nested.flat(Infinity)); // [1,2,3,4,5,6]

// flatMap() — map then flatten 1 level
const sentences = ['Hello World', 'Good Morning', 'JavaScript Rules'];
const words = sentences.flatMap(s => s.split(' '));
console.log('flatMap words:', words);
// ['Hello', 'World', 'Good', 'Morning', 'JavaScript', 'Rules']


// ─────────────────────────────────────────────
// EXAMPLE 9: Array Destructuring
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 9: Array Destructuring ===');

// Basic destructuring
const [first, second, third] = [10, 20, 30, 40, 50];
console.log('first:', first, '| second:', second, '| third:', third);
// 10, 20, 30

// Rest pattern
const [head, ...tail] = [1, 2, 3, 4, 5];
console.log('head:', head, '| tail:', tail); // 1 | [2, 3, 4, 5]

// Skipping elements
const [,, skipToThird, , skipToFifth] = ['a', 'b', 'c', 'd', 'e'];
console.log('Third:', skipToThird, '| Fifth:', skipToFifth); // c | e

// Default values
const [x = 100, y = 200, z = 300] = [1, 2];
console.log('x:', x, '| y:', y, '| z (default):', z); // 1 | 2 | 300

// Swapping variables — elegant with destructuring
let alpha = 'first';
let beta  = 'second';
[alpha, beta] = [beta, alpha];
console.log('After swap — alpha:', alpha, '| beta:', beta);
// alpha: 'second', beta: 'first'

// Destructuring from function return
function getMinMax(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return [sorted[0], sorted[sorted.length - 1]];
}
const [min, max] = getMinMax([3, 1, 7, 2, 9, 4]);
console.log('Min:', min, '| Max:', max); // Min: 1 | Max: 9


// ─────────────────────────────────────────────
// EXAMPLE 10: Utility Methods
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 10: Utility Methods ===');

// Array.isArray() — reliable type check
console.log('Array.isArray([]):', Array.isArray([]));         // true
console.log('Array.isArray({}):', Array.isArray({}));         // false
console.log('Array.isArray("hi"):', Array.isArray('hi'));     // false

// Array.from() — create array from iterables
const fromStr = Array.from('hello');
console.log('From string:', fromStr); // ['h','e','l','l','o']

const fromSet = Array.from(new Set([1, 2, 2, 3, 3, 4]));
console.log('From Set (dedup):', fromSet); // [1, 2, 3, 4]

// Array.from() with mapping function
const range = Array.from({ length: 6 }, (_, i) => i * 2);
console.log('Range (evens):', range); // [0, 2, 4, 6, 8, 10]

// join() — array to string
const parts = ['2026', '11', '17'];
console.log('join with -:', parts.join('-'));  // '2026-11-17'
console.log('join with /:', parts.join('/'));  // '2026/11/17'

// fill() — fill a range with a value
const matrix = new Array(5).fill(0);
console.log('Filled array:', matrix); // [0, 0, 0, 0, 0]

const partial = [1, 2, 3, 4, 5];
partial.fill(99, 1, 4); // fill with 99 from index 1 to 3
console.log('Partial fill:', partial); // [1, 99, 99, 99, 5]

// Array.of() — create array from arguments
const explicit = Array.of(1, 2, 3);
console.log('Array.of():', explicit); // [1, 2, 3]
// vs new Array(3) which creates 3 empty slots!


// ─────────────────────────────────────────────
// EXAMPLE 11: Copying Arrays (Shallow vs Deep)
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 11: Copying Arrays ===');

const original = [1, 2, 3, 4, 5];

// WRONG: Reference copy — mutating copy mutates original!
const badCopy = original;
badCopy.push(99);
console.log('original after badCopy.push:', original); // [1,2,3,4,5,99] ← MUTATED!

// Reset
original.pop();

// Shallow copy methods
const spreadCopy  = [...original];
const sliceCopy   = original.slice();
const fromCopy    = Array.from(original);
const concatCopy  = [].concat(original);

spreadCopy.push(999);
console.log('original (untouched):', original);  // [1,2,3,4,5]
console.log('spreadCopy (modified):', spreadCopy); // [1,2,3,4,5,999]

// Deep copy — for arrays of objects (simple objects only)
const objArr = [{ a: 1 }, { b: 2 }];
const shallowCopy = [...objArr];
shallowCopy[0].a = 999; // ← also changes original!
console.log('original objArr[0].a after shallow mutation:', objArr[0].a); // 999

const deepCopy = JSON.parse(JSON.stringify([{ a: 1 }, { b: 2 }]));
deepCopy[0].a = 999;
console.log('original after deep copy mutation:', objArr[0].a); // still 999 (from above) — but deep copy is isolated


// ─────────────────────────────────────────────
// EXAMPLE 12: Method Chaining — Real World Pattern
// ─────────────────────────────────────────────
console.log('\n=== EXAMPLE 12: Method Chaining — Real World ===');

const transactions = [
  { id: 1, type: 'credit', amount: 500,  description: 'Salary'      },
  { id: 2, type: 'debit',  amount: 50,   description: 'Groceries'   },
  { id: 3, type: 'debit',  amount: 200,  description: 'Rent'        },
  { id: 4, type: 'credit', amount: 150,  description: 'Freelance'   },
  { id: 5, type: 'debit',  amount: 30,   description: 'Coffee'      },
  { id: 6, type: 'credit', amount: 1000, description: 'Bonus'       },
];

// Chain: filter debits → map to amounts → reduce to total spent
const totalSpent = transactions
  .filter(t => t.type === 'debit')
  .map(t => t.amount)
  .reduce((sum, amt) => sum + amt, 0);
console.log('Total spent (debits):', totalSpent); // 280

// Chain: get descriptions of credits over $200, sorted alphabetically
const bigCredits = transactions
  .filter(t => t.type === 'credit' && t.amount > 200)
  .map(t => t.description)
  .sort();
console.log('Big credit descriptions:', bigCredits); // ['Bonus', 'Salary']

// Build a summary report
const summary = transactions
  .reduce((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + t.amount;
    return acc;
  }, {});
console.log('Transaction summary:', summary);
// { credit: 1650, debit: 280 }

console.log('\n✅ All array examples complete!');
