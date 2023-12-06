import { getInput } from "./helpers.js";
const input = getInput(6);

const lines = input.split("\n");

const times = lines[0].split(":")[1].trim().split(/[ ]+/).map(Number);
const distances = lines[1].split(":")[1].trim().split(/[ ]+/).map(Number);

const numWays = [];

for (let i = 0; i < times.length; i++) {
  const totalTime = times[i];
  const distance = distances[i];

  let minTimeHeld = totalTime;
  let maxTimeHeld = 0;

  for (let j = 0; j < totalTime; j++) {
    if ((totalTime - j) * j > distance) {
      if (j < minTimeHeld) {
        minTimeHeld = j;
      } else if (j > maxTimeHeld) {
        maxTimeHeld = j;
      }
    }
  }
  numWays.push(maxTimeHeld - minTimeHeld + 1);
}

console.log(numWays.reduce((product, curr) => curr * product));
