const assert = require("assert");
const { formatTime } = require("../index");

const digitsFromString = formatTime("1:22 PM", { mode: "digits" });
const wordsFromString = formatTime("1:22 PM", { mode: "words" });

assert.strictEqual(formatTime("13:22", { mode: "digits" }), digitsFromString);
assert.strictEqual(formatTime("13:22", { mode: "words" }), wordsFromString);

const sampleDate = new Date(2024, 0, 1, 13, 22, 0, 0);
assert.strictEqual(formatTime(sampleDate, { mode: "digits" }), digitsFromString);
assert.strictEqual(formatTime(sampleDate, { mode: "words" }), wordsFromString);

const NativeDate = Date;
const fixedNow = new NativeDate(2024, 0, 1, 13, 22, 0, 0);
global.Date = class extends NativeDate {
  constructor(...args) {
    if (args.length === 0) return new NativeDate(fixedNow);
    return new NativeDate(...args);
  }

  static now() {
    return fixedNow.getTime();
  }

  static parse(value) {
    return NativeDate.parse(value);
  }

  static UTC(...args) {
    return NativeDate.UTC(...args);
  }
};

try {
  assert.strictEqual(formatTime({ mode: "digits" }), digitsFromString);
  assert.strictEqual(formatTime(), digitsFromString);
} finally {
  global.Date = NativeDate;
}

console.log("ok");
