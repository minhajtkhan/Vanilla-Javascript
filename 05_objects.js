// ============================================================
// JavaScript Objects - Complete Examples File
// Topic: Objects
// Run in: Node.js or Browser Console
// ============================================================


// ============================================================
// EXAMPLE 1: Creating Objects - Multiple Ways
// ============================================================
console.log("--- EXAMPLE 1: Creating Objects ---");

// 1a. Object Literal (most common)
const person = {
  name: "Alice",
  age: 30,
  isEmployed: true
};
console.log("Object Literal:", person);
// Output: { name: 'Alice', age: 30, isEmployed: true }

// 1b. Using new Object()
const car = new Object();
car.brand = "Toyota";
car.year = 2022;
car.color = "Red";
console.log("new Object():", car);
// Output: { brand: 'Toyota', year: 2022, color: 'Red' }

// 1c. Constructor Function
function Animal(name, species, sound) {
  this.name = name;
  this.species = species;
  this.sound = sound;
  this.speak = function () {
    return `${this.name} says ${this.sound}!`;
  };
}
const cat = new Animal("Whiskers", "Felis catus", "Meow");
const dog = new Animal("Rex", "Canis lupus", "Woof");
console.log("Constructor - cat:", cat.speak()); // Whiskers says Meow!
console.log("Constructor - dog:", dog.speak()); // Rex says Woof!

// 1d. Object.create() with a prototype
const vehicleProto = {
  describe() {
    return `${this.brand} (${this.year})`;
  }
};
const bike = Object.create(vehicleProto);
bike.brand = "Yamaha";
bike.year = 2021;
console.log("Object.create():", bike.describe()); // Yamaha (2021)

// 1e. ES6 Class
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
  }
  getSummary() {
    return `"${this.title}" by ${this.author} - ${this.pages} pages`;
  }
}
const book1 = new Book("1984", "George Orwell", 328);
const book2 = new Book("Dune", "Frank Herbert", 412);
console.log("ES6 Class:", book1.getSummary());
console.log("ES6 Class:", book2.getSummary());


// ============================================================
// EXAMPLE 2: Accessing and Modifying Properties
// ============================================================
console.log("\n--- EXAMPLE 2: Accessing & Modifying Properties ---");

const product = {
  name: "Wireless Headphones",
  price: 149.99,
  brand: "SoundMax",
  "item-code": "SND-001" // Property with special characters
};

// Dot notation
console.log("Dot notation:", product.name);    // Wireless Headphones
console.log("Dot notation:", product.price);   // 149.99

// Bracket notation
console.log("Bracket notation:", product["brand"]); // SoundMax
console.log("Bracket (special chars):", product["item-code"]); // SND-001

// Dynamic property access
const propToAccess = "price";
console.log("Dynamic access:", product[propToAccess]); // 149.99

// Modifying properties
product.price = 129.99; // Update
product.inStock = true;  // Add new
delete product["item-code"]; // Delete
console.log("After modification:", product);
// { name: 'Wireless Headphones', price: 129.99, brand: 'SoundMax', inStock: true }


// ============================================================
// EXAMPLE 3: Methods and 'this' Keyword
// ============================================================
console.log("\n--- EXAMPLE 3: Methods and 'this' ---");

const bankAccount = {
  owner: "Alice",
  balance: 1000,

  deposit(amount) {
    if (amount <= 0) return "Invalid amount";
    this.balance += amount;
    return `Deposited $${amount}. New balance: $${this.balance}`;
  },

  withdraw(amount) {
    if (amount > this.balance) return "Insufficient funds";
    this.balance -= amount;
    return `Withdrew $${amount}. New balance: $${this.balance}`;
  },

  getStatement() {
    return `Account owner: ${this.owner} | Balance: $${this.balance}`;
  }
};

console.log(bankAccount.deposit(500));   // Deposited $500. New balance: $1500
console.log(bankAccount.withdraw(200));  // Withdrew $200. New balance: $1300
console.log(bankAccount.withdraw(9999)); // Insufficient funds
console.log(bankAccount.getStatement()); // Account owner: Alice | Balance: $1300

