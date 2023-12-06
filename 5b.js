import { getInput, start, stop } from "./helpers.js";
const input = getInput(5);

start();
const lines = input.split("\n");

const seedRanges = lines[0].split(":")[1].trim().split(" ").map(Number);

const seeds = [];
for (let i = 0; i < seedRanges.length; i += 2) {
  seeds.push({
    start: seedRanges[i],
    end: seedRanges[i] + seedRanges[i + 1],
  });
}

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

let ranges = [...seeds];

for (const map of maps) {
  if (!map.length) continue;

  const newRanges = [];

  ranges.forEach((range) => {
    const overlappingRanges = map.filter((m) => {
      return !(range.start > m.end || range.end < m.start);
    });

    if (!overlappingRanges.length) {
      // no applicable ranges, keep range
      newRanges.push(range);
    } else {
      overlappingRanges.sort((a, b) => a.start - b.start);
      let currStart = range.start;

      // preserve segments of original range that aren't affected by overlaps
      overlappingRanges.forEach((overlap) => {
        if (currStart < overlap.start) {
          newRanges.push({
            start: currStart,
            end: overlap.start,
          });
        }
        currStart = overlap.end + 1;
      });

      overlappingRanges.forEach((overlap) => {
        const affectedMin = Math.max(overlap.start, range.start);
        const affectedMax = Math.min(overlap.end, range.end);

        newRanges.push({
          start: affectedMin + overlap.diff,
          end: affectedMax + overlap.diff,
        });
      });
    }
  });

  ranges = newRanges;
}

stop();
console.log(Math.min(...ranges.map((r) => r.start)));
