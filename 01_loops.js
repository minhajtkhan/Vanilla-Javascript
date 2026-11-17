// ============================================================
// JavaScript Loops - Complete Runnable Examples
// Topic: Loops in JavaScript
// Compatible with: Browser Console & Node.js
// ============================================================


// ============================================================
// EXAMPLE 1: Basic for Loop - Counting
// ============================================================
console.log('--- Example 1: Basic for Loop ---');

for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}
// Expected Output:
// Count: 1
// Count: 2
// Count: 3
// Count: 4
// Count: 5


// ============================================================
// EXAMPLE 2: for Loop - Iterating Over an Array
// ============================================================
console.log('\n--- Example 2: for Loop Over Array ---');

const fruits = ['apple', 'banana', 'cherry', 'date'];

for (let i = 0; i < fruits.length; i++) {
  console.log(`Index ${i}: ${fruits[i]}`);
}
// Expected Output:
// Index 0: apple
// Index 1: banana
// Index 2: cherry
// Index 3: date


// ============================================================
// EXAMPLE 3: for Loop - Building a Sum
// ============================================================
console.log('\n--- Example 3: Summing Numbers with for Loop ---');

const numbers = [10, 20, 30, 40, 50];
let total = 0;

for (let i = 0; i < numbers.length; i++) {
  total += numbers[i]; // accumulate the sum
}

console.log('Numbers:', numbers);
console.log('Total Sum:', total); // Expected: 150


// ============================================================
// EXAMPLE 4: for Loop - Looping Backwards
// ============================================================
console.log('\n--- Example 4: Reverse for Loop ---');

const letters = ['A', 'B', 'C', 'D', 'E'];

for (let i = letters.length - 1; i >= 0; i--) {
  process.stdout ? process.stdout.write(letters[i] + ' ') : console.log(letters[i]);
}
console.log(); // newline
// Expected Output: E D C B A


// ============================================================
// EXAMPLE 5: while Loop - Basic
// ============================================================
console.log('\n--- Example 5: Basic while Loop ---');

let count = 1;

while (count <= 5) {
  console.log(`While count: ${count}`);
  count++; // IMPORTANT: without this, infinite loop!
}
// Expected Output:
// While count: 1 ... While count: 5


// ============================================================
// EXAMPLE 6: while Loop - Find First Number Divisible by 7
// ============================================================
console.log('\n--- Example 6: while Loop - Find Divisible Number ---');

let n = 1;

while (n % 7 !== 0) {
  n++; // keep incrementing until divisible by 7
}

console.log(`First number divisible by 7 starting from 1: ${n}`);
// Expected Output: 7


// ============================================================
// EXAMPLE 7: do...while Loop
// Always runs the body at least once before checking condition
// ============================================================
console.log('\n--- Example 7: do...while Loop ---');

let x = 100; // condition (x < 5) is false from the start

do {
  console.log(`do...while body ran with x = ${x}`);
  x++;
} while (x < 5);

// Output: Runs ONCE even though x=100 is not < 5
// Expected: do...while body ran with x = 100


// ============================================================
// EXAMPLE 8: do...while Loop - Retry Simulation
// ============================================================
console.log('\n--- Example 8: do...while - Retry Pattern ---');

const correctPassword = 'secret';
const attempts = ['wrong', 'nope', 'secret']; // simulated user inputs
let attemptIndex = 0;
let inputPassword;

do {
  inputPassword = attempts[attemptIndex];
  console.log(`Attempt ${attemptIndex + 1}: Entered "${inputPassword}"`);
  attemptIndex++;
} while (inputPassword !== correctPassword && attemptIndex < attempts.length);

if (inputPassword === correctPassword) {
  console.log('Access granted!');
} else {
  console.log('Access denied.');
}
// Expected: Access granted! (after 3 attempts)


// ============================================================
// EXAMPLE 9: for...of Loop - Iterating Iterables
// ============================================================
console.log('\n--- Example 9: for...of Loop ---');

const cities = ['New York', 'London', 'Tokyo', 'Paris'];

