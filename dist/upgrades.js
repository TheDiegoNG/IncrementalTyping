import { gameObjects } from "./classes/game.js";
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
];
var passiveUpgradesDesc = [
    "x1.25 Points - Cost: 100 PP",
    "+5 points per Word - Cost: 250 PP",
    "x1.5 points - Cost: 1000 PP",
    "Every letter gets a value - Cost: 4000 PP",
    "+1 Letter - Cost: 8000 PP",
    "Every Generator Bought gives a Bonus to the other Generators! - Cost: 20000 PP",
];
var prestigeUpgradesDesc = [
    "Welcome to Prestige! Take a free x2 multiplier - Cost: 10 Prestige Points",
    "+2 Cards Per Roll - Cost: 50 Prestige Points",
    "Better Scaling for MultiUpgrades! - Cost: 100 Prestige Points",
    "Keep your Passive Income when Prestige! (PP resets tho) - Cost: 500 Prestige Points"
];
function ChangeBasicUpgradesText(upgradeNumber) {
    const basicUpgradesText = document.querySelector("#basicUpgradesDesc");
    if (basicUpgradesText)
        basicUpgradesText.textContent = upgradesDesc[upgradeNumber];
}
function ChangePassiveUpgradesText(upgradeNumber) {
    const passiveUpgradesText = document.querySelector("#passiveUpgradesDesc");
    if (passiveUpgradesText)
        passiveUpgradesText.textContent = passiveUpgradesDesc[upgradeNumber];
}
function ChangePrestigeUpgradesText(upgradeNumber) {
    const prestigeUpgradesText = document.querySelector("#prestigeUpgradesDesc");
    if (prestigeUpgradesText)
        prestigeUpgradesText.textContent = prestigeUpgradesDesc[upgradeNumber];
}
console.time("GameTime");
const upgradeButtons = document.querySelectorAll('.upgradeSquare');
upgradeButtons.forEach((upgradebutton, index) => {
    const buttonId = upgradebutton.getAttribute("id");
    if (!buttonId)
        return;
    const buttonNumber = buttonId.match(/\d+$/);
    if (buttonId.startsWith('upgrade')) {
        upgradebutton.addEventListener('click', e => {
            GetUpgrade(parseInt(buttonNumber[0]) - 1, upgradebutton);
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangeBasicUpgradesText(parseInt(buttonNumber[0]) - 1);
        });
    }
    if (buttonId.startsWith('passive')) {
        upgradebutton.addEventListener('click', e => {
            GetPassiveUpgrade(parseInt(buttonNumber[0]) - 1, upgradebutton);
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePassiveUpgradesText(parseInt(buttonNumber[0]) - 1);
        });
    }
    if (buttonId.startsWith('prestige')) {
        upgradebutton.addEventListener('click', e => {
            GetPrestigeUpgrade(parseInt(buttonNumber[0]) - 1, upgradebutton);
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePrestigeUpgradesText(parseInt(buttonNumber[0]) - 1);
        });
    }
});
function GetUpgrade(upgradeNumber, element) {
    if (gameObjects.game.upgrades[upgradeNumber].amountBought == 0 && gameObjects.game.points >= gameObjects.game.upgrades[upgradeNumber].cost) {
        gameObjects.game.points -= gameObjects.game.upgrades[upgradeNumber].cost;
        gameObjects.game.upgrades[upgradeNumber].amountBought = 1;
        element.style.color = "#47682C";
        console.log(upgradeNumber);
        console.timeLog("GameTime");
    }
}
function GetPassiveUpgrade(upgradeNumber, element) {
    if (gameObjects.game.passiveUpgrades[upgradeNumber].amountBought == 0 && gameObjects.game.passivePoints >= gameObjects.game.passiveUpgrades[upgradeNumber].cost) {
        gameObjects.game.passivePoints -= gameObjects.game.passiveUpgrades[upgradeNumber].cost;
        gameObjects.game.passiveUpgrades[upgradeNumber].amountBought = 1;
        element.style.color = "#47682C";
        if (upgradeNumber == 4)
            gameObjects.game.passiveLength++;
    }
}
function GetPrestigeUpgrade(upgradeNumber, element) {
    if (gameObjects.game.prestigeUpgrades[upgradeNumber].amountBought == 0 && gameObjects.game.prestigePoints >= gameObjects.game.prestigeUpgrades[upgradeNumber].cost) {
        gameObjects.game.prestigePoints -= gameObjects.game.prestigeUpgrades[upgradeNumber].cost;
        gameObjects.game.prestigeUpgrades[upgradeNumber].amountBought = 1;
        element.style.color = "#47682C";
        if (upgradeNumber == 1)
            gameObjects.game.rollsAmount += 2;
    }
}
export function SetUpgrades() {
    SetActiveUpgrades();
    SetPassiveUpgrades();
    SetPrestigeUpgrades();
}
function SetActiveUpgrades() {
    let myTable = document.querySelector('#upgradesTable');
    if (!myTable)
        return;
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.upgrades[index].amountBought == 1 ? "#47682C" : "#FFFFFF";
    });
}
function SetPassiveUpgrades() {
    let myTable = document.querySelector('#passiveUpgradesTable');
    if (!myTable)
        return;
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.passiveUpgrades[index].amountBought == 1 ? "#47682C" : "#FFFFFF";
    });
}
function SetPrestigeUpgrades() {
    let myTable = document.querySelector('#prestigeUpgradesTable');
    if (!myTable)
        return;
    let cells = myTable.querySelectorAll('div');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.prestigeUpgrades[index].amountBought == 1 ? "#47682C" : "#FFFFFF";
    });
}
