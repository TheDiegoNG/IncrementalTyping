import * as utilModule from "./util.js";
import { gameObjects } from "./classes/game.js";

export function SetPrestige() {
  const prestigePointsToGet = document.querySelector("#prestigePointsToGet");
  if (prestigePointsToGet)
    prestigePointsToGet.textContent =
      "Prestige Points when Prestige: " +
      Math.round(Math.cbrt(gameObjects.game.allTimePoints));

  const prestigePointsAmount = document.querySelector("#prestigePointsAmount");
  if (prestigePointsAmount)
    prestigePointsAmount.textContent =
      "Prestige Points: " + gameObjects.game.prestigePoints;
}

const prestigeButton = document.querySelector("#prestigeButton");

if (prestigeButton)
  prestigeButton.addEventListener("click", (e) => {
    Prestige();
  });

export function TransitionWindow() {
  document.body.classList.add("fade-out");
  setTimeout(function () {
    document.body.classList.remove("fade-out");
  }, 1000);
}

export function Prestige() {
  TransitionWindow();
  setTimeout(function () {
    PrestigeStats();
  }, 500);
}

function PrestigeStats() {
  gameObjects.game.prestigePoints += Math.round(
    Math.cbrt(gameObjects.game.allTimePoints)
  );
  gameObjects.game.prestigeCount++;
  gameObjects.game.points = 0;
  gameObjects.game.allTimePoints = 0;
  gameObjects.game.upgrades = [];
  if (
    utilModule.IsPurchasedUpgrade(3) &&
    utilModule.IsPurchasedPrestigeUpgrade(3)
  )
    gameObjects.game.upgrades[3].amountBought = 1;
  gameObjects.game.maxLength = 4;
  gameObjects.game.bestWord = "";
  gameObjects.game.multiUpgrades = [];
  gameObjects.game.multiUpgrades[0].cost = 50;
  gameObjects.game.multiUpgrades[1].cost = 100; //TODO FIX MULTIUPGRADE MECHANIC
  gameObjects.game.multiUpgrades[2].cost = 150;
  gameObjects.game.wordsAmount = 0;
  gameObjects.game.passiveUpgrades = [];
  gameObjects.game.passiveLength = 4;
  gameObjects.game.passivePoints = 0;
  gameObjects.game.passiveRate = 1000;
  gameObjects.game.cards = [];
  gameObjects.game.cardCost = 0;
  gameObjects.game.challenges = [];
  gameObjects.game.isInChallenge = false;

  const cardsContainer = document.querySelector("#cardsContainer");
  if (cardsContainer) {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }
}
