import { gameObjects } from "./classes/game.js";
export var IsPurchasedUpgrade = (upgradeNumber) => gameObjects.game.upgrades[upgradeNumber].amountBought == 1;
export var IsPurchasedPassiveUpgrade = (upgradeNumber) => gameObjects.game.passiveUpgrades[upgradeNumber].amountBought == 1;
export var IsPurchasedPrestigeUpgrade = (upgradeNumber) => gameObjects.game.prestigeUpgrades[upgradeNumber].amountBought == 1;
export var HasCard = (cardName) => gameObjects.game.cards.filter(x => x.name === cardName).length > 0;
export var Copy = (object) => JSON.parse(JSON.stringify(object));
export var IsInChallenge = (challengeNumber) => gameObjects.game.challenges[challengeNumber].onChallenge;
export var IsUnlockedAchievement = (achievementName) => gameObjects.game.achievements.find(x => x.name == achievementName) != undefined;
