import { Toast } from "./toastNotification.js";
import { gameObjects } from "./classes/game.js";
import * as utilModule from "./util.js";
import * as achievementModule from "./achievements.js";
import { achievements } from "./achievements.js";
import * as statsModule from "./stats.js";
import * as prestigeModule from "./prestige.js";
import * as upgradesModule from "./upgrades.js";
import * as cardsModule from "./cards.js";
import * as optionsModule from "./options.js";
import * as challengesModule from "./challenges.js";
import * as passiveModule from "./passive.js";
import * as activeModule from "./active.js";
import { multiUpgrades } from "./active.js";

const wordListUrl =
  "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";

var wordList: string[];

/*Upgrades:
    3 - Passive Income
    8 - Cards
    10 - Challenges


*/

// var game = {
//     points: 1000000000000000000000,
//     allTimePoints: 1000000000000000,
//     upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [50, 200, 500, 1500, 2500, 6000, 10000, 40000, 100000, 200000, 5000000, 10000000]],
//     maxLength: 4,
//     bestWord: "",
//     multiUpgrades: [[0, 0, 0],
//     [50, 100, 500]],
//     achievements: [],
//     wordsAmount: 0,
//     passiveGenerators: [[1, 0, 0, 0, 0, 0, 0],
//     [1, 0, 0, 0, 0, 0, 0],
//     [5, 6, 9, 12, 15, 18, 21]],
//     passiveUpgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [100, 250, 500, 1000, 0, 0, 0, 0, 0, 0]],
//     passiveLength: 4,
//     passivePoints: 0,
//     passiveRate: 1000,
//     cards: [],
//     cardCost: 0,
//     rollsAmount: 10,
//     challenges: [{ OnChallenge: 0, Objective: 20, Amount: 0, Restriction: 210 },
//     { OnChallenge: 0, Objective: 50, Amount: 0, Restriction: 210 }],
//     isInChallenge: false,
//     challengesAmount: 0,
//     letterCounter: 0,
//     prestigePoints: 0,
//     prestigeCount: 0,
//     prestigeUpgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [10, 50, 100, 500, 0, 0, 0, 0, 0, 0]]
// }

window.onload = async function () {
  console.log(gameObjects.game);
  wordList = await getWordList();
  gameObjects.challengeGame = utilModule.Copy(gameObjects.game);
  LoadGame();
  SetWords();
  achievementModule.CreateAchievements();
  Tab("activeMenu");
};

