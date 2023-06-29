"use strict";
const canvas = document.querySelector(".js-canvas");
const game = canvas.getContext("2d");

const up = document.querySelector(".item-up");
const down = document.querySelector(".item-down");
const right = document.querySelector(".item-right");
const left = document.querySelector(".item-left");

/* const move = (key) => {
  return () => {
    console.log(`Pressed: ${key}`);
  };
};
const moveByKey = (ev) => {
  if (ev.key == "ArrowUp") {
    console.log("up");
  }
}; */

let canvasSize;
let elementSize;
let level = 0;

function startGame() {
  console.log("let's go");
  //render
  console.log({ canvasSize, elementSize });
  game.font = elementSize + "px Verdana";
  game.textAlign = "end";

  renderMap(level);
}

function renderMap(level) {
  //crear array bidimensional a partir de nuestro map
  const map = maps[level];
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
  actualMap.forEach((row, indexRow) => {
    row.forEach((col, indexCol) =>
      game.fillText(
        emojis[col],
        elementSize * (indexCol + 1),
        elementSize * (indexRow + 1)
      )
    );
  });
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
window.addEventListener("resize", setCanvasSize);
