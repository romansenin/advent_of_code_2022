import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const input = readFileSync(path.join(path.dirname(__filename), "../input.txt"), {
  encoding: "utf8",
});

const findMaxCalories = function (input) {
  let maxCalories = 0;
  const elfCalories = input.split("\n\n");
  elfCalories.forEach((eC) => {
    const calories = eC.split("\n");
    const total = calories.reduce((a, b) => Number(a) + Number(b));
    if (total > maxCalories) {
      maxCalories = total;
    }
  });
  return maxCalories;
};

const answer = findMaxCalories(input);
console.log("answer:", answer);
