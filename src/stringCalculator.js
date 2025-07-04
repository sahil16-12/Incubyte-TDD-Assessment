function add(numbers) {
  // If the input is an empty string, return 0
  if (numbers === "") {
    return 0;
  }
  // If the input is a single number, return its integer value
  if (!numbers.includes(",")) {
    return parseInt(numbers, 10);
  }
  // If the input contains two numbers separated by a comma, sum them
  const numArray = numbers.split(",").map(Number);
  return numArray.reduce((sum, num) => sum + num, 0);
}
module.exports.add = add;
