import { getInput } from "./helpers.js";
const input = getInput(2);

const processGame = (line) => {
  const result = {
    red: 0,
    green: 0,
    blue: 0,
  };
  const [_, stats] = line.split(":");
  const rounds = stats.trim().split(";");
  for (const round of rounds) {
    const colors = round.split(",");
    for (const color of colors) {
      const [num, c] = color.trim().split(" ");
      const numBlocks = Number(num);
      if (result[c] < numBlocks) {
        result[c] = numBlocks;
      }
    }
  }

  return result.red * result.green * result.blue;
};

let sum = 0;

for (const line of input.split("\n")) {
  const power = processGame(line);
  sum += power;
}

console.log(sum);
