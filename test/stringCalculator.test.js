// Import the add function from the stringCalculator module
const { add } = require("../src/stringCalculator.js");

// Test suite for the String Calculator functionality
describe("String Calculator", () => {
  // Step 1: when input is an empty string, add should return 0
  test("empty string returns 0", () => {
    expect(add("")).toBe(0);
  });

  // Step 1: when input is a single number, add should return that number
  test("single number returns its value", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  // Step 1: when input is two numbers separated by a comma, add should return their sum
  test("two numbers, comma delimited, returns their sum", () => {
    expect(add("1,5")).toBe(6);
    expect(add("58,67")).toBe(125);
  });

  // Step 2: when input is multiple numbers separated by commas, add should return their sum
  test("multiple numbers, comma delimited, returns their sum", () => {
    expect(add("1,2,3")).toBe(6);
    expect(add("10,20,30,40")).toBe(100);
    expect(add("5,10,15,20,25")).toBe(75);
  });

  // Step 3: input with new lines between numbers should return their sum
  test("numbers separated by new lines and commas returns their sum", () => {
    expect(add("1\n2,3")).toBe(6);
    expect(add("4\n5\n6")).toBe(15);
    expect(add("7,8\n9")).toBe(24);
  });

  // Step 4: support different delimiters specified at the start of the string
  test("custom delimiter specified at the start should be supported", () => {
    // Delimiter is a single character
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n4|5|6")).toBe(15);
    expect(add("//-\n7-8-9")).toBe(24);
    // Delimiter is a special character (dot)
    expect(add("//.\n1.2.3")).toBe(6);
    // Delimiter is a number ("1" as delimiter)
    expect(add("//1\n2112")).toBe(4);
    // Delimiter is a space
    expect(add("// \n3 4 5")).toBe(12);
    // Delimiter is a multi-character string
    expect(add("//sep\n10sep20sep30")).toBe(60);
  });

  // step 4: Edge case for custom delimiter specified at the start
  test("empty delimiter edge case", () => {
    // Delimiter is empty, should fallback to comma/newline
    expect(add("//\n1,2,3")).toBe(6);
  });

  // Step 5: negative numbers should throw an exception listing all negatives
  test("negative numbers throw exception with all negatives listed", () => {
    // Only negative numbers
    expect(() => add("-1,-2,-3")).toThrow(
      "negative numbers not allowed -1,-2,-3"
    );
    // Negative numbers with custom delimiter
    expect(() => add("//;\n-1;2;-3")).toThrow(
      "negative numbers not allowed -1,-3"
    );
    // Negative numbers with empty delimiter (should fallback to comma/newline)
    expect(() => add("//\n-1,2,-3")).toThrow(
      "negative numbers not allowed -1,-3"
    );
    // Negative numbers with spaces as delimiter
    expect(() => add("// \n-1 2 -3")).toThrow(
      "negative numbers not allowed -1,-3"
    );
    // Negative numbers with multi-character delimiter
    expect(() => add("//sep\n-10sep20sep-30")).toThrow(
      "negative numbers not allowed -10,-30"
    );
    // Negative numbers with only one negative
    expect(() => add("1,2,-3")).toThrow("negative numbers not allowed -3");
    // Negative numbers with no positive numbers
    expect(() => add("-5")).toThrow("negative numbers not allowed -5");
  });
});
