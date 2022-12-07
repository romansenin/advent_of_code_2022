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

const findFullyContainingRanges = function (input) {
  const pairs = input.split("\n");
  let count = 0;
  pairs.forEach((pair) => {
    const ranges = pair.split(",");
    const firstRange = ranges[0];
    const secondRange = ranges[1];
    const firstEndpoints = firstRange.split("-");
    const secondEndpoints = secondRange.split("-");
    const num1 = Number(firstEndpoints[0]);
    const num2 = Number(firstEndpoints[1]);
    const num3 = Number(secondEndpoints[0]);
    const num4 = Number(secondEndpoints[1]);

    if ((num1 >= num3 && num2 <= num4) || (num3 >= num1 && num4 <= num2)) {
      count++;
    }
  });
  return count;
};

const answer = findFullyContainingRanges(input);
console.log("answer:", answer);
