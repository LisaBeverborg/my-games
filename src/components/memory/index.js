import React, { useState } from "react";
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
  return cards;
}

function Memory() {
  const [cards, setCards] = useState(generateCards());

  function onCardClicked(card) {
    console.log(card);
  }

  return (
    <div className="game-container">
      <StatusBar status="Time: 0s"></StatusBar>
      <div className="memory-grid">
        {cards.map((card) => (
          <MemoryCard
            key={card.key}
            color={card.color}
            isFlipped={true}
            onClick={() => onCardClicked(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default Memory;
