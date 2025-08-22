const board = document.getElementById("board");
const message = document.getElementById("message");
const turnDisplay = document.getElementById("turn");
let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    board.appendChild(cellDiv);
  });
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(index) {
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  renderBoard();
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      const cellDivs = board.querySelectorAll(".cell");
      cellDivs[a].classList.add("winner");
      cellDivs[b].classList.add("winner");
      cellDivs[c].classList.add("winner");

      message.textContent = `🎉 Player ${cells[a]} wins!`;
      gameActive = false;
      turnDisplay.textContent = "";
      return;
    }
  }

  if (!cells.includes("")) {
    message.textContent = "It's a Draw!";
    turnDisplay.textContent = "";
    gameActive = false;
  }
}

function restartGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
  renderBoard();
}

renderBoard();
