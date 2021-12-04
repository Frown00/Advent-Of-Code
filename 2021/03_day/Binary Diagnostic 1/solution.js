const fs = require('fs');

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const binaryCodes = content.split(/\r?\n/);
  const occurrencesCount = []
  for(let binary of binaryCodes) {
    const bits = binary.split('');
    for(let i = 0; i < bits.length; i++) {
      const bit = bits[i];
      occurrencesCount[i] ? occurrencesCount[i][bit]++ : occurrencesCount[i] = { 1: 0, 0: 0}
    }
  }
  const gammaReducer = (previousValue, currentValue) => {
    // 0 > 1
    if(currentValue?.['0'] > currentValue?.['1']) 
      return previousValue + '0';
    // 1 > 0
    return previousValue + '1';

  };
  const gammaRate = occurrencesCount.reduce(gammaReducer, '');
  const epsilonRate = gammaRate.split('').map(n => n === '1' ? '0' : '1').join('');
  const gammaRateInDecimal = parseInt(gammaRate, 2);
  const epsilonRateInDecimal = parseInt(epsilonRate, 2);
  return gammaRateInDecimal * epsilonRateInDecimal;
}

function readContent(path) {
  return fs.readFileSync(path, 'utf-8', (err, data) => {
    if(err) {
      return console.log(err);
    }
  })
}

const solution = solvePuzzle('input.txt');
console.log(solution);