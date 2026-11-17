# JavaScript Regular Expressions (Regex)

## What is Regex?

A **Regular Expression (Regex)** is a pattern used to search, match, or replace text.

Think of it like a **search filter** — instead of searching for an exact word, you search for a **pattern**.

```js
// Search for the word "cat" in a string
const pattern = /cat/;
console.log(pattern.test("I have a cat")); // true
console.log(pattern.test("I have a dog")); // false
```

---

## 1. How to Write a Regex

There are two ways:

```js
// Way 1 — Using slashes (most common)
const pattern1 = /hello/;

// Way 2 — Using RegExp constructor
const pattern2 = new RegExp("hello");
```

> Use `/pattern/` (slashes) most of the time. Use `new RegExp()` only when the pattern comes from a variable.

---

## 2. Flags

Flags change how the pattern matches:

| Flag | Meaning | Example |
|------|---------|---------|
| `i`  | Ignore case (case-insensitive) | `/hello/i` matches "Hello", "HELLO" |
| `g`  | Global — find ALL matches, not just first | `/cat/g` |
| `m`  | Multiline — `^` and `$` match each line | `/^hello/m` |

```js
// Without flag — case sensitive
console.log(/hello/.test("Hello")); // false

// With 'i' flag — case insensitive
console.log(/hello/i.test("Hello")); // true

// With 'g' flag — find all matches
const str = "cat bat sat";
console.log(str.match(/at/g)); // ['at', 'at', 'at']
```

---

## 3. Basic Special Characters

| Symbol | Meaning | Example Pattern | Matches |
|--------|---------|-----------------|---------|
| `.`    | Any single character (except newline) | `/h.t/` | "hat", "hot", "hit" |
| `^`    | Start of string | `/^Hello/` | "Hello World" (starts with Hello) |
| `$`    | End of string | `/World$/` | "Hello World" (ends with World) |
| `\d`   | Any digit (0–9) | `/\d/` | "5", "3" |
| `\w`   | Any word character (a–z, A–Z, 0–9, _) | `/\w/` | "a", "Z", "5", "_" |
| `\s`   | Any whitespace (space, tab) | `/\s/` | " ", "\t" |
| `\D`   | NOT a digit | `/\D/` | "a", "!" |
| `\W`   | NOT a word character | `/\W/` | "!", " ", "@" |

```js
console.log(/\d/.test("Room 5"));   // true  — has a digit
console.log(/\d/.test("Hello"));    // false — no digit
console.log(/\w/.test("hello"));    // true
console.log(/\s/.test("hi there")); // true  — has a space
```

---

## 4. Quantifiers — How Many Times?

| Symbol | Meaning |
|--------|---------|
| `?`    | 0 or 1 time (optional) |
| `*`    | 0 or more times |
| `+`    | 1 or more times |
| `{n}`  | Exactly n times |
| `{n,}` | At least n times |
| `{n,m}`| Between n and m times |

```js
// ? — optional character
console.log(/colou?r/.test("color"));   // true (u is optional)
console.log(/colou?r/.test("colour"));  // true

// + — one or more digits
console.log(/\d+/.test("123")); // true
console.log(/\d+/.test("abc")); // false

// {n} — exact count
console.log(/\d{3}/.test("123"));  // true  — exactly 3 digits
console.log(/\d{3}/.test("12"));   // false — only 2 digits

// {n,m} — range
console.log(/\d{2,4}/.test("12"));   // true  — 2 digits
console.log(/\d{2,4}/.test("1234")); // true  — 4 digits
console.log(/\d{2,4}/.test("1"));    // false — only 1 digit
```

---

## 5. Character Classes `[ ]`

Square brackets let you specify a **set of allowed characters**:

```js
// [abc] — matches 'a', 'b', or 'c'
console.log(/[abc]/.test("apple")); // true  — has 'a'
console.log(/[abc]/.test("dog"));   // false — no a, b, or c

// [a-z] — any lowercase letter
console.log(/[a-z]/.test("Hello")); // true  — has lowercase letters

// [0-9] — same as \d
console.log(/[0-9]/.test("Room5")); // true

// [^abc] — NOT a, b, or c (^ inside [] means NOT)
console.log(/[^abc]/.test("dog")); // true  — 'd' is not a, b, or c
console.log(/[^abc]/.test("cab")); // false — all chars are a, b, or c
```

---

## 6. Groups `( )`

Parentheses group parts of a pattern together:

