const fs = require("fs");

function calcMedian(arr) {
  const middle = Math.floor(arr.length / 2);
  if(arr.length % 2 === 0) {
    const middle2 = middle - 1;
    return (arr[middle] + arr[middle2]) / 2
  }
  return arr[middle];
}

function calcFuelConsumtion(crabs, position) {
  let fuelConsumed = 0;
  for(let i = 0; i < crabs.length; i++) {
    fuelConsumed += Math.abs(position - crabs[i])
  }
  return fuelConsumed;
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const crabs = content.split(',').map(n => parseInt(n)).sort((a, b) => a - b);
  const position = Math.floor(calcMedian(crabs));
  const fuelConsumed = calcFuelConsumtion(crabs, position);
  return fuelConsumed;
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
