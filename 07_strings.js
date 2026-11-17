// ============================================================
// JavaScript Strings — Complete Code Examples
// Topic: Strings
// Run in: Node.js (node strings.js) or Browser Console
// ============================================================


// ─────────────────────────────────────────────
// EXAMPLE 1: Creating Strings (3 ways)
// ─────────────────────────────────────────────
console.log("===== EXAMPLE 1: Creating Strings =====");

const single   = 'Hello, I am a single-quoted string.';
const double   = "Hello, I am a double-quoted string.";
const template = `Hello, I am a template literal (backtick) string.`;

console.log(single);   // Hello, I am a single-quoted string.
console.log(double);   // Hello, I am a double-quoted string.
console.log(template); // Hello, I am a template literal (backtick) string.

// Template literals support multi-line without \n
const multiLine = `Line 1
Line 2
Line 3`;
console.log(multiLine);
// Line 1
// Line 2
// Line 3


// ─────────────────────────────────────────────
// EXAMPLE 2: String Length & Character Access
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 2: Length & Character Access =====");

const language = "JavaScript";

console.log("String:", language);
console.log("Length:", language.length);             // 10

// Access characters by index (zero-based)
console.log("First char [0]:",  language[0]);        // 'J'
console.log("Fifth char [4]:",  language[4]);        // 'S'
console.log("charAt(4):",       language.charAt(4)); // 'S'

// Last character
console.log("Last char:", language[language.length - 1]); // 't'

// Out-of-range access returns undefined
console.log("Out of range:", language[99]); // undefined


// ─────────────────────────────────────────────
// EXAMPLE 3: Template Literals & Interpolation
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 3: Template Literals =====");

const firstName = "Alice";
const age       = 28;
const hobby     = "painting";

// String interpolation — embed variables and expressions directly
const bio = `My name is ${firstName}, I am ${age} years old, and I enjoy ${hobby}.`;
console.log(bio);
// My name is Alice, I am 28 years old, and I enjoy painting.

// Embed any JavaScript expression
const a = 7, b = 3;
console.log(`${a} + ${b} = ${a + b}`);  // 7 + 3 = 10
console.log(`${a} * ${b} = ${a * b}`);  // 7 * 3 = 21
console.log(`Is a > b? ${a > b}`);      // Is a > b? true

// Calling functions inside template literals
const shout = (name) => name.toUpperCase();
console.log(`Hello, ${shout(firstName)}!`); // Hello, ALICE!


// ─────────────────────────────────────────────
// EXAMPLE 4: Case Conversion & Trimming
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 4: Case Conversion & Trimming =====");

const messy = "   hElLo WoRLd   ";

console.log("Original:   |", messy, "|");
console.log("trim():     |", messy.trim(),      "|"); // 'hElLo WoRLd'
console.log("trimStart(): |", messy.trimStart(), "|"); // 'hElLo WoRLd   '
console.log("trimEnd():  |", messy.trimEnd(),   "|"); // '   hElLo WoRLd'

const trimmed = messy.trim();
console.log("toUpperCase():", trimmed.toUpperCase()); // 'HELLO WORLD'
console.log("toLowerCase():", trimmed.toLowerCase()); // 'hello world'

// Real-world: normalize user input before processing
function normalizeInput(input) {
  return input.trim().toLowerCase();
}
console.log(normalizeInput("  JavaScript  ")); // 'javascript'


// ─────────────────────────────────────────────
// EXAMPLE 5: Searching Within Strings
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 5: Searching Strings =====");

const sentence = "The quick brown fox jumps over the lazy dog";

// .includes() — returns true/false
console.log(sentence.includes("fox"));    // true
console.log(sentence.includes("cat"));    // false

// .startsWith() / .endsWith()
console.log(sentence.startsWith("The"));  // true
console.log(sentence.startsWith("the"));  // false (case-sensitive!)
console.log(sentence.endsWith("dog"));    // true
console.log(sentence.endsWith("Dog"));    // false

// .indexOf() — returns position, or -1 if not found
console.log(sentence.indexOf("fox"));      // 16
console.log(sentence.indexOf("cat"));      // -1
console.log(sentence.indexOf("the"));      // 31  (finds first occurrence)

