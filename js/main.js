const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

var wordList;

/*Upgrades:
    3 - Passive Income
    8 - Cards
    10 - Challenges


*/

var game = {
    points: 100000000,
    allTimePoints: 100000000,
    upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [50, 200, 500, 1500, 2500, 6000, 10000, 40000, 100000, 200000, 5000000, 10000000]],
    maxLength: 4,
    bestWord: "",
    multiUpgrades: [[0, 0, 0],
                    [50, 100, 500]],
    achievements: [ {name: "First Word", description: "Write your first word. Congratulations! You know how to write!", unlocked: false},
                    {name: "Ten Words", description: "Write 10 words. Pay attention, it seems that you are close to your first upgrade.", unlocked: false},
                    {name: "Fifty Words", description: "Write 50 words.", unlocked: false},
                    {name: "One Hundred Words", description: "Write 100 words.", unlocked: false},
                    {name: "100 Points", description: "Save 100 points", unlocked: false},
                    {name: "500 Points", description: "Save 500 Points", unlocked: false},
                    {name: "1000 Points", description: "Save 1000 points", unlocked: false},
                    {name: "5000 Points", description: "Save 5000 points", unlocked: false},
                    {name: "10000 Points", description: "Save 10000 points", unlocked: false},
                    {name: "50000 Points", description: "Save 50000 points", unlocked: false},
                    {name: "100000 Points", description: "Save 100000 points", unlocked: false},
                    {name: "200000 Points", description: "Save 200000 points", unlocked: false},
                    {name: "Best Word", description: "Write the best word possible", unlocked: false} ],
    wordsAmount: 0,
    passiveUpgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [100, 250, 500, 1000, 0, 0, 0, 0, 0, 0]],
    passiveLength: 4,
    passivePoints: 0,
    passiveRate: 1000,
    cards: [],
    cardCost: 0,
    rollsAmount: 10,
    challenges: [[0, 0],
                [50, 50], 
                [0, 0]],
    isInChallenge: false,
    prestigePoints: 0,
    prestigeCount: 0,
    prestigeUpgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [10, 50, 100, 500, 0, 0, 0, 0, 0, 0]]
}

var challengeGame = {};

var activeGame = {};

window.onload = async function()
{
    wordList = await getWordList();
    challengeGame = Copy(game);
    LoadGame();
    GenerateWord();
    Tab("activeMenu");
}

async function getWordList() {
    var response = await fetch(wordListUrl);
    var wordListText = await response.text();
    var wordList = wordListText.split('\n');
    return wordList;
}

async function GenerateWord()
{ 
    var wordLabel = document.getElementById("WordToGuess");

    var filteredWordList = wordList.filter(x => x.length <= game.maxLength);

    var generatedWord = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];

    if(HasCard("All Lowercase") || IsInChallenge(0)) generatedWord = generatedWord.toLowerCase();

    wordLabel.textContent = generatedWord;
}

var textbox = document.getElementById("WordBox");
textbox.addEventListener("input", checkText);

async function checkText(event) {
    var textBoxText = new String(event.target.value);

    if(textBoxText == document.getElementById("WordToGuess").textContent)
    {
        document.getElementById("WordBox").value = "";
        var pointsLetters = textBoxText.length;
        var lettersValue = GetPointsLetters(textBoxText);
        if(IsPurchasedUpgrade(6))
        {
            pointsLetters += lettersValue;
            if(lettersValue > GetPointsLetters(game.bestWord)) game.bestWord = textBoxText;
        }
        var wordPoints = CalculatePoints(pointsLetters);
        game.points +=  wordPoints;
        game.allTimePoints += wordPoints;
        game.wordsAmount++;
        if(textBoxText === "Jack-go-to-bed-at-noon" && !IsUnlockedAchievement(12))
        {
            game.achievements[12].unlocked = true;
            ShowAchievement("Best Word");
        }
        GenerateWord();
    }

}

window.setInterval(function(){
    SetCosts();
    SetStats();
    // CheckAchievements();
    SetPrestige();
    SetUpgrades();
    document.getElementById("PointsCounter").textContent = Math.round(game.points);
    document.getElementById("passivePoints").textContent = Math.round(game.passivePoints) + " PP";
    document.getElementById("activeMenuButton").style.display = "flex";
    document.getElementById("upgradesMenuButton").style.display = "flex";
    document.getElementById("statsMenuButton").style.display = "flex";
    if(IsPurchasedUpgrade(2)) document.getElementById("LettersPerSecond").style.display = "block";
    // if(IsPurchasedUpgrade(3)) 
    document.getElementById("passiveMenuButton").style.display = "flex";
    if(IsPurchasedUpgrade(8)) document.getElementById("cardsMenuButton").style.display = "flex";
    if(IsPurchasedUpgrade(10)) document.getElementById("challengesMenuButton").style.display = "flex";
    if(game.allTimePoints >= 1000000) document.getElementById("prestigeMenuButton").style.display = "flex";
    game.maxLength = game.multiUpgrades[0][1] + 4
    if(!game.isInChallenge) activeGame = Copy(game);
}, 100); 