async function getWordList() {
  const loadingElement = document.createElement("div");
  loadingElement.innerText = "Loading...";
  loadingElement.classList.add("loadingPage");
  document.body.appendChild(loadingElement);

  return fetch(wordListUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((wordListText) => {
      const wordList = wordListText.split("\n");
      document.body.removeChild(loadingElement);
      return wordList;
    })
    .catch((error) => {
      // Handle any errors here
      console.error(error);

      // Remove the loading element from the DOM
      document.body.removeChild(loadingElement);

      // Rethrow the error so it can be handled elsewhere
      throw error;
    });
}

const wordToGuessWrapper = document.querySelector("#WordToGuessWrapper");
const wordsContainer = document.querySelector("#WordsContainer");
const wordsLeft = document.querySelector("#WordsLeft");
const wordsLeft2 = document.querySelector("#WordsLeft2");
const wordToGuess = document.querySelector("#WordToGuess");
const wordsRight = document.querySelector("#WordsRight");
const wordsRight2 = document.querySelector("#WordsRight2");

function SetWords() {
  if (wordsLeft) wordsLeft.textContent = GenerateWord();
  if (wordsLeft2) wordsLeft2.textContent = GenerateWord();
  if (wordToGuess) wordToGuess.textContent = GenerateWord();
  if (wordToGuessWrapper) wordToGuessWrapper.classList.add("expand");
  if (wordsRight) wordsRight.textContent = GenerateWord();
  if (wordsRight2) wordsRight2.textContent = GenerateWord();
}

function GenerateWord() {
  var filteredWordList = wordList.filter(
    (x) => x.length <= gameObjects.game.maxLength
  );

  var generatedWord =
    filteredWordList[Math.floor(Math.random() * filteredWordList.length)];

  if (utilModule.HasCard("All Lowercase") || utilModule.IsInChallenge(0))
    generatedWord = generatedWord.toLowerCase();

  return generatedWord;
}

const textbox = document.querySelector("#WordBox");

if (textbox) textbox.addEventListener("input", checkText);

async function checkText(event: Event) {
  if (!event.target) return;
  const eventTarget = event.target as HTMLInputElement;
  var textBoxText = eventTarget.value;

  const wordToGuess = document.querySelector("#WordToGuess");

  if (wordToGuess && textBoxText == wordToGuess.textContent) {
    const wordBox = document.querySelector("#WordBox") as HTMLInputElement;
    if (wordBox) wordBox.value = "";
    var pointsLetters = textBoxText.length;
    var lettersValue = activeModule.GetPointsLetters(textBoxText);
    if (utilModule.IsPurchasedUpgrade(6)) {
      pointsLetters += lettersValue;
      if (lettersValue > activeModule.GetPointsLetters(gameObjects.game.bestWord))
        gameObjects.game.bestWord = textBoxText;
    }
    var wordPoints = activeModule.CalculatePoints(pointsLetters);
    gameObjects.game.points += wordPoints;
    gameObjects.game.allTimePoints += wordPoints;
    gameObjects.game.wordsAmount++;
    if (gameObjects.game.isInChallenge) challengesModule.CheckProgress();
    if (
      textBoxText === "Jack-go-to-bed-at-noon" &&
      !utilModule.IsUnlockedAchievement("Best Word")
    ) {
      gameObjects.game.achievements.push(
        achievements.find((x) => x.name == "Best Word")!
      );
      achievementModule.ShowAchievement("Best Word");
    }
    if (
      textBoxText.length == 10 &&
      !utilModule.IsUnlockedAchievement("10-letter Word")
    ) {
      gameObjects.game.achievements.push(
        achievements.find((x) => x.name == "10-letter Word")!
      );
      achievementModule.ShowAchievement("10-letter Word");
    }
    GuessedWord();
  }
}

function GuessedWord() {
  if (
    !wordsLeft ||
    !wordsLeft2 ||
    !wordToGuess ||
    !wordsRight ||
    !wordsRight2 ||
    !wordToGuessWrapper
  )
    return;
  wordsLeft.textContent = wordsLeft2.textContent;
  wordsLeft2.textContent = wordToGuess.textContent;
  wordToGuess.textContent = wordsRight.textContent;
  wordsRight.textContent = wordsRight2.textContent;
  wordsRight2.textContent = GenerateWord();
  wordToGuessWrapper.classList.add("expand");
}

if (wordToGuessWrapper) {
  wordToGuessWrapper.addEventListener("transitionend", function (e) {
    if ((e as TransitionEvent).propertyName == "transform") {
      wordToGuessWrapper.classList.remove("expand");
    }
  });
}

window.setInterval(function () {
  SetCosts();
  statsModule.SetStats();
  achievementModule.CheckAchievements();
  prestigeModule.SetPrestige();
  upgradesModule.SetUpgrades();
  cardsModule.CalculateBonus();
  optionsModule.SetOptions();
  passiveModule.SetGenerators();
  passiveModule.CalculatePassiveGenerators();
  achievementModule.SetUnlockedAchievements();

  const pointsCounter = document.querySelector("#PointsCounter");
  if (pointsCounter)
    pointsCounter.textContent = Math.round(
      gameObjects.game.points
    ).toExponential(2);

  const passivePoints = document.querySelector("#passivePoints");
  if (passivePoints)
    passivePoints.textContent =
      Math.round(gameObjects.game.passivePoints).toExponential(2) + " PP";

  const activeMenuButton = document.querySelector("#activeMenuButton");
  if (activeMenuButton && activeMenuButton instanceof HTMLElement)
    activeMenuButton.style.display = "flex";

  const upgradesMenuButton = document.querySelector("#upgradesMenuButton");
  if (upgradesMenuButton && upgradesMenuButton instanceof HTMLElement)
    upgradesMenuButton.style.display = "flex";

  const statsMenuButton = document.querySelector("#statsMenuButton");
  if (statsMenuButton && statsMenuButton instanceof HTMLElement)
    statsMenuButton.style.display = "flex";

  const optionsMenuButton = document.querySelector("#optionsMenuButton");
  if (optionsMenuButton && optionsMenuButton instanceof HTMLElement)
    optionsMenuButton.style.display = "flex";

  const achievementsMenuButton = document.querySelector(
    "#achievementsMenuButton"
  );
  if (
    gameObjects.game.achievements.length > 0 &&
    achievementsMenuButton &&
    achievementsMenuButton instanceof HTMLElement
  ) {
    achievementsMenuButton.style.display = "flex";
  }

  const lettersPerSecond = document.querySelector("#LettersPerSecond");

  if (
    utilModule.IsPurchasedUpgrade(2) &&
    lettersPerSecond &&
    lettersPerSecond instanceof HTMLElement
  )
    lettersPerSecond.style.display = "block";

  const passiveMenuButton = document.querySelector("#passiveMenuButton");
  const passiveUpgradesWrapper = document.querySelector(
    "#PassiveUpgradesWrapper"
  );
  if (
    utilModule.IsPurchasedUpgrade(3) &&
    passiveMenuButton &&
    passiveMenuButton instanceof HTMLElement &&
    passiveUpgradesWrapper &&
    passiveUpgradesWrapper instanceof HTMLElement
  ) {
    passiveMenuButton.style.display = "flex";
    passiveUpgradesWrapper.style.display = "flex";
  }

  const cardsMenuButton = document.querySelector("#cardsMenuButton");
  if (
    utilModule.IsPurchasedUpgrade(8) &&
    cardsMenuButton &&
    cardsMenuButton instanceof HTMLElement
  )
    cardsMenuButton.style.display = "flex";

  const challengesMenuButton = document.querySelector("#challengesMenuButton");
  if (
    utilModule.IsPurchasedUpgrade(10) &&
    challengesMenuButton &&
    challengesMenuButton instanceof HTMLElement
  )
    challengesMenuButton.style.display = "flex";

  const prestigeMenuButton = document.querySelector("#prestigeMenuButton");
  if (
    gameObjects.game.allTimePoints >= 1000000 &&
    prestigeMenuButton &&
    prestigeMenuButton instanceof HTMLElement
  )
    prestigeMenuButton.style.display = "flex";

  const PrestigeUpgradesWrapper = document.querySelector(
    "#PrestigeUpgradesWrapper"
  );
  if (
    gameObjects.game.prestigeCount > 0 &&
    PrestigeUpgradesWrapper &&
    PrestigeUpgradesWrapper instanceof HTMLElement
  )
    PrestigeUpgradesWrapper.style.display = "flex";

  if (
    !gameObjects.game.isInChallenge &&
    gameObjects.game.challenges.filter((x) => x.onChallenge).length == 0
  )
    gameObjects.activeGame = utilModule.Copy(gameObjects.game);
}, 100);

let letters: number = 0;
let startTime: number;
const display = document.querySelector("#LettersPerSecond");

const input = document.querySelector("#WordBox");

if (input) {
  input.addEventListener("keydown", function () {
    if (gameObjects.game.challenges[0].onChallenge) {
      gameObjects.game.letterCounter++;
      if (
        gameObjects.game.challenges[0].restriction <=
        gameObjects.game.letterCounter
      )
        gameObjects.game.isInChallenge = false;
    }
    console.log(gameObjects.game.letterCounter);
    letters++;
    if (letters === 1) startTime = Date.now();
  });
}

var lettersPressed = 0;

setInterval(function () {
  if (!display) return;
  let currentTime = Date.now();
  let elapsedTime = (currentTime - startTime) / 1000;
  let LPS = letters / elapsedTime;
  if (lettersPressed === letters) {
    display.innerHTML = "LPS : 0.00";
    letters = 0;
    startTime = Date.now();
  } else {
    lettersPressed = letters;
    display.innerHTML = "LPS : " + LPS.toFixed(2);
  }
}, 1000);

const activeMenuButton = document.querySelector("#activeMenuButton");

if (activeMenuButton)
  activeMenuButton.addEventListener("click", (e) => {
    Tab("activeMenu");
  });

const passiveMenuButton = document.querySelector("#passiveMenuButton");

if (passiveMenuButton)
  passiveMenuButton.addEventListener("click", (e) => {
    Tab("passiveMenu");
  });

const upgradesMenuButton = document.querySelector("#upgradesMenuButton");

if (upgradesMenuButton)
  upgradesMenuButton.addEventListener("click", (e) => {
    Tab("upgradesMenu");
  });

const challengesMenuButton = document.querySelector("#challengesMenuButton");

if (challengesMenuButton)
  challengesMenuButton.addEventListener("click", (e) => {
    Tab("challengesMenu");
  });

const prestigeMenuButton = document.querySelector("#prestigeMenuButton");

if (prestigeMenuButton)
  prestigeMenuButton.addEventListener("click", (e) => {
    Tab("prestigeMenu");
  });

const cardsMenuButton = document.querySelector("#cardsMenuButton");

if (cardsMenuButton)
  cardsMenuButton.addEventListener("click", (e) => {
    Tab("cardsMenu");
  });

const achievementsMenuButton = document.querySelector(
  "#achievementsMenuButton"
);

if (achievementsMenuButton)
  achievementsMenuButton.addEventListener("click", (e) => {
    Tab("achievementsMenu");
  });

const statsMenuButton = document.querySelector("#statsMenuButton");

if (statsMenuButton)
  statsMenuButton.addEventListener("click", (e) => {
    Tab("statsMenu");
  });

const optionsMenuButton = document.querySelector("#optionsMenuButton");

if (optionsMenuButton)
  optionsMenuButton.addEventListener("click", (e) => {
    Tab("optionsMenu");
  });

function Tab(tabName: string) {
  const activeMenu = document.querySelector("#activeMenu");
  if (activeMenu && activeMenu instanceof HTMLElement)
    activeMenu.style.display = "none";

  const passiveMenu = document.querySelector("#passiveMenu");
  if (passiveMenu && passiveMenu instanceof HTMLElement)
    passiveMenu.style.display = "none";

  const upgradesMenu = document.querySelector("#upgradesMenu");
  if (upgradesMenu && upgradesMenu instanceof HTMLElement)
    upgradesMenu.style.display = "none";

  const cardsMenu = document.querySelector("#cardsMenu");
  if (cardsMenu && cardsMenu instanceof HTMLElement)
    cardsMenu.style.display = "none";

  const statsMenu = document.querySelector("#statsMenu");
  if (statsMenu && statsMenu instanceof HTMLElement)
    statsMenu.style.display = "none";

  const prestigeMenu = document.querySelector("#prestigeMenu");
  if (prestigeMenu && prestigeMenu instanceof HTMLElement)
    prestigeMenu.style.display = "none";

  const challengesMenu = document.querySelector("#challengesMenu");
  if (challengesMenu && challengesMenu instanceof HTMLElement)
    challengesMenu.style.display = "none";

  const optionsMenu = document.querySelector("#optionsMenu");
  if (optionsMenu && optionsMenu instanceof HTMLElement)
    optionsMenu.style.display = "none";

  const achievementsMenu = document.querySelector("#achievementsMenu");
  if (achievementsMenu && achievementsMenu instanceof HTMLElement)
    achievementsMenu.style.display = "none";

  const tab = document.getElementById(tabName);
  if (tab && tab instanceof HTMLElement) {
    tab.style.display = "block";
    tab.style.marginTop = "2rem";
  }
}

function SetCosts() {
  const multiUpgrade1 = document.querySelector("#multiUpgrade1");
  const multiUpgrade1Object = gameObjects.game.multiUpgrades.find(x => x.id == 1);

  if (multiUpgrade1)
    multiUpgrade1.textContent =
      "+1 point per word! Cost: " + (multiUpgrade1Object ? 
      Math.round(multiUpgrade1Object.cost) : 50);

  const multiUpgrade2 = document.querySelector("#multiUpgrade2");
  const multiUpgrade2Object = gameObjects.game.multiUpgrades.find(x => x.id == 2);

  if (multiUpgrade2)
    multiUpgrade2.textContent =
      "+1 letter per word! Cost: " + (multiUpgrade2Object ?
      Math.round(multiUpgrade2Object.cost) : 100);

  const multiUpgrade3 = document.querySelector("#multiUpgrade3");
  const multiUpgrade3Object = gameObjects.game.multiUpgrades.find(x => x.id == 3);

  if (multiUpgrade3)
    multiUpgrade3.textContent =
      "+25% points! Cost: " + (multiUpgrade3Object ?
        Math.round(multiUpgrade3Object.cost) : 500);

  const cardsButton = document.querySelector("#cardsButton");
  if (cardsButton)
    cardsButton.textContent = `Get a Pack! Cost: ${
      Math.round(gameObjects.game.cardCost) == 0
        ? "Free!"
        : Math.round(gameObjects.game.cardCost)
    }`;
}

const saveButton = document.querySelector("#saveButton");
const logButton = document.querySelector("#logButton");

if (saveButton) {
  saveButton.addEventListener("click", (e) => {
    localStorage.setItem("save", JSON.stringify(gameObjects.game));
  });
}

if (logButton) {
  logButton.addEventListener("click", (e) => {
    console.log(gameObjects.game);
    console.log(gameObjects.challengeGame);
  });
}

function LoadGame() {
  var savegame = JSON.parse(localStorage.getItem("save")!);
  if (savegame === null) return;
  if (typeof savegame.points !== "undefined" && typeof savegame.points !== null)
    gameObjects.game.points = savegame.points;
  if (
    typeof savegame.upgrades !== "undefined" &&
    typeof savegame.upgrades !== null
  )
    gameObjects.game.upgrades = savegame.upgrades;
  if (
    typeof savegame.multiUpgrades !== "undefined" &&
    typeof savegame.multiUpgrades !== null
  )
    gameObjects.game.multiUpgrades = savegame.multiUpgrades;
}

const tabs = document.querySelector("#TabsContainer");

if (tabs) {
  tabs.addEventListener("wheel", (evt) => {
    evt.preventDefault();

    tabs.scrollBy({
      left: (evt as WheelEvent).deltaY < 0 ? -50 : 50,
    });
  });
}

const cardButton = document.querySelector("#cardsHeaderContainer");

if (cardButton && cardButton instanceof HTMLElement) {
  cardButton.onmousemove = (e) => {
    const decimal = e.clientX / cardButton.offsetWidth;

    const basePercent = 80,
      percentRange = 20,
      adjustablePercent = percentRange * decimal;

    const colorPercent = basePercent + adjustablePercent;

    cardButton.style.setProperty("--color-percent", `${colorPercent}%`);
  };
}

const light = document.querySelector("#light");
// const gallery = document.querySelector("#background");

window.onmousemove = (e) => {
  if (!light || !(light instanceof HTMLElement)) return;

  const mouseX = e.clientX,
    mouseY = e.clientY;

  const x = mouseX - light.offsetWidth / 2,
    y = mouseY - light.offsetHeight / 2;

  light.style.transform = `translate(${x}px, ${y}px)`;

  // const xDecimal = mouseX / window.innerWidth,
  //     yDecimal = mouseY / window.innerHeight;

  // const maxX = gallery.offsetWidth - window.innerWidth,
  //     maxY = gallery.offsetHeight - window.innerHeight;

  // const panX = maxX * xDecimal * -1,
  //     panY = maxY * yDecimal * -1;

  // gallery.animate({
  //     transform: `translate(${panX}px, ${panY}px)`
  // }, {
  //     duration: 4000,
  //     fill: "forwards",
  //     easing: "ease"
  // });
};

