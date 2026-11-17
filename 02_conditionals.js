// ============================================================
// JavaScript Conditional Statements — Complete Code Examples
// ============================================================
// Run this file in Node.js:  node conditionals.js
// Or paste into browser DevTools console.
// ============================================================


// ─────────────────────────────────────────────────────────────
// EXAMPLE 1: Basic if Statement
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 1: Basic if Statement ---");

let temperature = 35;

if (temperature > 30) {
  console.log("It's hot outside! Stay hydrated.");
  // Output: It's hot outside! Stay hydrated.
}

let speed = 45;
if (speed > 60) {
  console.log("Speeding! Slow down.");
}
// No output — condition is false, block is skipped.
console.log("(No speeding output — condition was false)");


// ─────────────────────────────────────────────────────────────
// EXAMPLE 2: if...else Statement
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 2: if...else Statement ---");

let isLoggedIn = false;

if (isLoggedIn) {
  console.log("Welcome back, user!");
} else {
  console.log("Please log in to continue.");
  // Output: Please log in to continue.
}

let balance = 150;
let withdrawAmount = 200;

if (withdrawAmount <= balance) {
  balance -= withdrawAmount;
  console.log("Withdrawal successful. New balance: $" + balance);
} else {
  console.log("Insufficient funds! You tried to withdraw $" + withdrawAmount + " but only have $" + balance);
  // Output: Insufficient funds! You tried to withdraw $200 but only have $150
}


// ─────────────────────────────────────────────────────────────
// EXAMPLE 3: if...else if...else Chain
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 3: if...else if...else Chain ---");

// --- Grade Calculator ---
let score = 78;

if (score >= 90) {
  console.log("Score " + score + " => Grade: A");
} else if (score >= 80) {
  console.log("Score " + score + " => Grade: B");
} else if (score >= 70) {
  console.log("Score " + score + " => Grade: C");
  // Output: Score 78 => Grade: C
} else if (score >= 60) {
  console.log("Score " + score + " => Grade: D");
} else {
  console.log("Score " + score + " => Grade: F");
}

// --- Season Detector ---
let month = 7; // July

if (month === 12 || month === 1 || month === 2) {
  console.log("Month " + month + " => Season: Winter");
} else if (month >= 3 && month <= 5) {
  console.log("Month " + month + " => Season: Spring");
} else if (month >= 6 && month <= 8) {
  console.log("Month " + month + " => Season: Summer");
  // Output: Month 7 => Season: Summer
} else {
  console.log("Month " + month + " => Season: Autumn");
}


// ─────────────────────────────────────────────────────────────
// EXAMPLE 4: Truthy and Falsy Values
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 4: Truthy and Falsy Values ---");

// All falsy values in JavaScript:
let falsyValues = [false, 0, -0, 0n, "", null, undefined, NaN];

falsyValues.forEach((val) => {
  if (val) {
    console.log(String(val) + " is TRUTHY");
  } else {
    console.log(JSON.stringify(val) + " is FALSY");
  }
});
// Output: All 8 values printed as FALSY

console.log("");

// Truthy values that might surprise you:
let surprisingTruthy = [[], {}, "0", "false", -1, Infinity];
surprisingTruthy.forEach((val) => {
  if (val) {
    console.log(JSON.stringify(val) + " is TRUTHY (might surprise you!)");
  }
});
// Output: All 6 values printed as TRUTHY

// Practical truthy/falsy check:
let username = "";
if (username) {
  console.log("Hello, " + username + "!");
} else {
  console.log("No username — using 'Guest'");
  // Output: No username — using 'Guest'
}


// ─────────────────────────────────────────────────────────────
// EXAMPLE 5: switch Statement
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 5: switch Statement ---");

// --- Day of the Week ---
let day = "Saturday";

