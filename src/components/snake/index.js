import React, { useState, useEffect } from "react";
import "./index.css";
import * as helpers from "./helpers.js";
import "../memory/index.css";
import StatusBar from "../StatusBar";
import * as utils from "../../utils";
import TouchController from "./TouchController";
import ResultModal from "../ResultModal";

function Snake() {
  const [game, setGame] = useState(helpers.generateGame());
  const [gameOver, setGameOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalMs, setIntervalMs] = useState(helpers.initialIntervalMs);
  const [startTime, setStartTime] = useState(Date.now());
  const [scoreCanBeSaved, setScoreCanBeSaved] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    {
      const intervalId = setInterval(() => {
        setGame((oldGame) => {
          const newGame = helpers.tick(oldGame);
          if (helpers.isGameOver(newGame)) {
            setGameOver(true);
            setShowModal(true);
            setScoreCanBeSaved(true);
            return oldGame;
          }
          setIntervalMs(helpers.getIntervalMs(newGame.snake.tail.length));
          return newGame;
        });
      }, intervalMs);
      return () => clearInterval(intervalId);
    }
  }, [gameOver, intervalMs]);

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  function handleKeyPress(event) {
    let newDir;
    switch (event.keyCode) {
      case 37:
      case 65:
        newDir = "left";
        break;
      case 38:
      case 87:
        newDir = "up";
        break;
      case 39:
      case 68:
        newDir = "right";
        break;
      case 40:
      case 83:
        newDir = "down";
        break;
    }
    if (newDir) {
      setGame((oldGame) => {
        return { ...oldGame, commands: [...oldGame.commands, newDir] };
      });
    }
  }

  const cells = [];
  for (let y = 0; y < helpers.height; y++) {
    for (let x = 0; x < helpers.width; x++) {
      const cell = { x, y };
      let className = "";
      if (helpers.isEqual(cell, game.snake.head)) {
        className = " head";
      } else if (helpers.isEqual(cell, game.food)) {
        className = " food";
      } else if (
        game.snake.tail.some((tailCell) => helpers.isEqual(cell, tailCell))
      ) {
        className = " tail";
      }

      cells.push(
        <div key={x + "-" + y} className={"snake-cell" + className}></div>
      );
    }
  }

  function addCommand(dir) {
    setGame((oldGame) => {
      return {
        ...oldGame,
        commands: [...oldGame.commands, dir],
      };
    });
  }

  function onRestart() {
    setGame(helpers.generateGame());
    setGameOver(false);
    setElapsedTime(0);
    setStartTime(Date.now());
    setScoreCanBeSaved(false);
  }

  return (
    <div className="memory-container">
      <StatusBar
        status1={"Time: " + utils.prettifyTime(elapsedTime)}
        status2={`Score: ${helpers.getScore(game)}`}
        onRestart={onRestart}
        onShowLeaderboard={() => setShowModal(true)}
      ></StatusBar>
      <div className="snake-grid">{cells}</div>
      <TouchController onChangeDir={addCommand} />
      <ResultModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        header={gameOver ? "Game over!" : "Leaderboard"}
        body={gameOver ? `You score was ${helpers.getScore(game)}.` : ""}
        fetchLeaderboard={helpers.fetchLeaderboard}
        saveScore={(name) =>
          helpers
            .saveScore(name, helpers.getScore(game), elapsedTime)
            .then(() => setScoreCanBeSaved(false))
        }
        scoreCanBeSaved={scoreCanBeSaved}
      ></ResultModal>
    </div>
  );
}

export default Snake;
