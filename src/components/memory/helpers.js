import * as utils from "../../utils";

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

export function generateCards() {
  const cards = [];
  for (let i = 0; i < colors.length; i++) {
    cards.push({
      key: i * 2,
      color: colors[i],
      isFlipped: false,
      isLocked: false,
    });
    cards.push({
      key: i * 2 + 1,
      color: colors[i],
      isFlipped: false,
      isLocked: false,
    });
  }
  return cards.sort(() => Math.random() - 0.5);
}

export function lockCard(cards, cardToLock) {
  return cards.map((card) => {
    if (card.key === cardToLock.key) {
      return { ...card, isLocked: true };
    }
    return card;
  });
}

export function flipCard(cards, cardToFlip) {
  return cards.map((card) => {
    if (card.key === cardToFlip.key) {
      return { ...card, isFlipped: !card.isFlipped };
    }
    return card;
  });
}

export function calculateNewGame(
  oldGame,
  clickedCard,
  onGameWon,
  setWrongPair
) {
  if (clickedCard.isFlipped) {
    return;
  }

  const { cards, firstCard } = oldGame;
  let newCards = flipCard(cards, clickedCard);
  if (!firstCard) {
    return {
      cards: newCards,
      firstCard: clickedCard,
    };
  } else {
    if (firstCard.color !== clickedCard.color) {
      setWrongPair([firstCard, clickedCard]);
    } else {
      newCards = lockCard(newCards, firstCard);
      newCards = lockCard(newCards, clickedCard);
      if (newCards.every((card) => card.isLocked)) {
        onGameWon();
      }
    }

    return {
      cards: newCards,
    };
  }
}

export function fetchLeaderboard() {
  return utils
    .fetchLeaderboard("memory", [["timeMs", "asc"]])
    .then((leaderboard) =>
      leaderboard.map(
        (score, i) =>
          `${i + 1}. ${score.name}: ${utils.prettifyTime(score.timeMs)}`
      )
    );
}

export function saveScore(name, timeMs) {
  return utils.saveScore("memory", { name, timeMs });
}
