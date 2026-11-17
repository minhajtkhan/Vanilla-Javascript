# Conditional Statements in JavaScript

## Introduction

Conditional statements are the backbone of decision-making in programming. They allow your program to **execute different blocks of code based on whether a condition is true or false**. Without conditionals, every program would run the same way every time — no branching, no flexibility, no real logic.

In JavaScript, there are several ways to write conditional logic:
- `if` / `else if` / `else`
- `switch` statements
- Ternary operator (`? :`)
- Logical short-circuit evaluation (`&&`, `||`, `??`)
- Optional chaining (`?.`)

---

## 1. The `if` Statement

The most fundamental conditional. It executes a block of code **only if** the condition evaluates to `true`.

### Syntax

```js
if (condition) {
  // code to run if condition is true
}
```

### Example

```js
let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside! Stay hydrated.");
}
```

> **Key Concept:** JavaScript evaluates the condition as a **boolean**. Any value can be used as a condition — JavaScript will coerce it to `true` (truthy) or `false` (falsy).

---

## 2. The `if...else` Statement

Adds an alternative block that runs when the condition is `false`.

### Syntax

```js
if (condition) {
  // runs if condition is true
} else {
  // runs if condition is false
}
```

### Example

```js
let isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back, user!");
} else {
  console.log("Please log in to continue.");
}
// Output: Please log in to continue.
```

---

## 3. The `if...else if...else` Chain

Used when you need to check **multiple conditions** in sequence.

### Syntax

```js
if (condition1) {
  // runs if condition1 is true
} else if (condition2) {
  // runs if condition2 is true
} else if (condition3) {
  // runs if condition3 is true
} else {
  // runs if none of the above are true
}
```

### Example — Grade Calculator

```js
let score = 78;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
// Output: Grade: C
```

> **Tip:** Only the **first matching** condition executes. Once a match is found, the remaining `else if` / `else` blocks are skipped.

---

## 4. Truthy and Falsy Values

JavaScript has a concept of **truthy** and **falsy** values — values that behave like `true` or `false` in a boolean context.

### Falsy Values (always evaluate to `false`)

| Value | Type |
|-------|------|
| `false` | Boolean |
| `0` | Number |
| `-0` | Number |
| `0n` | BigInt |
| `""` or `''` or ` `` ` | Empty string |
| `null` | Null |
| `undefined` | Undefined |
| `NaN` | Not a Number |

Everything **else** is truthy — including `[]`, `{}`, `"0"`, and `"false"`!

### Example

```js
let username = "";

if (username) {
  console.log("Hello, " + username);
} else {
  console.log("No username provided.");
}
// Output: No username provided. (empty string is falsy)

let items = [];
if (items) {
  console.log("Items array exists"); // This runs! [] is truthy
}
```

---

## 5. The `switch` Statement

`switch` is ideal when you're comparing **one variable against many possible values**. It's cleaner than a long `if...else if` chain in those cases.

### Syntax

```js
switch (expression) {
  case value1:
    // code
    break;
  case value2:
    // code
    break;
  default:
    // code if no case matches
}
```

### Example — Day of the Week

```js
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of the work week!");
    break;
  case "Friday":
    console.log("Almost the weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend!");
    break;
  default:
    console.log("It's a regular weekday.");
}
// Output: Start of the work week!
```

> **Important — The `break` keyword:** Without `break`, execution **falls through** to the next case. This is usually a bug, but sometimes intentional (as with Saturday/Sunday above sharing a case).

### Fall-through Example

```js
let level = 1;
let message = "";

switch (level) {
  case 1:
    message += "Beginner ";
  case 2:
    message += "Intermediate ";
  case 3:
    message += "Advanced";
    break;
  default:
    message = "Unknown level";
}

console.log(message); // "Beginner Intermediate Advanced" — fell through!
```

---

## 6. The Ternary Operator

A compact, single-line conditional. Best used for **simple assignments or expressions**.

### Syntax

```js
condition ? valueIfTrue : valueIfFalse
```

### Examples

```js
// Basic ternary
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Inline in a string
let cartCount = 3;
console.log(`You have ${cartCount} item${cartCount !== 1 ? 's' : ''} in your cart.`);
// Output: You have 3 items in your cart.

// Nested ternary (use sparingly — hurts readability)
let points = 85;
let grade = points >= 90 ? "A" : points >= 80 ? "B" : points >= 70 ? "C" : "F";
console.log(grade); // "B"
```

> **Tip:** Avoid deeply nested ternaries. If you need more than one level, use `if...else` instead for clarity.

---

## 7. Logical Operators as Conditionals

