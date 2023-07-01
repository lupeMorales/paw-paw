"use strict";
const canvas = document.querySelector(".js-canvas");
const game = canvas.getContext("2d");

const btnUp = document.querySelector(".item-up");
const btnDown = document.querySelector(".item-down");
const btnRight = document.querySelector(".item-right");
const btnLeft = document.querySelector(".item-left");

let canvasSize;
let elementSize;

let level = 3;

let playerPosition = {
  x: undefined,
  y: undefined,
};

let isWithinTheMargin = true;
function setCanvasSize() {
  //game screen size
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //elements size
  elementSize = canvasSize / 10 - 0.4;
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";
  console.log({ canvasSize, elementSize });
  startGame();
}

function renderMapLevel(level) {
  const mapLevel = maps[level].trim().split("\n");
  // this is a bidimensional array
  const actualMapLevel = mapLevel.map((row) => row.trim().split(""));

  console.log({ mapLevel, actualMapLevel });
  clearCanvas();

  actualMapLevel.forEach((row, indexRow) => {
    row.forEach((column, indexColumn) => {
      const emoji = emojis[column];
      const positionX = elementSize * (indexColumn + 1);
      const positionY = elementSize * (indexRow + 1);

      if (column == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = positionX;
          playerPosition.y = positionY;
        }
      }
      game.fillText(emoji, positionX, positionY);
    });
  });
  getPlayerPosition();
  /*  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y); */
  /*   for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      game.fillText(
        emojis[actualMapLevel[j - 1][i - 1]],
        elementSize * i,
        elementSize * j
      );
    }
  } */
}
function moveUp() {
  playerPosition.y -= elementSize;
  if (withinTheMargin()) {
    startGame();
  } else {
    playerPosition.y += elementSize;
  }
}
function moveDown() {
  playerPosition.y += elementSize;
  if (withinTheMargin()) {
    startGame();
  } else {
    playerPosition.y -= elementSize;
  }
}
function moveLeft() {
  playerPosition.x -= elementSize;
  if (withinTheMargin()) {
    startGame();
  } else {
    playerPosition.x += elementSize;
  }
}
function moveRight() {
  playerPosition.x += elementSize;
  if (withinTheMargin()) {
    startGame();
  } else {
    playerPosition.x -= elementSize;
  }
}
function moveByKeys(ev) {
  if (ev.key == "ArrowUp") moveUp();
  else if (ev.key == "ArrowDown") moveDown();
  else if (ev.key == "ArrowLeft") moveLeft();
  else if (ev.key == "ArrowRight") moveRight();
}
function withinTheMargin() {
  if (
    playerPosition.x >= elementSize &&
    playerPosition.x <= canvasSize &&
    playerPosition.y >= elementSize &&
    playerPosition.y <= canvasSize
  ) {
    return true;
  }
}
function getPlayerPosition() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}
function clearCanvas() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}
function startGame() {
  console.log("starting game");
  renderMapLevel(level);
}

// events
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);
