const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');

let currPlayer = 'X';
let currPlayerName = 'Player X';
let turns = 0;
let gameOver = false;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    if (gameOver || cell.textContent !== '') return;
    
    cell.textContent = currPlayer;
    cell.setAttribute('data-cell', currPlayer);
    turns += 1;

    if (checkWinner(currPlayer)) {
        gameStatus.textContent = currPlayerName + " is the winner!";
        gameOver = true;
        playVictoryMusic();
    } else if (turns === 9) {
        gameStatus.textContent = "Tie!";
        gameOver = true;
        playTieMusic();
    } else {
        switchPlayer();
        gameStatus.textContent = currPlayerName + "'s turn";
    }
}

function checkWinner(player) {
    return winCombos.some(combo => 
        combo.every(index => cells[index].textContent === player)
    );
}

function switchPlayer() {
    currPlayer = currPlayer === 'X' ? 'O' : 'X';
    currPlayerName = currPlayer === 'X' ? 'Player X' : 'Player O';
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeAttribute('data-cell');
    });
    turns = 0;
    gameOver = false;
    currPlayer = 'X';
    currPlayerName = 'Player X';
    gameStatus.textContent = currPlayerName + "'s turn";
}

function playBackgroundMusic() {
    const audio = new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\2-cherry-cute-bgm-271158.mp3");
    audio.loop = true;
    audio.play();
}

function playVictoryMusic() {
    const audio = new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\applause-crowd-cheering-sound-effect.mp3");
    audio.play();
}

function playTieMusic() {
    const audio = new Audio("c:\\Users\\FINE COMPUTERS\\Downloads\\lose-sound-effects.mp3");
    audio.play();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
window.addEventListener('load', playBackgroundMusic);
