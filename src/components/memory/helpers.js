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

/*
Returns an array of shuffled cards, all of them are face-down.
*/
export function generateCards() {
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

/* 
Returns a new array of cards where the specified card (cardToFlip)
will have a different value of its isFlipped: true changes to false and false to true.
*/
function flipCard(cards, cardToFlip) {
  return cards.map((card) => {
    if (card.key === cardToFlip.key) {
      return { ...card, isFlipped: !card.isFlipped };
    }
    return card;
  });
}

/*
Calculates and returns the new game state depending on the previous state and the clicked card.
If the new state is the state of the win, onGameWon will be called.
*/
export function calculateNewGame(oldGame, clickedCard, onGameWon) {
  // If the card is already flipped there is nothing we need to do - we return the oldGame unchanged.
  if (clickedCard.isFlipped) {
    return oldGame;
  }

  const { cards, firstCard, secondCard } = oldGame;
  // The { cards, firstCard, secondCard } above is the decomposed game object.
  // These three variables represent the previous state, before a card was clicked.
  // We should return the new state, depending on the previous one and on the card that was clicked.
  // There are 4 different cases.
  // 1. If both firstCard and secondCard from the previous state are undefined =>
  // we should flip the clicked card and set it as the firstCard
  if (!firstCard) {
    return {
      cards: flipCard(cards, clickedCard),
      firstCard: clickedCard,
    };
  }
  // 2. Else, if firstCard is defined, but secondCard isn't =>
  // we should flip the clicked card, keep the firstCard as is, but set the secondCard
  else if (!secondCard) {
    let newCards = flipCard(cards, clickedCard);

    if (newCards.every((card) => card.isFlipped)) {
      onGameWon();
      console.log("You win!");
    }

    return {
      cards: newCards,
      firstCard: firstCard,
      secondCard: clickedCard,
    };
  }
  // 3. Else, if the previous two clicked cards have the same color =>
  // we should flip the clicked card, set the new firstCard and remove secondCard from the state
  else if (firstCard.color === secondCard.color) {
    return {
      cards: flipCard(cards, clickedCard),
      firstCard: clickedCard,
    };
  }
  // 4. Else, if the previous two clicked cards have different colors =>
  // we should flip the clicked card and flip back firstCard and secondCard,
  // we should also set the new firstCard and remove secondCard from the state
  else {
    let newCards = flipCard(cards, firstCard);
    newCards = flipCard(newCards, secondCard);
    newCards = flipCard(newCards, clickedCard);
    return {
      cards: newCards,
      firstCard: clickedCard,
    };
  }
}

// Score object looks like this:
// [{ name: "Antonina", timeMs: 200000}, { name: "Charlotte", timeMs: 10000}]
export function fetchLeaderboard() {
  return utils
    .fetchLeaderboard("memory", [["timeMs", "asc"]])
    .then((leaderboard) =>
      leaderboard.map(
        (score, i) => `${i + 1}. ${score.name}: ${score.timeMs}ms`
      )
    );
}

export function saveScore(name, timeMs) {
  utils.saveScore("memory", { name, timeMs });
}
