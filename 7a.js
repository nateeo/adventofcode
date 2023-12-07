import { getInput } from "./helpers.js";

const input = getInput(7);

const lines = input.split("\n");

const hands = [];
const bids = new Map();

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
  J: 11,
  T: 10,
};

const mapToHandValue = (handArray) => {
  return handArray.map((c) => {
    if (h[c]) return h[c];
    return Number(c);
  });
};

const getHandType = (hand) => {
  const h = mapToHandValue(hand.split(""));
  const values = {};
  for (const c of h) {
    if (values[c]) {
      values[c]++;
    } else {
      values[c] = 1;
    }
  }

  const v = Object.values(values);
  const maxDupes = Math.max(...v);
  if (maxDupes === 5) return 600;
  if (maxDupes === 4) return 500;
  if (maxDupes === 3 && v.some((a) => a === 2)) return 400;
  if (maxDupes === 3) {
    return 300;
  }
  let pairCount = 0;
  for (const count of v) {
    if (count === 2) pairCount++;
  }

  if (pairCount === 2) return 200;
  if (pairCount === 1) return 100;
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
