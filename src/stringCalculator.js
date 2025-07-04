// Helper to extract delimiter and numbers
function extractDelimiterAndNumbers(input) {
  let delimiter = ",";
  let numbers = input;
  if (input.startsWith("//")) {
    const delimiterLineEnd = input.indexOf("\n");
    delimiter = input.substring(2, delimiterLineEnd);
    numbers = input.substring(delimiterLineEnd + 1);
    // If delimiter is empty, fallback to default delimiters (comma and newline)
    if (delimiter === "") {
      delimiter = /,|\n/;
    }
  }
  return { delimiter, numbers };
}

// Helper to normalize newlines if delimiter is a string
function normalizeNumbers(numbers, delimiter) {
  if (typeof delimiter === "string") {
    return numbers.replace(/\n/g, delimiter);
  }
  return numbers;
}

// Helper to split and sum numbers
function sumNumbers(numbersStr, delimiter) {
  return numbersStr
    .split(delimiter)
    .map((str) => Number(str))
    .reduce((sum, num) => sum + num, 0);
}

function add(input) {
  // Return 0 for empty input
  if (!input) {
    return 0;
  }
  const { delimiter, numbers } = extractDelimiterAndNumbers(input);
  const normalized = normalizeNumbers(numbers, delimiter);
  return sumNumbers(normalized, delimiter);
}

module.exports.add = add;
