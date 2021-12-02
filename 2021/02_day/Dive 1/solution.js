const fs = require('fs');

const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  FORWARD: 'forward'
}

const shipPosition = {
  x: 0,
  depth: 0
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const commands = content.split(/\r?\n/);
  for(let command of commands) {
    const [direction, number] = command.split(' ');
    switch(direction) {
      case DIRECTION.UP: shipPosition.depth -= parseInt(number); break;
      case DIRECTION.DOWN: shipPosition.depth +=  parseInt(number); break;
      case DIRECTION.FORWARD: shipPosition.x += parseInt(number); break;
    }
  }
  return shipPosition.x * shipPosition.depth;
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