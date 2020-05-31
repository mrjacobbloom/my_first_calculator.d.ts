// @ts-check
const fs = require('fs');

/**
 * Generated calculator will go from 0 to this number
 */
const maxNumber = 50;

/**
 * An operation type-literal token, and a function that does said operation
 * @typedef {{ token: string; exec: (a: number, b: number) => number | string }} Operation
 */

/**
 * List of operation type-literal tokens, and how to do them
 * @type {Operation[]}
 * */
const operations = [
  { token: '\'+\'', exec: (a, b) => a + b },
  { token: '\'-\'', exec: (a, b) => a - b },
  { token: '\'*\'', exec: (a, b) => a * b },
  { token: '\'/\'', exec: (a, b) => b === 0 ? '\'Infinity\'' : a / b },
];

const preamble = `/*
* Welcome to this calculator!
* It can add, subtract, multiply and divide whole numbers from 0 to ${maxNumber}
* Use it like this: type myNumber = MyFirstCalculator<3, '+', 5>;
*/

// todo: submit to DefinitelyTyped`;

const allowedNumbers = [];
for (let i = 0; i <= maxNumber; i++) allowedNumbers.push(i);

/**
 * String like "1 | 2 | 3 | 4 ... maxNumber"
 */
let renderedAllowedNumbers = allowedNumbers.join(' | ');
/**
 * String like "'+' | '-' ..." for all operations
 */
let renderedAllowedOperations = operations.map(({ token }) => token).join(' | ');

/**
 * Render the line for Num1 (operaion) Num2
 * @param {number} num1
 * @param {number} num2
 * @param {Operation} operation 
 */
function renderNum2(num1, num2, operation) {
  return `      Num2 extends ${num2} ? ${operation.exec(num1, num2)} :`;
}

/**
 * Render all lines relevant to a given Num1 within a given operation
 * @param {number} num1
 * @param {Operation} operation 
 */
function renderNum1(num1, operation) {
  const renderedNum2s = allowedNumbers.map(num2 => renderNum2(num1, num2, operation)).join('\n')
  return `    Num1 extends ${num1} ?
${renderedNum2s}
      never :`;
}

/**
 * Render all lines of a given operation
 * @param {Operation} operation
 * */
function renderOperation(operation) {
  const renderedNum1s = allowedNumbers.map(num1 => renderNum1(num1, operation)).join('\n');
  return `  Operation extends ${operation.token} ?
${renderedNum1s}
    never :`;
}

const renderedOperations = operations.map(renderOperation).join('\n');

let out = `${preamble}

type MyFirstCalculator<
  Num1 extends ${renderedAllowedNumbers},
  Operation extends ${renderedAllowedOperations},
  Num2 extends ${renderedAllowedNumbers}
> =
${renderedOperations}
  never;`;

fs.writeFile('./my_first_calculator.d.ts', out, () => {});
