import { gameObjects } from "./classes/game.js";
export var IsPurchasedUpgrade = (upgradeNumber) => gameObjects.game.upgrades.find(x => x.id == upgradeNumber);
export var IsPurchasedPassiveUpgrade = (upgradeNumber) => gameObjects.game.passiveUpgrades.find(x => x.id == upgradeNumber);
export var IsPurchasedPrestigeUpgrade = (upgradeNumber) => gameObjects.game.prestigeUpgrades.find(x => x.id == upgradeNumber);
export var HasCard = (cardName) => gameObjects.game.cards.find(x => x.name === cardName);
export var Copy = (object) => JSON.parse(JSON.stringify(object));
export var IsInChallenge = (challengeNumber) => {
    const challenge = gameObjects.game.challenges.find(x => x.id == challengeNumber);
    if (!challenge)
        return false;
    return challenge.onChallenge;
};
export var IsUnlockedAchievement = (achievementName) => gameObjects.game.achievements.find(x => x.name == achievementName);
export var formatNumber = (num) => num.toString().length <= 6 ? num.toString() : num.toExponential(2).toString();