// .lastIndexOf() — searches from the end
console.log(sentence.lastIndexOf("the"));  // 31  (last occurrence)
console.log(sentence.lastIndexOf("o"));    // 41

// Practical: check if email contains '@'
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}
console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("notanemail"));        // false


// ─────────────────────────────────────────────
// EXAMPLE 6: Extracting Substrings
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 6: Extracting Substrings =====");

const str = "Hello, JavaScript!";

// .slice(start, end) — end is exclusive; supports negative indices
console.log(str.slice(0, 5));   // 'Hello'
console.log(str.slice(7));      // 'JavaScript!'
console.log(str.slice(-10));    // 'JavaScript!' (10 chars from end)
console.log(str.slice(-10, -1)); // 'JavaScript'

// .substring(start, end) — similar but no negative index support
console.log(str.substring(7, 17)); // 'JavaScript'
console.log(str.substring(7));     // 'JavaScript!'

// Real-world: extract file extension
function getExtension(filename) {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return "no extension";
  return filename.slice(dotIndex + 1);
}
console.log(getExtension("photo.png"));       // 'png'
console.log(getExtension("archive.tar.gz"));  // 'gz'
console.log(getExtension("README"));           // 'no extension'


// ─────────────────────────────────────────────
// EXAMPLE 7: Replacing Content
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 7: Replacing Content =====");

let phrase = "I love cats. Cats are my favorite animals. I have 3 cats.";

// .replace() — replaces FIRST occurrence only (case-sensitive)
console.log(phrase.replace("cats", "dogs"));
// 'I love dogs. Cats are my favorite animals. I have 3 cats.'

// .replaceAll() — replaces ALL occurrences (ES2021)
console.log(phrase.replaceAll("cats", "dogs"));
// 'I love dogs. Cats are my favorite animals. I have 3 dogs.'
// Note: 'Cats' is NOT replaced — case-sensitive!

// Using regex with 'g' flag for global, 'i' for case-insensitive
console.log(phrase.replace(/cats/gi, "dogs"));
// 'I love dogs. dogs are my favorite animals. I have 3 dogs.'

// Using a function in .replace() for dynamic replacement
const result = "hello world".replace(/(\w+)/g, (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
});
console.log(result); // 'Hello World'

// Real-world: sanitize user input (remove extra spaces)
function sanitize(input) {
  return input.trim().replace(/\s+/g, " ");
}
console.log(sanitize("  Hello    World  ")); // 'Hello World'


// ─────────────────────────────────────────────
// EXAMPLE 8: Splitting and Joining
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 8: Split & Join =====");

// .split(separator) — converts string to array
const csv = "apple,banana,cherry,date,elderberry";
const fruits = csv.split(",");
console.log(fruits);
// ['apple', 'banana', 'cherry', 'date', 'elderberry']

// Split with limit
const limited = csv.split(",", 3);
console.log(limited); // ['apple', 'banana', 'cherry']

// Split into individual characters
const letters = "hello".split("");
console.log(letters); // ['h', 'e', 'l', 'l', 'o']

// Split by space into words
const words = "The quick brown fox".split(" ");
console.log(words);        // ['The', 'quick', 'brown', 'fox']
console.log(words.length); // 4

// .join(separator) — converts array back to string
console.log(fruits.join(" | "));  // 'apple | banana | cherry | date | elderberry'
console.log(fruits.join(""));     // 'applebananacherrydateelderberry'
console.log(fruits.join(", "));   // 'apple, banana, cherry, date, elderberry'

// Real-world: reverse words in a sentence
function reverseWords(sentence) {
  return sentence.split(" ").reverse().join(" ");
}
console.log(reverseWords("Hello World"));           // 'World Hello'
console.log(reverseWords("The quick brown fox"));   // 'fox brown quick The'


// ─────────────────────────────────────────────
// EXAMPLE 9: Padding & Repeating
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 9: Padding & Repeating =====");

// .padStart(targetLength, padString)
console.log("5".padStart(3, "0"));    // '005'
console.log("42".padStart(5, "0"));   // '00042'
console.log("hi".padStart(6, "-"));   // '----hi'

