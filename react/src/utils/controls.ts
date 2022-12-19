const moveLeft = (grid: any[], score: number): [any[], number] => {
  let newGrid = [];
  let newScore: number = score;
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] != 0) {
        row.push(grid[i][j]);
      }
    }

    for (let k = 0; k < row.length; k++) {
      if (row[k] == row[k + 1]) {
        row[k] += row[k + 1];
        row[k + 1] = 0;
        newScore += row[k + 1];
      }
    }
    row = row.filter((n) => n);

    let len = grid[i].length - row.length;
    while (len > 0) {
      row.push(0);
      len -= 1;
    }
    newGrid.push(row);
  }
  return [newGrid, newScore];
};

const moveRight = (grid: any[], score: number): [any[], number] => {
  let newGrid = [];
  let newScore: number = score;
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] != 0) {
        row.unshift(grid[i][j]);
      }
    }

    for (let k = row.length - 1; k > 0; k--) {
      if (row[k] == row[k - 1]) {
        row[k] += row[k - 1];
        row[k - 1] = 0;
        newScore += row[k - 1];
      }
    }
    row = row.filter((n) => n);

    let len = grid[i].length - row.length;
    while (len > 0) {
      row.unshift(0);
      len -= 1;
    }
    newGrid.push(row);
  }
  return [newGrid, newScore];
};

const moveUp = (grid: any[], score: number): [any[], number] => {
  let newGrid = [];
  let tempGrid = [];
  let newScore: number = score;
  for (let i = 0; i < grid.length; i++) {
    let col = [];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[j][i] != 0) {
        col.push(grid[j][i]);
      }
    }

    for (let k = 0; k < col.length; k++) {
      if (col[k] == col[k + 1]) {
        col[k] += col[k + 1];
        col[k + 1] = 0;
        newScore += col[k + 1];
      }
    }
    col = col.filter((n) => n);

    let len = grid[i].length - col.length;
    while (len > 0) {
      col.push(0);
      len -= 1;
    }
    tempGrid.push(col);
  }
  for (let i = 0; i < tempGrid.length; i++) {
    let newCol = [];
    for (let j = 0; j < tempGrid[i].length; j++) {
      newCol.push(tempGrid[j][i]);
    }
    newGrid.push(newCol);
  }
  return [newGrid, newScore];
};

const moveDown = (grid: any[], score: number): [any[], number] => {
  let newGrid = [];
  let tempGrid = [];
  let newScore: number = score;
  for (let i = 0; i < grid.length; i++) {
    let col = [];
    for (let j = 0; j < grid[i].length ; j++) {
      if (grid[j][i] != 0) {
        col.push(grid[j][i]);
      }
    }

    for (let k = col.length - 1; k > 0; k--) {
      if (col[k] == col[k - 1]) {
        col[k] += col[k - 1];
        col[k - 1] = 0;
        newScore += col[k + 1];
      }
    }
    col = col.filter((n) => n);

    let len = grid[i].length - col.length;
    while (len > 0) {
      col.unshift(0);
      len -= 1;
    }
    tempGrid.push(col);
  }
  for (let i = 0; i < tempGrid.length; i++) {
    let newCol = [];
    for (let j = 0; j < tempGrid[i].length; j++) {
      newCol.push(tempGrid[j][i]);
    }
    newGrid.push(newCol);
  }
  return [newGrid, newScore];
};

export { moveLeft, moveRight, moveUp, moveDown };
