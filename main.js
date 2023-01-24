const wordListUrl = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt';

var wordList;

var game = {
    points: 0,
    upgrades: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [50, 200, 500, 1500, 2000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
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
    wordsAmount: 0
}

var pointsDesc = "";

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
        if(game.upgrades[0][2] == 1)pointsLetters += GetPointsLetters(new String(textBoxText.toLowerCase()).split(''));
        pointsDesc = `Base Points: ${pointsLetters}`; 
        game.points += CalculatePoints(pointsLetters); 
        console.log(game.points);
        game.wordsAmount++;
        if(textBoxText === "Jack-go-to-bed-at-noon" && !game.achievements[7].unlocked)
        {
            game.achievements[7].unlocked = true;
            ShowAchievement("Best Word");
        }
        ShowText();
        GenerateWord();
    }

}


function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    totalPoints += game.multiUpgrades[0][0];
    if(game.multiUpgrades[0][0] > 0) pointsDesc += ` + Extra Points: ${game.multiUpgrades[0][0]}`; 
    if(game.upgrades[0][1] == 1)
    {
        totalPoints += 10;
        pointsDesc += ` + Upgrade 2: 10 points`; 
    } 
    if(game.upgrades[0][0] == 1)
    {
        totalPoints *= 1.5;
        pointsDesc += ` + Upgrade 1: x1.5 points`; 
    } 
    if(game.upgrades[0][3] == 1)
    {
        totalPoints *= 2;
        pointsDesc += ` + Upgrade 4: x2 points`; 
    } 
    totalPoints *= (1 + game.multiUpgrades[0][2]*0.25)
    if(game.multiUpgrades[0][2] > 0) pointsDesc += ` + MultiUpgrade 3: x${1 + game.multiUpgrades[0][2]*0.25} points`; 
    return totalPoints;
}

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
    SetCosts()
    CheckAchievements()
    document.getElementById("PointsCounter").textContent = Math.round(game.points)
    if(game.upgrades[0][4] === 1) document.getElementById("LettersPerSecond").style.display = "block";
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

function CheckAchievements() {

    if (game.wordsAmount >= 1 && !game.achievements[0].unlocked) {
        game.achievements[0].unlocked = true;
      ShowAchievement("First Word");
    }
  
    if (game.wordsAmount >= 10 && !game.achievements[1].unlocked) {
        game.achievements[1].unlocked = true;
      ShowAchievement("Ten Words");
    }
  
    if (game.wordsAmount >= 50 && !game.achievements[2].unlocked) {
        game.achievements[2].unlocked = true;
      ShowAchievement("Fifty Words");
    }

    if (game.points >= 100 && !game.achievements[4].unlocked) {
        game.achievements[4].unlocked = true;
        ShowAchievement("100 Points");
    }

    if (game.points >= 500 && !game.achievements[5].unlocked) {
        game.achievements[5].unlocked = true;
        ShowAchievement("500 Points");
    }

    if (game.points >= 1000 && !game.achievements[6].unlocked) {
        game.achievements[6].unlocked = true;
        ShowAchievement("1000 Points");
    }
  }
  
  // Function to show the achievement notification
  function ShowAchievement(achievementName) {
    var achievement = game.achievements.find(a => a.name === achievementName);
    alert(`Congratulations! You've unlocked the "${achievement.name}" achievement: ${achievement.description}`);
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
}

var textElement = document.getElementById("PointsDesc");

// Function to display the text
function ShowText() {
  textElement.innerHTML = pointsDesc;
  textElement.style.display = "block";
  setTimeout(HideText, 2000);
}

// Function to hide the text
function HideText() {
  textElement.style.display = "none";
  pointsDesc = "";
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