for (const city of cities) {
  console.log(`City: ${city}`);
}
// Expected Output:
// City: New York
// City: London
// City: Tokyo
// City: Paris

// for...of on a String (strings are iterable!)
console.log('\nCharacters in "Hello":');
for (const char of 'Hello') {
  console.log(char);
}
// Expected: H e l l o


// ============================================================
// EXAMPLE 10: for...of with Destructuring + Map
// ============================================================
console.log('\n--- Example 10: for...of with Map ---');

const studentScores = new Map([
  ['Alice', 95],
  ['Bob', 87],
  ['Carol', 92],
  ['Dave', 78]
]);

for (const [name, score] of studentScores) {
  const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C';
  console.log(`${name}: ${score} (${grade})`);
}
// Expected:
// Alice: 95 (A)
// Bob: 87 (B)
// Carol: 92 (A)
// Dave: 78 (C)


// ============================================================
// EXAMPLE 11: for...in Loop - Iterating Object Keys
// ============================================================
console.log('\n--- Example 11: for...in Loop ---');

const car = {
  make: 'Toyota',
  model: 'Camry',
  year: 2023,
  color: 'Silver'
};

for (const key in car) {
  // hasOwnProperty guard: only own properties, not inherited ones
  if (car.hasOwnProperty(key)) {
    console.log(`${key} => ${car[key]}`);
  }
}
// Expected:
// make => Toyota
// model => Camry
// year => 2023
// color => Silver


// ============================================================
// EXAMPLE 12: break - Exit Loop Early
// ============================================================
console.log('\n--- Example 12: break Statement ---');

const items = ['pen', 'book', 'laptop', 'phone', 'tablet'];
const searchItem = 'laptop';
let foundIndex = -1;

for (let i = 0; i < items.length; i++) {
  if (items[i] === searchItem) {
    foundIndex = i;
    break; // stop searching once found
  }
}

console.log(`"${searchItem}" found at index: ${foundIndex}`);
// Expected: "laptop" found at index: 2


// ============================================================
// EXAMPLE 13: continue - Skip Iterations
// ============================================================
console.log('\n--- Example 13: continue Statement ---');

console.log('Odd numbers from 1 to 10:');
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // skip even numbers
  console.log(i);
}
// Expected: 1 3 5 7 9


// ============================================================
// EXAMPLE 14: Nested Loops - Multiplication Table
// ============================================================
console.log('\n--- Example 14: Nested Loops - Multiplication Table ---');

for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`${i} x ${j} = ${i * j}`);
  }
  console.log('---');
}
// Expected:
// 1 x 1 = 1, 1 x 2 = 2, 1 x 3 = 3
// 2 x 1 = 2, 2 x 2 = 4, 2 x 3 = 6
// 3 x 1 = 3, 3 x 2 = 6, 3 x 3 = 9


// ============================================================
// EXAMPLE 15: Nested Loops - Build a 2D Grid
// ============================================================
console.log('\n--- Example 15: Nested Loops - 2D Grid ---');

const rows = 3;
const cols = 4;
const grid = [];

for (let r = 0; r < rows; r++) {
  grid[r] = []; // initialize inner array
  for (let c = 0; c < cols; c++) {
    grid[r][c] = `(${r},${c})`;
  }
}

// Print the grid
grid.forEach(row => console.log(row.join(' ')));
// Expected:
// (0,0) (0,1) (0,2) (0,3)
// (1,0) (1,1) (1,2) (1,3)
// (2,0) (2,1) (2,2) (2,3)


// ============================================================
// EXAMPLE 16: var vs let in Loops (Closure Gotcha)
// ============================================================
console.log('\n--- Example 16: var vs let in Loops ---');

// Using var - all callbacks share the SAME variable (bad)
const varResults = [];
for (var i = 0; i < 3; i++) {
  varResults.push(() => i); // captures reference to i
}
console.log('var results (called after loop):',
  varResults[0](), varResults[1](), varResults[2]()
);
// Expected: 3 3 3  <-- all print 3 (the final value of i)