switch (day) {
  case "Monday":
    console.log(day + ": Start of the work week!");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log(day + ": Regular work day.");
    break;
  case "Friday":
    console.log(day + ": Almost the weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log(day + ": It's the weekend! Relax.");
    // Output: Saturday: It's the weekend! Relax.
    break;
  default:
    console.log(day + ": That's not a valid day.");
}

// --- HTTP Status Code Interpreter ---
let statusCode = 404;

switch (statusCode) {
  case 200:
    console.log("Status " + statusCode + ": OK — Request succeeded.");
    break;
  case 201:
    console.log("Status " + statusCode + ": Created — Resource created.");
    break;
  case 301:
    console.log("Status " + statusCode + ": Moved Permanently.");
    break;
  case 400:
    console.log("Status " + statusCode + ": Bad Request.");
    break;
  case 401:
    console.log("Status " + statusCode + ": Unauthorized.");
    break;
  case 403:
    console.log("Status " + statusCode + ": Forbidden.");
    break;
  case 404:
    console.log("Status " + statusCode + ": Not Found — The resource does not exist.");
    // Output: Status 404: Not Found — The resource does not exist.
    break;
  case 500:
    console.log("Status " + statusCode + ": Internal Server Error.");
    break;
  default:
    console.log("Status " + statusCode + ": Unknown status code.");
}


// ─────────────────────────────────────────────────────────────
// EXAMPLE 6: switch — Intentional Fall-Through
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 6: switch — Intentional Fall-Through ---");

// Permission levels: level 3 gets all permissions, level 2 gets
// 'write' and 'read', level 1 gets only 'read'.
let accessLevel = 2;
let permissions = [];

switch (accessLevel) {
  case 3:
    permissions.push("delete"); // falls through to add more
  case 2:
    permissions.push("write");  // falls through to add more
  case 1:
    permissions.push("read");
    break;
  default:
    permissions.push("none");
}

console.log("Access level " + accessLevel + " permissions: " + permissions.join(", "));
// Output: Access level 2 permissions: write, read


// ─────────────────────────────────────────────────────────────
// EXAMPLE 7: Ternary Operator
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 7: Ternary Operator ---");

// Basic ternary
let age = 20;
let accessStatus = age >= 18 ? "Allowed" : "Denied";
console.log("Age " + age + " => Access: " + accessStatus);
// Output: Age 20 => Access: Allowed

// Ternary in a template literal — pluralization
let cartCount = 3;
console.log(`You have ${cartCount} item${cartCount !== 1 ? "s" : ""} in your cart.`);
// Output: You have 3 items in your cart.

cartCount = 1;
console.log(`You have ${cartCount} item${cartCount !== 1 ? "s" : ""} in your cart.`);
// Output: You have 1 item in your cart.

// Ternary for conditional styling (common in frameworks)
let isActive = true;
let buttonClass = isActive ? "btn-primary" : "btn-secondary";
console.log("Button class: " + buttonClass);
// Output: Button class: btn-primary

// Ternary for returning values from functions
function getDiscount(isMember) {
  return isMember ? 0.20 : 0.05;
}
console.log("Member discount: " + (getDiscount(true) * 100) + "%");
// Output: Member discount: 20%
console.log("Non-member discount: " + (getDiscount(false) * 100) + "%");
// Output: Non-member discount: 5%


// ─────────────────────────────────────────────────────────────
// EXAMPLE 8: Logical AND (&&) Short-Circuit
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 8: Logical AND (&&) Short-Circuit ---");

// && returns the first falsy value, or the last value if all are truthy
let isAdmin = true;
let isVerified = true;

// Execute only if both are true
isAdmin && isVerified && console.log("Full admin access granted.");
// Output: Full admin access granted.

let hasPermission = false;
hasPermission && console.log("This will NOT print.");
console.log("(Line above had no output — short-circuited)");

// Safe property access pattern
let userObj = { name: "Alice", role: "editor" };
let noUser = null;

console.log(userObj && userObj.name);   // Output: Alice
console.log(noUser && noUser.name);    // Output: null (no error!)

// In practice — render a message only if data exists
let product = { title: "JavaScript Book", price: 29.99 };
let noProduct = null;

product && console.log("Product: " + product.title + " — $" + product.price);
// Output: Product: JavaScript Book — $29.99

noProduct && console.log("This won't run.");
console.log("(noProduct && check safely skipped)");


// ─────────────────────────────────────────────────────────────
// EXAMPLE 9: Logical OR (||) for Default Values
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 9: Logical OR (||) for Default Values ---");

// || returns first truthy value, or last value if all are falsy
let userCity = "";
let defaultCity = "New York";
let city = userCity || defaultCity;
console.log("City: " + city);
// Output: City: New York (userCity is falsy empty string)

let providedCity = "Chicago";
city = providedCity || defaultCity;
console.log("City: " + city);
// Output: City: Chicago (providedCity is truthy)

// Chained || for multiple fallbacks
function getGreeting(name) {
  let displayName = name || "there";
  return "Hello, " + displayName + "!";
}

console.log(getGreeting("Bob"));     // Output: Hello, Bob!
console.log(getGreeting(""));        // Output: Hello, there!
console.log(getGreeting(null));      // Output: Hello, there!
console.log(getGreeting(undefined)); // Output: Hello, there!


// ─────────────────────────────────────────────────────────────
// EXAMPLE 10: Nullish Coalescing Operator (??)
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 10: Nullish Coalescing Operator (??) ---");

// ?? only falls back when the left side is null or undefined
// Unlike ||, it does NOT treat 0, false, or '' as fallback triggers

let itemCount = 0;
console.log("Using || for count 0: ", itemCount || "No items"); // "No items" (wrong!)
console.log("Using ?? for count 0: ", itemCount ?? "No items"); // 0 (correct!)

let darkMode = false;
console.log("Using || for darkMode false: ", darkMode || true); // true (wrong!)
console.log("Using ?? for darkMode false: ", darkMode ?? true); // false (correct!)

let fontSize = null;
console.log("Using ?? for fontSize null: ", fontSize ?? 16); // 16 (correct fallback)

// Practical: User settings with defaults
let userSettings = {
  theme: "dark",
  fontSize: 0,       // explicitly set to 0
  notifications: false // explicitly disabled
};

let theme         = userSettings.theme         ?? "light";
let size          = userSettings.fontSize      ?? 14;    // Should be 0, not 14
let notifications = userSettings.notifications ?? true;  // Should be false, not true

console.log("Theme: " + theme);               // Output: Theme: dark
console.log("Font size: " + size);            // Output: Font size: 0
console.log("Notifications: " + notifications); // Output: Notifications: false


// ─────────────────────────────────────────────────────────────
// EXAMPLE 11: Optional Chaining (?.) with Conditionals
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 11: Optional Chaining (?.) ---");

let userProfile = {
  name: "Alice",
  address: {
    city: "San Francisco",
    zip: "94105"
  },
  getPlan() {
    return "Premium";
  }
};

let userNoAddress = {
  name: "Bob"
  // No address property
};

let noUser2 = null;

// Safe nested access — no TypeError even if intermediate is undefined/null
console.log(userProfile?.address?.city);       // Output: San Francisco
console.log(userNoAddress?.address?.city);     // Output: undefined (no error)
console.log(noUser2?.address?.city);           // Output: undefined (no error)

// Optional chaining with method calls
console.log(userProfile?.getPlan());           // Output: Premium
console.log(userNoAddress?.getPlan?.());       // Output: undefined (no error)

// Combining ?. with ?? for a clean default
let city1 = userProfile?.address?.city ?? "Unknown city";
let city2 = userNoAddress?.address?.city ?? "Unknown city";
let city3 = noUser2?.address?.city ?? "Unknown city";

console.log("User 1 city: " + city1); // Output: User 1 city: San Francisco
console.log("User 2 city: " + city2); // Output: User 2 city: Unknown city
console.log("User 3 city: " + city3); // Output: User 3 city: Unknown city


// ─────────────────────────────────────────────────────────────
// EXAMPLE 12: Real-World Scenario — Order Processing System
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 12: Real-World — Order Processing ---");

function processOrder(order) {
  // Guard clause: check if order exists
  if (!order) {
    console.log("Error: No order provided.");
    return;
  }

  // Check required fields
  if (!order.customerId) {
    console.log("Error: Order must have a customer ID.");
    return;
  }

  if (!order.items || order.items.length === 0) {
    console.log("Error: Order must contain at least one item.");
    return;
  }

  // Calculate total using ternary + nullish coalescing
  let subtotal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  let discount  = order.isMember ? subtotal * 0.10 : 0;
  let shipping  = subtotal >= 50 ? 0 : 9.99;
  let total     = subtotal - discount + shipping;

  // Determine order priority
  let priority;
  switch (order.shippingType) {
    case "express":
      priority = "HIGH — ships within 1 day";
      break;
    case "standard":
      priority = "NORMAL — ships within 3-5 days";
      break;
    case "economy":
      priority = "LOW — ships within 7-10 days";
      break;
    default:
      priority = "STANDARD — ships within 3-5 days";
  }

  // Output order summary
  console.log("\n=== ORDER SUMMARY ===");
  console.log("Customer ID : " + order.customerId);
  console.log("Items       : " + order.items.map(i => i.name).join(", "));
  console.log("Subtotal    : $" + subtotal.toFixed(2));
  console.log("Discount    : -$" + discount.toFixed(2) + (order.isMember ? " (member 10% off)" : ""));
  console.log("Shipping    : $" + shipping.toFixed(2) + (shipping === 0 ? " (FREE!)" : ""));
  console.log("TOTAL       : $" + total.toFixed(2));
  console.log("Priority    : " + priority);
  console.log("Status      : " + (total > 0 ? "Confirmed" : "Invalid"));
}

// Test with a valid order
processOrder({
  customerId: "USR-001",
  isMember: true,
  shippingType: "express",
  items: [
    { name: "JavaScript Book",  price: 29.99, qty: 1 },
    { name: "Laptop Stand",     price: 24.99, qty: 2 }
  ]
});

// Test with an invalid order
processOrder(null);
// Output: Error: No order provided.

processOrder({ customerId: "USR-002", items: [] });
// Output: Error: Order must contain at least one item.


// ─────────────────────────────────────────────────────────────
// EXAMPLE 13: Common Pitfalls Demonstrated
// ─────────────────────────────────────────────────────────────
console.log("\n--- EXAMPLE 13: Common Pitfalls ---");

// PITFALL 1: Loose (==) vs Strict (===) equality
console.log("Loose  : '5' == 5   =>", '5' == 5);    // true  (coerces string to number)
console.log("Strict : '5' === 5  =>", '5' === 5);   // false (different types)
console.log("Loose  : 0 == false =>", 0 == false);  // true  (coerces)
console.log("Strict : 0 === false =>", 0 === false); // false
console.log("Loose  : null == undefined =>", null == undefined);  // true
console.log("Strict : null === undefined =>", null === undefined); // false

// PITFALL 2: Arrays and Objects are ALWAYS truthy (even if empty)
if ([]) {
  console.log("Empty array [] is TRUTHY — be careful with length checks!");
}
if ({}) {
  console.log("Empty object {} is TRUTHY — be careful with key checks!");
}

// Correct way to check for empty array:
let myList = [];
if (myList.length === 0) {
  console.log("myList is empty (use .length, not direct truthiness).");
}

// PITFALL 3: NaN is not equal to itself!
console.log("NaN === NaN  =>", NaN === NaN);   // false (!!)
console.log("isNaN(NaN)   =>", isNaN(NaN));    // true
console.log("Number.isNaN(NaN) =>", Number.isNaN(NaN)); // true (safer)

let parsedValue = Number("abc");
if (Number.isNaN(parsedValue)) {
  console.log("Parsing failed — result is NaN. Use a fallback value.");
}

console.log("\n=== All examples complete! ===");
