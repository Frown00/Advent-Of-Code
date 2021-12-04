const fs = require('fs');

const RATING_TYPE = {
  OXYGEN: 'oxygen generator rating',
  CO2: 'CO2 srubber rating'
};

const convertToDecimal = (binary) => parseInt(binary, 2); 
const sumBinariesToDecimal = (arr) => arr
  .reduce((prev, binary) => prev + convertToDecimal(binary), 0);

function bitCriteria(binaryCodes, ratingType, i) {
  let zeroes = 0;
  let ones = 0;
  for(let binary of binaryCodes) {
    const bits = binary.split('');
    if(bits[i] === '0') zeroes++;
    else if(bits[i] === '1') ones++; 
  }
  let keepWithBitValue = null;
  if(ratingType === RATING_TYPE.OXYGEN) {
    keepWithBitValue = zeroes > ones ? '0' : '1';
  }
  else if(ratingType === RATING_TYPE.CO2) {
    keepWithBitValue = zeroes <= ones ? '0' : '1';
  }

  const selectedCodes = binaryCodes.filter(code => code[i] === keepWithBitValue);
  if(selectedCodes.length < 1) return binaryCodes;
  else if(selectedCodes.length === 1) return selectedCodes;
  i++;
  return bitCriteria(selectedCodes, ratingType, i);
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const binaryCodes = content.split(/\r?\n/);
  const oxygenGeneratorRating = bitCriteria(binaryCodes, RATING_TYPE.OXYGEN, 0);
  const co2ScrubberRating = bitCriteria(binaryCodes, RATING_TYPE.CO2, 0);
  return sumBinariesToDecimal(oxygenGeneratorRating) * sumBinariesToDecimal(co2ScrubberRating);
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