// Arrow function vs regular function and 'this'
const timer = {
  label: "Countdown",
  // Regular method: 'this' refers to the timer object
  regularGreet() {
    return `${this.label} is running`;
  },
  // Arrow function: 'this' refers to the outer/global scope
  arrowGreet: () => {
    return `Label: ${typeof this !== 'undefined' ? this.label : 'undefined (global scope)'}`;
  }
};
console.log("Regular method:", timer.regularGreet()); // Countdown is running
console.log("Arrow method:", timer.arrowGreet());     // Label: undefined


// ============================================================
// EXAMPLE 4: Iterating Over Objects
// ============================================================
console.log("\n--- EXAMPLE 4: Iterating Over Objects ---");

const studentScores = {
  math: 92,
  english: 87,
  science: 95,
  history: 78,
  art: 88
};

// for...in loop
console.log("Scores via for...in:");
for (const subject in studentScores) {
  if (studentScores.hasOwnProperty(subject)) { // Best practice
    console.log(`  ${subject}: ${studentScores[subject]}`);
  }
}

// Object.keys() - array of property names
const subjects = Object.keys(studentScores);
console.log("\nObject.keys():", subjects);
// ['math', 'english', 'science', 'history', 'art']

// Object.values() - array of values
const scores = Object.values(studentScores);
console.log("Object.values():", scores);
// [92, 87, 95, 78, 88]

// Object.entries() - array of [key, value] pairs
console.log("\nObject.entries():");
Object.entries(studentScores).forEach(([subject, score]) => {
  const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C";
  console.log(`  ${subject}: ${score} → ${grade}`);
});

// Calculate average using Object.values()
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
console.log(`\nClass average: ${average.toFixed(1)}`); // 88.0


// ============================================================
// EXAMPLE 5: Destructuring
// ============================================================
console.log("\n--- EXAMPLE 5: Destructuring ---");

const employee = {
  id: 101,
  name: "Bob Smith",
  department: "Engineering",
  salary: 85000,
  address: {
    city: "San Francisco",
    state: "CA",
    zip: "94102"
  },
  skills: ["JavaScript", "Python", "Docker"]
};

// Basic destructuring
const { name: empName, department, salary } = employee;
console.log("Basic:", empName, department, salary);
// Bob Smith Engineering 85000

// Rename and default values
const { id: employeeId, bonus = 5000, role = "Developer" } = employee;
console.log("Rename + defaults:", employeeId, bonus, role);
// 101 5000 Developer

// Nested destructuring
const { address: { city, state } } = employee;
console.log("Nested:", city, state); // San Francisco CA

// Mix of destructuring with array in object
const { skills: [primarySkill, ...otherSkills] } = employee;
console.log("Primary skill:", primarySkill);  // JavaScript
console.log("Other skills:", otherSkills);    // ['Python', 'Docker']

// Destructuring in function parameters
function generateBadge({ name, department, role = "Staff", address: { city } }) {
  return `🏷️  ${name} | ${role} | ${department} | ${city}`;
}
console.log("\nEmployee Badge:");
console.log(generateBadge(employee));
// 🏷️  Bob Smith | Developer | Engineering | San Francisco


// ============================================================
// EXAMPLE 6: Spread and Rest Operators
// ============================================================
console.log("\n--- EXAMPLE 6: Spread & Rest ---");

// Shallow copy with spread
const original = { x: 10, y: 20, z: 30 };
const copy = { ...original };
copy.x = 999;
console.log("Original after copy.x change:", original.x); // 10 (unchanged)
console.log("Copy:", copy); // { x: 999, y: 20, z: 30 }

// Merging objects (later properties override earlier)
const defaultSettings = {
  theme: "light",
  language: "en",
  fontSize: 14,
  notifications: true
};
const userSettings = {
  theme: "dark",
  fontSize: 16
};
const finalSettings = { ...defaultSettings, ...userSettings };
console.log("Merged settings:", finalSettings);
// { theme: 'dark', language: 'en', fontSize: 16, notifications: true }

