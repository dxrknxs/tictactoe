const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");

const winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Gewinnt";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Gewinnt";
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Unentschieden";
};

const newGame = () => {
  count = 0;
  enableButtons();
  xTurn = true; 
};

const restartGame = () => {
  count = 0;
  enableButtons();
  xTurn = true;
};

const getEmptyButtonIndex = () => {
  const emptyIndexes = [];
  for (let i = 0; i < btnRef.length; i++) {
    if (btnRef[i].innerText === "") {
      emptyIndexes.push(i);
    }
  }
  return emptyIndexes;
};

const playAIWithDelay = () => {
    const emptyIndexes = getEmptyButtonIndex();
  
    if (emptyIndexes.length > 0) {
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      btnRef[randomIndex].innerText = "O";
      btnRef[randomIndex].disabled = true;
  
      count += 1;
  
      winChecker();
  
      if (count === 9) {
        drawFunction();
      }
    }
  };

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn && element.innerText === "") {
      element.innerText = "X";
      element.disabled = true;

      count += 1;

      winChecker();

      if (count === 9) {
        drawFunction();
      }

      playAIWithDelay();
    }
  });
});

window.onload = () => {
  newGame();
};

newgameBtn.addEventListener("click", () => {
  newGame();
});

restartBtn.addEventListener("click", () => {
  restartGame();
});
