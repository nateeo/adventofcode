import { getInput } from "./helpers.js";
const input = getInput(4);
let total = 0;

for (const line of input.split("\n")) {
  const card = {};
  const numbers = line.split(":")[1].trim();
  const split = numbers.split("|");
  const [cardNums, myNums] = [
    split[0].trim().split(/[ ]+/),
    split[1].trim().split(/[ ]+/),
  ];
  cardNums.forEach((n) => (card[n] = true));
  let value = 0;
  myNums.forEach((n) => {
    if (card[n]) {
      if (value === 0) {
        value = 1;
      } else {
        value *= 2;
      }
    }
  });

  total += value;
}

console.log(total);
