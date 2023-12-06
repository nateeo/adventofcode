import { getInput } from "./helpers.js";
const input = getInput(4);

const cache = {};

const cards = input.split("\n");

const cardsToProcess = [];

let totalCards = 0;

for (let i = 0; i < cards.length; i++) {
  cardsToProcess.push(i);
}

while (cardsToProcess.length > 0) {
  totalCards++;
  const cardIndex = cardsToProcess.shift();
  let numsMatching = 0;
  if (cache[cardIndex]) {
    numsMatching = cache[cardIndex];
  } else {
    const line = cards[cardIndex];
    const card = {};
    const numbers = line.split(":")[1].trim();
    const split = numbers.split("|");
    const [cardNums, myNums] = [
      split[0].trim().split(/[ ]+/),
      split[1].trim().split(/[ ]+/),
    ];
    cardNums.forEach((n) => (card[n] = true));
    myNums.forEach((n) => {
      if (card[n]) {
        numsMatching++;
      }
    });
    cache[cardIndex] = numsMatching;
  }
}

const wins = Object.values(cache);
const times = new Array(wins.length).fill(1);

[4, 2, 2, 1, 0, 0][(1, 1, 1, 1, 1, 1)];

console.log("wins", wins);
for (let i = 0; i < times.length; i++) {
  const matching = wins[i];
  for (let j = i + 1; j < i + 1 + matching; j++) {
    times[j] += times[i];
  }
}

console.log(times.reduce((sum, curr) => sum + curr, 0));
