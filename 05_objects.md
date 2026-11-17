# JavaScript Objects

## Introduction

Objects are one of the most fundamental and powerful concepts in JavaScript. Nearly everything in JavaScript is an object (or behaves like one). An object is a **collection of key-value pairs** where keys (also called properties) are strings (or Symbols), and values can be anything: primitives, arrays, functions, or even other objects.

Objects allow you to model real-world entities, group related data, and build complex data structures. Mastering objects is essential for writing clean, scalable JavaScript.

---

## 1. Creating Objects

### Object Literal Syntax (Most Common)

The simplest and most common way to create an object:

```js
const person = {
  name: "Alice",
  age: 30,
  isEmployed: true
};
```

### Using `new Object()`

```js
const car = new Object();
car.brand = "Toyota";
car.year = 2022;
```

### Using a Constructor Function

Constructor functions act as blueprints for creating multiple objects:

```js
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

const cat = new Animal("Whiskers", "Felis catus");
```

### Using `Object.create()`

Creates a new object with a specified prototype:

```js
const proto = { greet() { return `Hi, I'm ${this.name}`; } };
const obj = Object.create(proto);
obj.name = "Bob";
```

### Using ES6 Classes

Classes are syntactic sugar over constructor functions:

```js
class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    return `${this.name} says Woof!`;
  }
}

const dog = new Dog("Rex", "Labrador");
```

---

## 2. Accessing Properties

There are two ways to access object properties:

### Dot Notation

```js
const user = { name: "Alice", age: 25 };
console.log(user.name); // "Alice"
```

### Bracket Notation

Useful when property names are dynamic or contain special characters:

```js
const key = "age";
console.log(user[key]); // 25

const config = { "max-retries": 3 };
console.log(config["max-retries"]); // 3
```

---

## 3. Modifying Objects

Objects in JavaScript are **mutable** by default. You can add, update, or delete properties at any time.

```js
const book = { title: "1984", author: "Orwell" };

// Add a new property
book.year = 1949;

// Update existing property
book.title = "Nineteen Eighty-Four";

// Delete a property
delete book.author;

console.log(book); // { title: "Nineteen Eighty-Four", year: 1949 }
```

---

## 4. Methods (Functions as Properties)

When a function is a property of an object, it is called a **method**.

```js
const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this;
  },
  subtract(n) {
    this.value -= n;
    return this;
  },
  result() {
    return this.value;
  }
};

// Method chaining
console.log(calculator.add(10).subtract(3).result()); // 7
```

The `this` keyword inside a method refers to the object the method belongs to.

---

## 5. The `this` Keyword

`this` is context-dependent:

```js
const user = {
  name: "Alice",
  greet() {
    return `Hello, my name is ${this.name}`;
  },
  greetArrow: () => {
    // Arrow functions do NOT bind their own 'this'
    return `Hello, my name is ${this.name}`; // 'this' is the outer scope
  }
};

console.log(user.greet());       // "Hello, my name is Alice"
console.log(user.greetArrow()); // "Hello, my name is undefined"
```

> **Tip:** Avoid using arrow functions as object methods when you need `this` to refer to the object.

---

## 6. Iterating Over Objects

### `for...in` Loop

Iterates over all enumerable string properties of an object (including inherited ones):

```js
const scores = { math: 90, english: 85, science: 92 };

for (const subject in scores) {
  console.log(`${subject}: ${scores[subject]}`);
}
```

### `Object.keys()`, `Object.values()`, `Object.entries()`

These return arrays, so you can use standard array methods:

```js
const product = { name: "Laptop", price: 999, inStock: true };

console.log(Object.keys(product));   // ["name", "price", "inStock"]
console.log(Object.values(product)); // ["Laptop", 999, true]
console.log(Object.entries(product)); 
// [["name","Laptop"], ["price",999], ["inStock",true]]

// Find total using Object.values
const inventory = { apples: 5, bananas: 12, oranges: 8 };
const total = Object.values(inventory).reduce((sum, qty) => sum + qty, 0);
console.log(total); // 25
```

---

## 7. Destructuring

Destructuring lets you unpack values from objects into distinct variables:

```js
const employee = {
  name: "Bob",
  department: "Engineering",
  salary: 75000,
  address: {
    city: "New York",
    zip: "10001"
  }
};

// Basic destructuring
const { name, department } = employee;

// Rename during destructuring
const { salary: annualPay } = employee;

// Default values
const { bonus = 5000 } = employee;

// Nested destructuring
const { address: { city } } = employee;

console.log(name, department); // Bob Engineering
console.log(annualPay);        // 75000
console.log(bonus);            // 5000 (default)
console.log(city);             // New York
```

### Destructuring in Function Parameters

```js
function displayUser({ name, age = 18, role = "guest" }) {
  console.log(`${name}, age ${age}, role: ${role}`);
}

displayUser({ name: "Carol", age: 27, role: "admin" });
// Carol, age 27, role: admin
```

---

## 8. Spread and Rest with Objects

### Spread Operator (`...`)

Expands an object's properties into another object — great for copying and merging:

```js
const defaults = { theme: "light", language: "en", notifications: true };
const userPrefs = { theme: "dark", fontSize: 14 };

// Merge objects (later values override earlier ones)
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", language: "en", notifications: true, fontSize: 14 }

