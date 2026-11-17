# Regular Expressions (Regex) in JavaScript

## Introduction

Regular expressions (regex or regexp) are powerful patterns used to match, search, replace, and validate strings. In JavaScript, regex is a first-class feature built into the language through the `RegExp` object and string methods that accept regex patterns.

Whether you're validating an email address, parsing a log file, or transforming text, regex gives you a concise and expressive way to describe string patterns.

---

## 1. Creating a Regular Expression

There are two ways to create a regex in JavaScript:

### Literal Syntax (preferred)
```js
const pattern = /hello/;
```

### Constructor Syntax (useful for dynamic patterns)
```js
const pattern = new RegExp('hello');
const dynamicPattern = new RegExp(userInput, 'i'); // built at runtime
```

> **When to use the constructor:** When the pattern is built dynamically from variables or user input.

---

## 2. Regex Flags

Flags modify how the pattern matches:

| Flag | Meaning |
|------|---------|
| `g`  | **Global** – find all matches, not just the first |
| `i`  | **Case-insensitive** – ignore uppercase/lowercase |
| `m`  | **Multiline** – `^` and `$` match start/end of each line |
| `s`  | **Dotall** – `.` matches newline characters too |
| `u`  | **Unicode** – enables full Unicode matching |
| `d`  | **Indices** – includes match start/end indices |

```js
const pattern = /hello/gi; // global + case-insensitive
```

---

## 3. Special Characters & Metacharacters

### Character Classes
| Pattern | Matches |
|---------|---------|
| `.`     | Any character except newline |
| `\d`    | Any digit `[0-9]` |
| `\D`    | Any non-digit |
| `\w`    | Word character `[a-zA-Z0-9_]` |
| `\W`    | Non-word character |
| `\s`    | Whitespace (space, tab, newline) |
| `\S`    | Non-whitespace |
| `[abc]` | Any of `a`, `b`, or `c` |
| `[^abc]`| NOT `a`, `b`, or `c` |
| `[a-z]` | Any lowercase letter |

### Anchors
| Pattern | Matches |
|---------|---------|
| `^`     | Start of string (or line in multiline mode) |
| `$`     | End of string (or line in multiline mode) |
| `\b`    | Word boundary |
| `\B`    | Non-word boundary |

### Quantifiers
| Pattern | Meaning |
|---------|---------|
| `*`     | 0 or more |
| `+`     | 1 or more |
| `?`     | 0 or 1 (optional) |
| `{n}`   | Exactly n times |
| `{n,}`  | At least n times |
| `{n,m}` | Between n and m times |
| `*?`, `+?` | Lazy (match as few as possible) |

### Groups & Alternation
| Pattern     | Meaning |
|-------------|---------|
| `(abc)`     | Capturing group |
| `(?:abc)`   | Non-capturing group |
| `(?<name>abc)` | Named capturing group |
| `a\|b`      | Alternation: match `a` or `b` |
| `(?=abc)`   | Lookahead: must be followed by `abc` |
| `(?!abc)`   | Negative lookahead |
| `(?<=abc)`  | Lookbehind: must be preceded by `abc` |
| `(?<!abc)`  | Negative lookbehind |

---

## 4. Core Methods

### `RegExp.prototype.test(string)`
Returns `true`/`false` — does the pattern match anywhere in the string?

```js
/^\d{3}-\d{4}$/.test('555-1234'); // true
/^\d{3}-\d{4}$/.test('abc-1234'); // false
```

### `String.prototype.match(regex)`
Returns an array of matches (or `null`). Without `g` flag, includes capture groups.

```js
'Hello World'.match(/\w+/g); // ['Hello', 'World']
'2026-11-17'.match(/(\d{4})-(\d{2})-(\d{2})/); // ['2026-11-17', '2026', '11', '17']
```

### `String.prototype.matchAll(regex)`
Returns an iterator of ALL matches including capture groups (requires `g` flag).

```js
const str = 'cat bat sat';
const matches = [...str.matchAll(/(.)at/g)];
// Each match includes full match + groups + index
```

### `String.prototype.replace(regex, replacement)`
Replaces matches. Use `$1`, `$2` etc. to reference capture groups in the replacement string.

```js
'John Smith'.replace(/(\w+) (\w+)/, '$2, $1'); // 'Smith, John'
'hello world'.replace(/\b\w/g, c => c.toUpperCase()); // 'Hello World'
```

### `String.prototype.replaceAll(regex, replacement)`
Like `replace` but requires the `g` flag when using regex.

### `String.prototype.search(regex)`
Returns the index of the first match, or `-1`.

```js
'hello world'.search(/world/); // 6
```

### `String.prototype.split(regex)`
Splits a string using a regex as the delimiter.

```js
'one, two,three ,four'.split(/\s*,\s*/); // ['one', 'two', 'three', 'four']
```

### `RegExp.prototype.exec(string)`
Executes a search, returning the match array (with index) or `null`. When used with `g` or `y` flags, it maintains state via `lastIndex`.

