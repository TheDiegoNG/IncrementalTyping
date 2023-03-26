var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const wordListUrl = "https://raw.githubusercontent.com/dwyl/english-words/master/words.txt";
var wordList;
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
window.onload = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(gameObjects.game);
        wordList = yield getWordList();
        gameObjects.challengeGame = utilModule.Copy(gameObjects.game);
        LoadGame();
        SetWords();
        achievementModule.CreateAchievements();
        Tab("activeMenu");
    });
};
function getWordList() {
    return __awaiter(this, void 0, void 0, function* () {
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
    if (wordsLeft)
        wordsLeft.textContent = GenerateWord();
    if (wordsLeft2)
        wordsLeft2.textContent = GenerateWord();
    if (wordToGuess)
        wordToGuess.textContent = GenerateWord();
    if (wordToGuessWrapper)
        wordToGuessWrapper.classList.add("expand");
    if (wordsRight)
        wordsRight.textContent = GenerateWord();
    if (wordsRight2)
        wordsRight2.textContent = GenerateWord();
}
function GenerateWord() {
    var filteredWordList = wordList.filter((x) => x.length <= gameObjects.game.maxLength);
    var generatedWord = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
    if (utilModule.HasCard("All Lowercase") || utilModule.IsInChallenge(1))
        generatedWord = generatedWord.toLowerCase();
    return generatedWord;
}
const textbox = document.querySelector("#WordBox");
if (textbox)
    textbox.addEventListener("input", checkText);
function checkText(event) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!event.target)
            return;
        const eventTarget = event.target;
        var textBoxText = eventTarget.value;
        const wordToGuess = document.querySelector("#WordToGuess");
        if (wordToGuess && textBoxText == wordToGuess.textContent) {
            const wordBox = document.querySelector("#WordBox");
            if (wordBox)
                wordBox.value = "";
            var pointsLetters = textBoxText.length;
            var lettersValue = activeModule.GetPointsLetters(textBoxText);
            if (utilModule.IsPurchasedUpgrade(7)) {
                pointsLetters += lettersValue;
                if (lettersValue > activeModule.GetPointsLetters(gameObjects.game.bestWord))
                    gameObjects.game.bestWord = textBoxText;
            }
            var wordPoints = activeModule.CalculatePoints(pointsLetters);
            gameObjects.game.points += wordPoints;
            gameObjects.game.allTimePoints += wordPoints;
            gameObjects.game.wordsAmount++;
            if (gameObjects.game.isInChallenge)
                challengesModule.CheckProgress();
            if (textBoxText === "Jack-go-to-bed-at-noon" &&
                !utilModule.IsUnlockedAchievement("Best Word")) {
                gameObjects.game.achievements.push(achievements.find((x) => x.name == "Best Word"));
                achievementModule.ShowAchievement("Best Word");
            }
            if (textBoxText.length == 10 &&
                !utilModule.IsUnlockedAchievement("10-letter Word")) {
                gameObjects.game.achievements.push(achievements.find((x) => x.name == "10-letter Word"));
                achievementModule.ShowAchievement("10-letter Word");
            }
            GuessedWord();
        }
    });
}
function GuessedWord() {
    if (!wordsLeft ||
        !wordsLeft2 ||
        !wordToGuess ||
        !wordsRight ||
        !wordsRight2 ||
        !wordToGuessWrapper)
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
        if (e.propertyName == "transform") {
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
        pointsCounter.textContent = utilModule.formatNumber(Math.round(gameObjects.game.points));
    const passivePoints = document.querySelector("#passivePoints");
    if (passivePoints)
        passivePoints.textContent =
            utilModule.formatNumber(Math.round(gameObjects.game.passivePoints)) +
                " PP";
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
    const achievementsMenuButton = document.querySelector("#achievementsMenuButton");
    if (gameObjects.game.achievements.length > 0 &&
        achievementsMenuButton &&
        achievementsMenuButton instanceof HTMLElement) {
        achievementsMenuButton.style.display = "flex";
    }
    const lettersPerSecond = document.querySelector("#LettersPerSecond");
    if (lettersPerSecond && lettersPerSecond instanceof HTMLElement) {
        if (utilModule.IsPurchasedUpgrade(3)) {
            lettersPerSecond.style.display = "block";
        }
        else
            lettersPerSecond.style.display = "none";
    }
    const passiveMenuButton = document.querySelector("#passiveMenuButton");
    const passiveUpgradesWrapper = document.querySelector("#PassiveUpgradesWrapper");
    if (passiveMenuButton &&
        passiveMenuButton instanceof HTMLElement &&
        passiveUpgradesWrapper &&
        passiveUpgradesWrapper instanceof HTMLElement) {
        if (utilModule.IsPurchasedUpgrade(4)) {
            passiveMenuButton.style.display = "flex";
            passiveUpgradesWrapper.style.display = "flex";
        }
        else {
            passiveMenuButton.style.display = "none";
            passiveUpgradesWrapper.style.display = "none";
        }
    }
    const cardsMenuButton = document.querySelector("#cardsMenuButton");
    if (cardsMenuButton && cardsMenuButton instanceof HTMLElement) {
        if (utilModule.IsPurchasedUpgrade(9)) {
            cardsMenuButton.style.display = "flex";
        }
        else
            cardsMenuButton.style.display = "none";
    }
    const challengesMenuButton = document.querySelector("#challengesMenuButton");
    if (challengesMenuButton && challengesMenuButton instanceof HTMLElement) {
        if (utilModule.IsPurchasedUpgrade(11)) {
            challengesMenuButton.style.display = "flex";
        }
        else
            challengesMenuButton.style.display = "none";
    }
    const prestigeMenuButton = document.querySelector("#prestigeMenuButton");
    if (prestigeMenuButton && prestigeMenuButton instanceof HTMLElement) {
        if (gameObjects.game.allTimePoints >= 1000000) {
            prestigeMenuButton.style.display = "flex";
        }
        else
            prestigeMenuButton.style.display = "none";
    }
    const PrestigeUpgradesWrapper = document.querySelector("#PrestigeUpgradesWrapper");
    if (PrestigeUpgradesWrapper &&
        PrestigeUpgradesWrapper instanceof HTMLElement) {
        if (gameObjects.game.prestigeCount > 0) {
            PrestigeUpgradesWrapper.style.display = "flex";
        }
        else
            PrestigeUpgradesWrapper.style.display = "none";
    }
    if (!gameObjects.game.isInChallenge &&
        !gameObjects.game.challenges.find((x) => x.onChallenge))
        gameObjects.activeGame = utilModule.Copy(gameObjects.game);
}, 100);
let letters = 0;
let startTime;
const display = document.querySelector("#LettersPerSecond");
const input = document.querySelector("#WordBox");
if (input) {
    input.addEventListener("keydown", function () {
        const challenge1 = gameObjects.game.challenges.find((x) => x.id == 1);
        if (challenge1) {
            if (challenge1.onChallenge) {
                gameObjects.game.letterCounter++;
                if (challenge1.restriction <= gameObjects.game.letterCounter)
                    gameObjects.game.isInChallenge = false;
            }
        }
        console.log(gameObjects.game.letterCounter);
        letters++;
        if (letters === 1)
            startTime = Date.now();
    });
}
var lettersPressed = 0;
setInterval(function () {
    if (!display)
        return;
    let currentTime = Date.now();
    let elapsedTime = (currentTime - startTime) / 1000;
    let LPS = letters / elapsedTime;
    if (lettersPressed === letters) {
        display.innerHTML = "LPS : 0.00";
        letters = 0;
        startTime = Date.now();
    }
    else {
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
const achievementsMenuButton = document.querySelector("#achievementsMenuButton");
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
function Tab(tabName) {
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
    const multiUpgrade1Text = document.querySelector("#multiUpgrade1Text");
    const multiUpgrade1Object = gameObjects.game.multiUpgrades.find((x) => x.id == 1);
    if (multiUpgrade1Text)
        multiUpgrade1Text.textContent = multiUpgrade1Object
            ? utilModule.formatNumber(Math.round(multiUpgrade1Object.cost))
            : "50";
    const multiUpgrade2Text = document.querySelector("#multiUpgrade2Text");
    const multiUpgrade2Object = gameObjects.game.multiUpgrades.find((x) => x.id == 2);
    if (multiUpgrade2Text)
        multiUpgrade2Text.textContent = multiUpgrade2Object
            ? utilModule.formatNumber(Math.round(multiUpgrade2Object.cost))
            : "100";
    const multiUpgrade3Text = document.querySelector("#multiUpgrade3Text");
    const multiUpgrade3Object = gameObjects.game.multiUpgrades.find((x) => x.id == 3);
    if (multiUpgrade3Text)
        multiUpgrade3Text.textContent = multiUpgrade3Object
            ? utilModule.formatNumber(Math.round(multiUpgrade3Object.cost))
            : "500";
    const cardsButton = document.querySelector("#cardsButton");
    if (cardsButton)
        cardsButton.textContent = `Get a Pack! Cost: ${Math.round(gameObjects.game.cardCost) == 0
            ? "Free!"
            : utilModule.formatNumber(Math.round(gameObjects.game.cardCost))}`;
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
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame === null)
        return;
    if (typeof savegame.points !== "undefined" && typeof savegame.points !== null)
        gameObjects.game.points = savegame.points;
    if (typeof savegame.upgrades !== "undefined" &&
        typeof savegame.upgrades !== null)
        gameObjects.game.upgrades = savegame.upgrades;
    if (typeof savegame.multiUpgrades !== "undefined" &&
        typeof savegame.multiUpgrades !== null)
        gameObjects.game.multiUpgrades = savegame.multiUpgrades;
}
const tabs = document.querySelector("#TabsContainer");
if (tabs) {
    tabs.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        tabs.scrollBy({
            left: evt.deltaY < 0 ? -50 : 50,
        });
    });
}
const cardButton = document.querySelector("#cardsHeaderContainer");
if (cardButton && cardButton instanceof HTMLElement) {
    cardButton.onmousemove = (e) => {
        const decimal = e.clientX / cardButton.offsetWidth;
        const basePercent = 80, percentRange = 20, adjustablePercent = percentRange * decimal;
        const colorPercent = basePercent + adjustablePercent;
        cardButton.style.setProperty("--color-percent", `${colorPercent}%`);
    };
}
const light = document.querySelector("#light");
// const gallery = document.querySelector("#background");
window.onmousemove = (e) => {
    if (!light || !(light instanceof HTMLElement))
        return;
    const mouseX = e.clientX, mouseY = e.clientY;
    const x = mouseX - light.offsetWidth / 2, y = mouseY - light.offsetHeight / 2;
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
