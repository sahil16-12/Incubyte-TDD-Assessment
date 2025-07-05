// Helper to extract delimiter and numbers
function extractDelimiterAndNumbers(input) {
  if (!input.startsWith("//")) return { delimiter: /,|\n/, numbers: input };
  const delimiterLineEnd = input.indexOf("\n");
  let delimiter = input.substring(2, delimiterLineEnd);
  const numbers = input.substring(delimiterLineEnd + 1);
  // Support any length delimiter in //[delimiter]\n format
  const match = delimiter.match(/^\[(.+)\]$/);
  if (match) {
    delimiter = match[1];
  }
  // If delimiter is empty, fallback to default delimiters (comma and newline)
  if (!delimiter) delimiter = /,|\n/;
  return { delimiter, numbers };
}

// Helper to normalize newlines if delimiter is a string
function normalizeNumbers(numbers, delimiter) {
  return typeof delimiter === "string"
    ? numbers.replace(/\n/g, delimiter)
    : numbers;
}

// Helper to split and sum numbers, with negative check and ignoring >1000
function sumNumbers(numbersStr, delimiter) {
  const nums = numbersStr.split(delimiter).map(Number);
  const negatives = nums.filter((num) => num < 0);
  if (negatives.length) {
    throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
  }
  return nums.filter((num) => num <= 1000).reduce((sum, num) => sum + num, 0);
}

function add(input) {
  if (!input) return 0;
  const { delimiter, numbers } = extractDelimiterAndNumbers(input);
  return sumNumbers(normalizeNumbers(numbers, delimiter), delimiter);
}

module.exports.add = add;
