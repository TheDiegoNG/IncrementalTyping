import { Toast } from "./toastNotification.js";
import { gameObjects } from "./game.js";
import * as utilModule from "./util.js"
import * as achievementModule from "./achievements.js";
import * as statsModule from "./stats.js";
import * as prestigeModule from "./prestige.js";
import * as upgradesModule from "./upgrades.js";
import * as cardsModule from "./cards.js";
import * as optionsModule from "./options.js";
import * as challengesModule from "./challenges.js";
import * as passiveModule from "./passive.js";
import * as activeModule from "./active.js";

const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

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


window.onload = async function () {
    console.log(gameObjects.game);
    wordList = await getWordList();
    gameObjects.challengeGame = utilModule.Copy(gameObjects.game);
    LoadGame();
    SetWords();
    achievementModule.CreateAchievements();
    Tab("activeMenu");
}

async function getWordList() {
    const loadingElement = document.createElement('div');
    loadingElement.innerText = 'Loading...';
    loadingElement.classList.add("loadingPage");
    document.body.appendChild(loadingElement);

    return fetch(wordListUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(wordListText => {
            const wordList = wordListText.split('\n');
            document.body.removeChild(loadingElement);
            return wordList;
        })
        .catch(error => {
            // Handle any errors here
            console.error(error);

            // Remove the loading element from the DOM
            document.body.removeChild(loadingElement);

            // Rethrow the error so it can be handled elsewhere
            throw error;
        });
}

const wordToGuessWrapper = document.getElementById("WordToGuessWrapper");
const wordsContainer = document.getElementById("WordsContainer");
const wordsLeft = document.getElementById("WordsLeft");
const wordsLeft2 = document.getElementById("WordsLeft2");
const wordToGuess = document.getElementById("WordToGuess");
const wordsRight = document.getElementById("WordsRight");
const wordsRight2 = document.getElementById("WordsRight2");


function SetWords() {

    wordsLeft.textContent = GenerateWord();
    wordsLeft2.textContent = GenerateWord();
    wordToGuess.textContent = GenerateWord();
    wordToGuessWrapper.classList.add("expand");
    wordsRight.textContent = GenerateWord();
    wordsRight2.textContent = GenerateWord();

}

function GenerateWord() {

    var filteredWordList = wordList.filter(x => x.length <= gameObjects.game.maxLength);

    var generatedWord = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];

    if (utilModule.HasCard("All Lowercase") || utilModule.IsInChallenge(0)) generatedWord = generatedWord.toLowerCase();

    return generatedWord;
}

var textbox = document.getElementById("WordBox");
textbox.addEventListener("input", checkText);

async function checkText(event) {
    var textBoxText = new String(event.target.value);

    if (textBoxText == document.getElementById("WordToGuess").textContent) {
        document.getElementById("WordBox").value = "";
        var pointsLetters = textBoxText.length;
        var lettersValue = GetPointsLetters(textBoxText);
        if (utilModule.IsPurchasedUpgrade(6)) {
            pointsLetters += lettersValue;
            if (lettersValue > GetPointsLetters(gameObjects.game.bestWord)) gameObjects.game.bestWord = textBoxText;
        }
        var wordPoints = activeModule.CalculatePoints(pointsLetters);
        gameObjects.game.points += wordPoints;
        gameObjects.game.allTimePoints += wordPoints;
        gameObjects.game.wordsAmount++;
        if (gameObjects.game.isInChallenge) challengesModule.CheckProgress();
        if (textBoxText === "Jack-go-to-bed-at-noon" && !utilModule.IsUnlockedAchievement("Best Word")) {
            gameObjects.game.achievements.push(achievements.find(x => x.name == "Best Word"));
            achievementModule.ShowAchievement("Best Word");
        }
        if (textBoxText.length == 10 && !utilModule.IsUnlockedAchievement("10-letter Word")) {
            gameObjects.game.achievements.push(achievements.find(x => x.name == "10-letter Word"));
            achievementModule.ShowAchievement("10-letter Word");
        }
        GuessedWord();
    }
}

function GuessedWord() {

    wordsLeft.textContent = wordsLeft2.textContent;
    wordsLeft2.textContent = wordToGuess.textContent;
    wordToGuess.textContent = wordsRight.textContent;
    wordsRight.textContent = wordsRight2.textContent;
    wordsRight2.textContent = GenerateWord();
    wordToGuessWrapper.classList.add("expand");
}

