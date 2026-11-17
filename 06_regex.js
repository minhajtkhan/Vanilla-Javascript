// ============================================================
// JavaScript Regular Expressions (Regex) — Simple Examples
// ============================================================
// Run: node 06_regex.js
// ============================================================


// ─────────────────────────────────────────────
// EXAMPLE 1: Creating a Regex Pattern
// ─────────────────────────────────────────────
console.log("=== EXAMPLE 1: Creating a Pattern ===");

// Two ways to write a regex:
const pattern1 = /hello/;           // Using slashes (most common)
const pattern2 = new RegExp("hello"); // Using constructor

console.log(pattern1.test("say hello")); // true
console.log(pattern2.test("say hello")); // true
console.log(pattern1.test("say world")); // false


// ─────────────────────────────────────────────
// EXAMPLE 2: Flags — i (ignore case), g (global)
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 2: Flags ===");

// Without flag — case sensitive
console.log(/hello/.test("Hello")); // false

// 'i' flag — case insensitive
console.log(/hello/i.test("Hello")); // true
console.log(/hello/i.test("HELLO")); // true

// 'g' flag — find ALL matches
const sentence = "cat bat rat";
console.log(sentence.match(/at/g)); // ['at', 'at', 'at']

// Without 'g' — only finds FIRST match
console.log(sentence.match(/at/));  // ['at', index: 1 ...]


// ─────────────────────────────────────────────
// EXAMPLE 3: Special Characters \d \w \s
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 3: Special Characters ===");

// \d = any digit (0-9)
console.log(/\d/.test("Room 5")); // true  — has a digit
console.log(/\d/.test("Hello"));  // false — no digit

// \w = any word character (a-z, A-Z, 0-9, _)
console.log(/\w/.test("hello")); // true
console.log(/\w/.test("!!!"));   // false

// \s = any whitespace (space, tab)
console.log(/\s/.test("hi there")); // true  — has a space
console.log(/\s/.test("hello"));    // false — no space

// . = any character (except newline)
console.log(/h.t/.test("hat")); // true
console.log(/h.t/.test("hot")); // true
console.log(/h.t/.test("hit")); // true


// ─────────────────────────────────────────────
// EXAMPLE 4: Quantifiers — How Many Times?
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 4: Quantifiers ===");

// ?  — 0 or 1 time (makes it optional)
console.log(/colou?r/.test("color"));  // true  (u is optional)
console.log(/colou?r/.test("colour")); // true

// +  — 1 or more
console.log(/\d+/.test("123")); // true  — one or more digits
console.log(/\d+/.test("abc")); // false — no digits at all

// *  — 0 or more
console.log(/\d*/.test("abc")); // true — even zero digits matches

// {n} — exactly n times
console.log(/\d{3}/.test("123")); // true  — exactly 3 digits
console.log(/\d{3}/.test("12"));  // false — only 2 digits

// {n,m} — between n and m times
console.log(/\d{2,4}/.test("12"));   // true — 2 digits (min is 2)
console.log(/\d{2,4}/.test("1234")); // true — 4 digits (max is 4)
console.log(/\d{2,4}/.test("1"));    // false — only 1 digit


// ─────────────────────────────────────────────
// EXAMPLE 5: Character Classes [ ]
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 5: Character Classes ===");

// [abc] — matches a, b, or c
console.log(/[aeiou]/.test("hello")); // true  — 'e' is a vowel
console.log(/[aeiou]/.test("gym"));   // false — no vowels

// [a-z] — any lowercase letter
console.log(/[a-z]/.test("Hello")); // true  — 'e' 'l' 'l' 'o' are lowercase

// [0-9] — any digit (same as \d)
console.log(/[0-9]/.test("Room5")); // true

// [^abc] — anything EXCEPT a, b, or c
console.log(/[^aeiou]/.test("sky")); // true  — 's','k','y' are not vowels
console.log(/[^aeiou]/.test("aei")); // false — all are vowels


// ─────────────────────────────────────────────
// EXAMPLE 6: ^ and $ — Start and End
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 6: Start ^ and End $ ===");

// ^ = must start with
console.log(/^Hello/.test("Hello World")); // true
console.log(/^Hello/.test("Say Hello"));   // false — doesn't START with Hello

// $ = must end with
console.log(/World$/.test("Hello World")); // true
console.log(/World$/.test("World Hello")); // false — doesn't END with World

// ^ and $ together = exact match
console.log(/^hello$/.test("hello"));       // true  — exactly "hello"
console.log(/^hello$/.test("hello world")); // false — has extra text


// ─────────────────────────────────────────────
// EXAMPLE 7: Alternation | (OR)
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 7: Alternation (OR) ===");

// cat|dog — matches "cat" OR "dog"
console.log(/cat|dog/.test("I have a cat")); // true
console.log(/cat|dog/.test("I have a dog")); // true
console.log(/cat|dog/.test("I have a fish")); // false

