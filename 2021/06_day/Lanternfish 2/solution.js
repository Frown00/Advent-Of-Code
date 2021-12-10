const fs = require("fs");

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  let fishTimers = content.split(',').sort((a, b) => b - a);
  const highestTimer = fishTimers[0];
  let fishSwarm = {};
  for(let i = 0; i <= highestTimer; i++) {
    fishSwarm[i] = {};
    fishSwarm[i] = fishTimers.filter(n => n === i.toString()).length ?? 0;
  }
  // change time day by day until limit reached
  const dayLimit = 256;
  const maxDays = 8;
  const resetDay = 6;
  for(let day = 1; day <= dayLimit; day++) {
    const newFishSwarm = {...fishSwarm};
    // create new
    newFishSwarm[resetDay] = (fishSwarm[0] ?? 0) + (fishSwarm[resetDay + 1] ?? 0);
    newFishSwarm[maxDays] = fishSwarm[0] ?? 0;
    for(let i = 0; i < maxDays; i++) {
      if(i === resetDay) { 
        // do nothing
      } 
      else
        newFishSwarm[i] = fishSwarm[i + 1] ?? 0;
    }
    fishSwarm = { ...newFishSwarm };
  }
  let sum = 0;
  for(let key in fishSwarm) {
    sum += fishSwarm[key]
  }
  return sum;
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