wordToGuessWrapper.addEventListener('transitionend', function (e) {
    if (e.propertyName == "transform") {
        wordToGuessWrapper.classList.remove("expand");
    }
})

window.setInterval(function () {
    SetCosts();
    statsModule.SetStats();
    achievementModule.CheckAchievements();
    prestigeModule.SetPrestige();
    upgradesModule.SetUpgrades();
    cardsModule.CalculateBonus();
    optionsModule.SetOptions();
    challengesModule.SetChallengesBonuses();
    passiveModule.SetGenerators();
    passiveModule.CalculatePassiveGenerators();
    achievementModule.SetUnlockedAchievements();
    document.getElementById("PointsCounter").textContent = Math.round(gameObjects.game.points).toExponential(2);
    document.getElementById("passivePoints").textContent = Math.round(gameObjects.game.passivePoints).toExponential(2) + " PP";
    document.getElementById("activeMenuButton").style.display = "flex";
    document.getElementById("upgradesMenuButton").style.display = "flex";
    document.getElementById("statsMenuButton").style.display = "flex";
    document.getElementById("optionsMenuButton").style.display = "flex";
    if (gameObjects.game.achievements.length > 0) document.getElementById("achievementsMenuButton").style.display = "flex";
    if (utilModule.IsPurchasedUpgrade(2)) document.getElementById("LettersPerSecond").style.display = "block";
    if (utilModule.IsPurchasedUpgrade(3)) {
        document.getElementById("passiveMenuButton").style.display = "flex";
        document.getElementById("PassiveUpgradesWrapper").style.display = "flex";
    }
    if (utilModule.IsPurchasedUpgrade(8)) document.getElementById("cardsMenuButton").style.display = "flex";
    if (utilModule.IsPurchasedUpgrade(10)) document.getElementById("challengesMenuButton").style.display = "flex";
    if (gameObjects.game.allTimePoints >= 1000000) document.getElementById("prestigeMenuButton").style.display = "flex";
    if (gameObjects.game.prestigeCount > 0) document.getElementById("PrestigeUpgradesWrapper").style.display = "flex"
    gameObjects.game.maxLength = gameObjects.game.multiUpgrades[0][1] + 4
    if (!gameObjects.game.isInChallenge && gameObjects.game.challenges.filter(x => x.OnChallenge == 1).length == 0) gameObjects.activeGame = utilModule.Copy(gameObjects.game);
}, 100);

let letters = 0;
let startTime;
let display = document.getElementById("LettersPerSecond");

let input = document.getElementById("WordBox");
input.addEventListener("keydown", function () {
    if (gameObjects.game.challenges[0].OnChallenge == 1) {
        gameObjects.game.letterCounter++;
        if (gameObjects.game.challenges[0].Restriction <= gameObjects.game.letterCounter)
        gameObjects.game.isInChallenge = false;
    }
    console.log(gameObjects.game.letterCounter);
    letters++;
    if (letters === 1) startTime = Date.now();
});

var lettersPressed = 0;

