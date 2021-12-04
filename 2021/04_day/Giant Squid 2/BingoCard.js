const { replaceAt } = require('./util');

// Works only with square bingoes
class BingoCard {
  hits = ''; // binary represetation of hit numbers
  card = []; // 2d string number matrix 
  #_isBingo = false;
  #_id = 0;
  #unmarked = []; // simplification result
  #winningNumber = null;

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
    if(this.#_isBingo) return false;
    this.#markIfHit(withdrawnNumber);
    this.#checkBingoInColumns(withdrawnNumber);
    this.#checkBingoInRows(withdrawnNumber);
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

  getWinningNumber() {
    const sumUnmarked = this.#unmarked.reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
    return sumUnmarked * parseInt(this.#winningNumber);
  }

   // if withdrawn number exists on card then mark it in hits binary code
   #markIfHit(withdrawnNumber) {
    for(let i = 0; i < this.card.length; i++) {
      for(let j = 0; j < this.card[i].length; j++) {
        const numberOnCard = this.card[i][j];
        if(numberOnCard === withdrawnNumber) {
          this.hits = replaceAt(this.hits, i*this.card.length + j, '1');
          this.#unmarked = this.#unmarked.filter(n => n !== withdrawnNumber);
        }
      }
    }
  }

  #checkBingoInColumns(withdrawnNumber) {
    for(let i = 0; i < this.card.length; i++) {
      const columnSegment = this.getHitColumn(i);
      this.#_isBingo = columnSegment.split('').every(v => v === '1');
      if(this.#_isBingo) {
        this.#winningNumber = withdrawnNumber;
        break;
      }
    }
  }

  #checkBingoInRows(withdrawnNumber) {
    let rowSegment = '';
    for(let i = 0; i < this.hits.length; i++) {
      rowSegment += this.hits[i];
      if(rowSegment.length === this.card.length) {
        this.#_isBingo = rowSegment.split('').every(v => v === '1');
        rowSegment = '';
      }
      if(this.#_isBingo) {
        this.#winningNumber = withdrawnNumber;
        break;
      }
    }
  }
}

module.exports = BingoCard;