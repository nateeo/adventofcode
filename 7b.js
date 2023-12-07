import { getInput } from "./helpers.js";
const input = getInput(7);

const hands = [];
const bids = new Map();

const lines = input.split("\n");

for (const line of lines) {
  const [hand, bid] = line.split(" ");
  const bidReal = Number(bid);
  hands.push(hand);

  bids.set(hand, bidReal);
}

const h = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  J: -1,
};

const mapToHandValue = (handArray) => {
  return handArray.map((c) => {
    if (h[c]) return h[c];
    return Number(c);
  });
};

const getHandType = (hand) => {
  const h = mapToHandValue(hand.split(""));
  let jokers = 0;
  const values = {};
  for (const c of h) {
    if (c === -1) {
      jokers++;
    } else if (values[c]) {
      values[c]++;
    } else {
      values[c] = 1;
    }
  }

  const sorted = Object.values(values).sort((a, b) => b - a);
  const max = sorted[0];
  const secondMax = sorted[1] || 0;

  if (jokers === 5) return 600;

  if (max === 5) return 600;
  if (max === 4) return 500 + jokers * 100;
  if (max === 3 && secondMax === 2) return 400;
  if (max === 3) {
    if (jokers === 0) return 300;
    if (jokers === 1) return 500;
    if (jokers === 2) return 600;
  }
  if (max === 2 && secondMax === 2) {
    if (jokers === 0) return 200;
    if (jokers === 1) return 400;
  }
  if (max === 2) {
    if (jokers === 0) return 100;
    if (jokers === 1) return 300;
    if (jokers === 2) return 500;
    if (jokers === 3) return 600;
  }
  if (max === 1) {
    if (jokers === 0) return 0;
    if (jokers === 1) return 100;
    if (jokers === 2) return 300;
    if (jokers === 3) return 500;
    if (jokers === 4) return 600;
  }
  return 0;
};

hands.sort((one, two) => {
  const oneValue = getHandType(one);
  const twoValue = getHandType(two);

  if (oneValue !== twoValue) {
    return oneValue - twoValue;
  }

  const o = mapToHandValue(one.split(""));
  const t = mapToHandValue(two.split(""));

  for (let i = 0; i < o.length; i++) {
    if (o[i] > t[i]) {
      return 1;
    } else if (o[i] < t[i]) {
      return -1;
    }
  }

  return 0;
});

console.log(
  hands.reduce((sum, hand, i) => {
    return sum + bids.get(hand) * (i + 1);
  }, 0)
);
