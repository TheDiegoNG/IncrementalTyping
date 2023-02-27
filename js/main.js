const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

var wordList;

var game = {
    points: 0,
    upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [50, 200, 500, 1500, 2500, 6000, 10000, 40000, 100000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    maxLength: 4,
    multiUpgrades: [[0, 0, 0],
                    [50, 100, 500]],
    achievements: [ {name: "First Word", description: "Write your first word. Congratulations! You know how to write!", unlocked: false},
                    {name: "Ten Words", description: "Write ten words. Pay attention, it seems that you are close to your first upgrade.", unlocked: false},
                    {name: "Fifty Words", description: "Write fifty words.", unlocked: false},
                    {name: "30 LPS", description: "Reach 30 LPS (Letters Per Second), you could get this by spamming", unlocked: false},
                    {name: "100 Points", description: "Save 100 points", unlocked: false},
                    {name: "500 Points", description: "Save 500 Points", unlocked: false},
                    {name: "1000 Points", description: "Save 1000 points", unlocked: false},
                    {name: "Best Word", description: "Write the best word possible", unlocked: false} ],
    wordsAmount: 0,
    passiveUpgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [100, 250, 500, 1000, 0, 0, 0, 0, 0, 0]],
    passiveLength: 4,
    passivePoints: 0 ,
    cards: [],
    cardCost: 100000
}

var pointsDesc = "";

window.onload = async function()
{
    wordList = await getWordList();
    LoadGame();
    GenerateWord();
    Tab("activeMenu");
}

async function getWordList() {
    var response = await fetch(wordListUrl);
    var wordListText = await response.text();
    var wordList = wordListText.split('\n');
    console.log(wordList);
    return wordList;
}

async function GenerateWord()
{ 
    var wordLabel = document.getElementById("WordToGuess");

    var filteredWordList = wordList.filter(x => x.length <= game.maxLength);

    var generatedWord = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];

    if(game.cards.filter(x => x.name === "All Lowercase").length > 0) generatedWord = generatedWord.toLowerCase();

    wordLabel.textContent = generatedWord;
}

var textbox = document.getElementById("WordBox");
textbox.addEventListener("input", checkText);

async function checkText(event) {
    var textBoxText = event.target.value;

    if(textBoxText === document.getElementById("WordToGuess").textContent)
    {
        console.log('Success!!!');
        document.getElementById("WordBox").value = "";
        var pointsLetters = textBoxText.length;
        if(game.upgrades[0][6] == 1)pointsLetters += GetPointsLetters(new String(textBoxText.toLowerCase()).split(''));
        pointsDesc = `Base Points: ${pointsLetters}`; 
        game.points += CalculatePoints(pointsLetters); 
        console.log(game.points);
        game.wordsAmount++;
        if(textBoxText === "Jack-go-to-bed-at-noon" && !game.achievements[7].unlocked)
        {
            game.achievements[7].unlocked = true;
            ShowAchievement("Best Word");
        }
        GenerateWord();
    }

}

window.setInterval(function(){
    SetCosts()
    SetStats()
    CheckAchievements()
    document.getElementById("PointsCounter").textContent = Math.round(game.points);
    document.getElementById("passivePoints").textContent = Math.round(game.passivePoints) + " PP";
    document.getElementById("activeMenuButton").style.display = "flex";
    document.getElementById("upgradesMenuButton").style.display = "flex";
    document.getElementById("statsMenuButton").style.display = "flex";
    if(game.upgrades[0][2] === 1) document.getElementById("LettersPerSecond").style.display = "block";
    if(game.upgrades[0][3] === 1) document.getElementById("passiveMenuButton").style.display = "flex";
    if(game.upgrades[0][8] === 1) document.getElementById("cardsMenuButton").style.display = "flex";
    game.maxLength = game.multiUpgrades[0][1] + 4
    
}, 100); 

let letters = 0;
let startTime;
let display = document.getElementById("LettersPerSecond");

let input = document.getElementById("WordBox");
input.addEventListener("keydown", function() {
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
    if(LPS >= 30 && !game.achievements[3].unlocked) {
        game.achievements[3].unlocked = true;
        ShowAchievement("30 LPS");
    }
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

function GetPointsLetters(letters) {
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
    document.getElementById(tabName).style.display = "flex"
    document.getElementById(tabName).style.justifyContent = "space-around";
  }


function LogGame() 
{
    console.log(game);
}

function SetCosts()
{
    document.getElementById("PointPerWordCost").textContent = Math.round(game.multiUpgrades[1][0])
    document.getElementById("LetterPerWordCost").textContent = Math.round(game.multiUpgrades[1][1])
    document.getElementById("PointsMultiplier").textContent = Math.round(game.multiUpgrades[1][2])
    document.getElementById("cardsCost").textContent = Math.round(game.cardCost)
}

function SetStats()
{
    document.getElementById("stats").textContent = JSON.stringify(game);
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
