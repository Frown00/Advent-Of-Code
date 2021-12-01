const fs = require('fs');

const readFile = () => {
  return fs.readFile('input.txt', 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
    const content = data;
    processFile(content);
  });
}

function processFile(content) {
  const numbers = content.split(/\r?\n/).map(n => parseInt(n));
  let increaseCounter = 0;
  let previousMeasure = numbers[0];
  for(let i = 1; i < numbers.length; i++) {
    const current = numbers[i];
    if(previousMeasure < current) 
      increaseCounter++;
    previousMeasure = current;
  } 
  console.log(numbers.length, increaseCounter)
}

readFile();