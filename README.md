# String Calculator - TDD Implementation

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://github.com/your-repo/string-calculator)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/your-repo/string-calculator)
[![Node.js](https://img.shields.io/badge/node.js-14%2B-blue.svg)](https://nodejs.org/)

A robust, modular, and fully-tested **String Calculator** implementation in JavaScript (Node.js) using **Test-Driven Development (TDD)**. This project supports custom delimiters, multiple delimiters, negative number handling, and ignores numbers greater than 1000. All edge cases are covered by comprehensive test suites.

---

## 🚀 Features

- ✅ **Basic Operations**: Add numbers in a string separated by commas or newlines
- ✅ **Custom Delimiters**: Support for single-character custom delimiters (`//;\n1;2`)
- ✅ **Multi-Character Delimiters**: Support for any-length delimiters (`//[***]\n1***2***3`)
- ✅ **Multiple Delimiters**: Support for multiple delimiters (`//[*][%]\n1*2%3`)
- ✅ **Special Characters**: Handles regex special characters as delimiters
- ✅ **Negative Number Handling**: Throws descriptive errors for negative numbers
- ✅ **Number Filtering**: Ignores numbers greater than 1000
- ✅ **Edge Case Coverage**: Comprehensive handling of whitespace, empty, and invalid delimiters
- ✅ **Modular Architecture**: Clean, maintainable, and well-documented code
- ✅ **100% Test Coverage**: Extensive test suite with edge and boundary cases

---

## 📦 Installation

```bash
git clone https://github.com/your-username/string-calculator.git
cd string-calculator
npm install
```

---

## 🏃‍♂️ Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## 📋 Usage

### Basic Usage

```javascript
const { add } = require("./src/stringCalculator");

// Basic operations
console.log(add("")); // 0
console.log(add("1")); // 1
console.log(add("1,2")); // 3
console.log(add("1,2,3,4")); // 10
```

### Advanced Usage

```javascript
// Custom delimiters
console.log(add("//;\n1;2")); // 3
console.log(add("//[***]\n1***2***3")); // 6

// Multiple delimiters
console.log(add("//[*][%]\n1*2%3")); // 6

// Error handling
try {
  add("1,-2,3");
} catch (error) {
  console.log(error.message); // "negative numbers not allowed -2"
}
```

---

## 🧪 Test Cases & Examples

### Step 1: Basic Functionality

```javascript
add(""); // ➜ 0    (empty string)
add("1"); // ➜ 1    (single number)
add("1,5"); // ➜ 6    (two numbers)
add("1,2,3"); // ➜ 6    (multiple numbers)
add("10,20,30,40"); // ➜ 100  (multiple numbers)
```

### Step 2: Newline Support

```javascript
add("1\n2,3"); // ➜ 6    (newlines as delimiters)
add("4\n5\n6"); // ➜ 15   (only newlines)
add("7,8\n9"); // ➜ 24   (mixed comma and newline)
```

### Step 3: Custom Single Delimiters

```javascript
add("//;\n1;2"); // ➜ 3    (semicolon delimiter)
add("//|\n4|5|6"); // ➜ 15   (pipe delimiter)
add("//-\n7-8-9"); // ➜ 24   (dash delimiter)
add("//.\n1.2.3"); // ➜ 6    (dot delimiter - special char)
add("//1\n2112"); // ➜ 4    (numeric delimiter)
add("// \n3 4 5"); // ➜ 12   (space delimiter)
add("//sep\n10sep20sep30"); // ➜ 60 (multi-char delimiter)
```

### Step 4: Edge Cases for Custom Delimiters

```javascript
add("//\n1,2,3"); // ➜ 6    (empty delimiter, fallback to default)
```

### Step 5: Negative Number Handling

```javascript
add("-1,-2,-3"); // ❌ throws "negative numbers not allowed -1,-2,-3"
add("//;\n-1;2;-3"); // ❌ throws "negative numbers not allowed -1,-3"
add("1,2,-3"); // ❌ throws "negative numbers not allowed -3"
add("-5"); // ❌ throws "negative numbers not allowed -5"
add("//[***]\n-1***2***-3"); // ❌ throws "negative numbers not allowed -1,-3"
```

### Step 6: Numbers Greater Than 1000

```javascript
add("2,1001"); // ➜ 2     (1001 ignored)
add("1000,1,2000,3"); // ➜ 1004  (2000 ignored, 1000 included)
add("1001,2002,3003"); // ➜ 0     (all numbers ignored)
add("//;\n1001;2;1002;3"); // ➜ 5     (large numbers ignored)
add("//[***]\n1001***2***1002***3"); // ➜ 5 (large numbers ignored)
```

### Step 7: Multi-Character Delimiters

```javascript
add("//[***]\n1***2***3"); // ➜ 6    (triple asterisk)
add("//[abc]\n4abc5abc6"); // ➜ 15   (alphabetic delimiter)
add("//[--]\n7--8--9"); // ➜ 24   (double dash)
add("//[sep]\n10sep20sep30"); // ➜ 60   (word delimiter)
add("//[;]\n1;2;3"); // ➜ 6    (single char in brackets)
add("//[.]\n1.2.3"); // ➜ 6    (special char in brackets)
add("//[1]\n2112"); // ➜ 4    (numeric in brackets)
add("//[ ]\n3 4 5"); // ➜ 12   (space in brackets)
add("//[]\n1,2,3"); // ➜ 6    (empty brackets, fallback)
add("//[***!!!***]\n1***!!!***2***!!!***3"); // ➜ 6 (complex delimiter)
```

### Step 8-9: Multiple Delimiters

```javascript
// Basic multi-delimiter
add("//[*][%]\n1*2%3"); // ➜ 6    (asterisk and percent)
add("//[;][,]\n1;2,3"); // ➜ 6    (semicolon and comma)
add("//[***][%]\n1***2%3"); // ➜ 6    (multi-char and single-char)
add("//[a][b][c]\n1a2b3c4"); // ➜ 10   (three delimiters)

// Advanced multi-delimiter cases
add("//[abc][def]\n1abc2def3"); // ➜ 6    (multi-char delimiters)
add("//[***][%%%]\n1***2%%%3***4"); // ➜ 10   (complex multi-char)
add("//[.][*][+][?]\n1.2*3+4?5"); // ➜ 15   (special regex chars)
add("//[ ][_]\n1 2_3"); // ➜ 6    (whitespace delimiters)
add("//[   ][-]\n1   2-3"); // ➜ 6    (multi-space delimiter)
add("//[1][2]\n311242"); // ➜ 10   (numeric delimiters)

// Fallback cases
add("//[][;]\n1;2,3"); // ➜ 6    (empty delimiter, fallback)
add("//[\n][*]\n1*2,3"); // ➜ 6    (newline delimiter, fallback)

// Edge cases
add("//[x][y]\n1x2x3"); // ➜ 6    (only one delimiter used)
add("//[***][**][*]\n1***2**3*4"); // ➜ 10   (overlapping patterns)
add("//[|][\\][^][$][(][)]\n1|2\\3^4$5(6)7"); // ➜ 28 (special regex sequences)
add("//[][***]\n1***2,3"); // ➜ 6    (fallback with mixed)
add("//[\n][***]\n1***2,3"); // ➜ 6    (fallback with mixed)

// Large numbers with multiple delimiters
add("//[*][%]\n1001*2%1002*3"); // ➜ 5    (ignore >1000)
add("//[***][%]\n1001***2000%3000"); // ➜ 0    (all numbers >1000)

// Negative numbers with multiple delimiters
add("//[*][%]\n-1*2%-3"); // ❌ throws "negative numbers not allowed -1,-3"
```

---

## 🏗️ Architecture

### Project Structure

```
string-calculator/
├── src/
│   └── stringCalculator.js    # Main implementation
├── test/
│   └── stringCalculator.test.js # Comprehensive test suite
├── package.json               # Dependencies and scripts
└── README.md                 # This file
```

### Code Architecture

The implementation follows clean architecture principles with modular, single-responsibility functions:

```javascript
// Global constants for reusability
const DEFAULT_DELIMITER_REGEX = /,|\n/;
const MULTI_DELIM_PATTERN = /^(\[(.*?)\])+$/;

// Core functions
function add(input)                    // Main entry point
function extractDelimiterAndNumbers(input) // Delimiter parsing
function sumNumbers(numbersStr, delimiter)  // Number processing
function normalizeNumbers(numbers, delimiter) // Input normalization

// Helper functions
function escapeRegex(str)              // Regex escaping
function isDefaultDelimiter(delim)     // Validation
function getValidDelimiters(delims)    // Filtering
function buildMultiDelimiterRegex(delims) // Regex building
function buildFallbackRegex(validDelims)  // Fallback handling
```

---

## 🧩 API Reference

### `add(input: string): number`

Calculates the sum of numbers in the input string according to delimiter rules.

**Parameters:**

- `input` (string): The input string containing numbers and delimiters

**Returns:**

- `number`: The sum of valid numbers (≤1000)

**Throws:**

- `Error`: When negative numbers are present, listing all negatives

**Examples:**

```javascript
add("1,2,3"); // 6
add("//;\n1;2"); // 3
add("//[*][%]\n1*2%3"); // 6
add("1,-2,3"); // throws Error
```

---

## 🔬 Testing Strategy

Our test suite covers:

- **Unit Tests**: Each function tested in isolation
- **Integration Tests**: End-to-end functionality
- **Edge Cases**: Boundary conditions and error scenarios
- **Regression Tests**: Preventing previously fixed bugs

### Test Categories

1. **Basic Functionality** (Steps 1-2)
2. **Custom Delimiters** (Steps 3-4)
3. **Error Handling** (Step 5)
4. **Number Filtering** (Step 6)
5. **Multi-Character Delimiters** (Step 7)
6. **Multiple Delimiters** (Steps 8-9)
7. **Edge Cases & Regression**

---

## 🚦 Requirements Fulfilled

- ✅ **Step 1**: Handle empty string, single number, two numbers, multiple numbers
- ✅ **Step 2**: Support newlines as delimiters
- ✅ **Step 3**: Support custom single-character delimiters
- ✅ **Step 4**: Handle edge cases for custom delimiters
- ✅ **Step 5**: Throw errors for negative numbers with all negatives listed
- ✅ **Step 6**: Ignore numbers greater than 1000
- ✅ **Step 7**: Support any-length custom delimiters in `[delimiter]` format
- ✅ **Step 8-9**: Support multiple delimiters in `//[delim1][delim2]\n` format

---

## 🛠️ Development

### Prerequisites

- Node.js 14+
- npm 6+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/string-calculator.git
cd string-calculator

# Install dependencies
npm install

# Run tests
npm test
```

### Scripts

```bash
npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Implement your changes
5. Ensure all tests pass (`npm test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Incubyte**: For the TDD assessment challenge
- **TDD Community**: For best practices and methodologies
- **Jest**: For the excellent testing framework

---

## 📧 Contact

**Author**: [Your Name]  
**Email**: [your.email@example.com]  
**LinkedIn**: [your-linkedin-profile]  
**GitHub**: [@your-username](https://github.com/your-username)

---

## 📊 Performance

The String Calculator is optimized for performance:

- **Time Complexity**: O(n) where n is the length of the input string
- **Space Complexity**: O(k) where k is the number of extracted numbers
- **Regex Optimization**: Efficient delimiter matching with sorted patterns
- **Memory Efficient**: Minimal object creation and reuse of patterns

---

_Made with ❤️ using Test-Driven Development_
