const moveLeft = (grid: any[]) => {
  let newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== "") {
        row.push(grid[i][j]);
      }
    }
    // Combine
    for (let n = 0; n < row.length; n++) {
      if (row[n] === row[n + 1]) {
        row[n] = parseInt(row[n]) + parseInt(row[n + 1]);
        row[n + 1] = "";
      }
    }
    // Filter out falsy
    row = row.filter((n) => n);
    // Slide all numbers
    let emptySquares = grid.length - row.length;
    while (emptySquares > 0) {
      row.push("");
      emptySquares -= 1;
    }
    newGrid.push(row);
  }
  return newGrid;
};

const moveRight = (grid: any[]) => {
  let newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let row = [];
    for (let j = 0; j < grid.length; j++) {
      if (grid[i][j] !== "") {
        row.push(grid[i][j]);
      }
    }
    // Combine
    for (let n = row.length; n > 0; n--) {
      if (row[n] === row[n - 1]) {
        row[n] = parseInt(row[n]) + parseInt(row[n - 1]);
        row[n - 1] = "";
      }
    }
    // Filter out falsy
    row = row.filter((n) => n);
    // Slide all numbers
    let emptySquares = grid.length - row.length;
    while (emptySquares > 0) {
      row.unshift("");
      emptySquares -= 1;
    }
    newGrid.push(row);
  }
  return newGrid;
};

const moveUp = (grid: any[]) => {
  let newGrid = [];
  let tempGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let col = [];
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] !== "") {
        col.push(grid[j][i]);
      }
    }
    // Combine
    for (let n = 0; n < col.length; n++) {
      if (col[n] === col[n + 1]) {
        col[n] = parseInt(col[n]) + parseInt(col[n + 1]);
        col[n + 1] = "";
      }
    }
    // Filter again
    col = col.filter((n) => n);
    // Slide all numbers
    let emptySquares = grid.length - col.length;
    while (emptySquares > 0) {
      col.push("");
      emptySquares -= 1;
    }
    tempGrid.push(col);
  }
  // Fill new grid at correct coordinates
  for (let i = 0; i < tempGrid.length; i++) {
    let newCol = [];
    for (let j = 0; j < tempGrid.length; j++) {
      newCol.push(tempGrid[j][i]);
    }
    newGrid.push(newCol);
  }
  return newGrid;
};

const moveDown = (grid: any[]) => {
  let newGrid = [];
  let tempGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let col = [];
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] !== "") {
        col.push(grid[j][i]);
      }
    }
    // Combine
    for (let n = col.length; n > 0; n--) {
      if (col[n] === col[n - 1]) {
        col[n] = parseInt(col[n]) + parseInt(col[n - 1]);
        col[n - 1] = "";
      }
    }
    // Filter again
    col = col.filter((n) => n);
    // Slide all numbers
    let emptySquares = grid.length - col.length;
    while (emptySquares > 0) {
      col.unshift("");
      emptySquares -= 1;
    }
    tempGrid.push(col);
  }
  // Fill new grid at correct coordinates
  for (let i = 0; i < tempGrid.length; i++) {
    let newCol = [];
    for (let j = 0; j < tempGrid.length; j++) {
      newCol.push(tempGrid[j][i]);
    }
    newGrid.push(newCol);
  }
  return newGrid;
};

export { moveLeft, moveRight, moveUp, moveDown };
