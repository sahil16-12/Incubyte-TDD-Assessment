function add(numbers) {
  // Return 0 for empty input
  if (!numbers) {
    return 0;
  }

  let delimiter = ",";
  let nums = numbers;

  // Check for custom delimiter at the start
  if (numbers.startsWith("//")) {
    const delimiterLineEnd = numbers.indexOf("\n");
    delimiter = numbers.substring(2, delimiterLineEnd);
    nums = numbers.substring(delimiterLineEnd + 1);
  }

  // Replace new lines with delimiter, then split and sum
  const normalized = nums.replace(/\n/g, delimiter);
  return normalized
    .split(delimiter)
    .map((str) => Number(str))
    .reduce((sum, num) => sum + num, 0);
}

module.exports.add = add;