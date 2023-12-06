import { getInput } from "./helpers.js";
const input = getInput(1);

let sum = 0;

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

for (const line of input.split("\n")) {
  if (!line) continue;
  let parsedLine = "";

  for (let i = 0; i < line.length; i++) {
    if (!isNaN(line[i])) {
      parsedLine += line[i];
    } else {
      const s = line.slice(i);
      Object.keys(digits).forEach((digit) => {
        if (s.startsWith(digit)) {
          parsedLine += digits[digit];
        }
      });
    }
  }

  const firstDigit = parsedLine[0];
  const lastDigit = parsedLine[parsedLine.length - 1];

  sum += Number(String(firstDigit) + String(lastDigit));
}

console.log(sum);
