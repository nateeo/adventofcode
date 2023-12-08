import { getInput } from "./helpers.js";

const input = getInput(8);

const lines = input.split("\n");

const map = new Map();
const sequence = lines[0].split("");

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

let currNodes = [...map.keys()].filter((k) => k.endsWith("A"));
const startNodes = [...currNodes];

const stepsToZ = new Map(startNodes.map((k) => [k, []]));

while ([...stepsToZ.values()].some((s) => s.length < 100)) {
  if (instructionPointer > sequence.length - 1) {
    instructionPointer = 0;
  }
  const move = sequence[instructionPointer];

  currNodes = currNodes.map((n, i) => {
    const node = map.get(n);
    let newNode;
    if (move === "L") {
      newNode = node.left;
    } else if (move === "R") {
      newNode = node.right;
    }
    if (newNode.endsWith("Z")) {
      if (!stepsToZ.get(startNodes[i]).find((n) => n === newNode)) {
        stepsToZ.get(startNodes[i]).push({
          dest: newNode,
          stepCount: stepCount + 1,
        });
      }
    }
    return newNode;
  });
  stepCount++;
  instructionPointer++;
}

const loopSteps = [...stepsToZ.values()].map((v) => v[0]);

const greatestCommonDenom = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return greatestCommonDenom(b, a % b);
  }
};

const lowestCommonMult = (a, b) => {
  return (a * b) / greatestCommonDenom(a, b);
};

console.log(loopSteps.map((l) => l.stepCount).reduce(lowestCommonMult));
