import React, { useState, useEffect } from "react";
import "./index.css";
import StatusBar from "./StatusBar";
import MemoryCard from "./MemoryCard";

const colors = [
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
];

function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

function Memory() {
  /* const startTime = Date.now();
  const intervalId = setInterval(
    () => console.log(Date.now() - startTime),
    1000
  );
  clearInterval(intervalId);
*/
  const [game, setGame] = useState({
    cards: generateCards(),
    firstCard: undefined,
    secondCard: undefined,
  });

  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime !== 0) {
      const intervalID = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalID);
    }
  }, [startTime]);

  function flipCard(cards, cardToFlip) {
    return cards.map((card) => {
      if (card.key === cardToFlip.key) {
        return { ...card, isFlipped: !card.isFlipped };
      }
      return card;
    });
  }

  function onCardClick(card) {
    if (card.isFlipped) {
      return;
    }

    setGame(({ cards, firstCard, secondCard }) => {
      let newCards = flipCard(cards, card);
      if (!firstCard) {
        return {
          cards: newCards,
          firstCard: card,
        };
      } else if (!secondCard) {
        return {
          cards: newCards,
          firstCard: firstCard,
          secondCard: card,
        };
      } else if (firstCard.color === secondCard.color) {
        return { cards: newCards, firstCard, secondCard };
      } else if (firstCard.color === secondCard.color) {
        return {
          cards: newCards,
          firstCard: card,
        };
      } else {
        newCards = flipCard(newCards, secondCard);
        newCards = flipCard(newCards, firstCard);
        return {
          cards: newCards,
          firstCard: card,
        };
      }
    });
    setStartTime((oldStartTime) =>
      oldStartTime === 0 ? Date.now() : oldStartTime
    );
  }

  function onRestart() {
    setGame({
      cards: generateCards(),
      firstCard: undefined,
      secondCard: undefined,
    });
    setStartTime(0);
    setElapsedTime(0);
  }

  return (
    <div className="memory">
      <div className="game-container">
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
              onClick={() => onCardClick(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Memory;
