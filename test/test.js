const assert = require("assert");
const { formatTime } = require("../index");
assert.strictEqual(formatTime("1:22 PM",{mode:"digits"}),"ម៉ោង១ និង ២២ នាទី រសៀល");
assert.strictEqual(formatTime("1:22 PM",{mode:"words"}),"ម៉ោងមួយ និង ម្ភៃពីរ នាទី រសៀល");
assert.strictEqual(formatTime("13:22",{mode:"digits"}),"ម៉ោង១ និង ២២ នាទី រសៀល");
assert.strictEqual(formatTime("13:22",{mode:"words"}),"ម៉ោងមួយ និង ម្ភៃពីរ នាទី រសៀល");
console.log("ok");
