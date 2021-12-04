const fs = require('fs');
const BingoCard = require('./BingoCard');

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const lines = content.split(/\r?\n/);
  const selectedNumbers = lines.shift().split(',');
  const bingoCards = transformInputIntoBingoCards(lines);
  let winningCards = [];
  const alreadySelected = [];
  for(let number of selectedNumbers) {
    alreadySelected.push(number);
    for(let bingoCard of bingoCards) {
      const isBingo = bingoCard.check(number);
      if(isBingo) {
        winningCards.push(bingoCard);
      }
    }
  }
  const lastWinning = winningCards[winningCards.length - 1];
  return lastWinning.getWinningNumber();
}

function transformInputIntoBingoCards(input) {
  const bingoCards = [];
  let rows = [];
  let id = 0;
  for(let line of input) {
    if(line === '' && rows.length > 0) {
      const bingoCard = new BingoCard(rows, id);
      bingoCards.push(bingoCard);
      rows = [];
      id++;
    } else if(line !== '') {
      rows.push(line);
    }
  }
  return bingoCards;
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