let letters = 0;
let startTime;
let display = document.getElementById("LettersPerSecond");

var letterCounter = 0;

let input = document.getElementById("WordBox");
input.addEventListener("keydown", function() {
    if(game.challenges[0][0] == 1)
    {
        letterCounter++;
        if(letterCounter >= 210 * (1 + game.challenges[2][0] / 2))
        {
            game.challenges[0][0] = 0;
            letterCounter = 0;
        }
    } 
    console.log(letterCounter);
    letters++;
    if (letters === 1) {
        startTime = Date.now();
    }
});

var lettersPressed = 0;

setInterval(function(){

    let currentTime = Date.now();
    let elapsedTime = (currentTime - startTime) / 1000;
    let LPS = letters / elapsedTime;
    if(lettersPressed === letters)
    {
        display.innerHTML = "LPS : 0.00";
        letters = 0;
        startTime = Date.now();
    }
    else
    {
        lettersPressed = letters;
        display.innerHTML = "LPS : " + LPS.toFixed(2);
    }
    
}, 1000);

function GetPointsLetters(word) {
    var letters = word.toLowerCase().split('');
    var points = 0;
    letters.forEach(element => {
        if(element === 'a' || 
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
        else if(element === 'd' || 
        element === 'g') {
            points += 2;
        }
        else if(element === 'b' || 
        element === 'c' || 
        element === 'm' || 
        element === 'p') {
            points += 3;
        }
        else if(element === 'f' || 
        element === 'h' || 
        element === 'v' || 
        element === 'w' || 
        element === 'y') {
            points += 4;
        }
        else if(element === 'k') {
            points += 5
        }
        else if(element === 'j' || 
        element === 'x') {
            points += 8;
        }
        else if(element === 'q' || 
        element === 'z') {
            points += 10;
        }
        else {
            points += 20;
        }
    });
    return points;
}

function Tab(tabName) {
    document.getElementById("activeMenu").style.display = "none"
    document.getElementById("passiveMenu").style.display = "none"
    document.getElementById("upgradesMenu").style.display = "none"
    document.getElementById("cardsMenu").style.display = "none"
    document.getElementById("statsMenu").style.display = "none"
    document.getElementById("prestigeMenu").style.display = "none"
    document.getElementById("challengesMenu").style.display = "none"
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).style.marginTop = "2rem";
  }


function LogGame() 
{
    console.log(game);
    console.log(challengeGame);
}

function SetCosts()
{
    document.getElementById("multiUpgrade1").textContent = "+1 point per word! Cost: " + Math.round(game.multiUpgrades[1][0])
    document.getElementById("multiUpgrade2").textContent = "+1 letter per word! Cost: " + Math.round(game.multiUpgrades[1][1])
    document.getElementById("multiUpgrade3").textContent = "+25% points! Cost: " + Math.round(game.multiUpgrades[1][2])
    document.getElementById("cardsButton").textContent = "Get a Pack! Cost: " + Math.round(game.cardCost)
}

function SaveGame()
{ 
    localStorage.setItem("save",JSON.stringify(game));
    console.log("Saved!");
}

function LoadGame()
{
    var savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame === null) return;
    if (typeof savegame.points !== "undefined" && typeof savegame.points !== null) game.points = savegame.points;
    if (typeof savegame.upgrades !== "undefined" && typeof savegame.upgrades !== null) game.upgrades = savegame.upgrades;
    if (typeof savegame.multiUpgrades !== "undefined" && typeof savegame.multiUpgrades !== null) game.multiUpgrades = savegame.multiUpgrades;
}

const gallery = document.getElementById("background");

window.onmousemove = e => {
    const mouseX = e.clientX,
          mouseY = e.clientY;
        
    const xDecimal = mouseX / window.innerWidth,
          yDecimal = mouseY /window.innerHeight;

    const maxX = gallery.offsetWidth - window.innerWidth,
          maxY = gallery.offsetHeight - window.innerHeight;
    
    const panX = maxX * xDecimal * -1,
          panY = maxY * yDecimal * -1; 

    gallery.animate({
        transform: `translate(${panX}px, ${panY}px)`
    }, {
        duration: 4000,
        fill: "forwards",
        easing: "ease"
    });
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
