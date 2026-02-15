# khmer-time-format (Node.js)

Format `1:22 PM` / `13:22` into Khmer.

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
