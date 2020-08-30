import React, { useState, useRef } from "react";
import MsCell from "./MsCell";
import ModeSwitch from "./ModeSwitch";
import "./index.css";
import * as helpers from "./helpers";

function Minesweeper() {
  const [grid, setGrid] = useState(helpers.generateGrid());
  const [win, setWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isMarkMode, setIsMarkMode] = useState(false);

  const cells = [];

  for (let y = 0; y < helpers.height; y++) {
    for (let x = 0; x < helpers.width; x++) {
      cells.push(
        <MsCell
          {...grid[y * helpers.width + x]}
          minesAround={helpers.calculateMinesAround(grid, x, y)}
          key={`${y} ${x}`}
          onClick={() =>
            isMarkMode ? onCellRightClick(x, y) : onCellClick(x, y)
          }
          onRightClick={() => onCellRightClick(x, y)}
        ></MsCell>
      );
    }
  }

  function onCellClick(x, y) {
    if (win || gameOver) return;

    setGrid((oldGrid) => {
      let newGrid = helpers.openCells(oldGrid, x, y);
      if (oldGrid[y * helpers.width + x].isMine) {
        setGameOver(true);
        newGrid = helpers.openAllMines(newGrid);
        console.log("Game over");
      } else if (helpers.isWin(newGrid)) {
        setWin(true);
        console.log("You win!");
      }
      return newGrid;
    });
  }

  function onCellRightClick(x, y) {
    if (win || gameOver) return;
    setGrid((oldGrid) => helpers.markCell(oldGrid, x, y));
  }

  return (
    <div className="game-container">
      <div className="ms-grid">{cells}</div>
      <ModeSwitch
        isMarkMode={isMarkMode}
        onChange={() => setIsMarkMode(!isMarkMode)}
      />
    </div>
  );
}

export default Minesweeper;
