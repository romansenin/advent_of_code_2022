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

/*
  @param {String[]} strings
  @return {String}
*/
const findCommonLetter = function (strings) {
  const N = strings.length;
  const map = {};
  for (let i = 0; i < N; i++) {
    const string = strings[i];
    const seenLetters = new Set();
    for (let j = 0; j < string.length; j++) {
      if (seenLetters.has(string[j])) {
        continue;
      }
      seenLetters.add(string[j]);
      if (string[j] in map) {
        map[string[j]]++;
        if (map[string[j]] === N) {
          return string[j];
        }
      } else {
        map[string[j]] = 1;
      }
    }
  }
};

/*
  @param {String} input
  @return {Number}
*/
const findSumPrioritiesGroups = function (input) {
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
  let count = 1;
  let strings = [];

  rucksacks.forEach((rs) => {
    strings.push(rs);
    if (count % 3 === 0) {
      const commonLetter = findCommonLetter(strings);
      total += priorities[commonLetter];
      strings = [];
    }

    count++;
  });
  return total;
};

const answer = findSumPrioritiesGroups(input);
console.log("answer:", answer);
