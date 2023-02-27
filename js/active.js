
function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    totalPoints += game.multiUpgrades[0][0];
    if(game.upgrades[0][1] == 1) totalPoints += 4;
    if(game.cards.filter(x => x.name === "+1 Points (C)").length > 0) totalPoints += 1 * game.cards.filter(x => x.name === "+1 Points (C)").length;
    if(game.cards.filter(x => x.name === "+3 Points (UC)").length > 0) totalPoints += 1 * game.cards.filter(x => x.name === "+3 Points (UC)").length;
    if(game.cards.filter(x => x.name === "+6 Points (E)").length > 0) totalPoints += 1 * game.cards.filter(x => x.name === "+6 Points (E)").length;
    if(game.cards.filter(x => x.name === "+10 Points (L)").length > 0) totalPoints += 1 * game.cards.filter(x => x.name === "+10 Points (L)").length;
    if(game.upgrades[0][7] == 1) totalPoints += 10;
    if(game.upgrades[0][0] == 1) totalPoints *= 1.5;
    if(game.upgrades[0][4] == 1) totalPoints *= 1.3;
    if(game.upgrades[0][9] == 1) totalPoints *= 2;
    if(game.upgrades[0][5] == 1) totalPoints *= Math.sqrt(game.achievements.filter(x => x.unlocked).length);
    if(game.upgrades[0][3] == 1 && game.passivePoints > 0) totalPoints *= Math.log10(game.passivePoints);
    if(game.cards.filter(x => x.name === "Fast+ Progress (C)").length > 0) totalPoints *= 1 + 0.05 * game.cards.filter(x => x.name === "Fast+ Progress (C)").length;
    if(game.cards.filter(x => x.name === "Faster Progress (UC)").length > 0) totalPoints *= 1 + 0.25 * game.cards.filter(x => x.name === "Faster Progress (UC)").length;
    if(game.cards.filter(x => x.name === "Fasterer Progress (E)").length > 0) totalPoints *= 1 + 0.5 * game.cards.filter(x => x.name === "Fasterer Progress (E)").length;
    if(game.cards.filter(x => x.name === "Fastest Progress (L)").length > 0) totalPoints *= 1 + 1 * game.cards.filter(x => x.name === "Fastest Progress (L)").length;
    totalPoints *= (1 + game.multiUpgrades[0][2]*0.25);
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

