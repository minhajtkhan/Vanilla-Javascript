# JavaScript Strings — Complete Guide

## Introduction

Strings are one of the most fundamental data types in JavaScript. A **string** is a sequence of characters used to represent text. Whether you're displaying a user's name, parsing URLs, formatting output, or processing form input — strings are everywhere. Mastering strings is essential for any JavaScript developer.

In JavaScript, strings are **primitive values** but they behave like objects because JavaScript automatically wraps them in a `String` object when you access properties or methods on them (this is called **autoboxing**).

---

## 1. Creating Strings

JavaScript offers three ways to define strings:

```js
// 1. Single quotes
let name = 'Alice';

// 2. Double quotes
let greeting = "Hello, World!";

// 3. Template literals (backticks) — ES6+
let message = `Welcome, ${name}!`;
```

> **Tip:** Template literals (backticks) are the most powerful — they support multi-line strings and embedded expressions.

---

## 2. String Length

The `.length` property returns the number of characters in a string.

```js
let city = "New York";
console.log(city.length); // 8
```

Note: `.length` counts spaces and special characters too.

---

## 3. Accessing Characters

You can access individual characters using bracket notation or `.charAt()`:

```js
let word = "JavaScript";

console.log(word[0]);         // 'J'
console.log(word.charAt(4));  // 'S'
console.log(word[word.length - 1]); // 't' (last character)
```

> **Pitfall:** Strings in JavaScript are **zero-indexed** — the first character is at index `0`.

---

## 4. String Immutability

Strings in JavaScript are **immutable** — you cannot change individual characters in-place. Any operation that appears to modify a string actually returns a **new string**.

```js
let str = "hello";
str[0] = "H"; // This does nothing!
console.log(str); // 'hello' (unchanged)

// Instead, create a new string:
let newStr = "H" + str.slice(1);
console.log(newStr); // 'Hello'
```

---

## 5. Template Literals (ES6)

Template literals allow **string interpolation** and **multi-line strings**:

```js
let firstName = "Bob";
let age = 30;

// String interpolation
let bio = `My name is ${firstName} and I am ${age} years old.`;
console.log(bio);
// 'My name is Bob and I am 30 years old.'

// Multi-line string
let poem = `Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you!`;
console.log(poem);

// Expressions inside ${}
let a = 10, b = 20;
console.log(`The sum of ${a} and ${b} is ${a + b}.`);
// 'The sum of 10 and 20 is 30.'
```

---

## 6. Common String Methods

### 6.1 Case Conversion

```js
let text = "Hello World";
console.log(text.toUpperCase()); // 'HELLO WORLD'
console.log(text.toLowerCase()); // 'hello world'
```

### 6.2 Trimming Whitespace

```js
let padded = "   hello   ";
console.log(padded.trim());      // 'hello'
console.log(padded.trimStart()); // 'hello   '
console.log(padded.trimEnd());   // '   hello'
```

### 6.3 Searching Within Strings

```js
let sentence = "The quick brown fox jumps over the lazy dog";

console.log(sentence.includes("fox"));        // true
console.log(sentence.startsWith("The"));      // true
console.log(sentence.endsWith("dog"));        // true
console.log(sentence.indexOf("fox"));         // 16
console.log(sentence.lastIndexOf("the"));     // 31
console.log(sentence.indexOf("cat"));         // -1 (not found)
```

> **Tip:** `.includes()` returns `true`/`false`, while `.indexOf()` returns the position or `-1`.

### 6.4 Extracting Substrings

```js
let str = "JavaScript";

console.log(str.slice(0, 4));     // 'Java'
console.log(str.slice(4));        // 'Script'
console.log(str.slice(-6));       // 'Script' (from end)
console.log(str.substring(0, 4)); // 'Java'
```

> **Pitfall:** `.slice()` supports negative indices; `.substring()` does not (it treats negatives as `0`).

### 6.5 Replacing Content

```js
let phrase = "I love cats. Cats are great.";

console.log(phrase.replace("cats", "dogs"));
// 'I love dogs. Cats are great.' (only first match)

console.log(phrase.replaceAll("cats", "dogs"));
// 'I love dogs. Cats are great.' (case-sensitive)

// Using regex for case-insensitive replace
console.log(phrase.replace(/cats/gi, "dogs"));
// 'I love dogs. dogs are great.'
```

### 6.6 Splitting and Joining

```js
let csv = "apple,banana,cherry,date";
let fruits = csv.split(",");
console.log(fruits);
// ['apple', 'banana', 'cherry', 'date']

let joined = fruits.join(" | ");
console.log(joined);
// 'apple | banana | cherry | date'

// Split into individual characters
let chars = "hello".split("");
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

### 6.7 Padding Strings

```js
let num = "5";
console.log(num.padStart(3, "0")); // '005'
console.log(num.padEnd(3, "0"));   // '500'

// Useful for formatting time
let hours = "9";
let minutes = "5";
console.log(`${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`);
// '09:05'
```

### 6.8 Repeating Strings

```js
let dash = "-";
console.log(dash.repeat(10)); // '----------'

