const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("reset");
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameOver = false;
let isPlayerTurn = true; // Pemain mulai duluan

// Kombinasi Menang
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Update UI
function updateBoard() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

// Cek Pemenang
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Mengembalikan simbol pemenang ("X" atau "O")
    }
  }

  if (!board.includes("")) return "Draw"; // Cek jika seri
  return null; // Belum ada pemenang
}

// Bot Logika Pintar (Minimax)
function minimax(newBoard, isMaximizing) {
  const winner = checkWinner();
  if (winner === "X") return -10;
  if (winner === "O") return 10;
  if (!newBoard.includes("")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "O";
        let score = minimax(newBoard, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = "X";
        let score = minimax(newBoard, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Bot Bergerak
function botMove() {
  if (isGameOver) return;

  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  if (move !== undefined) {
    board[move] = "O";
    updateBoard();

    // Cek jika bot menang setelah langkah
    const botWinner = checkWinner();
    if (botWinner) {
      isGameOver = true;
      alert(botWinner === "Draw" ? "It's a Draw!" : `Bot ${botWinner} Wins! ð¤£`);
    }
  }

  // Beri giliran ke pemain
  isPlayerTurn = true;
}

// Pemain Bergerak
function handleClick(e) {
  const index = e.target.getAttribute("data-index");

  // Pastikan hanya pemain yang bisa bergerak pada gilirannya
  if (!isPlayerTurn || board[index] || isGameOver) return;

  // Pemain membuat langkah
  board[index] = currentPlayer;
  updateBoard();

  // Cek jika pemain menang setelah langkah
  const winner = checkWinner();
  if (winner) {
    isGameOver = true;
    alert(winner === "Draw" ? "It's a Draw!" : `You ${winner} Wins! ð`);
    return;
  }

  // Beri giliran ke bot
  isPlayerTurn = false;
  setTimeout(botMove, 500); // Bot bergerak setelah 0.5 detik
}

// Reset Game
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  isPlayerTurn = true; // Pemain mulai lagi
  updateBoard();
}

// Event Listener
cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

const nama = document.getElementById("nama");
const kata = ["Hallo Apa Kabar ?", "Baik Ya", "Selamat Datang Di..", "Tic Tac Toe", "Versus Bot", "Ayo Kalahkan Bot"];
const kolors = ["#FF5733", "#33FF57", "#f5ff33", "#FF3357", "#7E33FFFF", "#33C9FFFF"];

let teksIndex = 0;
let karakterIndex = 0;
let isHapus = false;

function ketik() {
  const current = kata[teksIndex];
  if (!isHapus) {
    nama.textContent = current.substring(0, karakterIndex + 1);
    nama.style.color = kolors[teksIndex];
    karakterIndex++;
    if (karakterIndex === current.length) {
      isHapus = true;
      setTimeout(ketik, 2000);
    } else {
      setTimeout(ketik, 100);
    }
  } else {
    nama.textContent = current.substring(0, karakterIndex - 1);
    nama.style.color = kolors[teksIndex];
    karakterIndex--;
    if (karakterIndex === 0) {
      isHapus = false;
      teksIndex = (teksIndex + 1) % kata.length; // lopping ke awal jika sudah selesai
      setTimeout(ketik, 500);
    } else {
      setTimeout(ketik, 50);
    }
  }
}
ketik();