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