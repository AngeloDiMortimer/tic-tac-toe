const cellElements = document.querySelectorAll("[data-cell]");
const restartBtn = document.getElementById("btn-restart");

const winningComb = [
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
    const currentClass = circleTurn ? Oclass : Xclass;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        console.log("winner");
    }
    swapTurns();
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
    cell.textContent = currentClass;
}

const swapTurns = () => {
    circleTurn = !circleTurn;
}

const checkWin = (currentClass) => {
    return winningComb.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

const startGame = () => {
    cellElements.forEach(cell => {
        cell.classList.remove(Xclass);
        cell.classList.remove(Oclass);
        cell.textContent = "";
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    })
}

startGame();
restartBtn.onclick = startGame;