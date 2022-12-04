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

const findSumPriorities = function (input) {
  const rucksacks = input.split("\n");
  let total = 0;
  const priorities = {};
  for (let i = 97; i < 123; i++) {
    const letter = String.fromCharCode(i);
    priorities[letter] = i - 96;
  }
  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i);
    priorities[letter] = i - 38;
  }
  rucksacks.forEach((rs) => {
    const comp1 = rs.substring(0, Math.floor(rs.length / 2));
    const comp2 = rs.substring(Math.floor(rs.length / 2));
    const letters1 = new Set();
    const letters2 = new Set();
    const N = comp1.length; // === comp2.length

    for (let i = 0; i < N; i++) {
      if (letters2.has(comp1[i])) {
        total += priorities[comp1[i]];
        break;
      }

      letters1.add(comp1[i]);

      if (letters1.has(comp2[i])) {
        total += priorities[comp2[i]];
        break;
      }

      letters2.add(comp2[i]);
    }
  });
  return total;
};

const answer = findSumPriorities(input);
console.log("answer:", answer);