// Rest in destructuring - collect remaining properties
const { theme, language, ...otherSettings } = finalSettings;
console.log("Extracted theme:", theme);         // dark
console.log("Extracted language:", language);   // en
console.log("Rest of settings:", otherSettings); // { fontSize: 16, notifications: true }

// Spread for immutable updates (common in React/Redux)
const state = { user: "Alice", count: 0, loading: false };

// Update count without mutating
const newState = { ...state, count: state.count + 1 };
console.log("\nOriginal state:", state);
console.log("New state:", newState);


// ============================================================
// EXAMPLE 7: Computed Property Names & Shorthand
// ============================================================
console.log("\n--- EXAMPLE 7: Computed Property Names & Shorthand ---");

// Property shorthand
const firstName = "Carol";
const lastName = "Johnson";
const age = 28;

const user = { firstName, lastName, age }; // Shorthand
console.log("Shorthand:", user);
// { firstName: 'Carol', lastName: 'Johnson', age: 28 }

// Computed property names
const fieldPrefix = "user";
const dynamicObj = {
  [`${fieldPrefix}Name`]: "Alice",
  [`${fieldPrefix}Age`]: 30,
  [`${fieldPrefix}Email`]: "alice@example.com"
};
console.log("Computed props:", dynamicObj);
// { userName: 'Alice', userAge: 30, userEmail: 'alice@example.com' }

// Practical: build a form data object dynamically
function buildFormData(fields) {
  return fields.reduce((obj, { name, value }) => ({
    ...obj,
    [name]: value
  }), {});
}

const formFields = [
  { name: "username", value: "alice123" },
  { name: "email", value: "alice@example.com" },
  { name: "role", value: "admin" }
];

console.log("\nForm data:", buildFormData(formFields));
// { username: 'alice123', email: 'alice@example.com', role: 'admin' }


// ============================================================
// EXAMPLE 8: Object.freeze(), Object.seal(), Object.assign()
// ============================================================
console.log("\n--- EXAMPLE 8: Object.freeze / seal / assign ---");

// Object.freeze() - prevents ALL modifications
const MATH_CONSTANTS = Object.freeze({
  PI: 3.14159265,
  E: 2.71828182,
  GOLDEN_RATIO: 1.61803398
});
MATH_CONSTANTS.PI = 999;        // Silently ignored
MATH_CONSTANTS.newProp = "test"; // Silently ignored
console.log("Frozen PI:", MATH_CONSTANTS.PI); // 3.14159265
console.log("Is frozen:", Object.isFrozen(MATH_CONSTANTS)); // true

// Object.seal() - can modify, but cannot add/delete
const config = Object.seal({
  debug: false,
  version: "1.0.0"
});
config.debug = true;      // Allowed (modify existing)
config.newKey = "oops";   // Silently ignored
console.log("\nSealed config:", config); // { debug: true, version: '1.0.0' }
console.log("Is sealed:", Object.isSealed(config)); // true

// Object.assign() - copy/merge
const base = { a: 1, b: 2 };
const extra = { b: 99, c: 3 };
const merged = Object.assign({}, base, extra);
console.log("\nObject.assign merged:", merged); // { a: 1, b: 99, c: 3 }


// ============================================================
// EXAMPLE 9: Checking Properties
// ============================================================
console.log("\n--- EXAMPLE 9: Checking Properties ---");

const config2 = {
  host: "localhost",
  port: 3000,
  debug: false // Note: even false values should be found!
};

// 'in' operator
console.log('"host" in config:', "host" in config2);     // true
console.log('"debug" in config:', "debug" in config2);   // true (even though false!)
console.log('"timeout" in config:', "timeout" in config2); // false

// hasOwnProperty - excludes prototype chain
console.log("\nhasOwnProperty checks:");
console.log(config2.hasOwnProperty("host"));     // true
console.log(config2.hasOwnProperty("toString")); // false (inherited from Object)

