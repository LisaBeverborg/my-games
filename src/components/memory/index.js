import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import StatusBar from "../StatusBar";
import MemoryCard from "./MemoryCard";
import * as utils from "../../utils";
import * as helpers from "./helpers";
import ResultModal from "../ResultModal";

function Memory() {
  const [game, setGame] = useState({
    cards: helpers.generateCards(),
  });
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [win, setWin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [wrongPair, setWrongPair] = useState(null);
  const [noClicksAllowed, setNoClicksAllowed] = useState(false);

  const timeoutIds = useRef([]);

  useEffect(() => {
    if (startTime !== 0 && !win) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime, win]);

  useEffect(() => {
    if (win) {
      setShowModal(true);
    }
  }, [win]);

  // flip back if wrong pair
  useEffect(() => {
    if (!wrongPair) return;
    setNoClicksAllowed(true);
    const timeoutId = setTimeout(() => {
      setGame((oldGame) => {
        let newCards = helpers.flipCard(oldGame.cards, wrongPair[0]);
        newCards = helpers.flipCard(newCards, wrongPair[1]);
        return {
          ...oldGame,
          cards: newCards,
        };
      });
    }, 1000);
    timeoutIds.current.push(timeoutId);
  }, [wrongPair]);

  useEffect(() => {
    return () => {
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  function onCardClicked(clickedCard) {
    setGame((oldGame) =>
      helpers.calculateNewGame(
        oldGame,
        clickedCard,
        () => setWin(true),
        setWrongPair
      )
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
          status1={"Time: " + utils.prettifyTime(elapsedTime)}
          onRestart={onRestart}
          onShowLeaderboard={() => setShowModal(true)}
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
        body={"Your time was " + utils.prettifyTime(elapsedTime) + "."}
        fetchLeaderboard={helpers.fetchLeaderboard}
        saveScore={(name) => helpers.saveScore(name, elapsedTime)}
      ></ResultModal>
    </div>
  );
}

export default Memory;
