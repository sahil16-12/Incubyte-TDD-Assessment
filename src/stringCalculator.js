function add(numbers) {
  // Return 0 for empty input
  if (numbers === "") {
    return 0;
  }
  // If new lines exist, treat them as commas (delimiters), then split and sum
  return numbers
    .replace(/\n/g, ",")
    .split(",")
    .map((str) => Number(str))
    .reduce((sum, num) => sum + num, 0);
}

module.exports.add = add;
