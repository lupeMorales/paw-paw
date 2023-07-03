"use strict";

const canvas = document.querySelector(".js-canvas");
const game = canvas.getContext("2d");

const btnUp = document.querySelector(".item-up");
const btnDown = document.querySelector(".item-down");
const btnRight = document.querySelector(".item-right");
const btnLeft = document.querySelector(".item-left");

const life = document.querySelector(".js-life");
const timer = document.querySelector(".js-timer");
const record = document.querySelector(".js-record");

const btnCloseModal = document.querySelector(".js-btn-close");
const modal = document.querySelector(".js-modal");
const btnNo = document.querySelector(".js-btn-no");

let actualMapLevel;

let canvasSize;
let elementSize;

let level = 0;
let totalLifes = 3;

let timeStart;
let timeInterval;

const messages = {
  levelUp: `Well done!`,
  gameOver: "GAME OVER!",
  newRecord: "NEW RECORD 🏆",
  gameWin: "record not broken",
};

const playerPosition = {
  x: undefined,
  y: undefined,
};

const bonePosition = {
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

function renderLifes() {
  //built am array with n items ( the numbers of item is totalLife)
  const hearts = Array(totalLifes).fill(emojis["HEART"]);
  life.innerHTML = "";
  hearts.forEach((item) => (life.innerHTML += item));
}

function showTime() {
  timer.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  record.innerHTML = "TO DO";
}
function renderMapLevel(level) {
  const mapLevel = maps[level].trim().split("\n");
  // this is a bidimensional array
  actualMapLevel = mapLevel.map((row) => row.trim().split(""));

  collisionPositions = [];
  clearCanvas();
  renderLifes();
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
  }
  showRecord();
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
function clearCanvas() {
  game.clearRect(0, 0, canvasSize, canvasSize);
}
function renderMessage(message) {
  game.font = elementSize + "px Cherry Bomb One";
  game.fontWeight = "bold";
  game.fillStyle = "#c27434";
  game.textAlign = "center";
  game.fillText(message, canvasSize / 2, canvasSize / 2);
}
function showModal() {
  modal.classList.add("active");
}
/* function closeModal() {
  modal.classList.remove("active");
} */
function exit() {
  console.log("NO MI SIELA");
  modal.classList.remove("active");
  btnDown.disabled = true;
  btnUp.disabled = true;
  btnLeft.disabled = true;
  btnRight.disabled = true;
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
    game.fillText(emojis["BOMB_COLLISION"], playerPosition.x, playerPosition.y);
    totalLifes > 0 ? crashOver() : gameOver();
  }
  console.log({ playerPosition, collision });
}

function getTheBone() {
  if (JSON.stringify(bonePosition) === JSON.stringify(playerPosition)) {
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

function crashOver() {
  console.log("CRASH!");

  loseLife();
  playerPosition.x = undefined;
  playerPosition.y = undefined;

  setTimeout(startGame, 1000);
}

function reset() {
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  level = 0;
  totalLifes = ["❤️", "❤️", "❤️"];
}
function loseLife() {
  totalLifes--;
  /*   totalLifes.pop(); */
  console.log(totalLifes);
  renderLifes();
}
function startGame() {
  renderMapLevel(level);
}
function gameOver() {
  console.log("GAME OVER");

  clearCanvas();
  renderMessage(messages.gameOver);
  clearInterval(timeInterval);
  // to do
  setTimeout(showModal, 1000);
}
function levelUp() {
  level++;
  console.log({ level });
  clearCanvas();
  renderMessage(messages.levelUp);
  setTimeout(setCanvasSize, 1000);
}
function winGame() {
  const recordTime = localStorage.getItem("record_time");
  const playerTime = Date.now() - timeStart;
  console.log("no mas mapas");
  clearInterval(timeInterval);
  const cheer = (message) => {
    clearCanvas();
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 10; j++) {
        game.fillText(emojis["I"], elementSize * i, elementSize * j);
      }
    }
    renderMessage(message);
  };

  if (!recordTime) {
    localStorage.setItem("record_time", playerTime);

    cheer(messages.newRecord);
  } else {
    if (recordTime >= playerTime) {
      localStorage.setItem("record_time", playerTime);

      cheer(messages.newRecord);
      console.log(" superado ");
    } else {
      console.log("record no superado");
      cheer(messages.gameWin);
    }
  }
  console.log({ recordTime, playerTime });
  // show confetti
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

btnNo.addEventListener("click", exit);
/* btnCloseModal.addEventListener("click", closeModal); */

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