setInterval(function () {

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

export function GetPointsLetters(word) {
    var letters = word.toLowerCase().split('');
    var points = 0;
    letters.forEach(element => {
        if (element === 'a' ||
            element === 'e' ||
            element === 'i' ||
            element === 'o' ||
            element === 'u' ||
            element === 'l' ||
            element === 'n' ||
            element === 's' ||
            element === 't' ||
            element === 'r') {
            points++;
        }
        else if (element === 'd' ||
            element === 'g') {
            points += 2;
        }
        else if (element === 'b' ||
            element === 'c' ||
            element === 'm' ||
            element === 'p') {
            points += 3;
        }
        else if (element === 'f' ||
            element === 'h' ||
            element === 'v' ||
            element === 'w' ||
            element === 'y') {
            points += 4;
        }
        else if (element === 'k') {
            points += 5
        }
        else if (element === 'j' ||
            element === 'x') {
            points += 8;
        }
        else if (element === 'q' ||
            element === 'z') {
            points += 10;
        }
        else {
            points += 20;
        }
    });
    return points;
}

var activeMenuButton = document.getElementById("activeMenuButton");

activeMenuButton.addEventListener('click', e => {
    Tab('activeMenu');
});

var passiveMenuButton = document.getElementById("passiveMenuButton");

passiveMenuButton.addEventListener('click', e => {
    Tab('passiveMenu');
});

var upgradesMenuButton = document.getElementById("upgradesMenuButton");

upgradesMenuButton.addEventListener('click', e => {
    Tab('upgradesMenu');
});

var challengesMenuButton = document.getElementById("challengesMenuButton");

challengesMenuButton.addEventListener('click', e => {
    Tab('challengesMenu');
});

var prestigeMenuButton = document.getElementById("prestigeMenuButton");

prestigeMenuButton.addEventListener('click', e => {
    Tab('prestigeMenu');
});

var cardsMenuButton = document.getElementById("cardsMenuButton");

cardsMenuButton.addEventListener('click', e => {
    Tab('cardsMenu');
});

var achievementsMenuButton = document.getElementById("achievementsMenuButton");

achievementsMenuButton.addEventListener('click', e => {
    Tab('achievementsMenu');
});

var statsMenuButton = document.getElementById("statsMenuButton");

statsMenuButton.addEventListener('click', e => {
    Tab('statsMenu');
});

var optionsMenuButton = document.getElementById("optionsMenuButton");

optionsMenuButton.addEventListener('click', e => {
    Tab('optionsMenu');
});


function Tab(tabName) {
    document.getElementById("activeMenu").style.display = "none"
    document.getElementById("passiveMenu").style.display = "none"
    document.getElementById("upgradesMenu").style.display = "none"
    document.getElementById("cardsMenu").style.display = "none"
    document.getElementById("statsMenu").style.display = "none"
    document.getElementById("prestigeMenu").style.display = "none"
    document.getElementById("challengesMenu").style.display = "none"
    document.getElementById("optionsMenu").style.display = "none"
    document.getElementById("achievementsMenu").style.display = "none"
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).style.marginTop = "2rem";
}

function SetCosts() {
    document.getElementById("multiUpgrade1").textContent = "+1 point per word! Cost: " + Math.round(gameObjects.game.multiUpgrades[1][0])
    document.getElementById("multiUpgrade2").textContent = "+1 letter per word! Cost: " + Math.round(gameObjects.game.multiUpgrades[1][1])
    document.getElementById("multiUpgrade3").textContent = "+25% points! Cost: " + Math.round(gameObjects.game.multiUpgrades[1][2])
    document.getElementById("cardsButton").textContent = `Get a Pack! Cost: ${(Math.round(gameObjects.game.cardCost) == 0) ? "Free!" : Math.round(gameObjects.game.cardCost)}`;
}

var saveButton = document.getElementById("saveButton");
var logButton = document.getElementById("logButton");

saveButton.addEventListener('click', e => {
    localStorage.setItem("save", JSON.stringify(gameObjects.game));
})

logButton.addEventListener('click', e => {
    console.log(gameObjects.game);
    console.log(gameObjects.challengeGame);
})

function LoadGame() {
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame === null) return;
    if (typeof savegame.points !== "undefined" && typeof savegame.points !== null) gameObjects.game.points = savegame.points;
    if (typeof savegame.upgrades !== "undefined" && typeof savegame.upgrades !== null) gameObjects.game.upgrades = savegame.upgrades;
    if (typeof savegame.multiUpgrades !== "undefined" && typeof savegame.multiUpgrades !== null) gameObjects.game.multiUpgrades = savegame.multiUpgrades;
}


const tabs = document.getElementById("TabsContainer");

tabs.addEventListener("wheel", (evt) => {
    evt.preventDefault();

    tabs.scrollBy({
        left: evt.deltaY < 0 ? -50 : 50,
    });
});

const cardButton = document.getElementById("cardsHeaderContainer");

cardButton.onmousemove = e => {
    const decimal = e.clientX / cardButton.offsetWidth;

    const basePercent = 80,
        percentRange = 20,
        adjustablePercent = percentRange * decimal;

    const colorPercent = basePercent + adjustablePercent;

    cardButton.style.setProperty("--color-percent", `${colorPercent}%`)
}

const light = document.getElementById('light');
const gallery = document.getElementById("background");

window.onmousemove = e => {
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
}

export function TransitionWindow() {
    document.body.classList.add('fade-out');
    setTimeout(function () {
        document.body.classList.remove('fade-out');
    }, 1000);
}




