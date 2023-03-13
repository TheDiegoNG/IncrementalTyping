function SetPrestige() {
    document.getElementById("prestigePointsToGet").textContent = "Prestige Points when Prestige: " + Math.round(Math.cbrt(game.allTimePoints));
    document.getElementById("prestigePointsAmount").textContent = "Prestige Points: " + game.prestigePoints;
}

function Prestige() {
    TransitionWindow();
    setTimeout(function () {
        PrestigeStats();
    }, 500);
}

function PrestigeStats() {
    game.prestigePoints += Math.round(Math.cbrt(game.allTimePoints));
    game.prestigeCount++;
    game.points = 0;
    game.allTimePoints = 0;
    game.upgrades[0].fill(0);
    if (IsPurchasedUpgrade(3) && IsPurchasedPrestigeUpgrade(3)) game.upgrades[0][3] = 1;
    game.maxLength = 4;
    game.bestWord = "";
    game.multiUpgrades[0].fill(0);
    game.multiUpgrades[1][0] = 50;
    game.multiUpgrades[1][1] = 100;
    game.multiUpgrades[1][2] = 150;
    game.wordsAmount = 0;
    game.passiveUpgrades[0].fill(0);
    game.passiveLength = 4;
    game.passivePoints = 0;
    game.passiveRate = 1000;
    game.cards = [];
    game.cardCost = 0;
    game.challenges.forEach(x => (x.Amount = 0, x.OnChallenge = 0));
    game.isInChallenge = false;

    var cardsContainer = document.getElementById("cardsContainer");

    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }

}