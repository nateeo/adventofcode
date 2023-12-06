import { getInput } from "./helpers.js";
const input = getInput(6);

const lines = input.split("\n");

const time = Number(lines[0].split(":")[1].trim().split(/[ ]+/).join(""));
const distance = Number(lines[1].split(":")[1].trim().split(/[ ]+/).join(""));

const numWays = [];

const totalTime = time;

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

console.log(numWays.reduce((product, curr) => curr * product));
