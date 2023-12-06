import { getInput } from "./helpers.js";
const input = getInput(5);
const lines = input.split("\n");

const seeds = lines[0].split(":")[1].trim().split(" ").map(Number);

const maps = [];

let currentMap = [];

for (const line of lines) {
  if (line.includes("map:")) {
    maps.push(currentMap.sort((a, b) => a.start - b.start));
    currentMap = [];
  } else if (line.trim() && !line.startsWith("seeds")) {
    const [destinationNum, sourceNum, range] = line.split(" ");
    currentMap.push({
      start: Number(sourceNum),
      end: Number(sourceNum) + Number(range),
      diff: Number(destinationNum) - Number(sourceNum),
    });
  }
}

maps.push(currentMap);

const locations = seeds.map((seed) => {
  let currNumber = seed;
  for (const map of maps) {
    const targetMap = map.find((m) => {
      return currNumber >= m.start && currNumber < m.end;
    });
    if (targetMap) {
      currNumber = currNumber + targetMap.diff;
    }
  }
  return currNumber;
});

console.log(Math.min(...locations));
