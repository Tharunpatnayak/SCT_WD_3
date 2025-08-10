let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let mode = ''; 

const statusDisplay = document.getElementById('status');
const boardElement = document.getElementById('board');

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  gameActive = true;
  statusDisplay.textContent = `Mode: ${mode === 'player' ? '2 Players' : 'Vs Computer'} | X's Turn`;
}

function handleClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  renderBoard();
  if (checkWinner()) return;

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `${currentPlayer}'s Turn`;

  if (mode === 'computer' && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyCells = board.map((val, i) => val === '' ? i : null).filter(v => v !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  handleClick(randomIndex);
}

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusDisplay.textContent = `${board[a]} Wins!`;
      return true;
    }
  }

  if (!board.includes('')) {
    gameActive = false;
    statusDisplay.textContent = `It's a Draw!`;
    return true;
  }
  return false;
}

function renderBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, i) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.textContent = cell;
    cellDiv.onclick = () => handleClick(i);
    boardElement.appendChild(cellDiv);
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = mode !== '';
  renderBoard();
  statusDisplay.textContent = mode ? `${currentPlayer}'s Turn` : 'Choose game mode to start';
}

renderBoard();
