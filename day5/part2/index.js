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

const findTopCratesNewCrane = function (input) {
  const sections = input.split("\n\n");
  const stackInfo = sections[0];
  const stackLayers = stackInfo.split("\n");
  const numCols = stackLayers[0].length;
  const numRows = stackLayers.length - 1;
  const stacks = [];
  for (let col = 0; col < numCols; col++) {
    if (Number(stackLayers[numRows][col])) {
      const stack = [];
      for (let row = numRows - 1; row >= 0; row--) {
        if (stackLayers[row][col] === " ") {
          break;
        }
        stack.push(stackLayers[row][col]);
      }
      stacks.push(stack);
    }
  }

  const instructions = sections[1];
  instructions.split("\n").forEach((i) => {
    const nums = i.match(/\d+/g);
    const numTimes = nums[0];
    const source = nums[1] - 1;
    const dest = nums[2] - 1;
    const items = stacks[source].splice(
      stacks[source].length - numTimes,
      numTimes
    );
    stacks[dest] = stacks[dest].concat(items);
  });

  return stacks.reduce((a, b) => a + b[b.length - 1], "");
};

const answer = findTopCratesNewCrane(input);
console.log("answer:", answer);
