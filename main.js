const cellElements = document.querySelectorAll("[data-cell]");

const Xclass = "X";
const Oclass = "O";
let circleTurn; //Turn of the player

const handleClick = (e) => {
    const cell = e.target;
    const currentClass = circleTurn ? Oclass : Xclass;
    placeMark(cell, currentClass);
    swapTurns();
}

const placeMark = (cell, currentClass) => {
    cell.textContent = currentClass;
}

const swapTurns = () => {
    circleTurn = !circleTurn;
}

cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true });
})

