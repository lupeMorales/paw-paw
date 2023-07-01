"use strict";

const canvas = document.querySelector(".js-canvas");
const game = canvas.getContext("2d");

const btnUp = document.querySelector(".item-up");
const btnDown = document.querySelector(".item-down");
const btnRight = document.querySelector(".item-right");
const btnLeft = document.querySelector(".item-left");

let actualMapLevel;

let canvasSize;
let elementSize;

let level = 0;

const playerPosition = {
  x: undefined,
  y: undefined,
};

const bonePosition = {
  x: undefined,
  y: undefined,
};

const initialPosition = {
  x: undefined,
  y: undefined,
};

let collisionPositions = [];

let isWithinTheMargin = true;

// SET SIZE
function setCanvasSize() {
  //game screen size
  if (window.innerHeight > window.innerWidth) {
    canvasSize = Math.floor(window.innerWidth * 0.75);
  } else {
    canvasSize = Math.floor(window.innerHeight * 0.75);
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  //elements size
  elementSize = Math.floor(canvasSize / 10 - 0.4);
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";
  startGame();
}

// RENDER

function renderMapLevel(level) {
  const mapLevel = maps[level].trim().split("\n");
  // this is a bidimensional array
  actualMapLevel = mapLevel.map((row) => row.trim().split(""));

  collisionPositions = [];
  clearCanvas();

  actualMapLevel.forEach((row, indexRow) => {
    row.forEach((column, indexColumn) => {
      const emoji = emojis[column];
      const positionX = elementSize * (indexColumn + 1);
      const positionY = elementSize * (indexRow + 1);

      //get player position
      if (column == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = positionX;
          playerPosition.y = positionY;
          initialPosition.x = positionX;
          initialPosition.y = positionY;
        }
      } else if (column == "I") {
        bonePosition.x = positionX;
        bonePosition.y = positionY;
      } else if (column == "X") {
        collisionPositions.push({ x: positionX, y: positionY });
      }
      game.fillText(emoji, positionX, positionY);
    });
  });
  renderPlayerPosition();

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
function renderPlayerPosition() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  validateCollisions();
  getTheBone();
}

// MOVEMENT CONTROLS
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

//VALIDATIONS

function validateCollisions() {
  const collision = collisionPositions.find((enemy) => {
    const collisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const collisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return collisionX && collisionY;
  });

  if (collision) {
    console.log("CRASH!");
    playerPosition.x = initialPosition.x;
    playerPosition.y = initialPosition.y;

    setTimeout(startGame, 1000);
  }
  console.log({ playerPosition, collision });
}
function getTheBone() {
  if (JSON.stringify(bonePosition) === JSON.stringify(playerPosition)) {
    console.log("congrats!!");
    /*  clearCanvas();
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        game.fillText(emojis["I"], elementSize * i, elementSize * j);
      }
    } */
    // unos segundos despues que haga esto

    validateLastLevel(level);
  }
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
function validateLastLevel(actualLevel) {
  actualLevel < maps.length - 1 ? levelUp() : winGame();
}

function clearCanvas() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}
function startGame() {
  renderMapLevel(level);
}
function levelUp() {
  level++;
  // to do: showMessage con timeOut
  console.log("well done");
  startGame();
}
function winGame() {
  console.log("no mas mapas");
  clearCanvas();
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      game.fillText(emojis["I"], elementSize * i, elementSize * j);
    }
  }
  // to do: showMessage?? or recharge initial level
  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    emojis: ["🦴", "🐶", "✨", "🏆"],
    confettiRadius: 6,
    confettiNumber: 50,
  });
}
// events

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);
