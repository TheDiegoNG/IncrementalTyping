var IsPurchasedUpgrade = (upgradeNumber) => game.upgrades[0][upgradeNumber] == 1;

var IsPurchasedPassiveUpgrade = (upgradeNumber) => game.passiveUpgrades[0][upgradeNumber] == 1;

var IsPurchasedPrestigeUpgrade = (upgradeNumber) => game.prestigeUpgrades[0][upgradeNumber] == 1;

var HasCard = (cardName) => game.cards.filter(x => x.name === cardName).length > 0;

var Copy = (object) => JSON.parse(JSON.stringify(object))

var IsInChallenge = (challengeNumber) => game.challenges[challengeNumber].OnChallenge == 1;

var IsUnlockedAchievement = (achievementName) => game.achievements.find(x => x.name == achievementName) != undefined;