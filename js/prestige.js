import * as utilModule from "./util.js";
import * as mainModule from "./main.js";
import { gameObjects } from "./game.js";

export function SetPrestige() {
    document.getElementById("prestigePointsToGet").textContent = "Prestige Points when Prestige: " + Math.round(Math.cbrt(gameObjects.game.allTimePoints));
    document.getElementById("prestigePointsAmount").textContent = "Prestige Points: " + gameObjects.game.prestigePoints;
}

export function Prestige() {
    mainModule.TransitionWindow();
    setTimeout(function () {
        PrestigeStats();
    }, 500);
}

function PrestigeStats() {
    gameObjects.game.prestigePoints += Math.round(Math.cbrt(gameObjects.game.allTimePoints));
    gameObjects.game.prestigeCount++;
    gameObjects.game.points = 0;
    gameObjects.game.allTimePoints = 0;
    gameObjects.game.upgrades[0].fill(0);
    if (utilModule.IsPurchasedUpgrade(3) && utilModule.IsPurchasedPrestigeUpgrade(3)) gameObjects.game.upgrades[0][3] = 1;
    gameObjects.game.maxLength = 4;
    gameObjects.game.bestWord = "";
    gameObjects.game.multiUpgrades[0].fill(0);
    gameObjects.game.multiUpgrades[1][0] = 50;
    gameObjects.game.multiUpgrades[1][1] = 100;
    gameObjects.game.multiUpgrades[1][2] = 150;
    gameObjects.game.wordsAmount = 0;
    gameObjects.game.passiveUpgrades[0].fill(0);
    gameObjects.game.passiveLength = 4;
    gameObjects.game.passivePoints = 0;
    gameObjects.game.passiveRate = 1000;
    gameObjects.game.cards = [];
    gameObjects.game.cardCost = 0;
    gameObjects.game.challenges.forEach(x => (x.Amount = 0, x.OnChallenge = 0));
    gameObjects.game.isInChallenge = false;

    var cardsContainer = document.getElementById("cardsContainer");

    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }

}