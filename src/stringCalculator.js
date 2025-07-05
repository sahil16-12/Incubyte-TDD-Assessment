// Helper to extract delimiter and numbers
function extractDelimiterAndNumbers(input) {
  let delimiter = ",";
  let numbers = input;
  if (input.startsWith("//")) {
    const delimiterLineEnd = input.indexOf("\n");
    delimiter = input.substring(2, delimiterLineEnd);
    numbers = input.substring(delimiterLineEnd + 1);
    // If delimiter is empty, fallback to default delimiters (comma and newline)
    if (!delimiter) {
      delimiter = /,|\n/;
    }
  }
  return { delimiter, numbers };
}

// Helper to normalize newlines if delimiter is a string
function normalizeNumbers(numbers, delimiter) {
  return typeof delimiter === "string"
    ? numbers.replace(/\n/g, delimiter)
    : numbers;
}

// Helper to split and sum numbers, with negative check
function sumNumbers(numbersStr, delimiter) {
  const nums = numbersStr.split(delimiter).map(Number);
  const negatives = nums.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }
  // Ignore numbers greater than 1000
  return nums.filter((num) => num <= 1000).reduce((sum, num) => sum + num, 0);
}

function add(input) {
  if (!input) return 0;
  const { delimiter, numbers } = extractDelimiterAndNumbers(input);
  const normalized = normalizeNumbers(numbers, delimiter);
  return sumNumbers(normalized, delimiter);
}

module.exports.add = add;
