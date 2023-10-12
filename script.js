// HTML-Elemente
const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");

// Gewinnmuster-Array
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

// Spieler 'X' beginnt
let xTurn = true;
let count = 0;

// Alle Buttons deaktivieren
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Popup aktivieren
  popupRef.classList.remove("hide");
};

// Alle Buttons aktivieren (Neues Spiel und Neustart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Popup deaktivieren
  popupRef.classList.add("hide");
};

// Funktion für den Gewinnfall
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Gewinnt";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Gewinnt";
  }
};

// Funktion für ein Unentschieden
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> Unentschieden";
};

// Neue Spiel-Funktion
const newGame = () => {
  count = 0;
  enableButtons();
  xTurn = true; // Spieler 'X' beginnt
};

// Neustart-Funktion
const restartGame = () => {
  count = 0;
  enableButtons();
  xTurn = true; // Spieler 'X' beginnt
};

// Funktion, um einen verfügbaren leeren Button-Index zu erhalten
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
      // Zufälligen leeren Button auswählen
      const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
      // AI-Zug (angenommen, AI spielt "O")
      btnRef[randomIndex].innerText = "O";
      btnRef[randomIndex].disabled = true;
  
      // Zähler nach AI-Zug inkrementieren
      count += 1;
  
      // Nach AI-Zug auf Gewinn prüfen
      winChecker();
  
      if (count === 9) {
        drawFunction();
      }
    }
  };

// Gewinnprüfung
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

// Event-Listener für die Buttons
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn && element.innerText === "") {
      // 'X' anzeigen
      element.innerText = "X";
      element.disabled = true;

      // Zähler nach Spielerzug inkrementieren
      count += 1;

      // Nach Spielerzug auf Gewinn prüfen
      winChecker();

      if (count === 9) {
        drawFunction();
      }

      // AI spielt nach 1 Sekunde Verzögerung nach dem Spielerzug
      playAIWithDelay();
    }
  });
});

// Spiel initialisieren
window.onload = () => {
  // Spiel initialisieren
  newGame();
};

// Event-Listener für Neues Spiel
newgameBtn.addEventListener("click", () => {
  // Neues Spiel starten
  newGame();
});

// Event-Listener für Neustart
restartBtn.addEventListener("click", () => {
  // Spiel neustarten
  restartGame();
});
