import * as utilModule from "./util.js";
import { gameObjects } from "./classes/game.js";
import { Upgrade } from "./classes/upgrade.js";

export function CalculatePoints(wordLength: number) {
  var totalPoints: number = 0;
  totalPoints += wordLength;
  const multiUpgrade1 = gameObjects.game.multiUpgrades.find(x => x.id == 1);
  totalPoints +=  multiUpgrade1 ? multiUpgrade1.amountBought : 0;
  if (utilModule.IsPurchasedUpgrade(2)) totalPoints += 4;
  if (utilModule.IsPurchasedUpgrade(12)) totalPoints += 20;
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
  if (utilModule.IsPurchasedUpgrade(8)) totalPoints += 10;
  if (utilModule.IsPurchasedUpgrade(1)) totalPoints *= 1.5;
  if (utilModule.IsPurchasedUpgrade(5)) totalPoints *= 1.3;
  if (utilModule.IsPurchasedUpgrade(10)) totalPoints *= 2;
  if (
    utilModule.IsPurchasedUpgrade(6) &&
    gameObjects.game.achievements.length > 0
  )
    totalPoints *= Math.sqrt(gameObjects.game.achievements.length);
  if (utilModule.IsPurchasedUpgrade(4) && gameObjects.game.passivePoints > 0)
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
  const multiUpgrade2 = gameObjects.game.multiUpgrades.find(x => x.id == 2);
  totalPoints *= !multiUpgrade2 ? 1 : 1 + multiUpgrade2.amountBought * 0.25;
  if (utilModule.IsPurchasedPrestigeUpgrade(1)) totalPoints *= 2;
  return totalPoints;
}

export const multiUpgrades: Upgrade[] = [];

multiUpgrades.push(
  new Upgrade("You have to start somewhere", "+1 Point per Word", 50, 1)
);
multiUpgrades.push(
  new Upgrade(
    "I'm sure you can handle longer words, am i right?",
    "+1 letter per word",
    100,
    2
  )
);
multiUpgrades.push(new Upgrade("Simple is better", "x1.25 Points", 500, 3));

const multiUpgrade1: HTMLElement | null =
  document.querySelector("#multiUpgrade1");

if (multiUpgrade1) {
  multiUpgrade1.addEventListener("click", (e) => {
    AddMultiUpgrade(1);
  });
}

const multiUpgrade2: HTMLElement | null =
  document.querySelector("#multiUpgrade2");

if (multiUpgrade2) {
  multiUpgrade2.addEventListener("click", (e) => {
    AddMultiUpgrade(2);
  });
}

const multiUpgrade3: HTMLElement | null =
  document.querySelector("#multiUpgrade3");

if (multiUpgrade3) {
  multiUpgrade3.addEventListener("click", (e) => {
    AddMultiUpgrade(3);
  });
}

function AddMultiUpgrade(upgradeNumber: number) {
  const upgrade = multiUpgrades.find((x) => x.id == upgradeNumber);
  if (!upgrade) return;
  if (gameObjects.game.points >= upgrade.cost) {
    gameObjects.game.points -= upgrade.cost;

    if (!gameObjects.game.multiUpgrades.find((x) => x.id == upgradeNumber)) {
      gameObjects.game.multiUpgrades.push(upgrade);
    }

    const upgradeBought = gameObjects.game.multiUpgrades.find(
      (x) => x.id == upgradeNumber
    );
    if (!upgradeBought) return;

      upgradeBought.amountBought++;

    var costAux = upgradeBought.cost;
    upgradeBought.cost =
      costAux *
      (upgradeBought.amountBought + 1) **
        Math.log10(upgradeBought.amountBought + 1);
    if (utilModule.IsPurchasedPrestigeUpgrade(3))
      upgradeBought.cost =
        costAux *
        (upgradeBought.amountBought / 2 + 1) **
          Math.log10(upgradeBought.amountBought / 2 + 1);
    if(upgradeNumber == 2) gameObjects.game.maxLength++;
  }
}

export function GetPointsLetters(word: string) {
  var letters = word.toLowerCase().split("");
  var points = 0;
  letters.forEach((element) => {
    if (
      element === "a" ||
      element === "e" ||
      element === "i" ||
      element === "o" ||
      element === "u" ||
      element === "l" ||
      element === "n" ||
      element === "s" ||
      element === "t" ||
      element === "r"
    ) {
      points++;
    } else if (element === "d" || element === "g") {
      points += 2;
    } else if (
      element === "b" ||
      element === "c" ||
      element === "m" ||
      element === "p"
    ) {
      points += 3;
    } else if (
      element === "f" ||
      element === "h" ||
      element === "v" ||
      element === "w" ||
      element === "y"
    ) {
      points += 4;
    } else if (element === "k") {
      points += 5;
    } else if (element === "j" || element === "x") {
      points += 8;
    } else if (element === "q" || element === "z") {
      points += 10;
    } else {
      points += 20;
    }
  });
  return points;
}