// yes|no|maybe
const answer = "maybe";
console.log(/^(yes|no|maybe)$/.test(answer)); // true


// ─────────────────────────────────────────────
// EXAMPLE 8: test() — Returns true or false
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 8: test() Method ===");

const hasDigit = /\d/;

console.log(hasDigit.test("hello123")); // true
console.log(hasDigit.test("hello"));    // false

// Practical: check if a string is all digits
const isAllDigits = /^\d+$/;
console.log(isAllDigits.test("12345")); // true
console.log(isAllDigits.test("123abc")); // false


// ─────────────────────────────────────────────
// EXAMPLE 9: match() — Get the Matches
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 9: match() Method ===");

const text = "Order: 3 apples, 10 bananas, 2 oranges";

// Without 'g' — returns first match only
const firstNumber = text.match(/\d+/);
console.log(firstNumber[0]); // '3'

// With 'g' — returns ALL matches
const allNumbers = text.match(/\d+/g);
console.log(allNumbers); // ['3', '10', '2']

// No match returns null
const noMatch = "hello".match(/\d+/g);
console.log(noMatch); // null


// ─────────────────────────────────────────────
// EXAMPLE 10: replace() — Replace Text
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 10: replace() Method ===");

// Replace first match
const str1 = "I love cats";
console.log(str1.replace(/cats/, "dogs")); // "I love dogs"

// Replace ALL matches with 'g' flag
const str2 = "cat and cat and cat";
console.log(str2.replace(/cat/g, "dog")); // "dog and dog and dog"

// Remove extra spaces
const messy = "Hello    World   how   are  you";
const clean = messy.replace(/\s+/g, " "); // replace multiple spaces with one
console.log(clean); // "Hello World how are you"


// ─────────────────────────────────────────────
// EXAMPLE 11: split() — Split by Pattern
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 11: split() Method ===");

// Split on comma, with optional spaces around it
const csv = "apple, banana,  cherry,date";
const fruits = csv.split(/,\s*/);
console.log(fruits); // ['apple', 'banana', 'cherry', 'date']

// Split on one or more spaces
const words = "Hello   World  JS".split(/\s+/);
console.log(words); // ['Hello', 'World', 'JS']


// ─────────────────────────────────────────────
// EXAMPLE 12: Simple Real-World Uses
// ─────────────────────────────────────────────
console.log("\n=== EXAMPLE 12: Real-World Uses ===");

// 1. Basic email check
const emailPattern = /^\S+@\S+\.\S+$/;
console.log("--- Email Check ---");
console.log(emailPattern.test("user@example.com")); // true
console.log(emailPattern.test("notanemail"));        // false
console.log(emailPattern.test("bad@"));              // false

// 2. Simple phone number check (11 digits starting with 0)
const phonePattern = /^0\d{10}$/;
console.log("\n--- Phone Check ---");
console.log(phonePattern.test("03001234567")); // true
console.log(phonePattern.test("3001234567"));  // false (no leading 0)
console.log(phonePattern.test("030012345"));   // false (too short)

// 3. Check if password has at least 6 characters
const passwordPattern = /^.{6,}$/;
console.log("\n--- Password Length Check ---");
console.log(passwordPattern.test("abc123")); // true  — 6 chars
console.log(passwordPattern.test("abc"));    // false — only 3 chars

// 4. Extract all numbers from a string
const data = "I have 3 cats, 12 books, and 1 dog";
const nums = data.match(/\d+/g);
console.log("\n--- Extract Numbers ---");
console.log(nums); // ['3', '12', '1']

// 5. Escape a literal dot (. means "any char", \. means actual dot)
console.log("\n--- Literal Dot ---");
console.log(/3\.14/.test("3.14")); // true  — real dot
console.log(/3\.14/.test("3X14")); // false — X is not a dot


// ─────────────────────────────────────────────
// SUMMARY
// ─────────────────────────────────────────────
console.log("\n=== REGEX QUICK REFERENCE ===");
console.log(`
Pattern  | Meaning
---------|----------------------------------
/abc/    | Matches the text "abc"
/abc/i   | Case-insensitive match
/abc/g   | Find ALL matches
.        | Any character (not newline)
\\d       | Any digit (0-9)
\\w       | Any word character (a-z, 0-9, _)
\\s       | Any whitespace
[abc]    | a, b, or c
[^abc]   | Anything EXCEPT a, b, or c
[a-z]    | Any lowercase letter
^        | Start of string
$        | End of string
+        | One or more
*        | Zero or more
?        | Optional (0 or 1)
{n}      | Exactly n times
{n,m}    | Between n and m times
a|b      | a OR b
(abc)    | Group
\\.      | Literal dot (escape special chars)
`);
