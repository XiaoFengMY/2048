<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";

const data = ref([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);
const score = ref(0);
const status = ref(true);
const message = ref("Game Over");
const generateClassName = (a: any, b: any) => {
  return `grid-cell-${a}-${b}`;
};

const generateIdName = (item: any) => {
  return `grid-cell grid-cell-item-${item}`;
};

const start = () => {
  score.value = 0;
  status.value = true;
  data.value = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  data.value = randomNum(data.value);
};

const randomNum = (grid: any[]) => {
  let empt: any = getEmptyGrid(grid);
  let randNum = Math.random() > 0.2 ? 2 : 4;
  let temp = Math.floor(Math.random() * Math.ceil(empt.length));
  let randCoord = empt[temp];
  grid[randCoord[0]][randCoord[1]] = randNum;
  return grid;
};

const getEmptyGrid = (grid: any[]) => {
  let temp = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        temp.push([i, j]);
      }
    }
  }
  return temp;
};

const isGameOver = () => {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (data.value[r][c] == 0) {
        return false;
      }
      //此处判断位置不对
      if (data.value[r][c] == 8192) {
        message.value = "Game Win";
        return true;
      }
      if (c < 3) {
        if (data.value[r][c] == data.value[r][c + 1]) {
          return false;
        }
      }
      if (r < 3) {
        if (data.value[r][c] == data.value[r + 1][c]) {
          return false;
        }
      }
    }
  }
  message.value = "Game Over";
  return true;
};

const moveLeft = () => {
  let before = JSON.stringify(data.value);
  for (let r = 0; r < 4; r++) {
    moveLeftinRow(r);
  }
  let after = JSON.stringify(data.value);
  if (before != after) {
    data.value = randomNum(data.value);
    if (isGameOver()) {
      status.value = false;
    }
  }
};

const moveLeftinRow = (r: number) => {
  for (let c = 0; c < 3; c++) {
    let nextC = moveLeftNum(r, c);
    if (nextC != -1) {
      if (data.value[r][c] == 0) {
        data.value[r][c] = data.value[r][nextC];
        data.value[r][nextC] = 0;
        c--;
      } else if (data.value[r][c] == data.value[r][nextC]) {
        data.value[r][c] *= 2;
        data.value[r][nextC] = 0;
        score.value += data.value[r][c];
      }
    } else {
      break;
    }
  }
};

const moveLeftNum = (r: number, c: number) => {
  for (let i = c + 1; i < 4; i++) {
    if (data.value[r][i] != 0) {
      return i;
    }
  }
  return -1;
};

const moveRight = () => {
  let before = JSON.stringify(data.value);
  for (let r = 0; r < 4; r++) {
    moveRightinRow(r);
  }
  let after = JSON.stringify(data.value);
  if (before != after) {
    data.value = randomNum(data.value);
    if (isGameOver()) {
      status.value = false;
    }
  }
};

const moveRightinRow = (r: number) => {
  for (let c = 3; c >= 0; c--) {
    let nextC = moveRightNum(r, c);
    if (nextC != -1) {
      if (data.value[r][c] == 0) {
        data.value[r][c] = data.value[r][nextC];
        data.value[r][nextC] = 0;
        c++;
      } else if (data.value[r][c] == data.value[r][nextC]) {
        data.value[r][c] *= 2;
        data.value[r][nextC] = 0;
        score.value += data.value[r][c];
      }
    } else {
      break;
    }
  }
};

const moveRightNum = (r: number, c: number) => {
  for (let i = c - 1; i >= 0; i--) {
    if (data.value[r][i] != 0) {
      return i;
    }
  }
  return -1;
};

const moveUp = () => {
  let before = JSON.stringify(data.value);
  for (let c = 0; c < 4; c++) {
    moveUpinCol(c);
  }
  let after = JSON.stringify(data.value);
  if (before != after) {
    data.value = randomNum(data.value);
    if (isGameOver()) {
      status.value = false;
    }
  }
};

const moveUpinCol = (c: number) => {
  for (let r = 0; r < 3; r++) {
    let nextR = moveUpNum(r, c);
    if (nextR != -1) {
      if (data.value[r][c] == 0) {
        data.value[r][c] = data.value[nextR][c];
        data.value[nextR][c] = 0;
        r--;
      } else if (data.value[r][c] == data.value[nextR][c]) {
        data.value[r][c] *= 2;
        score.value += data.value[r][c];
        data.value[nextR][c] = 0;
      }
    } else {
      break;
    }
  }
};

const moveUpNum = (r: number, c: number) => {
  for (let i = r + 1; i < 4; i++) {
    if (data.value[i][c] != 0) {
      return i;
    }
  }
  return -1;
};

const moveDown = () => {
  let before = JSON.stringify(data.value);
  for (let c = 0; c < 4; c++) {
    moveDowninCol(c);
  }
  let after = JSON.stringify(data.value);
  if (before != after) {
    data.value = randomNum(data.value);
    if (isGameOver()) {
      status.value = false;
    }
  }
};

const moveDowninCol = (c: number) => {
  for (let r = 3; r >= 0; r--) {
    let nextR = moveDownNum(r, c);
    if (nextR != -1) {
      if (data.value[r][c] == 0) {
        data.value[r][c] = data.value[nextR][c];
        data.value[nextR][c] = 0;
        r++;
      } else if (data.value[r][c] == data.value[nextR][c]) {
        data.value[r][c] *= 2;
        score.value += data.value[r][c];
        data.value[nextR][c] = 0;
      }
    } else {
      break;
    }
  }
};

const moveDownNum = (r: number, c: number) => {
  for (let i = r - 1; i >= 0; i--) {
    if (data.value[i][c] != 0) {
      return i;
    }
  }
  return -1;
};

const handleKeyDown = (e: { keyCode: any }) => {
  switch (e.keyCode) {
    case 37:
      console.log("left");
      moveLeft();
      break;
    case 38:
      console.log("up");
      moveUp();
      break;
    case 39:
      console.log("right");
      moveRight();
      break;
    case 40:
      console.log("dwon");
      moveDown();
      break;
    default:
      break;
  }
};

onMounted(() => {
  start();
  window.addEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <Header @re-start="start" :score="score" />
  <div id="grid-container">
    <div v-for="(row, indexR) in data">
      <div
        v-for="(col, indexC) in row"
        :id="generateClassName(indexR, indexC)"
        :class="generateIdName(col)"
      >
        <span v-if="col != 0">{{ col }}</span>
      </div>
    </div>
  </div>
  <div id="gameover" :style="{ display: status ? 'none' : 'block' }">
    <div className="gameover-box">
      <div>
        <h3>{{ message }}</h3>
        <span id="over-score">score:</span>
        <span id="over-score">{{ score }}</span>
      </div>
      <button @click="start()">again</button>
    </div>
  </div>
</template>

<style scoped></style>
