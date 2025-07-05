// Global regex patterns
const DEFAULT_DELIMITER_REGEX = /,|\n/;
const MULTI_DELIM_PATTERN = /^(\[(.*?)\])+$/;
const SINGLE_DELIM_PATTERN = /^\[(.*)\]$/;
const BRACKETED_DELIM_MATCH = /\[(.*?)\]/g;

// Helper to escape special regex characters
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Helper to check if fallback to default delimiters is needed
function isDefaultDelimiter(delim) {
  return delim === "" || delim.includes("\n");
}

// Helper to filter valid custom delimiters
function getValidDelimiters(delims) {
  return delims.filter(
    (d) => !isDefaultDelimiter(d) && d !== undefined && d !== null && d !== ""
  );
}

// Helper to build multi-delimiter regex
function buildMultiDelimiterRegex(delims) {
  return (
    "(?:" +
    delims
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join("|") +
    ")"
  );
}

// Helper to build fallback regex 
function buildFallbackRegex(validDelims) {
  const delimRegex = [
    ",",
    "\\n",
    ...validDelims.sort((a, b) => b.length - a.length).map(escapeRegex),
  ].join("|");
  return "(?:" + delimRegex + ")";
}

// Helper to extract delimiter and numbers
function extractDelimiterAndNumbers(input) {
  if (!input.startsWith("//"))
    return { delimiter: DEFAULT_DELIMITER_REGEX, numbers: input };

  const delimiterLineEnd = input.indexOf("\n");
  const rawDelim = input.substring(2, delimiterLineEnd);
  const numbers = input.substring(delimiterLineEnd + 1);

  let delimiter;
  // Support multiple delimiters in //[delim1][delim2]... format
  const multiDelimMatch = rawDelim.match(MULTI_DELIM_PATTERN);
  if (multiDelimMatch) {
    // Extract all delimiters in brackets
    let allDelims = [...rawDelim.matchAll(BRACKETED_DELIM_MATCH)].map(
      (m) => m[1]
    );
    if (allDelims.some(isDefaultDelimiter)) {
      const validDelims = getValidDelimiters(allDelims);
      delimiter =
        validDelims.length > 0
          ? buildFallbackRegex(validDelims)
          : DEFAULT_DELIMITER_REGEX;
    } else {
      delimiter = buildMultiDelimiterRegex(allDelims);
    }
  } else {
    // Single delimiter (bracketed or not)
    const match = rawDelim.match(SINGLE_DELIM_PATTERN);
    if (match) {
      const inside = match[1];
      delimiter = isDefaultDelimiter(inside)
        ? DEFAULT_DELIMITER_REGEX
        : escapeRegex(inside);
    } else {
      delimiter = isDefaultDelimiter(rawDelim)
        ? DEFAULT_DELIMITER_REGEX
        : escapeRegex(rawDelim);
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
  // Always use RegExp for splitting if delimiter is a string (multi-delimiter regex)
  const nums =
    typeof delimiter === "string" || delimiter instanceof String
      ? numbersStr.split(new RegExp(delimiter, "g")).filter(Boolean).map(Number)
      : numbersStr.split(delimiter).filter(Boolean).map(Number);

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
