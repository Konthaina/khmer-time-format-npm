# khmer-time-format (Node.js)

Format `1:22 PM` / `13:22` into Khmer.
Supports time strings, `Date` objects, or the current system time.

- digits: `ម៉ោង១ និង ២២ នាទី រសៀល`
- words: `ម៉ោងមួយ និង ម្ភៃពីរ នាទី រសៀល`

## Install

```bash
npm install khmer-time-format
```

## Usage

```js
const { formatTime } = require("khmer-time-format");

console.log(formatTime("1:22 PM", { mode: "digits" }));
console.log(formatTime("13:22", { mode: "words" }));
console.log(formatTime(new Date(), { mode: "digits" })); // Date input
console.log(formatTime()); // current system time (default mode: "digits")
console.log(formatTime({ mode: "words" })); // current system time in words
```

## Test

```bash
npm test
```

## Publish to npm

```bash
npm login
npm version patch   # or minor/major
git push --follow-tags
npm publish
```
