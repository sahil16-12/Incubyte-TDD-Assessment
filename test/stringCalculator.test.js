// Import the add function from the stringCalculator module
const { add } = require("../src/stringCalculator.js");

// Test suite for the String Calculator functionality
describe("String Calculator", () => {
  // Test case: when input is an empty string, add should return 0
  test("empty string returns 0", () => {
    expect(add("")).toBe(0);
  });
});
