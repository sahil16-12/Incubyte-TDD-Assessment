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

    expect(add("//.\n1.2.3")).toBe(6); // Delimiter is a special character (dot)

    expect(add("//1\n2112")).toBe(4); // Delimiter is a number ("1" as delimiter)

    expect(add("// \n3 4 5")).toBe(12); // Delimiter is a space

    expect(add("//sep\n10sep20sep30")).toBe(60); // Delimiter is a multi-character string
  });

  // step 4: Edge case for custom delimiter specified at the start
  test("empty delimiter edge case", () => {
    // Delimiter is empty, should fallback to comma/newline
    expect(add("//\n1,2,3")).toBe(6);
  });

  // Step 5: negative numbers should throw an exception listing all negatives
  test("negative numbers throw exception with all negatives listed", () => {
    expect(() => add("-1,-2,-3")).toThrow(
      "negative numbers not allowed -1,-2,-3"
    ); // Only negative numbers

    expect(() => add("//;\n-1;2;-3")).toThrow(
      "negative numbers not allowed -1,-3"
    ); // Negative numbers with custom delimiter

    expect(() => add("//\n-1,2,-3")).toThrow(
      "negative numbers not allowed -1,-3"
    ); // Negative numbers with empty delimiter (should fallback to comma/newline)

    expect(() => add("// \n-1 2 -3")).toThrow(
      "negative numbers not allowed -1,-3"
    ); // Negative numbers with spaces as delimiter

    expect(() => add("//sep\n-10sep20sep-30")).toThrow(
      "negative numbers not allowed -10,-30"
    ); // Negative numbers with multi-character delimiter

    expect(() => add("1,2,-3")).toThrow("negative numbers not allowed -3"); // Negative numbers with only one negative

    expect(() => add("-5")).toThrow("negative numbers not allowed -5"); // Negative numbers with no positive numbers
  });

  // Step 6: numbers bigger than 1000 should be ignored
  test("numbers greater than 1000 are ignored", () => {
    expect(add("2,1001")).toBe(2); // One number above 1000

    expect(add("1000,1,2000,3")).toBe(1004); // Multiple numbers above 1000

    expect(add("1001,2002,3003")).toBe(0); // All numbers above 1000

    expect(add("1000,2")).toBe(1002); // Exactly 1000 should be included

    expect(() => add("-1001,2,1002")).toThrow(
      "negative numbers not allowed -1001"
    ); // Negative and large number

    expect(add("//;\n1001;2;1002;3")).toBe(5); // Custom delimiter with large numbers

    expect(add("//sep\n1001sep2000sep3000")).toBe(0); // Custom delimiter, all numbers above 1000

    expect(add("1,1001\n2,2000")).toBe(3); // Mixed delimiters, some numbers above 1000

    expect(add("1001")).toBe(0); // Empty input with large number
  });

  // Step 7: delimiters can be of any length using [delimiter] format
  test("any length custom delimiter in [delimiter] format is supported", () => {
    expect(add("//[***]\n1***2***3")).toBe(6); // Delimiter is '***'

    expect(add("//[abc]\n4abc5abc6")).toBe(15); // Delimiter is 'abc'

    expect(add("//[--]\n7--8--9")).toBe(24); // Delimiter is '--'

    expect(add("//[sep]\n10sep20sep30")).toBe(60); // Delimiter is 'sep'

    expect(add("//[***]\n1001***2***3")).toBe(5); // Large number with custom delimiter

    expect(add("//[;]\n1;2;3")).toBe(6); // Delimiter is a single character in brackets

    expect(add("//[.]\n1.2.3")).toBe(6); // Delimiter is a special regex character

    expect(add("//[1]\n2112")).toBe(4); // Delimiter is a number in brackets

    expect(add("//[ ]\n3 4 5")).toBe(12); // Delimiter is a space in brackets

    expect(add("//[]\n1,2,3")).toBe(6); // Delimiter is empty brackets (should fallback to default)

    expect(add("//[***!!!***]\n1***!!!***2***!!!***3")).toBe(6); // Delimiter is a long string of special characters

    expect(() => add("//[***]\n-1***2***-3")).toThrow(
      "negative numbers not allowed -1,-3"
    ); // Negative numbers with long delimiter

    expect(add("//[***]\n1001***2***1002***3")).toBe(5); // Numbers > 1000 with long delimiter
  });

  // Step 8,9: multiple delimiters in //[delim1][delim2]...\n format
  test("multiple delimiters in //[delim1][delim2] format are supported (step 8,9, edge cases)", () => {
    // Basic multi-delimiter
    expect(add("//[*][%]\n1*2%3")).toBe(6);
    expect(add("//[;][,]\n1;2,3")).toBe(6);
    expect(add("//[***][%]\n1***2%3")).toBe(6);
    expect(add("//[a][b][c]\n1a2b3c4")).toBe(10);

    // Multi-char delimiters
    expect(add("//[abc][def]\n1abc2def3")).toBe(6);
    expect(add("//[***][%%%]\n1***2%%%3***4")).toBe(10);

    // Special regex chars
    expect(add("//[.][*][+][?]\n1.2*3+4?5")).toBe(15);

    // Whitespace delimiters
    expect(add("//[ ][_]\n1 2_3")).toBe(6);
    expect(add("//[   ][-]\n1   2-3")).toBe(6);

    // Delimiter is a number
    expect(add("//[1][2]\n311242")).toBe(7);

    // Delimiter is empty (should fallback)
    expect(add("//[][;]\n1;2,3")).toBe(6);

    // Negative numbers with multiple delimiters
    expect(() => add("//[*][%]\n-1*2%-3")).toThrow(
      "negative numbers not allowed -1,-3"
    );

    // Numbers > 1000 with multiple delimiters
    expect(add("//[*][%]\n1001*2%1002*3")).toBe(5);

    // All numbers > 1000
    expect(add("//[***][%]\n1001***2000%3000")).toBe(0);

    // Only one delimiter used
    expect(add("//[x][y]\n1x2x3")).toBe(6);

    // Delimiters with overlapping patterns
    expect(add("//[***][**][*]\n1***2**3*4")).toBe(10);

    // Delimiters with special regex sequences
    expect(add("//[|][\\][^][$][(][)]\n1|2\\3^4$5(6)7")).toBe(28);

    // Fallback to default if any delimiter is empty
    expect(add("//[][***]\n1***2,3")).toBe(6);
  });
});
