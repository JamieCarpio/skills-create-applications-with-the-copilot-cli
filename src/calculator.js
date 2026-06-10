#!/usr/bin/env node
// Calculator - Node.js CLI and programmatic API
// Supported operations:
//  - addition (add)
//  - subtraction (subtract)
//  - multiplication (multiply)
//  - division (divide)
//
// Usage (CLI):
//   node src/calculator.js add 2 3        -> prints 5
//   node src/calculator.js divide 10 2  -> left-to-right division -> 5
//
// Programmatic usage:
//   const { add } = require('./src/calculator');
//   add(1,2,3) // 6

'use strict';

// Helper: convert args to numbers and validate
function toNumbers(args) {
  if (!Array.isArray(args) || args.length === 0) throw new Error('At least one numeric operand is required');
  const nums = args.map(a => {
    const n = Number(a);
    if (Number.isNaN(n)) throw new Error(`Invalid number: ${a}`);
    return n;
  });
  return nums;
}

// Addition: sum all operands
function add(...operands) {
  const nums = toNumbers(operands);
  return nums.reduce((s, n) => s + n, 0);
}

// Subtraction: left-to-right: a - b - c - ...
function subtract(...operands) {
  const nums = toNumbers(operands);
  if (nums.length === 1) return -nums[0];
  return nums.slice(1).reduce((acc, n) => acc - n, nums[0]);
}

// Multiplication: product of all operands
function multiply(...operands) {
  const nums = toNumbers(operands);
  return nums.reduce((p, n) => p * n, 1);
}

// Division: left-to-right: a / b / c / ...; division by zero -> error
function divide(...operands) {
  const nums = toNumbers(operands);
  if (nums.length === 1) return 1 / nums[0]; // reciprocal if single operand
  return nums.slice(1).reduce((acc, n) => {
    if (n === 0) throw new Error('Division by zero');
    return acc / n;
  }, nums[0]);
}

// Modulo: remainder of a divided by b
function modulo(...operands) {
  const nums = toNumbers(operands);
  if (nums.length < 2) throw new Error('Modulo requires two operands');
  const [x, y] = nums;
  if (y === 0) throw new Error('Modulo by zero');
  return x % y;
}

// Power: base raised to exponent (left-to-right for multiple operands)
function power(...operands) {
  const nums = toNumbers(operands);
  if (nums.length === 1) return nums[0];
  return nums.slice(1).reduce((acc, n) => Math.pow(acc, n), nums[0]);
}

// Square root: returns sqrt(n); error for negative numbers
function squareRoot(...operands) {
  const nums = toNumbers(operands);
  const num = nums[0];
  if (num < 0) throw new Error('Square root of negative number');
  return Math.sqrt(num);
}

// Minimal CLI parser
function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> [num2 ...]');
  console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
  console.log('Aliases: mod=modulo, pow=power, sqrt=squareRoot');
}

if (require.main === module) {
  const [, , op, ...args] = process.argv;
  if (!op) {
    printUsage();
    process.exit(1);
  }

  try {
    let result;
    switch (op.toLowerCase()) {
      case 'add':
        result = add(...args);
        break;
      case 'subtract':
        result = subtract(...args);
        break;
      case 'multiply':
        result = multiply(...args);
        break;
      case 'divide':
        result = divide(...args);
        break;
      case 'mod':
      case 'modulo':
        result = modulo(...args);
        break;
      case 'pow':
      case 'power':
        result = power(...args);
        break;
      case 'sqrt':
      case 'squareroot':
      case 'squareRoot':
        result = squareRoot(...args);
        break;
      case 'help':
      case '--help':
      case '-h':
        printUsage();
        process.exit(0);
      default:
        console.error(`Unknown operation: ${op}`);
        printUsage();
        process.exit(2);
    }
    // Print result with full precision; user can pipe/format externally
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(3);
  }
}

// Export functions for programmatic use
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };