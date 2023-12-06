import { getInput } from "./helpers.js";
const input = getInput(3);

const board = input.split("\n");

// [<lineIndex>-<charIndex>]: num[]
const numbersAdjacentToGear = {};

const registerNumberToGear = (lineIndex, charIndex, num) => {
  if (!board[lineIndex]) return false;
  const char = board[lineIndex].charAt(charIndex);
  if (char === "*") {
    if (numbersAdjacentToGear[`${lineIndex}-${charIndex}`]) {
      numbersAdjacentToGear[`${lineIndex}-${charIndex}`].push(Number(num));
    } else {
      numbersAdjacentToGear[`${lineIndex}-${charIndex}`] = [Number(num)];
    }
  }
};

for (let lineIndex = 0; lineIndex < board.length; lineIndex++) {
  const line = board[lineIndex];
  for (const match of [...line.matchAll(/[0-9]+/g)]) {
    const num = match[0];
    const index = match.index;
    let isValidNum = false;
    for (let i = index - 1; i <= num.length + index; i++) {
      if (isValidNum) continue;
      isValidNum = registerNumberToGear(lineIndex - 1, i, num);
      registerNumberToGear(lineIndex, i, num);
      registerNumberToGear(lineIndex + 1, i, num);
    }
  }
}

const result = Object.values(numbersAdjacentToGear)
  .filter((numbers) => numbers.length === 2)
  .map((numbers) => numbers[0] * numbers[1])
  .reduce((prevSum, currValue) => {
    return prevSum + currValue;
  }, 0);

console.log(result);
