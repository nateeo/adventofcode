import { getInput } from "./helpers.js";
const input = getInput(2);

const limits = {
  red: 12,
  green: 13,
  blue: 14,
};

const processGame = (line) => {
  const [game, stats] = line.split(":");
  const gameId = Number(game.split(" ")[1]);
  const rounds = stats.trim().split(";");
  for (const round of rounds) {
    const colors = round.split(",");
    for (const color of colors) {
      const [num, c] = color.trim().split(" ");
      if (limits[c] > num) {
        return {
          isValid: false,
          gameId,
        };
      }
    }
  }
  return {
    isValid: true,
    gameId,
  };
};

let sum = 0;

for (const line of input.split("\n")) {
  const { gameId, isValid } = processGame(line);
  if (isValid) sum += gameId;
}

console.log(sum);
