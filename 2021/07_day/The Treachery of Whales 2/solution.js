const fs = require("fs");

function calcAvg(arr) {
  let sum = 0;
  for(let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

function routeFuelCost(pointA, pointB) {
  const distance = Math.abs(pointA - pointB);
  let cost = 0;
  for(let i = 1; i <= distance; i++) {
    cost += i;
  }
  return cost;
}

function calcFuelConsumtion(crabs, position) {
  let fuelConsumed = 0;
  for(let i = 0; i < crabs.length; i++) {
    fuelConsumed += routeFuelCost(position, crabs[i])
  }
  return fuelConsumed;
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const crabs = content.split(',').map(n => parseInt(n)).sort((a, b) => a - b);
  const position = Math.floor(calcAvg(crabs));
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
