// Helper to escape special regex characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Helper to check if fallback to default delimiters is needed
function isDefaultDelimiter(delim) {
  return delim === "" || delim.includes("\n");
}

// Helper to extract delimiter and numbers
function extractDelimiterAndNumbers(input) {
  if (!input.startsWith("//")) return { delimiter: /,|\n/, numbers: input };

  const delimiterLineEnd = input.indexOf("\n");
  const rawDelim = input.substring(2, delimiterLineEnd);
  const numbers = input.substring(delimiterLineEnd + 1);

  let delimiter;
  // Support multiple delimiters in //[delim1][delim2]... format
  const multiDelimMatch = rawDelim.match(/^(\[(.*?)\])+$/);
  if (multiDelimMatch) {
    // Extract all delimiters in brackets
    const allDelims = [...rawDelim.matchAll(/\[(.*?)\]/g)].map((m) => m[1]);
    // If any delimiter is empty or contains a newline, fallback to default
    if (allDelims.some(isDefaultDelimiter)) {
      delimiter = /,|\n/;
    } else {
      delimiter = allDelims.map(escapeRegex).join("|");
    }
  } else {
    // Single delimiter (bracketed or not)
    const match = rawDelim.match(/^\[(.*)\]$/);
    if (match) {
      const inside = match[1];
      if (isDefaultDelimiter(inside)) {
        delimiter = /,|\n/;
      } else {
        delimiter = escapeRegex(inside);
      }
    } else {
      if (isDefaultDelimiter(rawDelim)) {
        delimiter = /,|\n/;
      } else {
        delimiter = escapeRegex(rawDelim);
      }
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

// Helper to split and sum numbers, with negative check and ignoring >1000
function sumNumbers(numbersStr, delimiter) {
  const nums =
    typeof delimiter === "string"
      ? numbersStr.split(new RegExp(delimiter, "g")).map(Number)
      : numbersStr.split(delimiter).map(Number);

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
