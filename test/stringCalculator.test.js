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

  // Test case: when input is multiple numbers separated by commas, add should return their sum
  test("multiple numbers, comma delimited, returns their sum", () => {
    expect(add("1,2,3")).toBe(6);
    expect(add("10,20,30,40")).toBe(100);
    expect(add("5,10,15,20,25")).toBe(75);
  });

  // Test case: input with new lines between numbers should return their sum
  test("numbers separated by new lines and commas returns their sum", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("4\n5\n6")).toBe(15);
    expect(add("7,8\n9")).toBe(24);
  });
});