```js
// (ab)+ — the group "ab" repeated one or more times
console.log(/(ab)+/.test("ab"));     // true
console.log(/(ab)+/.test("ababab")); // true

// Alternation with | (OR)
console.log(/cat|dog/.test("I have a cat")); // true
console.log(/cat|dog/.test("I have a dog")); // true
console.log(/cat|dog/.test("I have a fish")); // false
```

---

## 7. The Main Regex Methods

### `test()` — Returns true or false

```js
const hasNumber = /\d/;
console.log(hasNumber.test("abc123")); // true
console.log(hasNumber.test("abcdef")); // false
```

### `match()` — Returns matched results

```js
const str = "Today is 2026-11-17";

// Without 'g' flag — returns first match + details
console.log(str.match(/\d+/));
// ['2026', index: 9, ...]

// With 'g' flag — returns all matches as array
console.log(str.match(/\d+/g));
// ['2026', '11', '17']
```

### `replace()` — Replace matched text

```js
const greeting = "Hello World";

// Replace first match
console.log(greeting.replace(/World/, "JavaScript"));
// "Hello JavaScript"

// Replace all with 'g' flag
const text = "cat and cat and cat";
console.log(text.replace(/cat/g, "dog"));
// "dog and dog and dog"
```

### `split()` — Split string using pattern

```js
const csv = "apple, banana,  cherry,date";

// Split on comma + optional spaces
const fruits = csv.split(/,\s*/);
console.log(fruits); // ['apple', 'banana', 'cherry', 'date']
```

---

## 8. Simple Real-World Examples

### Check if input is only digits
```js
const isAllDigits = /^\d+$/;
console.log(isAllDigits.test("12345")); // true
console.log(isAllDigits.test("123abc")); // false
```

### Basic Email Check
```js
const emailPattern = /^\S+@\S+\.\S+$/;
console.log(emailPattern.test("user@example.com")); // true
console.log(emailPattern.test("notanemail"));        // false
```

### Check a Phone Number (simple)
```js
// Matches: 03001234567 (11 digits starting with 0)
const phone = /^0\d{10}$/;
console.log(phone.test("03001234567")); // true
console.log(phone.test("3001234567"));  // false
console.log(phone.test("0300123456"));  // false (too short)
```

### Remove extra spaces
```js
const messy = "Hello    World   how   are  you";
const clean = messy.replace(/\s+/g, " ");
console.log(clean); // "Hello World how are you"
```

### Extract all numbers from a string
```js
const data = "I have 3 cats, 2 dogs, and 10 fish";
const numbers = data.match(/\d+/g);
console.log(numbers); // ['3', '2', '10']
```

---

## Common Pitfalls & Tips

### ⚠️ Dot matches almost everything
```js
// . matches ANY character except newline
console.log(/h.t/.test("h@t")); // true — not just letters!
// Use \. to match a literal dot
console.log(/3\.14/.test("3.14")); // true
console.log(/3\.14/.test("3X14")); // false
```

### ⚠️ `^` has two meanings
```js
// At start of pattern: matches start of string
/^hello/ — string must START with hello

// Inside [ ]: means NOT
/[^abc]/ — matches anything EXCEPT a, b, c
```

### ✅ Test your regex
Use [regex101.com](https://regex101.com) to build and test patterns visually — it explains what each part does!

---

## Summary

| Concept | What it does | Example |
|---------|-------------|---------|
| `/pattern/` | Create a regex | `/hello/` |
| `i` flag | Case-insensitive | `/hello/i` |
| `g` flag | Find all matches | `/\d/g` |
| `.` | Any character | `/h.t/` |
| `\d` | Any digit | `/\d+/` |
| `\w` | Any word char | `/\w+/` |
| `\s` | Whitespace | `/\s+/` |
| `[]` | Character set | `/[aeiou]/` |
| `+` | 1 or more | `/\d+/` |
| `*` | 0 or more | `/\d*/` |
| `?` | Optional | `/colou?r/` |
| `{n,m}` | Repeat range | `/\d{2,4}/` |
| `^` / `$` | Start / End | `/^hello$/` |
| `test()` | Returns boolean | `pattern.test(str)` |
| `match()` | Returns matches | `str.match(pattern)` |
| `replace()` | Replace text | `str.replace(pattern, newText)` |

> [!TIP]
> Start simple! Write patterns piece by piece and test each part. Regex is not hard — it just looks scary at first glance.
