const fs = require("fs");

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const lines = content.split(/\r?\n/);
  return 0;
}

function readContent(path) {
  return fs.readFileSync(path, "utf-8", (err, data) => {
    if (err) {
      return console.log(err);
    }
  });
}

const solution = solvePuzzle("input.txt");
console.log(solution);