// Optional chaining (?.) for safe nested access
const app = {
  server: {
    host: "localhost",
    port: 8080
  }
  // Note: 'database' is NOT defined
};
console.log("\nOptional chaining:");
console.log(app?.server?.host);       // localhost
console.log(app?.database?.host);     // undefined (no error!)
console.log(app?.server?.ssl?.cert);  // undefined (no error!)

// Nullish coalescing with optional chaining
const timeout = app?.server?.timeout ?? 5000; // Default if undefined/null
console.log("Timeout:", timeout); // 5000


// ============================================================
// EXAMPLE 10: Object.fromEntries() and Transformations
// ============================================================
console.log("\n--- EXAMPLE 10: Object.fromEntries & Transformations ---");

// Convert entries array back to object
const pairs = [["name", "Eve"], ["age", 22], ["city", "Boston"]];
const fromEntries = Object.fromEntries(pairs);
console.log("fromEntries:", fromEntries);
// { name: 'Eve', age: 22, city: 'Boston' }

// Transform object values (e.g., apply discount)
const menuPrices = { burger: 12.99, fries: 4.99, drink: 2.99, dessert: 6.99 };

const discountedPrices = Object.fromEntries(
  Object.entries(menuPrices).map(([item, price]) => [item, +(price * 0.85).toFixed(2)])
);
console.log("\nOriginal menu:", menuPrices);
console.log("Discounted (15% off):", discountedPrices);

// Filter object properties
const allUsers = {
  alice: { age: 30, active: true },
  bob: { age: 17, active: true },
  carol: { age: 25, active: false },
  dave: { age: 19, active: true }
};

const activeAdults = Object.fromEntries(
  Object.entries(allUsers).filter(([, user]) => user.active && user.age >= 18)
);
console.log("\nActive adult users:", activeAdults);
// { alice: {...}, dave: {...} }


// ============================================================
// EXAMPLE 11: Getters and Setters
// ============================================================
console.log("\n--- EXAMPLE 11: Getters and Setters ---");

const rectangle = {
  _width: 10,
  _height: 5,

  get width() { return this._width; },
  set width(val) {
    if (val <= 0) throw new RangeError("Width must be positive");
    this._width = val;
  },

  get height() { return this._height; },
  set height(val) {
    if (val <= 0) throw new RangeError("Height must be positive");
    this._height = val;
  },

  get area() {
    return this._width * this._height;
  },

  get perimeter() {
    return 2 * (this._width + this._height);
  },

  get isSquare() {
    return this._width === this._height;
  }
};

console.log("Width:", rectangle.width);        // 10
console.log("Height:", rectangle.height);      // 5
console.log("Area:", rectangle.area);          // 50
console.log("Perimeter:", rectangle.perimeter); // 30
console.log("Is Square:", rectangle.isSquare);  // false

rectangle.width = 5;
console.log("\nAfter width = 5:");
console.log("Is Square:", rectangle.isSquare); // true
console.log("Area:", rectangle.area);          // 25

// Demonstrate setter validation
try {
  rectangle.width = -10;
} catch (e) {
  console.log("Setter error:", e.message); // Width must be positive
}


// ============================================================
// EXAMPLE 12: Prototypes and Inheritance
// ============================================================
console.log("\n--- EXAMPLE 12: Prototypes & Inheritance ---");

// ES6 Class Inheritance
class Shape {
  constructor(color) {
    this.color = color;
  }
  getInfo() {
    return `A ${this.color} shape`;
  }
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color); // Call parent constructor
    this.radius = radius;
  }
  area() {
    return +(Math.PI * this.radius ** 2).toFixed(2);
  }
  getInfo() {
    return `${super.getInfo()} (circle, radius: ${this.radius})`;
  }
}

class Square extends Shape {
  constructor(color, side) {
    super(color);
    this.side = side;
  }
  area() {
    return this.side ** 2;
  }
  getInfo() {
    return `${super.getInfo()} (square, side: ${this.side})`;
  }
}

const shapes = [
  new Circle("red", 7),
  new Square("blue", 5),
  new Circle("green", 3)
];

