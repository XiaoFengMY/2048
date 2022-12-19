import { useState, useEffect, FC } from "react";
import { moveLeft, moveRight, moveUp, moveDown } from "./utils/controls";
import "./App.css";

const App: FC = () => {
  const [data, setData] = useState(() => {
    const initGrid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    let r = Math.floor(Math.random() * 4);
    let c = Math.floor(Math.random() * 4);
    initGrid[r][c] = Math.random() > 0.2 ? 2 : 4;
    return initGrid;
  });
  const [score, setScore] = useState<number>(0);
  const [status, setStatus] = useState<number>(1);

  const randomIntNum = (max: number) => {
    return Math.floor(Math.random() * Math.ceil(max));
  };

  const getEmptyGrid = (grid: any[]) => {
    console.log("grid-getEmptyGrid: ", grid);
    let empt = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] == 0) {
          empt.push([i, j]);
        }
      }
    }
    return empt;
  };

  const generatedNewGrid = (grid: any[]) => {
    let empty = getEmptyGrid(grid);
    let randNum = (randomIntNum(2) + 1) * 2;
    let randCoord = empty[randomIntNum(empty.length)];
    grid[randCoord[0]][randCoord[1]] = randNum;
    return grid;
  };

  const checkMoved = (preGrid: any, curGrid: any) => {
    return String(preGrid) !== String(curGrid) ? true : false;
  };

  const checkWin = (grid: any[]) => {
    return grid.some((row: number[]) => row.includes(8192));
  };

  const move = (grid: any[], direction: string) => {
    let newGrid: any[] = [];
    if (direction === "left") {
      let [newdata, newScore] = moveLeft(grid, score);
      newGrid = newdata;
      setScore(newScore);
    } else if (direction === "right") {
      let [newdata, newScore] = moveRight(grid, score);
      newGrid = newdata;
      setScore(newScore);
    } else if (direction === "up") {
      let [newdata, newScore] = moveUp(grid, score);
      newGrid = newdata;
      setScore(newScore);
    } else if (direction === "down") {
      let [newdata, newScore] = moveDown(grid, score);
      newGrid = newdata;
      setScore(newScore);
    }

    if (checkMoved(grid, newGrid)) {
      if (checkWin(newGrid)) {
        console.log("win game!!!");
        setData([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);
        setScore(0);
      } else {
        newGrid = generatedNewGrid(newGrid);
      }
    }
    return newGrid;
  };
  const handleKeyDown = (e: {
    preventDefault: () => void;
    keyCode: number;
  }) => {
    e.preventDefault();
    if (e.keyCode == 37) {
      console.log("left");
      setData(move(data, "left"));
    } else if (e.keyCode == 38) {
      console.log("up");
      setData(move(data, "up"));
    } else if (e.keyCode == 39) {
      console.log("right");
      setData(move(data, "right"));
    } else if (e.keyCode == 40) {
      console.log("down");
      setData(move(data, "down"));
    }
  };

  useEffect(() => {
    window.onkeydown = handleKeyDown;
    /* return () => {
      window.onkeydown = !handleKeyDown
    } */
  });
  return (
    <>
      <div id="header">
        <h1 className="title">2048</h1>
        <h3 className="author">Created by XiaoFeng</h3>
        <div className="wrapper">
          <div className="score-wrapper">
            <span id="txt">score:</span>
            <span id="score">{score}</span>
          </div>
          <div className="newgame-wrapper">
            <button id="new-game">New Game</button>
          </div>
        </div>
      </div>
      <div id="grid-container">
        {data.map((row, indexR) => {
          return (
            <div key={indexR}>
              {row.map((colum, indexC) => {
                return (
                  <div
                    key={indexC}
                    className={`grid-cell grid-cell-item-${colum}`}
                    id={`grid-cell-${indexR}-${indexC}`}
                  >
                    {colum == 0 ? "" : colum}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div id="gameover">
        <div className="gameover-box">
          <div>
            <h3>GAME OVER</h3>
            <span id="over-score">score:</span>
            <span id="over-score">{score}</span>
          </div>
          <button>again</button>
        </div>
      </div>
    </>
  );
};

export default App;
