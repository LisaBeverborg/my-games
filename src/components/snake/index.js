import React, { useState, useEffect } from "react";
import "./index.css";
import * as helpers from "./helpers.js";
import "../memory/index.css";
import StatusBar from "../StatusBar";
import * as utils from "../../utils";
import TouchController from "./TouchController";
import ResultModal from "../ResultModal";

const width = 20;
const height = 12;

function Snake() {
  const [game, setGame] = useState(helpers.generateGame());
  const [gameOver, setGameOver] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalMs, setIntervalMs] = useState(helpers.initialIntervalMs);
  const [startTime, setStartTime] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [scoreIsSaved, setScoreIsSaved] = useState(false);

  /*useEffect(() => {
    if (gameOver) return;
    const intervalId = setInterval(
      () =>
        setGame((oldGame) => {
          const newGame = helpers.tick(oldGame);
          if (helpers.isGameOver(newGame)) {
            setGameOver(true);
            console.log("You loose!");
            return oldGame;
          }
          return newGame;
        }),
      400
    );
    return () => clearInterval(intervalId);
  }, [gameOver]);
  */

  useEffect(() => {
    if (!gameOver) {
      const intervalId = setInterval(() => {
        setGame((oldGame) => {
          const newGame = helpers.tick(oldGame);
          if (newGame.isOver) {
            setGameOver(true);
            setShowModal(true);
          }
          setIntervalMs(helpers.getIntervalMs(newGame));
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
        return { ...oldGame, snake: { ...oldGame.snake, dir: newDir } };
      });
    }
  }

  const cells = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
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
    if (dir) {
      setGame((oldGame) => {
        return {
          ...oldGame,
          commands: [...oldGame.commands, dir],
        };
      });
    }
  }

  function onRestart() {
    setGame(helpers.generateGame());
    setGameOver(false);
    setElapsedTime(0);
    setIntervalMs(helpers.initialIntervalMs);
    setStartTime(Date.now());
    setScoreIsSaved(false);
  }

  return (
    <div className="memory-container">
      <StatusBar
        status1={"Time: " + utils.prettifyTime(elapsedTime)}
        status2={"Score: " + helpers.getScore(game)}
        onRestart={onRestart}
        onShowLeaderboard={() => setShowModal(true)}
      ></StatusBar>
      <div className="snake-grid">{cells}</div>
      <TouchController onChangeDir={addCommand} />
      <ResultModal
        show={showModal}
        header={gameOver ? "Game over!" : "Leaderboard"}
        body={gameOver && "You score was " + helpers.getScore(game) + "."}
        handleClose={() => setShowModal(false)}
        fetchLeaderboard={helpers.fetchLeaderboard}
        saveScore={gameOver && !scoreIsSaved && helpers.saveScore}
      ></ResultModal>
    </div>
  );
}

export default Snake;
