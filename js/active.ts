import * as utilModule from "./util";
import { gameObjects } from "./classes/game";

export function CalculatePoints(wordLength: number) {
  var totalPoints: number = 0;
  totalPoints += wordLength;
  totalPoints += gameObjects.game.multiUpgrades[0].amountBought;
  if (utilModule.IsPurchasedUpgrade(1)) totalPoints += 4;
  if (utilModule.IsPurchasedUpgrade(11)) totalPoints += 20;
  if (utilModule.HasCard("+1 Points (C)"))
    totalPoints +=
      1 *
      gameObjects.game.cards.filter((x) => x.name === "+1 Points (C)").length;
  if (utilModule.HasCard("+3 Points (UC)"))
    totalPoints +=
      1 *
      gameObjects.game.cards.filter((x) => x.name === "+3 Points (UC)").length;
  if (utilModule.HasCard("+6 Points (E)"))
    totalPoints +=
      1 *
      gameObjects.game.cards.filter((x) => x.name === "+6 Points (E)").length;
  if (utilModule.HasCard("+10 Points (L)"))
    totalPoints +=
      1 *
      gameObjects.game.cards.filter((x) => x.name === "+10 Points (L)").length;
  if (utilModule.IsPurchasedUpgrade(7)) totalPoints += 10;
  if (utilModule.IsPurchasedUpgrade(0)) totalPoints *= 1.5;
  if (utilModule.IsPurchasedUpgrade(4)) totalPoints *= 1.3;
  if (utilModule.IsPurchasedUpgrade(9)) totalPoints *= 2;
  if (
    utilModule.IsPurchasedUpgrade(5) &&
    gameObjects.game.achievements.length > 0
  )
    totalPoints *= Math.sqrt(gameObjects.game.achievements.length);
  if (utilModule.IsPurchasedUpgrade(3) && gameObjects.game.passivePoints > 0)
    totalPoints *= Math.log10(gameObjects.game.passivePoints);
  if (utilModule.HasCard("Fast+ Progress (C)"))
    totalPoints *=
      1 +
      0.05 *
        gameObjects.game.cards.filter((x) => x.name === "Fast+ Progress (C)")
          .length;
  if (utilModule.HasCard("Faster Progress (UC)"))
    totalPoints *=
      1 +
      0.25 *
        gameObjects.game.cards.filter((x) => x.name === "Faster Progress (UC)")
          .length;
  if (utilModule.HasCard("Fasterer Progress (E)"))
    totalPoints *=
      1 +
      0.5 *
        gameObjects.game.cards.filter((x) => x.name === "Fasterer Progress (E)")
          .length;
  if (utilModule.HasCard("Fastest Progress (L)"))
    totalPoints *=
      1 +
      1 *
        gameObjects.game.cards.filter((x) => x.name === "Fastest Progress (L)")
          .length;
  totalPoints *= 1 + gameObjects.game.multiUpgrades[2].amountBought * 0.25;
  if (utilModule.IsPurchasedPrestigeUpgrade(0)) totalPoints *= 2;
  return totalPoints;
}

const multiUpgrade1: HTMLElement | null =
  document.querySelector("#multiUpgrade1");

if (multiUpgrade1) {
  multiUpgrade1.addEventListener("click", (e) => {
    AddMultiUpgrade(0);
  });
}

const multiUpgrade2: HTMLElement | null =
  document.querySelector("#multiUpgrade2");

if (multiUpgrade2) {
  multiUpgrade2.addEventListener("click", (e) => {
    AddMultiUpgrade(1);
  });
}

const multiUpgrade3: HTMLElement | null =
  document.querySelector("#multiUpgrade3");

if (multiUpgrade3) {
  multiUpgrade3.addEventListener("click", (e) => {
    AddMultiUpgrade(2);
  });
}

function AddMultiUpgrade(upgradeNumber: number) {
  if (
    gameObjects.game.points >=
    gameObjects.game.multiUpgrades[upgradeNumber].cost
  ) {
    gameObjects.game.points -=
      gameObjects.game.multiUpgrades[upgradeNumber].cost;
    gameObjects.game.multiUpgrades[upgradeNumber].amountBought++;
    var costAux = gameObjects.game.multiUpgrades[upgradeNumber].cost;
    gameObjects.game.multiUpgrades[upgradeNumber].cost =
      gameObjects.game.multiUpgrades[upgradeNumber].cost *
      (gameObjects.game.multiUpgrades[upgradeNumber].amountBought + 1) **
        Math.log10(
          gameObjects.game.multiUpgrades[upgradeNumber].amountBought + 1
        );
    if (utilModule.IsPurchasedPrestigeUpgrade(2))
      gameObjects.game.multiUpgrades[upgradeNumber].cost =
        costAux *
        (gameObjects.game.multiUpgrades[upgradeNumber].amountBought / 2 + 1) **
          Math.log10(
            gameObjects.game.multiUpgrades[upgradeNumber].amountBought / 2 + 1
          );
  }
}
