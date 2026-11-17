// ============================================================
// JavaScript Regular Expressions (Regex) - Complete Examples
// Run in Node.js or paste into a browser console
// ============================================================


// ─────────────────────────────────────────────
// EXAMPLE 1: Creating Regex — Literal vs Constructor
// ─────────────────────────────────────────────
console.log('=== Example 1: Creating Regex ===');

const literalPattern = /hello/i;           // literal syntax (preferred)
const constructorPattern = new RegExp('hello', 'i'); // constructor (useful for dynamic patterns)

console.log(literalPattern.test('Hello World'));      // true
console.log(constructorPattern.test('Hello World'));  // true

// Dynamic pattern from a variable
const keyword = 'javascript';
const dynamicRegex = new RegExp(keyword, 'gi');
console.log('I love JavaScript and javascript!'.match(dynamicRegex));
// ['JavaScript', 'javascript']


// ─────────────────────────────────────────────
// EXAMPLE 2: Flags in Action
// ─────────────────────────────────────────────
console.log('\n=== Example 2: Flags ===');

const sentence = 'The cat sat on the mat';

// No flags: finds only the first match
console.log(sentence.match(/at/));    // ['at'] at index 5

// g flag: finds ALL matches
console.log(sentence.match(/at/g));   // ['at', 'at', 'at']

// i flag: case-insensitive
console.log(/the/i.test('THE'));      // true

// m flag: multiline — ^ and $ match start/end of each line
const multiLine = 'first line\nsecond line\nthird line';
const lineStarts = multiLine.match(/^\w+/gm);
console.log(lineStarts); // ['first', 'second', 'third']

// s flag: dotAll — dot matches newline too
const withNewline = 'hello\nworld';
console.log(/hello.world/.test(withNewline));  // false (dot doesn't match \n by default)
console.log(/hello.world/s.test(withNewline)); // true  (s flag enables dotAll)


// ─────────────────────────────────────────────
// EXAMPLE 3: Character Classes & Anchors
// ─────────────────────────────────────────────
console.log('\n=== Example 3: Character Classes & Anchors ===');

const testStr = 'Hello World 42!';

// \d — digits
console.log(testStr.match(/\d+/g));       // ['42']

// \w — word characters
console.log(testStr.match(/\w+/g));       // ['Hello', 'World', '42']

// \s — whitespace
console.log(testStr.split(/\s+/));        // ['Hello', 'World', '42!']

// [aeiou] — custom character class (vowels)
console.log('Hello World'.match(/[aeiou]/gi)); // ['e', 'o', 'o']

// [^...] — negation
console.log('abc123'.replace(/[^\d]/g, '')); // '123' (keep only digits)

// ^ and $ — anchors
console.log(/^Hello/.test('Hello World')); // true (starts with Hello)
console.log(/^Hello/.test('Say Hello'));   // false
console.log(/World$/.test('Hello World')); // true  (ends with World)

// \b — word boundary
console.log('cat concatenate'.match(/\bcat\b/g)); // ['cat'] (not 'cat' inside 'concatenate')


// ─────────────────────────────────────────────
// EXAMPLE 4: Quantifiers — Greedy vs Lazy
// ─────────────────────────────────────────────
console.log('\n=== Example 4: Quantifiers — Greedy vs Lazy ===');

const html = '<b>bold</b> and <i>italic</i>';

// Greedy: .+ matches as much as possible
console.log(html.match(/<.+>/)[0]);    // '<b>bold</b> and <i>italic</i>'

// Lazy: .+? matches as little as possible
console.log(html.match(/<.+?>/)[0]);   // '<b>'

// All lazy matches
console.log(html.match(/<.+?>/g));     // ['<b>', '</b>', '<i>', '</i>']

// {n}, {n,m} quantifiers
console.log(/^\d{4}$/.test('2026'));   // true  (exactly 4 digits)
console.log(/^\d{4}$/.test('202'));    // false
console.log(/^\d{2,4}$/.test('20'));   // true  (2–4 digits)
console.log(/^\d{2,4}$/.test('20262'));// false


