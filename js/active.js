
function CalculatePoints(wordLength) {
    var totalPoints = 0;
    totalPoints += wordLength;
    totalPoints += game.multiUpgrades[0][0];
    if(IsPurchasedUpgrade(1)) totalPoints += 4;
    if(HasCard("+1 Points (C)")) totalPoints += 1 * game.cards.filter(x => x.name === "+1 Points (C)").length;
    if(HasCard("+3 Points (UC)")) totalPoints += 1 * game.cards.filter(x => x.name === "+3 Points (UC)").length;
    if(HasCard("+6 Points (E)")) totalPoints += 1 * game.cards.filter(x => x.name === "+6 Points (E)").length;
    if(HasCard("+10 Points (L)")) totalPoints += 1 * game.cards.filter(x => x.name === "+10 Points (L)").length;
    if(IsPurchasedUpgrade(7)) totalPoints += 10;
    if(IsPurchasedUpgrade(0)) totalPoints *= 1.5;
    if(IsPurchasedUpgrade(4)) totalPoints *= 1.3;
    if(IsPurchasedUpgrade(9)) totalPoints *= 2;
    if(IsPurchasedUpgrade(5)) totalPoints *= Math.sqrt(game.achievements.filter(x => x.unlocked).length);
    if(IsPurchasedUpgrade(3) && game.passivePoints > 0) totalPoints *= Math.log10(game.passivePoints);
    if(HasCard("Fast+ Progress (C)")) totalPoints *= 1 + 0.05 * game.cards.filter(x => x.name === "Fast+ Progress (C)").length;
    if(HasCard("Faster Progress (UC)")) totalPoints *= 1 + 0.25 * game.cards.filter(x => x.name === "Faster Progress (UC)").length;
    if(HasCard("Fasterer Progress (E)")) totalPoints *= 1 + 0.5 * game.cards.filter(x => x.name === "Fasterer Progress (E)").length;
    if(HasCard("Fastest Progress (L)")) totalPoints *= 1 + 1 * game.cards.filter(x => x.name === "Fastest Progress (L)").length;
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


