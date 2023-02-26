
function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    totalPoints += game.multiUpgrades[0][0];
    if(game.upgrades[0][1] == 1) totalPoints += 4;
    console.log(totalPoints);
    if(game.upgrades[0][7] == 1) totalPoints += 10;
    console.log(totalPoints);
    if(game.upgrades[0][0] == 1) totalPoints *= 1.5;
    console.log(totalPoints);  
    if(game.upgrades[0][4] == 1) totalPoints *= 1.3;
    console.log(totalPoints);
    if(game.upgrades[0][9] == 1) totalPoints *= 2;
    console.log(totalPoints);
    if(game.upgrades[0][5] == 1) totalPoints *= Math.sqrt(game.achievements.filter(x => x.unlocked).length);
    console.log(totalPoints);
    console.log(Math.sqrt(game.achievements.filter(x => x.unlocked).length));
    if(game.upgrades[0][3] == 1 && game.passivePoints > 0) totalPoints *= Math.log10(game.passivePoints);
    console.log(totalPoints);
    totalPoints *= (1 + game.multiUpgrades[0][2]*0.25)
    console.log(totalPoints);
    return totalPoints;
}

function AddMultiUpgrade(upgradeNumber) {
    if(game.points >= game.multiUpgrades[1][upgradeNumber])
    {
        game.points -= game.multiUpgrades[1][upgradeNumber]
        game.multiUpgrades[0][upgradeNumber]++;
        game.multiUpgrades[1][upgradeNumber] = game.multiUpgrades[1][upgradeNumber] * (2 ** (1 + game.multiUpgrades[0][upgradeNumber]/10))
    }
}