// ─────────────────────────────────────────────
// EXAMPLE 5: Capturing Groups & References
// ─────────────────────────────────────────────
console.log('\n=== Example 5: Capturing Groups ===');

// Positional capture groups
const dateStr = '2026-11-17';
const dateMatch = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(dateMatch[0]); // '2026-11-17' (full match)
console.log(dateMatch[1]); // '2026'       (group 1)
console.log(dateMatch[2]); // '11'         (group 2)
console.log(dateMatch[3]); // '17'         (group 3)

// Named capturing groups — much more readable!
const namedMatch = dateStr.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
const { year, month, day } = namedMatch.groups;
console.log(`Year: ${year}, Month: ${month}, Day: ${day}`);
// Year: 2026, Month: 11, Day: 17

// Back-reference in replace: swap first & last name
const name = 'John Smith';
const swapped = name.replace(/(\w+) (\w+)/, '$2, $1');
console.log(swapped); // 'Smith, John'

// Named group in replace
const reformatted = dateStr.replace(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
  '$<month>/$<day>/$<year>'
);
console.log(reformatted); // '11/17/2026'

// Non-capturing group (?:...) — group without capturing
const colorMatch = 'color colour'.match(/colou?r/g);
console.log(colorMatch); // ['color', 'colour']


// ─────────────────────────────────────────────
// EXAMPLE 6: Email & URL Validation
// ─────────────────────────────────────────────
console.log('\n=== Example 6: Validation ===');

