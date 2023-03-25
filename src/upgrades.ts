import { gameObjects } from "./classes/game.js";
import { Upgrade } from "./classes/upgrade.js";

const basicUpgrades: Upgrade[] = [];

basicUpgrades.push(new Upgrade("First Upgrade of them all", "x1.3 Points", 50, 1));
basicUpgrades.push(new Upgrade("Your words value a little bit more, absolutely", "+4 Points per Word", 200, 2));
basicUpgrades.push(new Upgrade("I'm speed", "Get a letter per minute value", 500, 3));
basicUpgrades.push(new Upgrade("You found a word passive enhancer!", "Unlock passive income", 1500, 4));
basicUpgrades.push(new Upgrade("2nd Upgrade of this type", "x1.5 Points", 2500, 5));
basicUpgrades.push(new Upgrade("Every goal has its reward", "Every achievement gives a bonus!", 6000, 6));
basicUpgrades.push(new Upgrade("Your words value a bit more more, absolutely again", "+10 points per word", 10000, 7));
basicUpgrades.push(new Upgrade("You found a Scrabble module!", "Every letter gets a value", 40000, 8));
basicUpgrades.push(new Upgrade("Gacha. Yes, gacha", "Unlocks Cards!", 100000, 9));
basicUpgrades.push(new Upgrade("3rd time", "x2 points", 200000, 10));
basicUpgrades.push(new Upgrade("You can challenge yourself to be better next time", "Unlock Challenges!", 5000000, 11));
basicUpgrades.push(new Upgrade("Last Basic Upgrade! Your words value MORE, a bit more", "+20 points per word", 10000000, 12));


const passiveUpgrades: Upgrade[] = [];

passiveUpgrades.push(new Upgrade("You force the enhancer to be enhancerer", "x1.25 Points", 100, 1));
passiveUpgrades.push(new Upgrade("Here's a little bonus for you", "+5 points per Word", 250, 2));
passiveUpgrades.push(new Upgrade("I don't know exactly what to upgrade, I'm sorry", "x1.5 Points", 1000, 3));
passiveUpgrades.push(new Upgrade("Wow, it seems that they made a Scrabble module for the enhancer too. Interesting", "Every letter gets a value", 4000, 4));
passiveUpgrades.push(new Upgrade("Horizontal scaling ftw", "+1 Letter", 8000, 5));
passiveUpgrades.push(new Upgrade("More modules! This time you found a synergy module.", "Every Generator Bought gives a Bonus to the other Generators!", 20000, 6));

const prestigeUpgrades: Upgrade[] = [];

passiveUpgrades.push(new Upgrade("Welcome to Prestige! Take a free x2 multiplier", "Yes", 10, 1));
passiveUpgrades.push(new Upgrade("The Gacha Gods have spoken", "+2 Cards Per Roll", 50, 2));
passiveUpgrades.push(new Upgrade("Better Scaling for MultiUpgrades!", "x1.25 Points", 100, 3));
passiveUpgrades.push(new Upgrade("It seems that the next time you Prestige you can bring the enhancer with you. But the upgrades must wear out", "Keep your Passive Income (Not your upgrades) when Prestige! (PP resets too)", 500, 4));

function ChangeBasicUpgradesText(upgradeNumber: number) {
    const basicUpgradesText = document.querySelector("#basicUpgradesDesc");
    console.log(upgradeNumber);
    const upgrade = basicUpgrades.find(x => x.id == upgradeNumber);
    if(!upgrade) return;
    if(basicUpgradesText) basicUpgradesText.textContent = upgrade.name;
}

function ChangePassiveUpgradesText(upgradeNumber: number) {
    const passiveUpgradesText = document.querySelector("#passiveUpgradesDesc");
    const upgrade = passiveUpgrades.find(x => x.id == upgradeNumber);
    if(!upgrade) return;
    if(passiveUpgradesText) passiveUpgradesText.textContent = upgrade.name;
}

function ChangePrestigeUpgradesText(upgradeNumber: number) {
    const prestigeUpgradesText = document.querySelector("#prestigeUpgradesDesc");
    const upgrade = prestigeUpgrades.find(x => x.id == upgradeNumber);
    if(!upgrade) return;
    if(prestigeUpgradesText) prestigeUpgradesText.textContent = upgrade.name;
}

