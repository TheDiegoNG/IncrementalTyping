const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

var wordList;

var game = {
    points: 0,
    upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [50, 200, 500, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
    maxLength: 4
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

    var filteredWordList = wordList.filter(x => x.length === game.maxLength);

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
        game.points += CalculatePoints(textBoxText.length); 
        document.getElementById("PointsCounter").textContent = game.points;
        console.log(game.points);
        GenerateWord();
    }

}


function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    if(game.upgrades[0][1] == 1) totalPoints += 10;
    if(game.upgrades[0][0] == 1) totalPoints *= 1.5;
    return totalPoints;
}


function GetUpgrade(upgradeNumber, element) {
    if(game.upgrades[0][upgradeNumber] == 0 && game.points >= game.upgrades[1][upgradeNumber])
    {
        game.points -= game.upgrades[1][upgradeNumber]
        
        game.upgrades[0][upgradeNumber] = 1
        element.style.color = 'gray';
    } 
}

function AddLetterWord()
{
    var cost = parseInt(document.getElementById("LetterPerWordCost").textContent);
    if(game.points >= cost)
    {
        game.points -= cost
        game.maxLength++;
    }
}

window.setInterval(function(){
    console.log(game);
    SetCosts()
    document.getElementById("PointsCounter").textContent = game.points
}, 1000); 

function SetCosts()
{
    document.getElementById("LetterPerWordCost").textContent = game.maxLength * 10;
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
}