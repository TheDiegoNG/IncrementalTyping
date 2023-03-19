import { gameObjects } from "./game.js";

export var IsPurchasedUpgrade = (upgradeNumber) => gameObjects.game.upgrades[0][upgradeNumber] == 1;

export var IsPurchasedPassiveUpgrade = (upgradeNumber) => gameObjects.game.passiveUpgrades[0][upgradeNumber] == 1;

export var IsPurchasedPrestigeUpgrade = (upgradeNumber) => gameObjects.game.prestigeUpgrades[0][upgradeNumber] == 1;

export var HasCard = (cardName) => gameObjects.game.cards.filter(x => x.name === cardName).length > 0;

export var Copy = (object) => JSON.parse(JSON.stringify(object))

export var IsInChallenge = (challengeNumber) => gameObjects.game.challenges[challengeNumber].OnChallenge == 1;

export var IsUnlockedAchievement = (achievementName) => gameObjects.game.achievements.find(x => x.name == achievementName) != undefined;