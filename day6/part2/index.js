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

const findNumCharactersProcessed = function (input) {
  const seenLetters = {};
  let left = 0;
  let right = 0;
  let count = 0;
  while (right < input.length) {
    let letter = input[right];
    if (letter in seenLetters) {
      if (seenLetters[letter] === 0) {
        count++;
      } else if (seenLetters[letter] === 1) {
        count--;
      }
      seenLetters[letter]++;
    } else {
      seenLetters[letter] = 1;
      count++;
    }

    if (count === 14) {
      return right + 1;
    }

    if (right - left === 13) {
      letter = input[left];
      if (letter in seenLetters) {
        if (seenLetters[letter] === 1) {
          count--;
        } else if (seenLetters[letter] === 2) {
          count++;
        }
        seenLetters[letter]--;
      }
      left++;
    }
    right++;
  }
};

const answer = findNumCharactersProcessed(input);
console.log("answer:", answer);
