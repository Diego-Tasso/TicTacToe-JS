const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];
    currentPlayer.innerHTML = `Turno do ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.classList.remove("X", "O");
        item.addEventListener("click", newMove);
    });

    mudaCor();
}

init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.classList.add("jogada");
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(check, 100);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `Turno do ${player}`;
    mudaCor();
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O jogador '" + playerLastMove + "' Ganhou ");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("Deu Empate!");
        init();
        return;
    }
}

function mudaCor() {
    document.querySelectorAll('.jogada').forEach(button => {
        if (button.textContent === 'X') {
            button.style.color = '#11337C';
        } else if (button.textContent === 'O') {
            button.style.color = '#B81C24';
        }
    });
}

mudaCor();