import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const input = readFileSync(path.join(path.dirname(__filename), "../input.txt"), {
  encoding: "utf8",
});

const findSumTop3Calories = function (input) {
  let top1 = 0;
  let top2 = 0;
  let top3 = 0;
  const elfCalories = input.split("\n\n");
  elfCalories.forEach((eC) => {
    const calories = eC.split("\n");
    const total = Number(calories.reduce((a, b) => Number(a) + Number(b)));
    if (total > top1) {
      top3 = top2;
      top2 = top1;
      top1 = total;
    }
    else if (total > top2) {
      top3 = top2;
      top2 = total;
    }
    else if (total > top3) {
      top3 = total;
    }
  });
  return top1 + top2 + top3;
};

const answer = findSumTop3Calories(input);
console.log("answer:", answer);