shapes.forEach(shape => {
  console.log(shape.getInfo(), "→ Area:", shape.area());
});
// A red shape (circle, radius: 7) → Area: 153.94
// A blue shape (square, side: 5) → Area: 25
// A green shape (circle, radius: 3) → Area: 28.27

console.log("\nPrototype checks:");
console.log(shapes[0] instanceof Circle); // true
console.log(shapes[0] instanceof Shape);  // true (inherited)
console.log(shapes[1] instanceof Circle); // false


// ============================================================
// EXAMPLE 13: Shallow vs Deep Copy
// ============================================================
console.log("\n--- EXAMPLE 13: Shallow vs Deep Copy ---");

const original2 = {
  name: "Alice",
  scores: [100, 95, 88],
  address: { city: "NYC", zip: "10001" }
};

// Shallow copy - nested references are shared!
const shallowCopy = { ...original2 };
shallowCopy.name = "Bob";              // Primitive - safe (creates new)
shallowCopy.scores.push(77);           // Array - MUTATES original!
shallowCopy.address.city = "LA";      // Object - MUTATES original!

console.log("Shallow copy effect on original:");
console.log("name:", original2.name);           // Alice (safe)
console.log("scores:", original2.scores);       // [100, 95, 88, 77] MUTATED!
console.log("city:", original2.address.city);   // LA MUTATED!

// Deep copy using structuredClone (modern, recommended)
const original3 = {
  name: "Alice",
  scores: [100, 95, 88],
  address: { city: "NYC", zip: "10001" }
};

const deepCopy = structuredClone(original3);
deepCopy.name = "Bob";
deepCopy.scores.push(77);
deepCopy.address.city = "LA";

console.log("\nDeep copy - original untouched:");
console.log("name:", original3.name);           // Alice
console.log("scores:", original3.scores);       // [100, 95, 88]
console.log("city:", original3.address.city);   // NYC


// ============================================================
// EXAMPLE 14: Real-World Pattern - Building a Todo Manager
// ============================================================
console.log("\n--- EXAMPLE 14: Real-World - Todo Manager ---");

const todoManager = {
  _todos: [],
  _nextId: 1,

  add(text, priority = "medium") {
    const todo = {
      id: this._nextId++,
      text,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this._todos.push(todo);
    return todo;
  },

  complete(id) {
    const todo = this._todos.find(t => t.id === id);
    if (!todo) return `Todo #${id} not found`;
    todo.completed = true;
    return `Completed: "${todo.text}"`;
  },

  remove(id) {
    const idx = this._todos.findIndex(t => t.id === id);
    if (idx === -1) return `Todo #${id} not found`;
    const [removed] = this._todos.splice(idx, 1);
    return `Removed: "${removed.text}"`;
  },

  get pending() {
    return this._todos.filter(t => !t.completed);
  },

  get completed() {
    return this._todos.filter(t => t.completed);
  },

  getSummary() {
    return {
      total: this._todos.length,
      completed: this.completed.length,
      pending: this.pending.length,
      byPriority: Object.fromEntries(
        ["high", "medium", "low"].map(p => [
          p, this._todos.filter(t => t.priority === p).length
        ])
      )
    };
  }
};

todoManager.add("Buy groceries", "low");
todoManager.add("Fix critical bug", "high");
todoManager.add("Write documentation", "medium");
todoManager.add("Deploy to production", "high");
todoManager.add("Team meeting", "medium");

console.log(todoManager.complete(1)); // Completed: "Buy groceries"
console.log(todoManager.complete(2)); // Completed: "Fix critical bug"
console.log(todoManager.remove(5));   // Removed: "Team meeting"

console.log("\nPending todos:");
todoManager.pending.forEach(t => console.log(`  [${t.priority}] ${t.text}`));

console.log("\nSummary:", todoManager.getSummary());
// { total: 4, completed: 2, pending: 2, byPriority: { high: 1, medium: 1, low: 0 } }


console.log("\n✅ All Object examples completed!");
