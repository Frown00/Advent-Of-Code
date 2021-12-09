const fs = require('fs');

function replaceAt(string, index, replacement) {
  if (index >= string.length) {
      return string.valueOf();
  }

  return string.substring(0, index) + replacement + string.substring(index + 1);
}

// Works only with square bingoes
class BingoCard {
  hits = ''; // binary represetation of hit numbers
  card = []; // 2d string number matrix 
  #_isBingo = false;
  #_id = 0;
  #unmarked = []; // simplification result

  constructor(rows, id) {
    this.#_id = id;
    for(let i = 0; i < rows.length; i++) {
      const row = rows[i];
      this.card[i] = row.split(' ').filter(a => a !== '');
      this.#unmarked.push(...this.card[i]);
    }
    this.hits = '0'.repeat(this.card.length * this.card.length);
  }

  check(withdrawnNumber) {
    // if withdrawn number exists on card then mark it in hits 2d array
    for(let i = 0; i < this.card.length; i++) {
      for(let j = 0; j < this.card[i].length; j++) {
        const numberOnCard = this.card[i][j];
        if(numberOnCard === withdrawnNumber) {
          this.hits = replaceAt(this.hits, i*this.card.length + j, '1');
          this.#unmarked = this.#unmarked.filter(n => n !== withdrawnNumber);
        }
      }
    }
    const width = this.card.length;
    // check if bingo in some column
    for(let i = 0; i < width; i++) {
      const columnSegment = this.getHitColumn(i);
      this.#_isBingo = columnSegment.split('').every(v => v === '1');
      if(this.#_isBingo) break;
    }
    // check if bingo in some row
    let rowSegment = '';
    for(let i = 0; i < this.hits.length; i++) {
      rowSegment += this.hits[i];
      if(rowSegment.length === width) {
        this.#_isBingo = rowSegment.split('').every(v => v === '1');
        rowSegment = '';
      }
      if(this.#_isBingo) break;
    }
    
    return this.#_isBingo;
  };

  getHitColumn(columnNum) {
    let columnSegment = '';
    for(let i = 0; i < this.hits.length; i++) {
      if(i % this.card.length === columnNum) {
        columnSegment += this.hits[i];
      }
    }
    return columnSegment;
  }

  getWinningNumber(lastSelectedNumber) {
    const sumUnmarked = this.#unmarked.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
    return sumUnmarked * parseInt(lastSelectedNumber);
  }
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

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const lines = content.split(/\r?\n/);
  const selectedNumbers = lines.shift().split(',');
  const bingoCards = transformInputIntoBingoCards(lines);
  let winningCard = null;
  const alreadySelected = [];
  for(let number of selectedNumbers) {
    alreadySelected.push(number);
    for(let bingoCard of bingoCards) {
      const isBingo = bingoCard.check(number);
      if(isBingo) {
        winningCard = bingoCard;
        break;
      }
    }
    if(winningCard) {
      break;
    }
  }
  return winningCard.getWinningNumber(alreadySelected[alreadySelected.length - 1]);
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