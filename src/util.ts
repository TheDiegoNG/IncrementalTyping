import { gameObjects } from "./classes/game.js";

export var IsPurchasedUpgrade = (upgradeNumber: number) => gameObjects.game.upgrades[upgradeNumber].amountBought == 1;

export var IsPurchasedPassiveUpgrade = (upgradeNumber: number) => gameObjects.game.passiveUpgrades[upgradeNumber].amountBought == 1;

export var IsPurchasedPrestigeUpgrade = (upgradeNumber: number) => gameObjects.game.prestigeUpgrades[upgradeNumber].amountBought == 1;

export var HasCard = (cardName: string) => gameObjects.game.cards.filter(x => x.name === cardName).length > 0;

export var Copy = (object: object) => JSON.parse(JSON.stringify(object))

export var IsInChallenge = (challengeNumber: number) => gameObjects.game.challenges[challengeNumber].onChallenge;

export var IsUnlockedAchievement = (achievementName: string) => gameObjects.game.achievements.find(x => x.name == achievementName) != undefined;