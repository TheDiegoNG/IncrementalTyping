import { gameObjects } from "./game.js";
import * as mainModule from "./main.js"


export function SetStats() {
    document.getElementById("pointsStat").textContent = `Points Amount: ${gameObjects.game.points}`;
    document.getElementById("maxLengthStat").textContent = `Max Length: ${gameObjects.game.maxLength}`;
    document.getElementById("bestWordStat").textContent = `Best Word: ${gameObjects.game.bestWord} - Points: ${mainModule.GetPointsLetters(gameObjects.game.bestWord)}`;
    document.getElementById("multiupgradesStat").textContent = `Multiupgrades: ${gameObjects.game.multiUpgrades[0][0]} - ${gameObjects.game.multiUpgrades[0][1]} - ${gameObjects.game.multiUpgrades[0][2]}`;
    document.getElementById("achievementsAmountStat").textContent = `Achievements Amount: ${gameObjects.game.achievements.filter(x => x.unlocked).length}`;
    document.getElementById("wordsAmountStat").textContent = `Words Typed: ${gameObjects.game.wordsAmount}`;
    document.getElementById("passiveLengthStat").textContent = `Passive Word Length: ${gameObjects.game.passiveLength}`;
    document.getElementById("passivePointsStat").textContent = `Passive Points: ${gameObjects.game.passivePoints}`;
    document.getElementById("cardsAmountStat").textContent = `Cards Amount: ${gameObjects.game.cards.length}`;
}