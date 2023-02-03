const cellElements = document.querySelectorAll("[data-cell]");
const restartBtn = document.getElementById("btn-restart");
const playerX = document.getElementById("player-x");
const playerO = document.getElementById("player-o");
const endGameMsg = document.getElementById("win-msg");
const winnerMsg = document.getElementById("winner");
const xWin = document.getElementById("x-win");
const oWin = document.getElementById("o-win");
const winDraw = document.getElementById("win-draw");
const overlay = document.getElementById("overlay");

const winningComb = [ //Winning combinations
    /* Horizontal */
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    /* Vertical */
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    /* Diagonal */
    [0, 4, 8],
    [2, 4, 6]
];
const Xclass = "X";
const Oclass = "O";
let circleTurn; //Turn of the player


const handleClick = (e) => {
    const cell = e.target;
    const currentClass = circleTurn ? Oclass : Xclass; //checks the current turn
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true, currentClass)
    } else {
        swapTurns(); 
    }
}

const endGame = (draw, currentClass) => {

    if (draw) {

        
        winDraw.classList.add("active");
        overlay.classList.add("active");

    } else if (currentClass === Oclass) {

        winnerMsg.classList.add("active");
        oWin.classList.add("active");
        overlay.classList.add("active");

    } else if (currentClass === Xclass) {
        winnerMsg.classList.add("active");
        xWin.classList.add("active");
        overlay.classList.add("active");
    }
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(Xclass) || 
        cell.classList.contains(Oclass);
    });
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.textContent = currentClass;
}

const swapTurns = () => {
    circleTurn = !circleTurn;
    circleTurn ? (playerO.classList.add("active"), playerX.classList.remove("active")) :
    (playerX.classList.add("active"), playerO.classList.remove("active"));
}

const checkWin = (currentClass) => {
    return winningComb.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

const resetAll = (cell) => {
    cell.classList.remove(Xclass);
    cell.classList.remove(Oclass);
    cell.textContent = "";
    winnerMsg.classList.remove("active");
    xWin.classList.remove("active");
    oWin.classList.remove("active");
    winDraw.classList.remove("active");
    overlay.classList.remove("active");
    playerX.classList.remove("active");
    playerO.classList.remove("active");
}

const startGame = () => {
    cellElements.forEach(cell => {
        /* Clears everything before starting */
        resetAll(cell);
        cell.removeEventListener("click", handleClick);
        
        /* Puts either an X or O inside a cell */
        cell.addEventListener("click", handleClick, { once: true });
    })
}

startGame();
restartBtn.onclick = startGame;
endGameMsg.onclick = startGame;
overlay.onclick = startGame;

//check for a draw and display end message
//make it so it's possible to play against an AI