const calc = require('../calculator');

describe('Calculator functions', () => {
  describe('addition (add)', () => {
    test('adds two numbers (2 + 3 = 5)', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    test('adds multiple numbers (1 + 2 + 3 = 6)', () => {
      expect(calc.add(1, 2, 3)).toBe(6);
    });

    test('adding string numbers converts them to numbers', () => {
      expect(calc.add('4', '5')).toBe(9);
    });
  });

  describe('subtraction (subtract)', () => {
    test('subtracts two numbers (10 - 4 = 6)', () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    test('subtracts multiple numbers (20 - 5 - 3 = 12)', () => {
      expect(calc.subtract(20, 5, 3)).toBe(12);
    });

    test('single operand returns negation (-n)', () => {
      expect(calc.subtract(5)).toBe(-5);
    });
  });

  describe('multiplication (multiply)', () => {
    test('multiplies two numbers (45 * 2 = 90)', () => {
      expect(calc.multiply(45, 2)).toBe(90);
    });

    test('multiplies multiple numbers (2 * 3 * 4 = 24)', () => {
      expect(calc.multiply(2, 3, 4)).toBe(24);
    });
  });

  describe('division (divide)', () => {
    test('divides two numbers (20 / 5 = 4)', () => {
      expect(calc.divide(20, 5)).toBe(4);
    });

    test('left-to-right division (100 / 5 / 2 = 10)', () => {
      expect(calc.divide(100, 5, 2)).toBe(10);
    });

    test('single operand returns reciprocal (1 / n)', () => {
      expect(calc.divide(2)).toBe(0.5);
    });

    test('division by zero throws an error', () => {
      expect(() => calc.divide(4, 0)).toThrow(/Division by zero/);
    });
  });

  // Extended operations: modulo, power, square root
  describe('modulo (mod)', () => {
    test('modulo of 5 % 2 = 1', () => {
      expect(calc.modulo(5, 2)).toBe(1);
    });

    test('modulo with negative numbers', () => {
      expect(calc.modulo(-5, 2)).toBe(-1);
    });

    test('modulo by zero throws', () => {
      expect(() => calc.modulo(5, 0)).toThrow(/Modulo by zero/);
    });
  });

  describe('power (pow)', () => {
    test('power 2^3 = 8', () => {
      expect(calc.power(2, 3)).toBe(8);
    });

    test('power left-to-right for multiple operands (2^(3^2)) behavior', () => {
      // Our implementation applies left-to-right: (2^3)^2 = 64
      expect(calc.power(2, 3, 2)).toBe(Math.pow(Math.pow(2,3),2));
    });

    test('power with fractional exponent', () => {
      expect(calc.power(9, 0.5)).toBeCloseTo(3);
    });
  });

  describe('squareRoot (sqrt)', () => {
    test('square root of 16 is 4', () => {
      expect(calc.squareRoot(16)).toBe(4);
    });

    test('square root of 2 is ~1.414', () => {
      expect(calc.squareRoot(2)).toBeCloseTo(Math.SQRT2);
    });

    test('square root of negative number throws', () => {
      expect(() => calc.squareRoot(-4)).toThrow(/Square root of negative number/);
    });
  });

  describe('input validation', () => {
    test('invalid numeric input throws', () => {
      expect(() => calc.add('foo')).toThrow(/Invalid number/);
      expect(() => calc.subtract('bar')).toThrow(/Invalid number/);
      expect(() => calc.multiply('baz')).toThrow(/Invalid number/);
      expect(() => calc.divide('qux')).toThrow(/Invalid number/);
      expect(() => calc.modulo('a', 'b')).toThrow(/Invalid number/);
      expect(() => calc.power('x', 'y')).toThrow(/Invalid number/);
      expect(() => calc.squareRoot('z')).toThrow(/Invalid number/);
    });

    test('no operands provided throws', () => {
      expect(() => calc.add()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.subtract()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.multiply()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.divide()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.modulo()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.power()).toThrow(/At least one numeric operand is required/);
      expect(() => calc.squareRoot()).toThrow(/At least one numeric operand is required/);
    });
  });
});