JavaScript's logical operators (`&&`, `||`, `??`) can be used as short-circuit conditionals.

### `&&` — AND (runs right side only if left is truthy)

```js
let isAdmin = true;
isAdmin && console.log("Access granted to admin panel.");
// Output: Access granted to admin panel.

let user = null;
user && console.log(user.name); // Does NOT run — user is falsy, so no error
```

### `||` — OR (returns first truthy value)

```js
let userCity = "";
let defaultCity = "New York";
let city = userCity || defaultCity;
console.log(city); // "New York" — userCity is falsy

let preferredName = null;
let displayName = preferredName || "Anonymous";
console.log(displayName); // "Anonymous"
```

### `??` — Nullish Coalescing (only falls back for `null` / `undefined`)

```js
let count = 0;

// || treats 0 as falsy:
console.log(count || 10); // 10 (probably not what you wanted!)

// ?? only checks for null/undefined:
console.log(count ?? 10); // 0 (correct!)

let settings = {
  darkMode: false,
  fontSize: 0
};

console.log(settings.darkMode ?? true);  // false (correct — not null/undefined)
console.log(settings.fontSize ?? 16);   // 0 (correct — not null/undefined)
```

---

## 8. Optional Chaining with Conditionals

The `?.` operator safely accesses nested properties without throwing if an intermediate value is `null` or `undefined`.

```js
let user = {
  profile: {
    name: "Alice",
    address: null
  }
};

// Without optional chaining (throws if address is null):
// console.log(user.profile.address.city); // TypeError!

// With optional chaining:
console.log(user?.profile?.address?.city); // undefined (no error)
console.log(user?.profile?.name);          // "Alice"

// Combining with ??:
let city = user?.profile?.address?.city ?? "City not provided";
console.log(city); // "City not provided"
```

---

## 9. Comparison Operators Quick Reference

Conditionals rely heavily on comparison operators:

| Operator | Meaning | Example | Result |
|----------|---------|---------|--------|
| `==` | Loose equality (type coercion) | `"5" == 5` | `true` |
| `===` | Strict equality (no coercion) | `"5" === 5` | `false` |
| `!=` | Loose inequality | `"5" != 5` | `false` |
| `!==` | Strict inequality | `"5" !== 5` | `true` |
| `>` | Greater than | `10 > 5` | `true` |
| `<` | Less than | `3 < 7` | `true` |
| `>=` | Greater than or equal | `5 >= 5` | `true` |
| `<=` | Less than or equal | `4 <= 3` | `false` |

> **Best Practice:** Always use `===` and `!==` (strict equality) unless you have a specific reason for loose comparison. It prevents subtle bugs from type coercion.

---

## Common Pitfalls

### 1. Assignment instead of comparison

```js
let x = 5;
if (x = 10) {  // ❌ This ASSIGNS 10 to x, doesn't compare!
  console.log("This always runs!");
}

if (x === 10) {  // ✅ This compares
  console.log("Correct comparison.");
}
```

### 2. Forgetting `break` in switch

```js
// ❌ Missing break causes unintended fall-through
switch ("B") {
  case "A": console.log("Excellent");
  case "B": console.log("Good");     // runs
  case "C": console.log("Average");  // also runs! (fall-through)
}
```

### 3. Comparing objects/arrays by reference

```js
console.log([] == []);   // false — different references!
console.log({} === {}); // false — different references!

// Use JSON or specific property comparisons instead
```

### 4. Loose equality surprises

```js
console.log(null == undefined);  // true (loose)
console.log(null === undefined); // false (strict)
console.log(0 == false);         // true (loose)
console.log(0 === false);        // false (strict)
console.log("" == false);        // true (loose)
```

### 5. Over-using ternaries

```js
// ❌ Hard to read
let result = a > b ? (a > c ? a : c) : (b > c ? b : c);

// ✅ Much clearer with if/else
let result2;
if (a > b && a > c) result2 = a;
else if (b > c) result2 = b;
else result2 = c;
```

---

## Summary

| Construct | Best Used When |
|-----------|----------------|
| `if / else if / else` | General branching, complex conditions |
| `switch` | Matching one value against many fixed options |
| Ternary `? :` | Simple two-way assignment in one line |
| `&&` short-circuit | Conditionally executing or accessing something |
| `\|\|` default | Providing a fallback for falsy values |
| `??` nullish | Providing a fallback for null/undefined only |
| `?.` optional chain | Safely navigating potentially missing objects |

Mastering conditional statements means mastering the **flow of your program**. Start with `if/else` for clarity, reach for `switch` when matching many values, and use the ternary / logical operators to write concise, expressive code when appropriate.
