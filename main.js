const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

var wordList;

var game = {
    points: 0,
    upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [50, 200, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    maxLength: 4,
    multiUpgrades: [[0, 0, 0],
                    [50, 100, 500]]
}

window.onload = async function()
{
    wordList = await getWordList();
    LoadGame();
    GenerateWord();
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

    wordLabel.textContent = filteredWordList[Math.floor(Math.random() * filteredWordList.length)];
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
        if(game.upgrades[0][2] == 1)pointsLetters += GetPointsLetters(textBoxText);
        game.points += CalculatePoints(pointsLetters); 
        console.log(game.points);
        GenerateWord();
    }

}


function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    totalPoints += game.multiUpgrades[0][0];
    if(game.upgrades[0][1] == 1) totalPoints += 10;
    if(game.upgrades[0][0] == 1) totalPoints *= 1.5;
    totalPoints *= (1 + game.multiUpgrades[0][2]*25/100)
    return totalPoints;
}

function GetPointsLetters(word) {
    var letters = word.toString().toLowercase().split('');
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

function GetUpgrade(upgradeNumber, element) {
    if(game.upgrades[0][upgradeNumber] == 0 && game.points >= game.upgrades[1][upgradeNumber])
    {
        game.points -= game.upgrades[1][upgradeNumber]
        game.upgrades[0][upgradeNumber] = 1
        element.style.color = 'gray';
    } 
}

function AddMultiUpgrade(upgradeNumber) {
    if(game.points >= game.multiUpgrades[1][upgradeNumber])
    {
        game.points -= game.multiUpgrades[1][upgradeNumber]
        game.multiUpgrades[0][upgradeNumber]++;
        game.multiUpgrades[1][upgradeNumber] = game.multiUpgrades[1][upgradeNumber] * (2 ** (1 + game.multiUpgrades[0][upgradeNumber]/10))
    }
}

window.setInterval(function(){
    console.log(game);
    SetCosts()
    document.getElementById("PointsCounter").textContent = Math.round(game.points)
    game.maxLength = game.multiUpgrades[0][1] + 4
}, 1000); 

function SetCosts()
{
    document.getElementById("PointPerWordCost").textContent = Math.round(game.multiUpgrades[1][0])
    document.getElementById("LetterPerWordCost").textContent = Math.round(game.multiUpgrades[1][1])
    document.getElementById("PointsMultiplier").textContent = Math.round(game.multiUpgrades[1][2])
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