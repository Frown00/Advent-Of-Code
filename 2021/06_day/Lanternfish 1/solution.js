const fs = require("fs");

class Lanternfish {
  #internalTimer
  constructor(internalTimer) {
    this.#internalTimer = internalTimer;
  }

  dayPassed() {
    // produce new Laternfish
    if(this.#internalTimer === 0) {
      this.#internalTimer = 6;
      return new Lanternfish(8);
    }
    this.#internalTimer -= 1;
    return null; 
  }
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const fishTimers = content.split(',');
  const fishSwarm = [];
  // load initial lanternfishes
  for(let i = 0; i < fishTimers.length; i++) {
    if(fishTimers[i])
      fishSwarm.push(new Lanternfish(parseInt(fishTimers[i])));
  }
  // change time day by day until limit reached
  const dayLimit = 80;
  for(let day = 1; day <= dayLimit; day++) {
    const swarmLength = fishSwarm.length;
    for(let i = 0; i < swarmLength; i++) {
      const newLaternFish = fishSwarm[i].dayPassed();
      if(newLaternFish) fishSwarm.push(newLaternFish);
    }
  }
  return fishSwarm.length;
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