// .padEnd(targetLength, padString)
console.log("5".padEnd(3, "0"));      // '500'
console.log("hi".padEnd(6, "."));     // 'hi....'

// Real-world: format a time display (HH:MM:SS)
function formatTime(h, m, s) {
  const hh = String(h).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
console.log(formatTime(9, 5, 3));   // '09:05:03'
console.log(formatTime(14, 30, 0)); // '14:30:00'

// Real-world: format invoice numbers
function formatInvoiceNumber(num) {
  return "INV-" + String(num).padStart(6, "0");
}
console.log(formatInvoiceNumber(42));    // 'INV-000042'
console.log(formatInvoiceNumber(1500));  // 'INV-001500'

// .repeat(count)
console.log("-".repeat(30)); // '------------------------------'
console.log("ha".repeat(4)); // 'hahahaha'

// Real-world: simple text separator
function printHeader(title) {
  const line = "=".repeat(40);
  const padding = Math.floor((40 - title.length) / 2);
  console.log(line);
  console.log(" ".repeat(padding) + title);
  console.log(line);
}
printHeader("My Report");


// ─────────────────────────────────────────────
// EXAMPLE 10: Type Conversion (String ↔ Number)
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 10: Type Conversion =====");

// Number → String
const num = 255;
console.log(String(num));        // '255'
console.log(num.toString());     // '255'
console.log(num.toString(2));    // '11111111' (binary)
console.log(num.toString(8));    // '377' (octal)
console.log(num.toString(16));   // 'ff' (hexadecimal)

// String → Number
console.log(Number("42"));      // 42
console.log(Number("3.14"));    // 3.14
console.log(Number(""));        // 0
console.log(Number("abc"));     // NaN  ← watch out!
console.log(parseInt("42px"));  // 42   (stops at non-numeric)
console.log(parseInt("abc"));   // NaN
console.log(parseFloat("3.14 is pi")); // 3.14

// ⚠️ Pitfall: '+' with mixed types
console.log("5" + 3);         // '53' (concatenation!)
console.log(Number("5") + 3); // 8   (correct addition)
console.log("5" - 3);         // 2   (coercion works for -)
console.log("5" * "2");       // 10  (coercion works for *)


// ─────────────────────────────────────────────
// EXAMPLE 11: Escape Characters
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 11: Escape Characters =====");

console.log("She said, \"Hello, World!\""); // She said, "Hello, World!"
console.log('It\'s a sunny day.');          // It's a sunny day.
console.log("Line 1\nLine 2\nLine 3");      // 3 separate lines
console.log("Column1\tColumn2\tColumn3");   // Tab-separated
console.log("Backslash: \\");               // Backslash: \
console.log("\u2764 Unicode heart");        // ❤ Unicode heart
console.log("\u{1F600} Emoji");             // 😀 Emoji (ES6 unicode escape)


// ─────────────────────────────────────────────
// EXAMPLE 12: Real-World Utility Functions
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 12: Real-World Utilities =====");

// --- 12a: Reverse a string ---
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log("Reverse 'hello':", reverseString("hello"));           // 'olleh'
console.log("Reverse 'JavaScript':", reverseString("JavaScript")); // 'tpircSavaJ'

// --- 12b: Check palindrome ---
function isPalindrome(str) {
  // Remove non-alphanumeric characters and lowercase
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
console.log("\nisPalindrome tests:");
console.log("'racecar':", isPalindrome("racecar"));                        // true
console.log("'hello':", isPalindrome("hello"));                            // false
console.log("'A man a plan a canal Panama':", isPalindrome("A man a plan a canal Panama")); // true
console.log("'Was it a car or a cat I saw':", isPalindrome("Was it a car or a cat I saw")); // true

// --- 12c: Capitalize first letter of each word (Title Case) ---
function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
console.log("\nTitle Case:");
console.log(toTitleCase("the quick brown fox"));   // 'The Quick Brown Fox'
console.log(toTitleCase("jAVASCRIPT IS aWeSoMe")); // 'Javascript Is Awesome'

// --- 12d: Count character occurrences ---
function countChar(str, char) {
  return str.split(char).length - 1;
}
console.log("\nCount occurrences:");
console.log("'a' in 'banana':", countChar("banana", "a"));    // 3
console.log("'s' in 'mississippi':", countChar("mississippi", "s")); // 4

// --- 12e: Truncate long strings with ellipsis ---
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
console.log("\nTruncate:");
console.log(truncate("Hello, World!", 20));  // 'Hello, World!'
console.log(truncate("Hello, World!", 8));   // 'Hello...'

// --- 12f: Slugify a string (URL-friendly) ---
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")   // remove special chars
    .replace(/[\s_-]+/g, "-")   // spaces/underscores to hyphens
    .replace(/^-+|-+$/g, "");   // trim leading/trailing hyphens
}
console.log("\nSlugify:");
console.log(slugify("Hello World!"));              // 'hello-world'
console.log(slugify("JavaScript is Awesome!!!"));  // 'javascript-is-awesome'
console.log(slugify("  My Blog Post -- 2024  "));  // 'my-blog-post-2024'

// --- 12g: Mask sensitive data (like credit card numbers) ---
function maskCard(cardNumber) {
  const str = String(cardNumber).replace(/\s/g, "");
  const last4 = str.slice(-4);
  const masked = last4.padStart(str.length, "*");
  return masked.match(/.{1,4}/g).join(" ");
}
console.log("\nMask card:");
console.log(maskCard("1234567890123456")); // '**** **** **** 3456'

// --- 12h: Extract hashtags from a tweet ---
function extractHashtags(text) {
  const matches = text.match(/#\w+/g);
  return matches ? matches.map((tag) => tag.slice(1)) : [];
}
console.log("\nExtract hashtags:");
console.log(extractHashtags("Loving #JavaScript and #WebDev today! #coding"));
// ['JavaScript', 'WebDev', 'coding']
console.log(extractHashtags("No hashtags here."));
// []


// ─────────────────────────────────────────────
// EXAMPLE 13: String Comparison
// ─────────────────────────────────────────────
console.log("\n===== EXAMPLE 13: String Comparison =====");

console.log("apple" === "apple");  // true
console.log("apple" === "Apple");  // false (case-sensitive)
console.log("b" > "a");            // true  (Unicode order)
console.log("Banana" < "apple");   // true  (uppercase < lowercase)

// Case-insensitive comparison
const s1 = "Hello";
const s2 = "hello";
console.log(s1.toLowerCase() === s2.toLowerCase()); // true

// Sorting strings with localeCompare
const names = ["Charlie", "alice", "Bob", "diana"];
const sorted = names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
console.log(sorted); // ['alice', 'Bob', 'Charlie', 'diana']

// ⚠️ Loose equality pitfall
console.log("\n== vs ===");
console.log("5" == 5);   // true  (type coercion — avoid!)
console.log("5" === 5);  // false (strict — always use this)


// ─────────────────────────────────────────────
// SUMMARY: Quick Reference
// ─────────────────────────────────────────────
console.log("\n===== SUMMARY: Quick Reference =====");
const ref = "Hello, World!";
console.log("Original:          ", ref);
console.log(".length:           ", ref.length);               // 13
console.log(".toUpperCase():    ", ref.toUpperCase());        // 'HELLO, WORLD!'
console.log(".toLowerCase():    ", ref.toLowerCase());        // 'hello, world!'
console.log(".trim():           ", "  hi  ".trim());          // 'hi'
console.log(".includes('World'):", ref.includes("World"));   // true
console.log(".startsWith('Hello'):", ref.startsWith("Hello")); // true
console.log(".endsWith('!'):",    ref.endsWith("!"));         // true
console.log(".indexOf('World'): ", ref.indexOf("World"));     // 7
console.log(".slice(7, 12):     ", ref.slice(7, 12));         // 'World'
console.log(".replace():        ", ref.replace("World", "JS")); // 'Hello, JS!'
console.log(".split(', '):      ", ref.split(", "));           // ['Hello', 'World!']
console.log(".padStart(15,'*'): ", ref.padStart(15, "*"));    // '**Hello, World!'
console.log(".repeat(2):        ", "Ha".repeat(2));            // 'HaHa'