// Using let - each iteration gets its OWN block scope (good)
const letResults = [];
for (let j = 0; j < 3; j++) {
  letResults.push(() => j); // each closure captures its own j
}
console.log('let results (called after loop):',
  letResults[0](), letResults[1](), letResults[2]()
);
// Expected: 0 1 2  <-- correct, each captured its own j


// ============================================================
// EXAMPLE 17: Array Methods as Loop Alternatives
// ============================================================
console.log('\n--- Example 17: Array Methods (Functional Loops) ---');

const products = [
  { name: 'Apple',  price: 1.5,  inStock: true  },
  { name: 'Bread',  price: 2.99, inStock: false },
  { name: 'Milk',   price: 3.49, inStock: true  },
  { name: 'Cheese', price: 5.99, inStock: true  },
  { name: 'Eggs',   price: 4.5,  inStock: false },
];

// forEach - iterate without return
console.log('All products:');
products.forEach(p => console.log(`  ${p.name}: $${p.price}`));

// filter - keep only in-stock items
const inStock = products.filter(p => p.inStock);
console.log('\nIn-stock products:', inStock.map(p => p.name));
// Expected: [ 'Apple', 'Milk', 'Cheese' ]

// map - extract and transform
const discounted = products.map(p => ({
  name: p.name,
  salePrice: (p.price * 0.9).toFixed(2) // 10% off
}));
console.log('\nDiscounted prices:');
discounted.forEach(p => console.log(`  ${p.name}: $${p.salePrice}`));

// reduce - calculate total cost of in-stock items
const total = inStock.reduce((sum, p) => sum + p.price, 0);
console.log(`\nTotal cost of in-stock items: $${total.toFixed(2)}`);
// Expected: $10.98

// find - first item over $4
const expensive = products.find(p => p.price > 4);
console.log('\nFirst product over $4:', expensive.name);
// Expected: Cheese

// some & every
console.log('\nAny out of stock?', products.some(p => !p.inStock));   // true
console.log('All in stock?',       products.every(p => p.inStock));   // false


// ============================================================
// EXAMPLE 18: Labeled break in Nested Loops
// ============================================================
console.log('\n--- Example 18: Labeled break ---');

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
const target = 5;
let foundAt = null;

// Label the outer loop
outerLoop: for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[r].length; c++) {
    if (matrix[r][c] === target) {
      foundAt = { row: r, col: c };
      break outerLoop; // breaks BOTH loops at once
    }
  }
}

console.log(`Found ${target} at:`, foundAt);
// Expected: Found 5 at: { row: 1, col: 1 }


// ============================================================
// EXAMPLE 19: Infinite Loop with break (Pattern Loop)
// ============================================================
console.log('\n--- Example 19: Controlled Infinite Loop ---');

let value = 1;
let iterations = 0;

while (true) { // intentionally "infinite"
  if (value > 100) break; // exit condition
  value *= 2;             // double each time
  iterations++;
}

console.log(`Value exceeded 100 after ${iterations} doublings: ${value}`);
// Expected: Value exceeded 100 after 7 doublings: 128


// ============================================================
// EXAMPLE 20: Practical - FizzBuzz with Loops
// ============================================================
console.log('\n--- Example 20: FizzBuzz (1 to 20) ---');

for (let i = 1; i <= 20; i++) {
  if (i % 15 === 0)      console.log('FizzBuzz');
  else if (i % 3 === 0)  console.log('Fizz');
  else if (i % 5 === 0)  console.log('Buzz');
  else                   console.log(i);
}
// Expected pattern: 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz ...


// ============================================================
// SUMMARY
// ============================================================
console.log('\n========== LOOP TYPES SUMMARY ==========');
console.log('for         - known iterations, index-based');
console.log('while       - condition-based, check BEFORE');
console.log('do...while  - condition-based, check AFTER (runs at least once)');
console.log('for...of    - iterate VALUES of arrays/strings/Maps/Sets');
console.log('for...in    - iterate KEYS of plain objects');
console.log('break       - exit the loop immediately');
console.log('continue    - skip to the next iteration');
console.log('forEach/map/filter/reduce - functional, declarative alternatives');
console.log('=========================================');
