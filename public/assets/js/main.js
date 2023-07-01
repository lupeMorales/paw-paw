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

let collisionPosition = [];
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

  collisionPosition = [];
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
        }
      } else if (column == "I") {
        bonePosition.x = positionX;
        bonePosition.y = positionY;
      } else if (column == "X") {
        collisionPosition.push({ positionX, positionY });
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
function validateCollisions() {
  const collision = collisionPosition.find((item) => {
    const collisionX = item.x == playerPosition.x;
    const collisionY = item.x == playerPosition.y;
    return collisionX && collisionY;
  });
  if (collision) {
    console.log("CRASH");
  }
  console.log({ playerPosition, collision });
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
  if (actualLevel < maps.length - 1) {
    level++;
    // to do: showMessage con timeOut
    console.log("well done");

    startGame();
  } else {
    console.log("no mas mapas");
    clearCanvas();
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        game.fillText(emojis["I"], elementSize * i, elementSize * j);
      }
    }
    // to do: showMessage?? or recharge initial level
  }
}

function clearCanvas() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}
function startGame() {
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

'use strict';

console.log('>> Ready :)');

"use strict";
const emojis = {
  "-": " ",
  O: "🏠",
  X: "🌳",
  I: "🦴",
  PLAYER: "🐶",
  BOMB_COLLISION: "🗯️",
  GAME_OVER: "👎",
  WIN: "🏆",
};
const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
maps.push(`
  O---XXXXXX
  XXX-XXXXXX
  XXX-XXXXIX
  XXX-XXXX-X
  XXX---XX-X
  XX--X-XX-X
  XX--X-XX-X
  XX--XXXX-X
  XX-------X
  XXXXXXXXXX
`);

//# sourceMappingURL=main.js.map
