'use strict';

const cells = [...document.querySelectorAll('.field-cell')];
const startButton = document.querySelector('.button.start');
const gameField = document.querySelector('.game-field');
const gameScore = document.querySelector('.game-score');
const messages = document.querySelectorAll('.message');
const messageLose = document.querySelector('.message.message-lose');
const messageWin = document.querySelector('.message.message-win');

const BOARD_SIZE = 4;
let score = 0;
const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

startButton.addEventListener('click', startGame);

let keyTimer;

document.addEventListener('keydown', (event) => {
  clearTimeout(keyTimer);
  keyTimer = setTimeout(() => {
    handleKeyPress(event);
  }, 0);
});

function addRandomTile() {
  if (!hasEmptyCells() && !canMerged()) {
    messageLose.classList.remove('hidden');
    return;
  }

  const emptyCells = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({
          x: i,
          y: j,
        });
      }
    }
  }

  const randomNumber = Math.random() < 0.9 ? 2 : 4;

  if (emptyCells.length) {
    const randomCell
      = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[randomCell.x][randomCell.y] = randomNumber;
  }
}

function updateBoard() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = gameField.rows[row].cells[col];

      cell.className = `field-cell field-cell--${board[row][col]}`;
      cell.textContent = board[row][col] || '';
    }
  }
}

function startGame() {
  if (startButton.classList.contains('start')) {
    startButton.classList.remove('start');
    startButton.classList.add('restart');
    startButton.textContent = 'Restart'; ;
  }

  [...messages].forEach(message => message.classList.add('hidden'));

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      board[i][j] = 0;
    }
  }

  [...cells].forEach(cell => {
    cell.className = 'field-cell';
    cell.textContent = '';
  });

  score = 0;
  gameScore.textContent = score;

  addRandomTile();
  addRandomTile();

  updateBoard();
}

function isWinner() {
  return cells.some(cell => cell.classList.contains(`field-cell--${2048}`));
}

function handleKeyPress(event) {
  if (isWinner()) {
    messageWin.classList.remove('hidden');
    return;
  }

  if (!hasEmptyCells() && !canMerged()) {
    messageLose.classList.remove('hidden');

    return;
  }

  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowDown':
      moveVertical(event.key);
      break;

    case 'ArrowLeft':
    case 'ArrowRight':
      moveHorizontal(event.key);
      break;

    default:
      return;
  }
}

function moveVertical(direction) {
  let isColumnChanged = false;

  for (let col = 0; col < BOARD_SIZE; col++) {
    let currentColumn = [
      board[0][col],
      board[1][col],
      board[2][col],
      board[3][col],
    ];

    const columnCopy = [...currentColumn];

    if (direction === 'ArrowDown') {
      currentColumn.reverse();
    }

    currentColumn = slideTiles(currentColumn);

    if (direction === 'ArrowDown') {
      currentColumn.reverse();
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
      board[i][col] = currentColumn[i];
    }

    if (hasBoardChanged(columnCopy, currentColumn)) {
      isColumnChanged = true;
    }
  }

  if (isColumnChanged) {
    addRandomTile();
    updateBoard();
  }
}

function moveHorizontal(direction) {
  let isRowChanged = false;

  for (let row = 0; row < BOARD_SIZE; row++) {
    const rowCopy = [...board[row]];
    let currentRow = board[row];

    if (direction === 'ArrowRight') {
      currentRow.reverse();
    }

    currentRow = slideTiles(currentRow);

    if (direction === 'ArrowRight') {
      currentRow.reverse();
    }

    board[row] = currentRow;

    if (hasBoardChanged(rowCopy, currentRow)) {
      isRowChanged = true;
    }
  }

  if (isRowChanged) {
    addRandomTile();
    updateBoard();
  }
}

function slideTiles(row) {
  let filteredRow = removeZeroes(row);

  for (let i = 0; i < filteredRow.length - 1; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      filteredRow[i] *= 2;
      filteredRow[i + 1] = 0;

      score += filteredRow[i];
    }
  }

  filteredRow = removeZeroes(filteredRow);

  while (filteredRow.length < BOARD_SIZE) {
    filteredRow.push(0);
  }

  return filteredRow;
}

function removeZeroes(row) {
  return row.filter(number => number !== 0);
}

function canMerged() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (col < BOARD_SIZE - 1 && board[row][col] === board[row][col + 1]) {
        return true; 
      }

      if (row < BOARD_SIZE - 1 && board[row][col] === board[row + 1][col]) {
        return true; 
      }
    }
  }

  return false;
}

function hasEmptyCells() {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 0) {
        return true;
      }
    }
  }

  return false;
}

function hasBoardChanged(arr1, arr2) {
  return JSON.stringify(arr1) !== JSON.stringify(arr2);
}
