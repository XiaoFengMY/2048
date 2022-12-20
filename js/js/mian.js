let game = {
  data: [],
  score: 0,
  gamerunning: 1,
  gameover: 0,
  status: 1,
  start: function () {
    this.data = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.score = 0;
    this.status = this.gamerunning;
    this.randomNum();
    this.randomNum();
    this.randomNum();
    this.randomNum();
    this.randomNum();
    this.dataView();
  },
  randomNum: function () {
    while (true) {
      let r = Math.floor(Math.random() * 4);
      let c = Math.floor(Math.random() * 4);
      if (this.data[r][c] == 0) {
        let num = Math.random() > 0.2 ? 2 : 4;
        this.data[r][c] = num;
        break;
      }
    }
  },
  dataView: function () {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        let div = document.getElementById("grid-cell-" + r + "-" + c);
        if (this.data[r][c] != 0) {
          div.innerHTML = this.data[r][c];
          div.className = "grid-cell grid-cell-item-" + this.data[r][c];
        } else {
          div.innerHTML = "";
          div.className = "grid-cell";
        }
      }
    }
    document.getElementById("score").innerHTML = this.score;
    if (this.status == this.gameover) {
      document.getElementById("gameover").style.display = "block";
      document.getElementById("over-score").innerHTML = this.score;
    } else {
      document.getElementById("gameover").style.display = "none";
    }
  },
  isGameOver: function () {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.data[r][c] == 0) {
          return false;
        }
        if (c < 3) {
          if (this.data[r][c] == this.data[r][c + 1]) {
            return false;
          }
        }
        if (r < 3) {
          if (this.data[r][c] == this.data[r + 1][c]) {
            return false;
          }
        }
      }
    }
    return true;
  },
  moveLeft: function () {
    let before = String(this.data);
    for (let r = 0; r < 4; r++) {
      this.moveLeftinRow(r);
    }
    let after = String(this.data);
    if (before != after) {
      this.randomNum();
      if (this.isGameOver()) {
        this.status = this.gameover;
      }
      this.dataView();
    }
  },
  moveLeftinRow: function (r) {
    for (let c = 0; c < 3; c++) {
      let nextC = this.moveLeftNum(r, c);
      if (nextC != -1) {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[r][nextC];
          this.data[r][nextC] = 0;
          c--;
        } else if (this.data[r][c] == this.data[r][nextC]) {
          this.data[r][c] *= 2;
          this.data[r][nextC] = 0;
          this.score += this.data[r][c];
        }
      } else {
        break;
      }
    }
  },
  moveLeftNum: function (r, c) {
    for (let i = c + 1; i < 4; i++) {
      if (this.data[r][i] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveRight: function () {
    let before = String(this.data);
    for (let r = 0; r < 4; r++) {
      this.moveRightinRow(r);
    }
    let after = String(this.data);
    if (before != after) {
      this.randomNum();
      if (this.isGameOver()) {
        this.status = this.gameover;
      }
      this.dataView();
    }
  },
  moveRightinRow: function (r) {
    for (let c = 3; c >= 0; c--) {
      let nextC = this.moveRightNum(r, c);
      if (nextC != -1) {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[r][nextC];
          this.data[r][nextC] = 0;
          c++;
        } else if (this.data[r][c] == this.data[r][nextC]) {
          this.data[r][c] *= 2;
          this.data[r][nextC] = 0;
          this.score += this.data[r][c];
        }
      } else {
        break;
      }
    }
  },
  moveRightNum: function (r, c) {
    for (let i = c - 1; i >= 0; i--) {
      if (this.data[r][i] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveUp: function () {
    let before = String(this.data);
    for (let c = 0; c < 4; c++) {
      this.moveUpinRow(c);
    }
    let after = String(this.data);
    if (before != after) {
      this.randomNum();
      if (this.isGameOver()) {
        this.status = this.gameover;
      }
      this.dataView();
    }
  },
  moveUpinRow: function (c) {
    for (let r = 0; r < 3; r++) {
      let nextR = this.moveUpNum(r, c);
      if (nextR != -1) {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[nextR][c];
          this.data[nextR][c] = 0;
          r--;
        } else if (this.data[r][c] == this.data[nextR][c]) {
          this.data[r][c] *= 2;
          this.data[nextR][c] = 0;
          this.score += this.data[r][c];
        }
      } else {
        break;
      }
    }
  },
  moveUpNum: function (r, c) {
    for (let i = r + 1; i < 4; i++) {
      if (this.data[i][c] != 0) {
        return i;
      }
    }
    return -1;
  },
  moveDown: function () {
    let before = String(this.data);
    for (let c = 0; c < 4; c++) {
      this.moveDowninRow(c);
    }
    let after = String(this.data);
    if (before != after) {
      this.randomNum();
      if (this.isGameOver()) {
        this.status = this.gameover;
      }
      this.dataView();
    }
  },
  moveDowninRow: function (c) {
    for (let r = 3; r >= 0; r--) {
      let nextR = this.moveDownNum(r, c);
      if (nextR != -1) {
        if (this.data[r][c] == 0) {
          this.data[r][c] = this.data[nextR][c];
          this.data[nextR][c] = 0;
          r++;
        } else if (this.data[r][c] == this.data[nextR][c]) {
          this.data[r][c] *= 2;
          this.data[nextR][c] = 0;
          this.score += this.data[r][c];
        }
      } else {
        break;
      }
    }
  },
  moveDownNum: function (r, c) {
    for (let i = r - 1; i >= 0; i--) {
      if (this.data[i][c] != 0) {
        return i;
      }
    }
    return -1;
  },
};

document.onkeydown = function () {
  if (window.event.keyCode == 37) {
    console.log("left");
    game.moveLeft();
  } else if (window.event.keyCode == 38) {
    console.log("up");
    game.moveUp();
  } else if (window.event.keyCode == 39) {
    console.log("right");
    game.moveRight();
  } else if (window.event.keyCode == 40) {
    console.log("down");
    game.moveDown();
  }
};

game.start();
console.log(game.data);
console.log(game.score);

function again() {
  document.getElementById("gameover").style.display = "none";
  window.location.href = "index.html";
}
