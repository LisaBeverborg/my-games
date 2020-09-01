import * as utils from "../../utils";

export const width = 20;
export const height = 12;
export const initialIntervalMs = 400;

export function generateGame() {
  const snake = {
    head: {
      x: width / 2,
      y: height / 2,
    },
    tail: [
      {
        x: width / 2 - 1,
        y: height / 2,
      },
    ],
    dir: "right",
  };
  return {
    snake: snake,
    food: generateFood(snake),
    commands: [],
  };
}

export function generateFood(snake) {
  let food = { ...snake.head };
  while (
    isEqual(food, snake.head) ||
    snake.tail.some((cell) => isEqual(food, cell))
  ) {
    food = {
      x: random(width),
      y: random(height),
    };
  }
  return food;
}

export function isEqual(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

function random(max) {
  return Math.floor(Math.random() * max);
}

export function tick(game) {
  const oldSnake = game.snake;
  const oldFood = game.food;
  const commands = game.commands;
  let newCommands = [...commands];

  while (
    newCommands.length > 0 &&
    (isOpposite(newCommands[0], oldSnake.dir) ||
      newCommands[0] === oldSnake.dir)
  ) {
    newCommands = newCommands.slice(1);
  }

  let newDir = oldSnake.dir;
  if (newCommands.length > 0) {
    newDir = newCommands[0];
    newCommands = newCommands.slice(1);
  }

  let newHead;
  switch (newDir) {
    case "right":
      newHead = { x: oldSnake.head.x + 1, y: oldSnake.head.y };
      break;
    case "down":
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y + 1 };
      break;
    case "left":
      newHead = { x: oldSnake.head.x - 1, y: oldSnake.head.y };
      break;
    case "up":
      newHead = { x: oldSnake.head.x, y: oldSnake.head.y - 1 };
      break;
  }

  const newTail = generateNewTail(oldSnake, oldFood, newHead);
  const newSnake = {
    ...oldSnake,
    head: newHead,
    tail: newTail,
    dir: newDir,
  };

  let newFood = oldFood;
  if (isEqual(oldFood, newHead)) {
    newFood = generateFood(newSnake);
  }

  return {
    snake: newSnake,
    food: newFood,
    commands: newCommands,
  };
}

function generateNewTail(oldSnake, oldFood, newHead) {
  let newTail = [oldSnake.head];
  newTail = newTail.concat(oldSnake.tail);

  //alternative to concat
  //newTail =[oldSnake.head, ...oldSnake.tail];

  if (!isEqual(oldFood, newHead)) {
    newTail.pop();
  }
  return newTail;
}

export function isGameOver(game) {
  const snake = game.snake;
  return (
    isOutOfBounds(snake.head) ||
    snake.tail.some((cell) => isEqual(cell, snake.head))
  );
}

function isOutOfBounds(cell) {
  return cell.x < 0 || cell.x >= width || cell.y < 0 || cell.y >= height;
}

export const getScore = (game) => game.snake.tail.length - 1;

export function getIntervalMs(tailLength) {
  return initialIntervalMs * Math.pow(0.8, Math.floor((tailLength - 1) / 3));
}

export function fetchLeaderboard() {
  return utils
    .fetchLeaderboard("snake", [
      ["score", "desc"],
      //["timeMs", "asc"],
    ])
    .then((leaderboard) =>
      leaderboard.map(
        (score, i) =>
          `${i + 1}. ${score.name}: ${score.score}, ${utils.prettifyTime(
            score.timeMs
          )}`
      )
    );
}

export function saveScore(name, score, timeMs) {
  return utils.saveScore("snake", {
    name: name,
    timeMs: timeMs,
    score: score,
  });
}

function isOpposite(dir1, dir2) {
  return (
    (dir1 === "left" && dir2 === "right") ||
    (dir1 === "right" && dir2 === "left") ||
    (dir1 === "up" && dir2 === "down") ||
    (dir1 === "down" && dir2 === "up")
  );
}