console.time("GameTime");

const upgradeButtons = document.querySelectorAll('.upgradeSquare');

upgradeButtons.forEach((upgradebutton, index) => {
    const buttonId = upgradebutton.getAttribute("id");
    if(!buttonId) return;
    const buttonNumber = buttonId.match(/\d+$/);
    if(buttonId.startsWith('upgrade')) {
        upgradebutton.addEventListener('click', e => {
            GetUpgrade(parseInt(buttonNumber![0]))
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangeBasicUpgradesText(parseInt(buttonNumber![0]))
        });
    }
    if(buttonId.startsWith('passive')) {
        upgradebutton.addEventListener('click', e => {
            GetPassiveUpgrade(parseInt(buttonNumber![0]))
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePassiveUpgradesText(parseInt(buttonNumber![0]))
        });
    }
    if(buttonId.startsWith('prestige')) {
        upgradebutton.addEventListener('click', e => {
            GetPrestigeUpgrade(parseInt(buttonNumber![0]))
        });
        upgradebutton.addEventListener('mouseover', e => {
            ChangePrestigeUpgradesText(parseInt(buttonNumber![0]))
        });
    }
});


export function GetUpgrade(upgradeNumber: number) {
    const upgrade = basicUpgrades.find(x => x.id == upgradeNumber);
    console.log(upgradeNumber);
    if(!upgrade) return;
    if(gameObjects.game.upgrades.find(x => x.id == upgradeNumber) == undefined  && gameObjects.game.points >= upgrade.cost)
    {
        gameObjects.game.points -= upgrade.cost;
        gameObjects.game.upgrades.push(upgrade);
        console.timeLog("GameTime")
    } 
}

function GetPassiveUpgrade(upgradeNumber: number) {
    const upgrade = passiveUpgrades.find(x => x.id == upgradeNumber);
    if(!upgrade) return;
    if(gameObjects.game.passiveUpgrades.find(x => x.id == upgradeNumber) == undefined && gameObjects.game.passivePoints >= upgrade.cost)
    {
        gameObjects.game.passivePoints -= upgrade.cost;
        gameObjects.game.passiveUpgrades.push(upgrade);
        if(upgradeNumber == 4) gameObjects.game.passiveLength++;
    } 
}

function GetPrestigeUpgrade(upgradeNumber: number) {
    const upgrade = prestigeUpgrades.find(x => x.id == upgradeNumber); 
    if(!upgrade) return;
    if(gameObjects.game.passiveUpgrades.find(x => x.id == upgradeNumber) == undefined && gameObjects.game.prestigePoints >= upgrade.cost)
    {
        gameObjects.game.prestigePoints -= upgrade.cost;
        gameObjects.game.prestigeUpgrades.push(upgrade);
        if(upgradeNumber == 1) gameObjects.game.rollsAmount += 2;
    } 
}

export function SetUpgrades() {
    SetActiveUpgrades();
    SetPassiveUpgrades();
    SetPrestigeUpgrades();
}

function SetActiveUpgrades() { 
    let myTable = document.querySelector('#upgradesTable');
    if(!myTable) return;
    let cells = myTable.querySelectorAll('button');
    cells.forEach(function callback(value, index) { 
        value.style.color = gameObjects.game.upgrades.find(x => x.id == index + 1) != undefined ? "#47682C" : "#FFFFFF";
    });
}

function SetPassiveUpgrades() { 
    let myTable = document.querySelector('#passiveUpgradesTable'); 
    if(!myTable) return;
    let cells = myTable.querySelectorAll('button');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.passiveUpgrades.find(x => x.id == index + 1) != undefined ? "#47682C" : "#FFFFFF";
    });
}

function SetPrestigeUpgrades() { 
    let myTable = document.querySelector('#prestigeUpgradesTable');
    if(!myTable) return;
    let cells = myTable.querySelectorAll('button');
    cells.forEach(function callback(value, index) {
        value.style.color = gameObjects.game.prestigeUpgrades.find(x => x.id == index + 1) != undefined ? "#47682C" : "#FFFFFF";
    });
}