let ha = "ha";
console.log(ha.repeat(3)); // 'hahaha'
```

### 6.9 Converting Numbers to Strings and Vice Versa

```js
// Number to string
let num = 42;
console.log(String(num));      // '42'
console.log(num.toString());   // '42'
console.log(num.toString(2));  // '101010' (binary)
console.log(num.toString(16)); // '2a' (hexadecimal)

// String to number
let strNum = "3.14";
console.log(Number(strNum));    // 3.14
console.log(parseInt(strNum));  // 3
console.log(parseFloat(strNum)); // 3.14
```

---

## 7. String Concatenation

```js
// Using + operator
let firstName = "Jane";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName); // 'Jane Doe'

// Using concat() method
let result = firstName.concat(" ", lastName);
console.log(result); // 'Jane Doe'

// Best practice: template literals
let best = `${firstName} ${lastName}`;
console.log(best); // 'Jane Doe'
```

> **Tip:** Prefer template literals over `+` for readability, especially when combining multiple values.

---

## 8. String Comparison

Strings in JavaScript are compared **lexicographically** (dictionary order) using Unicode values:

```js
console.log("apple" === "apple"); // true
console.log("apple" === "Apple"); // false (case-sensitive)
console.log("b" > "a");          // true
console.log("Banana" < "apple"); // true (uppercase < lowercase in Unicode)

// Case-insensitive comparison:
let s1 = "Hello";
let s2 = "hello";
console.log(s1.toLowerCase() === s2.toLowerCase()); // true
```

---

## 9. Escape Characters

Use backslash `\` to include special characters in strings:

| Escape | Meaning          |
|--------|------------------|
| `\n`  | New line          |
| `\t`  | Tab               |
| `\'`  | Single quote      |
| `\"`  | Double quote      |
| `\\`  | Backslash         |
| `\r`  | Carriage return   |

```js
console.log("She said, \"Hello!\""); // She said, "Hello!"
console.log('It\'s a sunny day.');    // It's a sunny day.
console.log("Line 1\nLine 2");        // Line 1 (newline) Line 2
console.log("Col1\tCol2");            // Col1    Col2
```

---

## 10. Useful Real-World Patterns

### Reversing a String

```js
function reverseString(str) {
  return str.split("").reverse().join("");
}
console.log(reverseString("hello")); // 'olleh'
```

### Checking for a Palindrome

```js
function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === clean.split("").reverse().join("");
}
console.log(isPalindrome("racecar"));  // true
console.log(isPalindrome("A man a plan a canal Panama")); // true
console.log(isPalindrome("hello"));    // false
```

### Capitalizing the First Letter

```js
function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
console.log(capitalize("jAVASCRIPT")); // 'Javascript'
```

### Counting Occurrences

```js
function countOccurrences(str, char) {
  return str.split(char).length - 1;
}
console.log(countOccurrences("banana", "a")); // 3
```

---

## 11. Common Pitfalls & Tips

### ⚠️ `+` with Numbers and Strings

```js
console.log("5" + 3);   // '53' (string concatenation, not addition!)
console.log("5" - 3);   // 2   (numeric subtraction — coercion works here)
console.log(5 + "3");   // '53'
```

Always convert strings to numbers explicitly when doing math:
```js
console.log(Number("5") + 3); // 8
```

### ⚠️ `==` vs `===`

```js
console.log("5" == 5);  // true  (type coercion)
console.log("5" === 5); // false (strict equality — no coercion)
```

Always use `===` to avoid unexpected behavior.

### ⚠️ `indexOf` returns `-1`, not `false`

```js
let str = "hello";
if (str.indexOf("h") !== -1) {
  console.log("Found!");
}
// Better: use .includes()
if (str.includes("h")) {
  console.log("Found!");
}
```

### ⚠️ Null and undefined in template literals

```js
let val = null;
console.log(`Value is: ${val}`); // 'Value is: null'
// Always guard against null/undefined for meaningful output
```

---

## Summary

| Concept | Key Methods / Syntax |
|---|---|
| Creation | `''`, `""`, ` `` ` |
| Length | `.length` |
| Access | `[index]`, `.charAt()` |
| Case | `.toUpperCase()`, `.toLowerCase()` |
| Trim | `.trim()`, `.trimStart()`, `.trimEnd()` |
| Search | `.includes()`, `.indexOf()`, `.startsWith()`, `.endsWith()` |
| Extract | `.slice()`, `.substring()` |
| Replace | `.replace()`, `.replaceAll()` |
| Split/Join | `.split()`, `.join()` |
| Pad | `.padStart()`, `.padEnd()` |
| Repeat | `.repeat()` |
| Convert | `String()`, `Number()`, `.toString()` |

Strings are immutable in JavaScript — every method returns a **new string**. With template literals, the rich method library, and an understanding of type coercion pitfalls, you have everything needed to handle text with confidence.
