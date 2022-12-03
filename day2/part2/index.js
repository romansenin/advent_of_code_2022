import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const input = readFileSync(
  path.join(path.dirname(__filename), "../input.txt"),
  {
    encoding: "utf8",
  }
);

const getNeededLetter = function (opponentLetter, scenario) {
  switch (scenario) {
    case "l":
      if (opponentLetter === "r") return "s";
      if (opponentLetter === "p") return "r";
      if (opponentLetter === "s") return "p";
    case "d":
      return opponentLetter;
    case "w":
      if (opponentLetter === "r") return "p";
      if (opponentLetter === "p") return "s";
      if (opponentLetter === "s") return "r";
    default:
      throw new Error("unexpected scenario");
  }
};

const findTotalRPS = function (input) {
  const letterFromCode = {
    A: "r",
    B: "p",
    C: "s",
    X: "l",
    Y: "d",
    Z: "w",
  };

  const pointsFromLetter = {
    r: 1,
    p: 2,
    s: 3,
  };

  let total = 0;

  const rounds = input.split("\n");
  rounds.forEach((round) => {
    const codes = round.split(" ");
    const opponentLetter = letterFromCode[codes[0]];
    const scenario = letterFromCode[codes[1]];
    const myLetter = getNeededLetter(opponentLetter, scenario);
    switch (scenario) {
      case "l":
        total += pointsFromLetter[myLetter];
        break;
      case "d":
        total += 3 + pointsFromLetter[myLetter];
        break;
      case "w":
        total += 6 + pointsFromLetter[myLetter];
        break;
      default:
        throw new Error("unexpected scenario");
    }
  });
  return total;
};

const answer = findTotalRPS(input);
console.log("answer:", answer);
