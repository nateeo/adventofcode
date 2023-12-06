import { getInput } from "./helpers.js";
const input = getInput(1);

let sum = 0;

for (const line of input.split("\n")) {
  let firstDigit = "";
  let lastDigit = "";
  for (let i = 0; i < line.length; i++) {
    const num = line.charAt(i);
    if (!isNaN(num)) {
      if (!firstDigit) firstDigit = num;
      lastDigit = num;
    }
  }

  sum += Number(firstDigit + lastDigit);
}

console.log(sum);