```js
const re = /\d+/g;
const str = 'abc 123 def 456';
let match;
while ((match = re.exec(str)) !== null) {
  console.log(`Found ${match[0]} at index ${match.index}`);
}
```

---

## 5. Practical Examples

### Example 1 — Email Validation
```js
function isValidEmail(email) {
  return /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}
isValidEmail('user@example.com'); // true
isValidEmail('bad@');             // false
```

### Example 2 — Phone Number Formatting
```js
function formatPhone(raw) {
  const digits = raw.replace(/\D/g, '');
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}
formatPhone('8005551234'); // '(800) 555-1234'
```

### Example 3 — Extract All URLs
```js
const text = 'Visit https://example.com or http://test.org for info.';
const urls = text.match(/https?:\/\/[\w./%-]+/g);
// ['https://example.com', 'http://test.org']
```

### Example 4 — Password Strength
```js
function checkPassword(pwd) {
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasDigit = /\d/.test(pwd);
  const hasSpecial = /[!@#$%^&*]/.test(pwd);
  const isLong = pwd.length >= 8;
  return hasUpper && hasLower && hasDigit && hasSpecial && isLong;
}
checkPassword('P@ssw0rd'); // true
checkPassword('password'); // false
```

### Example 5 — Named Capture Groups
```js
const dateStr = '2026-11-17';
const { year, month, day } = dateStr.match(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
).groups;
console.log(year, month, day); // '2026' '11' '17'
```

### Example 6 — Lookahead / Lookbehind
```js
// Price: match digits only if followed by ' USD'
'100 USD 200 EUR'.match(/\d+(?= USD)/g); // ['100']

// Match digits only if preceded by '$'
'$50 and 30 items'.match(/(?<=\$)\d+/g); // ['50']
```

### Example 7 — Tokenizer / Lexer
```js
const code = 'let x = 42;';
const TOKEN = /([a-z]+)|(\d+)|(=|;)/g;
let m;
while ((m = TOKEN.exec(code)) !== null) {
  if (m[1]) console.log('KEYWORD/ID:', m[1]);
  else if (m[2]) console.log('NUMBER:', m[2]);
  else if (m[3]) console.log('SYMBOL:', m[3]);
}
```

### Example 8 — Slug Generation
```js
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/[\s_]+/g, '-')    // spaces/underscores → dash
    .replace(/^-+|-+$/g, '');   // trim leading/trailing dashes
}
sluggify('Hello, World! This is a Test.'); // 'hello-world-this-is-a-test'
```

---

## 6. Common Pitfalls & Tips

### ⚠️ Forgetting the `g` flag with `exec()` causes an infinite loop
If you use `exec()` in a `while` loop, **always** include the `g` or `y` flag, or `lastIndex` never advances.

### ⚠️ Stateful regex with `g` flag
RegExp objects with the `g` flag track `lastIndex`. Reusing the same regex object across calls can produce unexpected results.
```js
const re = /\d/g;
re.test('a1b'); // true  (lastIndex → 2)
re.test('a1b'); // false (starts from index 2 — misses!)
// Fix: reset re.lastIndex = 0; or use a fresh literal each time
```

### ⚠️ Escaping special characters
If you're matching literal dots, brackets, etc., escape them:
```js
/example\.com/   // matches 'example.com' literally, not 'exampleXcom'
```

### ⚠️ Greedy vs. Lazy quantifiers
```js
'<b>bold</b>'.match(/<.+>/)[0];  // '<b>bold</b>' (greedy)
'<b>bold</b>'.match(/<.+?>/)[0]; // '<b>' (lazy)
```

### ✅ Use `String.matchAll` over manual `exec` loops
`matchAll` is cleaner, non-mutating, and returns a proper iterator.

### ✅ Name your capture groups
Using `(?<name>...)` makes your regex far more readable and future-proof than positional `$1`, `$2`.

### ✅ Test your regex
Use tools like [regex101.com](https://regex101.com) for real-time debugging with explanations.

---

## 7. Summary

| Feature | Takeaway |
|---------|----------|
| Literals vs Constructor | Use literals normally; constructor for dynamic patterns |
| Flags | `g`, `i`, `m`, `s` cover most use cases |
| Character classes | `\d`, `\w`, `\s` and their negations are your workhorses |
| Anchors | `^`, `$`, `\b` pin your pattern to the right position |
| Quantifiers | Greedy by default; add `?` to make lazy |
| Groups | Capture with `()`, name with `(?<name>)`, non-capture with `(?:)` |
| Lookarounds | Assert context without consuming characters |
| Methods | `test`, `match`, `matchAll`, `replace`, `split`, `exec` |
| Pitfalls | Stateful `g` flag, greedy matching, unescaped special chars |

Regex is a skill that grows with practice. Start simple, test often, and reach for named groups and lookarounds as your patterns get complex.
