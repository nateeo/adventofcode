import { getInput } from "./helpers.js";

const input = getInput(8);

const lines = input.split("\n");

const map = new Map();
const sequence = lines[0].split("");

let currNode = "AAA";
let destNode = "ZZZ";

for (const line of lines.slice(2)) {
  const node = line.split("=")[0].trim();
  const s = line.split("=")[1];
  const [left, right] = s
    .trim()
    .split(",")
    .map((p) => p.replace("(", "").replace(")", "").trim());
  if (!map.get(node)) {
    map.set(node, {
      left,
      right,
    });
  }
}

let stepCount = 0;
let instructionPointer = 0;

while (currNode !== destNode) {
  if (instructionPointer > sequence.length - 1) {
    instructionPointer = 0;
  }
  const move = sequence[instructionPointer];
  const node = map.get(currNode);

  if (move === "L") {
    currNode = node.left;
  } else if (move === "R") {
    currNode = node.right;
  } else {
    throw new Error("move", move);
  }
  stepCount++;
  instructionPointer++;
}

console.log(stepCount);
