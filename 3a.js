import { getInput } from "./helpers.js";
const input = getInput(3);

const board = input.split("\n");

let sum = 0;

const isSymbolAtLocation = (lineIndex, charIndex) => {
  if (!board[lineIndex]) return false;
  const char = board[lineIndex].charAt(charIndex);
  return char && isNaN(char) && char !== ".";
};

for (let lineIndex = 0; lineIndex < board.length; lineIndex++) {
  const line = board[lineIndex];
  for (const match of [...line.matchAll(/[0-9]+/g)]) {
    const num = match[0];
    const index = match.index;
    let isValidNum = false;
    for (let i = index - 1; i <= num.length + index; i++) {
      if (isValidNum) continue;
      isValidNum =
        isSymbolAtLocation(lineIndex - 1, i) ||
        isSymbolAtLocation(lineIndex, i) ||
        isSymbolAtLocation(lineIndex + 1, i);
    }
    if (isValidNum) {
      sum += Number(num);
    }
  }
}

console.log(sum);