// Shallow copy
const original = { x: 1, y: 2 };
const copy = { ...original };
copy.x = 99;
console.log(original.x); // 1 (not affected)
```

### Rest in Destructuring

```js
const { theme, ...rest } = settings;
console.log(theme); // "dark"
console.log(rest);  // { language: "en", notifications: true, fontSize: 14 }
```

---

## 9. Computed Property Names

You can use expressions as property keys using square brackets:

```js
const field = "username";
const prefix = "get";

const dynamicObj = {
  [field]: "alice123",
  [`${prefix}Name`]() {
    return this[field];
  }
};

console.log(dynamicObj.username);   // alice123
console.log(dynamicObj.getName());  // alice123
```

---

## 10. Property Shorthand

When a variable name matches the property name, you can use shorthand:

```js
const name = "Diana";
const age = 28;

// Without shorthand
const user1 = { name: name, age: age };

// With shorthand (ES6+)
const user2 = { name, age };

console.log(user2); // { name: "Diana", age: 28 }
```

---

## 11. Checking Properties

```js
const config = { debug: false, version: "1.0" };

// 'in' operator (checks own and inherited properties)
console.log("debug" in config);   // true
console.log("timeout" in config); // false

// hasOwnProperty (only own properties)
console.log(config.hasOwnProperty("debug"));   // true
console.log(config.hasOwnProperty("toString")); // false

// Optional chaining for safe access
const app = { settings: { theme: "dark" } };
console.log(app?.settings?.theme);     // "dark"
console.log(app?.user?.name);          // undefined (no error!)
```

---

## 12. Object Methods: `Object.assign()`, `Object.freeze()`, `Object.keys()` etc.

### `Object.assign()`

Copies properties from one or more source objects to a target:

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }
```

### `Object.freeze()`

Prevents modification of an object:

```js
const CONSTANTS = Object.freeze({ PI: 3.14159, E: 2.71828 });
CONSTANTS.PI = 999; // Silently fails (throws in strict mode)
console.log(CONSTANTS.PI); // 3.14159
```

### `Object.fromEntries()`

Converts an array of `[key, value]` pairs into an object:

```js
const entries = [["name", "Eve"], ["age", 22]];
const obj = Object.fromEntries(entries);
console.log(obj); // { name: "Eve", age: 22 }

// Practical: transform object values
const prices = { apple: 1.5, banana: 0.75, cherry: 3.0 };
const discounted = Object.fromEntries(
  Object.entries(prices).map(([key, val]) => [key, val * 0.9])
);
console.log(discounted); // { apple: 1.35, banana: 0.675, cherry: 2.7 }
```

---

## 13. Prototypes and Inheritance

Every JavaScript object has an internal link to another object called its **prototype**. This chain is how JavaScript achieves inheritance.

```js
function Vehicle(make, model) {
  this.make = make;
  this.model = model;
}

Vehicle.prototype.describe = function() {
  return `${this.make} ${this.model}`;
};

function Car(make, model, doors) {
  Vehicle.call(this, make, model);
  this.doors = doors;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

const myCar = new Car("Honda", "Civic", 4);
console.log(myCar.describe()); // Honda Civic (inherited)
console.log(myCar.doors);     // 4
```

---

## 14. Getters and Setters

Getters and setters allow you to define computed properties and add validation:

```js
const circle = {
  _radius: 5,
  get radius() {
    return this._radius;
  },
  set radius(value) {
    if (value < 0) throw new Error("Radius cannot be negative");
    this._radius = value;
  },
  get area() {
    return Math.PI * this._radius ** 2;
  }
};

console.log(circle.radius); // 5
console.log(circle.area.toFixed(2)); // 78.54
circle.radius = 10;
console.log(circle.area.toFixed(2)); // 314.16
```

---

## Common Pitfalls & Tips

### ⚠️ Shallow vs Deep Copy

```js
// Spread only does a SHALLOW copy!
const original = { name: "Alice", address: { city: "NY" } };
const copy = { ...original };
copy.address.city = "LA"; // Mutates original!
console.log(original.address.city); // "LA" ← Problem!

// Deep copy (modern way):
const deepCopy = structuredClone(original);
```

### ⚠️ Object Equality

```js
const a = { x: 1 };
const b = { x: 1 };
console.log(a === b); // false! Objects are compared by reference
console.log(a === a); // true
```

### ⚠️ Accidentally Mutating Objects

Always create new objects when you want to avoid mutation:

```js
// BAD - mutates original
function addProp(obj, key, val) {
  obj[key] = val;
  return obj;
}

// GOOD - returns new object
function addPropImmutable(obj, key, val) {
  return { ...obj, [key]: val };
}
```

### ⚠️ `for...in` Iterates Inherited Properties

Always use `hasOwnProperty` or prefer `Object.keys()` to avoid iterating inherited properties.

---

## Summary

| Concept | Syntax / Method |
|---|---|
| Create object | `{}`, `new Object()`, `Object.create()` |
| Access property | `obj.key`, `obj["key"]` |
| Delete property | `delete obj.key` |
| Check property | `"key" in obj`, `obj.hasOwnProperty("key")` |
| Iterate | `for...in`, `Object.keys/values/entries()` |
| Clone (shallow) | `{ ...obj }`, `Object.assign({}, obj)` |
| Clone (deep) | `structuredClone(obj)` |
| Freeze | `Object.freeze(obj)` |
| Merge | `{ ...a, ...b }` |
| Destructure | `const { a, b } = obj` |
| From entries | `Object.fromEntries(entries)` |

Objects are the backbone of JavaScript. Whether you're working with APIs, DOM manipulation, state management, or class-based architecture — a solid understanding of objects will serve you in every project you build.
