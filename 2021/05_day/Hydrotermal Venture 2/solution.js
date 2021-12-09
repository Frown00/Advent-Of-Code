const fs = require("fs");

class OveralappingDiagram {
  #diagram = [];
  addPoints(points) {
    for(let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      if(!this.#diagram[x]) this.#diagram[x] = [];
      if(!this.#diagram[x][y]) this.#diagram[x][y] = 0;
      this.#diagram[x][y] += 1;
    }
  }

  getOveralappingNumber() {
    let number = 0;
    for(let i = 0; i < this.#diagram.length; i++) {
      for(let j = 0; j < this.#diagram[i]?.length; j++) {
        const point = this.#diagram[i][j];
        if(point >= 2) {
          number++;
        }
      }
    }
    return number;
  }
}

// only vertial or horizontal ones with "a" and "b"
function getBeteenPoints(a, b) {
  const betweenPoints = [];
  const p1 = a.split(",").map((n) => parseInt(n));
  const p2 = b.split(",").map((n) => parseInt(n));
  if(p1[0] === p2[0]) {
    // y rise
    const higher = p1[1] > p2[1] ? p1[1] : p2[1];
    const lower = p1[1] < p2[1] ? p1[1] : p2[1];
    for(let y = lower; y <= higher; y++) {
      betweenPoints.push([p1[0], y])
    }
  } else if(p1[1] === p2[1]) {
    // x rise
    const higher = p1[0] > p2[0] ? p1[0] : p2[0];
    const lower = p1[0] < p2[0] ? p1[0] : p2[0];
    for(let x = lower; x <= higher; x++) {
      betweenPoints.push([x, p1[1]])
    }
  } else {
    // only for diagonal points
    // otherwise it would gives wrong data
    const leftPoint = p1[0] < p2[0] ? p1 : p2;
    const rightPoint = p1[0] > p2[0] ? p1 : p2;
    const changeY = leftPoint[1] < rightPoint[1] ? 1 : -1;
    let y = leftPoint[1]; 
    for(let x = leftPoint[0]; x <= rightPoint[0]; x++) {
      betweenPoints.push([x, y])
      y += changeY;
    }
  }
  return betweenPoints;
}

function solvePuzzle(puzzlePath) {
  const content = readContent(puzzlePath);
  const lines = content.split(/\r?\n/);
  const diagram = new OveralappingDiagram();
  for (let i = 0; i < lines.length; i++) {
    const [p1, p2] = lines[i].split("->");
    const between = getBeteenPoints(p1.trim(), p2.trim());
    diagram.addPoints(between);
  }
  return diagram.getOveralappingNumber();
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
