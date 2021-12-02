const fs = require('fs');

const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  FORWARD: 'forward'
}

const ship = {
  x: 0,
  depth: 0,
  aim: 0
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const commands = content.split(/\r?\n/);
  for(let command of commands) {
    const [direction, number] = command.split(' ');
    switch(direction) {
      case DIRECTION.UP: ship.aim -= parseInt(number); break;
      case DIRECTION.DOWN: ship.aim +=  parseInt(number); break;
      case DIRECTION.FORWARD: {
        ship.x += parseInt(number);
        ship.depth += parseInt(number) * ship.aim;
        break;
      }
    }
  }
  return ship.x * ship.depth;
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