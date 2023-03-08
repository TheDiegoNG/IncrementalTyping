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
    "Every letter gets a value - Cost: 2000 PP"
]

var prestigeUpgradesDesc = [
    "Welcome to Prestige! Take a free x2 multiplier - Cost: 10 Prestige Points",
    "+2 Cards Per Roll - Cost: 50 Prestige Points",
    "Better Scaling for MultiUpgrades! - Cost: 100 Prestige Points",
    "Keep your Passive Income when Prestige! (PP resets tho) - Cost: 500 Prestige Points"
]

function changeText(upgradeNumber) {
    console.log("Lleg[o ac[a");
    document.getElementById("upgradesDesc1").innerHTML = upgradesDesc[upgradeNumber];
}

console.time("GameTime");

function GetUpgrade(upgradeNumber, element) {
    if(game.upgrades[0][upgradeNumber] == 0 && game.points >= game.upgrades[1][upgradeNumber])
    {
        game.points -= game.upgrades[1][upgradeNumber]
        game.upgrades[0][upgradeNumber] = 1
        element.style.color = 'gray';
        console.log(upgradeNumber);
        console.timeLog("GameTime")
    } 
}

function GetPassiveUpgrade(upgradeNumber, element) {
    if(game.passiveUpgrades[0][upgradeNumber] == 0 && game.passivePoints >= game.passiveUpgrades[1][upgradeNumber])
    {
        game.passivePoints -= game.passiveUpgrades[1][upgradeNumber]
        game.passiveUpgrades[0][upgradeNumber] = 1
        element.style.color = 'gray';
    } 
}

function GetPrestigeUpgrade(upgradeNumber, element) {
    if(game.prestigeUpgrades[0][upgradeNumber] == 0 && game.prestigePoints >= game.prestigeUpgrades[1][upgradeNumber])
    {
        game.prestigePoints -= game.prestigeUpgrades[1][upgradeNumber]
        game.prestigeUpgrades[0][upgradeNumber] = 1
        element.style.color = 'gray';
    } 
    if(upgradeNumber == 1) game.rollsAmount += 2;
}

function SetUpgrades() {
    SetActiveUpgrades();
    SetPassiveUpgrades();
    SetPrestigeUpgrades();
}

function SetActiveUpgrades() { 
    let myTable = document.getElementById('upgradesTable');
    let cells = myTable.querySelectorAll('td');
    cells.forEach(function callback(value, index) {
        value.style.color = game.upgrades[0][index] == 1 ? 'gray' : 'none';
    });
}

function SetPassiveUpgrades() { 
    let myTable = document.getElementById('passiveUpgradesTable');
    let cells = myTable.querySelectorAll('td');
    cells.forEach(function callback(value, index) {
        value.style.color = game.upgrades[0][index] == 1 ? 'gray' : 'none';
    });
}

function SetPrestigeUpgrades() { 
    let myTable = document.getElementById('prestigeUpgradesTable');
    let cells = myTable.querySelectorAll('td');
    cells.forEach(function callback(value, index) {
        value.style.color = game.upgrades[0][index] == 1 ? 'gray' : 'none';
    });
}