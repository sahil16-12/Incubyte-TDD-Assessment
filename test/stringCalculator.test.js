// Import the add function from the stringCalculator module
const { add } = require("../src/stringCalculator.js");

// Test suite for the String Calculator functionality
describe("String Calculator", () => {
  // Test case: when input is an empty string, add should return 0
  test("empty string returns 0", () => {
    expect(add("")).toBe(0);
  });

  // Test case: when input is a single number, add should return that number
  test("single number returns its value", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  // Test case: when input is two numbers separated by a comma, add should return their sum
  test("two numbers, comma delimited, returns their sum", () => {
    expect(add("1,5")).toBe(6);
    expect(add("58,67")).toBe(125);
  });
});
