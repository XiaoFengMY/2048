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

  // Find coordinates of empty squares
  const getEmptySquares = (grid: string | any[]) => {
    let empty = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        if (grid[i][j] === '') {
          empty.push([i, j]);
        }
      }
    }
    return empty;
  }

  // Generate a 2 or 4 in a random empty square 
  const generateNewSquares = (grid: any[]) => {
    let empty = getEmptySquares(grid);
    let randomNum = (randomIntNum(2) + 1) * 2;
    let randomCoord = empty[randomIntNum(empty.length)];
    grid[randomCoord[0]][randomCoord[1]] = randomNum;
    return grid;
  }

  // Check if squares slided; return type: Bool
  // This method is referenced from:
  // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
  // Otherwise, we could loop both grids to compare
  const checkMoved = (prevGrid: any, currGrid: any[]) => {
    return (JSON.stringify(prevGrid) !== JSON.stringify(currGrid)) ? true : false;
  }

  // Check for 2048; return type: Bool
  const checkWin = (grid: any[]) => {
    return grid.some((row: number[]) => row.includes(2048));
  }

  // Check if no moves left; return type: Bool
  const checkMovesLeft = (grid: any[]) => {
    let moves = [
      checkMoved(grid, moveLeft(grid)),
      checkMoved(grid, moveRight(grid)),
      checkMoved(grid, moveUp(grid)),
      checkMoved(grid, moveDown(grid))
    ];
    return moves.includes(true);
  }

  const move = (grid: any[], direction: string) => {
    let newGrid: any[][] = []
    if (direction === 'left') {
      newGrid = moveLeft(grid);
    }

    else if (direction === 'right') {
      newGrid = moveRight(grid);
    }

    else if (direction === 'up') {
      newGrid = moveUp(grid);
    }

    else if (direction === 'down') {
      newGrid = moveDown(grid);
    }

    if (checkMoved(grid, newGrid)) {
      if (checkWin(newGrid)) {
        setStatus(1);
      }
      else {
        newGrid = generateNewSquares(newGrid);
      }
    } else {
      if (!checkMovesLeft(newGrid)) {
        setStatus(0);
      }
    }
    return newGrid;
  }
  const handleKeyDown = (e: {
    preventDefault: () => void;
    keyCode: number;
  }) => {
    e.preventDefault();
    if (e.keyCode == 37) {
      console.log("left");
      setData(move(data,'left'))
    } else if (e.keyCode == 38) {
      console.log("up");
      setData(move(data,'up'))
    } else if (e.keyCode == 39) {
      console.log("right");
      setData(move(data,'right'))
    } else if (e.keyCode == 40) {
      console.log("down");
      setData(move(data,'down'))
    }
  };

  useEffect(() => {
    window.onkeydown = handleKeyDown
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
            <span id="over-score">0</span>
          </div>
          <button>again</button>
        </div>
      </div>
    </>
  );
};

export default App;
