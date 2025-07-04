function add(numbers) {
  // If the input is an empty string, return 0
  if (numbers === "") {
    return 0;
  }
  // If the input is a single number, return its integer value
  if (!numbers.includes(",")) {
    return parseInt(numbers, 10);
  }
}
module.exports.add = add;
