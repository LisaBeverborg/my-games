import React, { useState, useEffect } from "react";
import "./index.css";
import StatusBar from "../StatusBar";
import MemoryCard from "./MemoryCard";
import * as utils from "../../utils";
import * as helpers from "./helpers";
import ResultModal from "../ResultModal";

function Memory() {
  // [<current state>, <function to update state>] = useState(<initial state>)
  const [game, setGame] = useState({
    cards: helpers.generateCards(),
  });
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useEffect(<effect function>, <dependency array> - optional)
  // <dependency array>:
  // * undefined: effect function will be run on every render
  // * []: effect will run only on the first render
  // * [value1, value2]: effect will run when any of the values change
  // effect function returns a cleanup function (optional)
  //   that runs next time the effect function is run OR when the component
  //   unmounts (disappears from the DOM)
  useEffect(() => {
    if (startTime !== 0 && !win) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, win]);

  // When win becomes true, show the modal.
  useEffect(() => {
    if (win) {
      setShowModal(true);
    }
  }, [win]);

  // Is called whenever a card is clicked. Sets the new game state
  // and starts the timer (sets the start time), if it wasn't already started.
  function onCardClicked(clickedCard) {
    setGame((oldGame) =>
      helpers.calculateNewGame(oldGame, clickedCard, () => setWin(true))
    );
    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    );
  }

  // Runs when the restart button is clicked, resets the state with the new cards.
  function onRestart() {
    setGame({
      cards: helpers.generateCards(),
    });
    setStartTime(0);
    setElapsedTime(0);
    setWin(false);
  }

  return (
    <div className="memory">
      <div className="memory-container">
        <StatusBar
          status={"Time: " + elapsedTime}
          onRestart={onRestart}
        ></StatusBar>
        <div className="memory-grid">
          {game.cards.map((card) => (
            <MemoryCard
              key={card.key}
              color={card.color}
              isFlipped={card.isFlipped}
              onClick={() => onCardClicked(card)}
            />
          ))}
        </div>
      </div>
      <ResultModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        header={"Congratulations, you won!"}
        body={"Your time was " + elapsedTime + "ms."}
        fetchLeaderboard={helpers.fetchLeaderboard}
        saveScore={(name) => helpers.saveScore(name, elapsedTime)}
      ></ResultModal>
    </div>
  );
}

export default Memory;
