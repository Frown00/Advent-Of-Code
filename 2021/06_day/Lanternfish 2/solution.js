const fs = require("fs");

function dayPassed(fishTimer) {
  const timer = parseInt(fishTimer);
  if(timer === 0) {
    return '68';
  }
  if(!timer) return '';
  return (timer - 1).toString();
  // return toString(parseInt(fishTimer) - 1) + ','; 
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  let fishSwarmString = content.replace(/,/g, '');
  // change time day by day until limit reached
  const dayLimit = 256;
  for(let day = 1; day <= dayLimit; day++) {
    let population = '';
    for(let i = 0; i <= fishSwarmString.length; i++) {
      population += dayPassed(fishSwarmString[i])
    }
    fishSwarmString = population;
    console.log(day, fishSwarmString.length);
  }
  return fishSwarmString.length;
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
