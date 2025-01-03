const startBtn = document.querySelector("#btn");
const progressBar = document.querySelector("#progress");
const pikachuEl = document.querySelector("#pikachuBtn");
const charmanderEl = document.querySelector("#charmanderBtn");
const bulbasaurEl = document.querySelector("#bulbasaurBtn");
const playerChc = document.querySelector("#playerChoice");
const computerChc = document.querySelector("#computerChoice");
const result = document.querySelector("#results");
const scorePlayerEl = document.querySelector("#scoreP");
const scoreComputerEl = document.querySelector("#scoreM");
const exitBtn = document.querySelector("#exitBtn");
const playAgainBtn = document.querySelector("#playAgain");

if (exitBtn) {
  exitBtn.style.display = "none";
}
if (progressBar) {
  progressBar.style.display = "none";
}


const pikachuSound = new Audio("../audio/Voicy_Pikachu.mp3");
const cahrmanderSound = new Audio("../audio/Voicy_Charmander🔥 .mp3");
const bulbaseurSound = new Audio(
  "../audio/Voicy_4- Bulbasaur Sounds_ Pokemon Snap.mp3"
);
const victorySound = new Audio("../audio/victory-85561.mp3");
const loseSound = new Audio("../audio/videogame-death-sound-43894.mp3");
const audio = new Audio("./audio/Voicy_Pokemon Theme.mp3");

const pokemons = ["pikachu", "charmander", "bulbasaur"];

const pokemonImgs = {
  pikachu: "https://i.scdn.co/image/ab67616d0000b273cfeae645958e9248abff0710",
  charmander: "https://img.pokemondb.net/sprites/home/normal/2x/charmander.jpg",
  bulbasaur:
    "https://d18xazalilbrpm.cloudfront.net/media/catalog/product/cache/a79ec3f7a1096baffe71b5bb544d7c70/c/r/cr-10010046_001_alt100.jpg",
};

let points = {
  player: 0,
  computer: 0,
};

function startGame() {
  audio.play();

  progressBar.style.display = "block";
  startBtn.style.display = "none";
  const progressBarInner = document.querySelector(".progress-bar");
  let progress = 0;

  const interval = setInterval(() => {
    progress += 2;
    progressBarInner.style.width = `${progress}%`;
    progressBarInner.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        window.location.href = "./pages/main.html";
      }, 200);
    }
  }, 200);
}

function playerChoice(choice) {
  playerChc.textContent = `Your choice: ${choice}`;
  document.querySelector("#playerCard").src = pokemonImgs[choice];

  playCharacterSounds(choice);
  const computerChoice = randomChoice();
  computerChc.textContent = `Machine choice: ${computerChoice}`;
  document.querySelector("#computerCard").src = pokemonImgs[computerChoice];

  chooseWinner(choice, computerChoice);
}

function randomChoice() {
  const randomIndex = Math.floor(Math.random() * pokemons.length);
  return pokemons[randomIndex];
}

function chooseWinner(player, computer) {
  if (player === computer) {
    result.textContent = " Draw draw!🤝";
  } else if (
    (player === "pikachu" && computer === "bulbasaur") ||
    (player === "charmander" && computer === "pikachu") ||
    (player === "bulbasaur" && computer === "charmander")
  ) {
    result.textContent = "Round won!🥰";
    points.player += 1;
  } else {
    result.textContent = " Round lose! 🙀";
    points.computer += 1;
  }

  updateScores();
  checkGame();
}

function updateScores() {
  scorePlayerEl.textContent = `Player score: ${points.player}`;
  scoreComputerEl.textContent = `Computer score: ${points.computer}`;
}

function playCharacterSounds(choice) {
  if (choice === "pikachu") {
    pikachuSound.play();
  } else if (choice === "charmander") {
    cahrmanderSound.play();
  } else {
    bulbaseurSound.play();
  }
}

function checkGame() {
  if (points.player >= 5) {
    result.textContent = "You win the game!😌😌 ";
    victorySound.play();
    disableGame();
  } else if (points.computer >= 5) {
    result.textContent = "Computer wins the game! 🙀🙀";
    loseSound.play();
    disableGame();
  }
  if (playAgainBtn) {
    playAgainBtn.style.display = "block";
  }
}

function disableGame() {
  pikachuEl.disabled = true;
  charmanderEl.disabled = true;
  bulbasaurEl.disabled = true;

  if (playAgainBtn) {
    playAgainBtn.style.display = "block";
  }
  if (exitBtn) {
    exitBtn.style.display = "block";
  }
}

function exitGame() {
  window.location.href = "../index.html";
}
function resetGame() {
  points.player = 0;
  points.computer = 0;
  updateScores();

  result.textContent = "Game Reset! Let's Play Again!💃🏻";
  playerChc.textContent = "";
  computerChc.textContent = "";
  document.querySelector("#playerCard").src =
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg";
  document.querySelector("#computerCard").src =
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pokemon_Trading_Card_Game_cardback.jpg/220px-Pokemon_Trading_Card_Game_cardback.jpg";

  pikachuEl.disabled = false;
  charmanderEl.disabled = false;
  bulbasaurEl.disabled = false;

  if (playAgainBtn) {
    playAgainBtn.style.display = "none";
  }

  if (exitBtn) {
    exitBtn.style.display = "none";
  }
}

if (startBtn) startBtn.addEventListener("click", startGame);
if (pikachuEl)
  pikachuEl.addEventListener("click", () => playerChoice("pikachu"));
if (charmanderEl)
  charmanderEl.addEventListener("click", () => playerChoice("charmander"));
if (bulbasaurEl)
  bulbasaurEl.addEventListener("click", () => playerChoice("bulbasaur"));
if (exitBtn) exitBtn.addEventListener("click", exitGame);
if (playAgainBtn) {
  playAgainBtn.addEventListener("click", resetGame);
}
