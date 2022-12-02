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

const findTotalRPS = function (input) {
  const letterFromCode = {
    A: "r",
    B: "p",
    C: "s",
    X: "r",
    Y: "p",
    Z: "s",
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
    const myLetter = letterFromCode[codes[1]];
    if (opponentLetter === myLetter) {
      total += 3 + pointsFromLetter[myLetter];
    } else if (
      (myLetter === "r" && opponentLetter === "s") ||
      (myLetter === "p" && opponentLetter == "r") ||
      (myLetter === "s" && opponentLetter === "p")
    ) {
      // win scenario
      total += 6 + pointsFromLetter[myLetter];
    } else {
      // lost
      total += pointsFromLetter[myLetter];
    }
  });
  return total;
};

const answer = findTotalRPS(input);
console.log("answer:", answer);
