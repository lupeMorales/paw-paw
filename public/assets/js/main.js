"use strict";
const canvas = document.querySelector(".js-canvas");
const game = canvas.getContext("2d");

const btnUp = document.querySelector(".item-up");
const btnDown = document.querySelector(".item-down");
const btnRight = document.querySelector(".item-right");
const btnLeft = document.querySelector(".item-left");

let canvasSize;
let elementSize;

let level = 0;

let playerPosition = {
  x: undefined,
  y: undefined,
};

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
  elementSize = canvasSize / 10 - 1;
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  startGame();
}

function renderMapLevel(level) {
  const mapLevel = maps[level].trim().split("\n");
  // this is a bidimensional array
  const actualMapLevel = mapLevel.map((row) => row.trim().split(""));

  console.log({ mapLevel, actualMapLevel });

  actualMapLevel.forEach((row, indexRow) => {
    row.forEach((column, indexColumn) => {
      const emoji = emojis[column];
      const positionX = elementSize * (indexColumn + 1);
      const positionY = elementSize * (indexRow + 1);

      if (column == "O") {
        playerPosition.x = positionX;
        playerPosition.y = positionY;
      }
      game.fillText(emoji, positionX, positionY);
    });
  });
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
  console.log("up");
}
function moveDown() {
  console.log("down");
}
function moveLeft() {
  console.log("left");
}
function moveRight() {
  console.log("right");
}
function moveByKeys(ev) {
  if (ev.key == "ArrowUp") moveUp();
  else if (ev.key == "ArrowDown") moveDown();
  else if (ev.key == "ArrowLeft") moveLeft();
  else if (ev.key == "ArrowRight") moveRight();
}

function startGame() {
  console.log("starting game");
  renderMapLevel(level);
  initialPlayerPosition();
}

function initialPlayerPosition() {
  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
  console.log(playerPosition);
}

// events
window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);
window.addEventListener("keydown", moveByKeys);

btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnRight.addEventListener("click", moveRight);
btnLeft.addEventListener("click", moveLeft);

/* let canvasSize;
let elementSize;
let level = 0;

let playerPosition = {
  x: undefined,
  y: undefined,
};

function startGame() {
  console.log("let's go");
  //render
  console.log({ canvasSize, elementSize });
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  renderMap(level);
}

function renderMap() {
  //crear array bidimensional a partir de nuestro map
  const map = maps[2];
  const mapRows = map.trim().split("\n");
  const actualMap = mapRows.map((row) => row.trim().split(""));
  console.log({ mapRows, actualMap });
  //recorre el array bidimensional y renderiza
  /*   for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      game.fillText(
        emojis[actualMap[j - 1][i - 1]],
        elementSize * i,
        elementSize * j
      );
    }
  } */
//se puede hacer con forEach
/*   actualMap.forEach((row, indexRow) => {
    row.forEach((col, indexCol) => {
      const posX = indexCol + 1;
      const posY = indexRow + 1;
      if (col == "O") {
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({ playerPosition });
      }
      game.fillText(emojis[col], elementSize * posX, elementSize * posY);
    });
  });

  game.fillText(emojis["PLAYER"], 8, 9);
  console.log(playerPosition.x);
}

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementSize = canvasSize / 10 - 1;

  startGame();
}
function moveUp() {
  console.log("me muevo hacia arriba");
}
function moveDown() {
  console.log("me muevo hacia abajo");
}
function moveLeft() {
  console.log("me muevo hacia izquierda");
}
function moveRight() {
  console.log("me muevo hacia derecha");
}
function moveByKeys(ev) {
  if (ev.key == "ArrowUp") moveUp();
  else if (ev.key == "ArrowDown") moveDown();
  else if (ev.key == "ArrowRight") moveRight();
  else if (ev.key == "ArrowLeft") moveLeft();
}
up.addEventListener("click", moveUp);
down.addEventListener("click", moveDown);
right.addEventListener("click", moveRight);
left.addEventListener("click", moveLeft);

window.addEventListener("keydown", moveByKeys);

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize); */

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
