import * as utilModule from "./util";
import * as upgradesmodule from "./upgrades";
import { gameObjects } from "./classes/game";
import translator from "./translator";

const prestigeButton = document.querySelector("#prestigeButton");

export function SetPrestige() {
  const prestigePointsToGet = document.querySelector("#prestigePointsToGet");
  if (prestigePointsToGet)
    prestigePointsToGet.textContent =
    `${translator.t('prestigePointsToGet')}
      ${Math.round(Math.cbrt(gameObjects.game.allTimePoints))}`

  const prestigePointsAmount = document.querySelector("#prestigePointsAmount");
  if (prestigePointsAmount)
    prestigePointsAmount.textContent =
    `${translator.t('prestigePointsAmount')} ${gameObjects.game.prestigePoints}`

    if(prestigeButton)
      prestigeButton.textContent = `${translator.t('prestigeButton')}`
}


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
    utilModule.IsPurchasedUpgrade(4) &&
    utilModule.IsPurchasedPrestigeUpgrade(4)
  )
    upgradesmodule.GetUpgrade(3);
  gameObjects.game.maxLength = 4;
  gameObjects.game.bestWord = "";
  gameObjects.game.multiUpgrades = []; 
  gameObjects.game.wordsAmount = 0;
  gameObjects.game.passiveUpgrades = [];
  gameObjects.game.passiveLength = 4;
  gameObjects.game.passivePoints = 0;
  gameObjects.game.passiveRate = 1000;
  gameObjects.game.cards = [];
  gameObjects.game.cardCost = 0;
  gameObjects.game.isInChallenge = false;

  const cardsContainer = document.querySelector("#cardsContainer");
  if (cardsContainer) {
    while (cardsContainer.firstChild) {
      cardsContainer.removeChild(cardsContainer.firstChild);
    }
  }
}
