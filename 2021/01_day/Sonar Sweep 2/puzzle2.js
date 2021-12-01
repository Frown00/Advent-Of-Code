const fs = require('fs');

const solvePuzzle = (path) => {
  return fs.readFile(path, 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    const content = data;
    solve(content);
  });
}

function solve(content) {
  const numbers = content.split(/\r?\n/).map(n => parseInt(n));
  let increaseCounter = 0;
  let previousMeasure = numbers[0] + numbers[1] + numbers[2];
  for(let i = 1; i < numbers.length - 2; i++) {
    const current = numbers[i] + numbers[i+1] + numbers[i+2];
    if(previousMeasure < current) 
      increaseCounter++;
    previousMeasure = current;
  } 
  console.log(numbers.length, increaseCounter)
}

solvePuzzle('input2.txt');