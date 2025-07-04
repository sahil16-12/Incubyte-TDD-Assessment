function add(numbers) {
  // Return 0 for empty input
  if (numbers === "") {
    return 0;
  }
  // Split the input string by comma, convert to numbers, and sum them
  return numbers
    .split(",")
    .map((str) => Number(str))
    .reduce((sum, num) => sum + num, 0);
}

module.exports.add = add;
