// Import the add function from the stringCalculator module
const { add } = require("../src/stringCalculator.js");

// Dummy test suite to verify Jest setup
describe("test", () => {
  test("test string calculator", () => {
    expect(true).toBe(true);
  });
});

// Test suite for the String Calculator functionality
describe("String Calculator", () => {
  // Test case: when input is an empty string, add should return 0
  test("empty string returns 0", () => {
    expect(add("")).toBe(0);
  });
});