// Email validation
function isValidEmail(email) {
  // Must have local@domain.tld structure
  return /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

console.log(isValidEmail('user@example.com'));      // true
console.log(isValidEmail('user.name+tag@co.uk'));   // true
console.log(isValidEmail('bad-email'));             // false
console.log(isValidEmail('@nodomain.com'));         // false
console.log(isValidEmail('no@tld'));               // false

// URL extraction from text
const article = 'Check https://google.com and http://mozilla.org for more!';
const urls = article.match(/https?:\/\/[\w./%-]+/g);
console.log(urls); // ['https://google.com', 'http://mozilla.org']

// IPv4 validation (simple)
function isValidIPv4(ip) {
  return /^(25[0-5]|2[0-4]\d|[01]?\d\d?)(\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/.test(ip);
}
console.log(isValidIPv4('192.168.1.1'));   // true
console.log(isValidIPv4('999.0.0.1'));     // false
console.log(isValidIPv4('192.168.1'));     // false


// ─────────────────────────────────────────────
// EXAMPLE 7: Phone Number Formatting
// ─────────────────────────────────────────────
console.log('\n=== Example 7: Phone Formatting ===');

function formatPhone(raw) {
  // Strip all non-digit characters first
  const digits = raw.replace(/\D/g, '');
  // Then apply (XXX) XXX-XXXX format
  return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

console.log(formatPhone('8005551234'));       // '(800) 555-1234'
console.log(formatPhone('800.555.1234'));     // '(800) 555-1234'
console.log(formatPhone('+1 (800) 555-1234')); // '(800) 555-1234'

// Validate E.164 international phone format
function isValidE164(phone) {
  return /^\+[1-9]\d{6,14}$/.test(phone);
}
console.log(isValidE164('+14155552671')); // true
console.log(isValidE164('14155552671')); // false (missing +)


// ─────────────────────────────────────────────
// EXAMPLE 8: Password Strength Checker
// ─────────────────────────────────────────────
console.log('\n=== Example 8: Password Strength ===');

function checkPasswordStrength(pwd) {
  const checks = {
    length:    pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    digit:     /\d/.test(pwd),
    special:   /[!@#$%^&*()_+\-={}\[\]:;"'<>?,./]/.test(pwd)
  };

  const passed = Object.values(checks).filter(Boolean).length;
  const strength = passed <= 2 ? 'Weak' : passed <= 4 ? 'Medium' : 'Strong';

  return { checks, strength };
}

console.log(checkPasswordStrength('password'));
// { checks: { length: true, uppercase: false, ... }, strength: 'Weak' }

console.log(checkPasswordStrength('P@ssw0rd'));
// { checks: { all true }, strength: 'Strong' }

console.log(checkPasswordStrength('Password1'));
// Missing special char → strength: 'Medium'


// ─────────────────────────────────────────────
// EXAMPLE 9: Lookahead & Lookbehind
// ─────────────────────────────────────────────
console.log('\n=== Example 9: Lookahead & Lookbehind ===');

// Positive lookahead (?=...) — match X only if followed by Y
const prices = '100 USD 200 EUR 350 USD 50 GBP';
const usdAmounts = prices.match(/\d+(?= USD)/g);
console.log(usdAmounts); // ['100', '350']

// Negative lookahead (?!...) — match X only if NOT followed by Y
const notUsd = prices.match(/\d+(?! USD| EUR| GBP)/g);
console.log(notUsd); // digits not followed by currency (might vary)

// Positive lookbehind (?<=...) — match X only if preceded by Y
const labeled = '$120 €85 £200';
const dollarAmounts = labeled.match(/(?<=\$)\d+/g);
console.log(dollarAmounts); // ['120']

// Negative lookbehind (?<!...) — match X only if NOT preceded by Y
const nonDollar = labeled.match(/(?<!\$)\d+/g);
console.log(nonDollar); // ['85', '200']

// Practical: add commas to a number (using lookahead)
function addCommas(num) {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
console.log(addCommas(1234567));   // '1,234,567'
console.log(addCommas(9876543210)); // '9,876,543,210'


// ─────────────────────────────────────────────
// EXAMPLE 10: matchAll — Iterator over All Matches
// ─────────────────────────────────────────────
console.log('\n=== Example 10: matchAll ===');

const logData = `
[ERROR] 2026-11-17 Something went wrong
[INFO]  2026-11-16 Server started
[WARN]  2026-11-15 Memory usage high
`;

// Extract level + date from each log line
const logPattern = /\[(\w+)\]\s+(\d{4}-\d{2}-\d{2})/g;
const logMatches = [...logData.matchAll(logPattern)];

logMatches.forEach(match => {
  console.log(`Level: ${match[1]}, Date: ${match[2]}`);
});
// Level: ERROR, Date: 2026-11-17
// Level: INFO,  Date: 2026-11-16
// Level: WARN,  Date: 2026-11-15


// ─────────────────────────────────────────────
// EXAMPLE 11: exec() with Stateful lastIndex
// ─────────────────────────────────────────────
console.log('\n=== Example 11: exec() & lastIndex ===');

const code = 'alpha 10 beta 20 gamma 30';
const numPattern = /\d+/g;
let execMatch;

// exec() advances lastIndex on each call when using g flag
while ((execMatch = numPattern.exec(code)) !== null) {
  console.log(`Found: ${execMatch[0]} at index ${execMatch.index}`);
}
// Found: 10 at index 6
// Found: 20 at index 16
// Found: 30 at index 23

// ⚠️ Pitfall: stateful regex reuse between .test() calls
const stateRe = /\d/g;
console.log(stateRe.test('a1b')); // true  (lastIndex → 2)
console.log(stateRe.test('a1b')); // false (starts from index 2!)
// Fix:
stateRe.lastIndex = 0;
console.log(stateRe.test('a1b')); // true again


// ─────────────────────────────────────────────
// EXAMPLE 12: Text Transformation Utilities
// ─────────────────────────────────────────────
console.log('\n=== Example 12: Text Transformation ===');

// 1. Slugify: convert a title to a URL-safe slug
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')     // remove non-word chars (except spaces and dashes)
    .replace(/[\s_]+/g, '-')      // replace spaces/underscores with dash
    .replace(/^-+|-+$/g, '');     // trim leading/trailing dashes
}
console.log(slugify('Hello, World! This is a Test.')); 
// 'hello-world-this-is-a-test'
console.log(slugify('  --Regex 101: A Complete Guide--  '));
// 'regex-101-a-complete-guide'

// 2. Title Case
function toTitleCase(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
console.log(toTitleCase('the quick brown fox')); // 'The Quick Brown Fox'

// 3. Camel case to kebab case
function camelToKebab(str) {
  return str
    .replace(/([A-Z])/g, '-$1')  // insert dash before each uppercase letter
    .toLowerCase();
}
console.log(camelToKebab('myVariableName'));   // 'my-variable-name'
console.log(camelToKebab('getUserProfile'));   // 'get-user-profile'

// 4. Strip HTML tags
function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '');
}
console.log(stripHtml('<p>Hello <b>World</b></p>')); // 'Hello World'

// 5. Mask credit card number (show last 4 digits only)
function maskCard(number) {
  return number.replace(/\d(?=\d{4})/g, '*');
}
console.log(maskCard('1234567812345678')); // '************5678'


// ─────────────────────────────────────────────
// EXAMPLE 13: Simple Tokenizer / Lexer
// ─────────────────────────────────────────────
console.log('\n=== Example 13: Tokenizer ===');

function tokenize(expression) {
  // Matches: numbers, operators, parentheses, identifiers
  const TOKEN_RE = /\s*(\d+\.?\d*|[+\-*/()]|[a-zA-Z_]\w*)\s*/g;
  const tokens = [];
  let m;
  while ((m = TOKEN_RE.exec(expression)) !== null) {
    tokens.push(m[1]);
  }
  return tokens;
}

console.log(tokenize('3 + 4 * (x - 2)'));
// ['3', '+', '4', '*', '(', 'x', '-', '2', ')']

console.log(tokenize('velocity = 100.5 * time'));
// ['velocity', '=', '100.5', '*', 'time']


// ─────────────────────────────────────────────
// EXAMPLE 14: split() with Regex
// ─────────────────────────────────────────────
console.log('\n=== Example 14: split() with Regex ===');

// Split on any amount of whitespace
console.log('one   two\tthree\nfour'.split(/\s+/));
// ['one', 'two', 'three', 'four']

// Split on comma with optional surrounding whitespace
console.log('red , green,  blue , yellow'.split(/\s*,\s*/));
// ['red', 'green', 'blue', 'yellow']

// Split but KEEP the delimiter using a capturing group
const parts = 'one1two2three'.split(/(\d)/);
console.log(parts); // ['one', '1', 'two', '2', 'three']

// Split a sentence into sentences
const text = 'Hello! How are you? I am fine. Great.';
console.log(text.split(/(?<=[.!?])\s+/));
// ['Hello!', 'How are you?', 'I am fine.', 'Great.']


// ─────────────────────────────────────────────
// EXAMPLE 15: Real-World — Template Engine
// ─────────────────────────────────────────────
console.log('\n=== Example 15: Mini Template Engine ===');

function renderTemplate(template, data) {
  // Replace {{variableName}} with the matching value from data
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    return key in data ? data[key] : match; // leave unreplaced if key missing
  });
}

const tmpl = 'Hello, {{ name }}! You have {{ count }} new messages from {{ sender }}.';
const result = renderTemplate(tmpl, {
  name: 'Alice',
  count: 5,
  sender: 'Bob'
});
console.log(result);
// 'Hello, Alice! You have 5 new messages from Bob.'

// Key missing → stays as is
const partial = renderTemplate('Hi {{ name }}, your score is {{ score }}.', { name: 'Eve' });
console.log(partial);
// 'Hi Eve, your score is {{ score }}.'


// ─────────────────────────────────────────────
// SUMMARY TABLE (as console output)
// ─────────────────────────────────────────────
console.log('\n=== Regex Quick Reference ===');
console.log([
  '.        → any char except newline',
  '\\d       → digit [0-9]',
  '\\w       → word char [a-zA-Z0-9_]',
  '\\s       → whitespace',
  '^        → start of string',
  '$        → end of string',
  '\\b       → word boundary',
  '*        → 0 or more (greedy)',
  '+        → 1 or more (greedy)',
  '?        → 0 or 1 (optional)',
  '*?  +?   → lazy quantifiers',
  '{n,m}    → between n and m times',
  '(x)      → capturing group',
  '(?:x)    → non-capturing group',
  '(?<n>x)  → named capturing group',
  '(?=x)    → positive lookahead',
  '(?!x)    → negative lookahead',
  '(?<=x)   → positive lookbehind',
  '(?<!x)   → negative lookbehind',
  'g i m s u → flags: global, ignoreCase, multiline, dotAll, unicode',
].join('\n'));
