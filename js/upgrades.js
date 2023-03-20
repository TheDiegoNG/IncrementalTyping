import { gameObjects } from "./game.js";

var upgradesDesc = [
    "x1.5 points - Cost: 50",
    "+4 points per word - Cost: 200",
    "Get a letter per minute value - Cost: 500",
    "Unlock passive income! - Cost: 1500",
    "x1.3 Points! - Cost: 2500",
    "Every achievement gives a bonus! - Cost: 6000",
    "Every letter gets a value - Cost: 10000",
    "+10 points per word - Cost: 40000",
    "Unlocks Cards! - Cost: 100000",
    "x2 points - Cost: 200000",
    "Unlock Challenges! - Cost: 5000000",
    "Last Basic Upgrade! +20 points per word - 10000000"
]

var passiveUpgradesDesc = [
    "x1.25 Points - Cost: 100 PP",
    "+5 points per Word - Cost: 250 PP",
    "x1.5 points - Cost: 1000 PP",
    "Every letter gets a value - Cost: 4000 PP",
    "+1 Letter - Cost: 8000 PP",
    "Every Generator Bought gives a Bonus to the other Generators! - Cost: 20000 PP",
]

var prestigeUpgradesDesc = [
    "Welcome to Prestige! Take a free x2 multiplier - Cost: 10 Prestige Points",
    "+2 Cards Per Roll - Cost: 50 Prestige Points",
    "Better Scaling for MultiUpgrades! - Cost: 100 Prestige Points",
    "Keep your Passive Income when Prestige! (PP resets tho) - Cost: 500 Prestige Points"
]

function ChangeBasicUpgradesText(upgradeNumber) {
    document.getElementById("basicUpgradesDesc").innerHTML = upgradesDesc[upgradeNumber];
}

function ChangePassiveUpgradesText(upgradeNumber) {
    document.getElementById("passiveUpgradesDesc").innerHTML = passiveUpgradesDesc[upgradeNumber];
}

function ChangePrestigeUpgradesText(upgradeNumber) {
    document.getElementById("prestigeUpgradesDesc").innerHTML = prestigeUpgradesDesc[upgradeNumber];
}

console.time("GameTime");

const upgradeButtons = document.querySelectorAll('.upgradeSquare');

upgradeButtons.forEach((upgradebutton, index) => {
    const buttonId = upgradebutton.getAttribute("id");
    const buttonNumber = buttonId.match(/\d+$/);
    if(buttonId.startsWith('upgrade')) {
        upgradebutton.addEventListener('click', e => {
            GetUpgrade(buttonNumber - 1, upgradebutton)
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangeBasicUpgradesText(buttonNumber - 1)
        });
    }
    if(buttonId.startsWith('passive')) {
        upgradebutton.addEventListener('click', e => {
            GetPassiveUpgrade(buttonNumber - 1, upgradebutton)
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePassiveUpgradesText(buttonNumber - 1)
        });
    }
    if(buttonId.startsWith('prestige')) {
        upgradebutton.addEventListener('click', e => {
            GetPrestigeUpgrade(buttonNumber - 1, upgradebutton)
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePrestigeUpgradesText(buttonNumber - 1)
        });
    }
});


function GetUpgrade(upgradeNumber, element) {
    if(gameObjects.game.upgrades[0][upgradeNumber] == 0 && gameObjects.game.points >= gameObjects.game.upgrades[1][upgradeNumber])
    {
        gameObjects.game.points -= gameObjects.game.upgrades[1][upgradeNumber]
        gameObjects.game.upgrades[0][upgradeNumber] = 1
        element.style.color = "#47682C";
        console.log(upgradeNumber);
        console.timeLog("GameTime")
    } 
}

function GetPassiveUpgrade(upgradeNumber, element) {
    if(gameObjects.game.passiveUpgrades[0][upgradeNumber] == 0 && gameObjects.game.passivePoints >= gameObjects.game.passiveUpgrades[1][upgradeNumber])
    {
        gameObjects.game.passivePoints -= gameObjects.game.passiveUpgrades[1][upgradeNumber]
        gameObjects.game.passiveUpgrades[0][upgradeNumber] = 1
        element.style.color = "#47682C";
        if(upgradeNumber == 4) gameObjects.game.passiveLength++;
    } 
}

function GetPrestigeUpgrade(upgradeNumber, element) {
    if(gameObjects.game.prestigeUpgrades[0][upgradeNumber] == 0 && gameObjects.game.prestigePoints >= gameObjects.game.prestigeUpgrades[1][upgradeNumber])
    {
        gameObjects.game.prestigePoints -= gameObjects.game.prestigeUpgrades[1][upgradeNumber]
        gameObjects.game.prestigeUpgrades[0][upgradeNumber] = 1
        element.style.color = "#47682C";
        if(upgradeNumber == 1) gameObjects.game.rollsAmount += 2;
    } 
}

export function SetUpgrades() {
    SetActiveUpgrades();
    SetPassiveUpgrades();
    SetPrestigeUpgrades();
}

function SetActiveUpgrades() { 
    let myTable = document.getElementById('upgradesTable');
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.upgrades[0][index] == 1 ? "#47682C" : "#FFFFFF";
    });
}

function SetPassiveUpgrades() { 
    let myTable = document.getElementById('passiveUpgradesTable');
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.passiveUpgrades[0][index] == 1 ? "#47682C" : "#FFFFFF";
    });
}

function SetPrestigeUpgrades() { 
    let myTable = document.getElementById('prestigeUpgradesTable');
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.prestigeUpgrades[0][index] == 1 ? "#47682C" : "#FFFFFF";
    });
}