import { gameObjects } from "./classes/game.js";
import * as activeModule from "./active.js"


export function SetStats() {
    document.getElementById("pointsStat")!.textContent = `Points Amount: ${gameObjects.game.points}`;
    document.getElementById("maxLengthStat")!.textContent = `Max Length: ${gameObjects.game.maxLength}`;
    document.getElementById("bestWordStat")!.textContent = `Best Word: ${gameObjects.game.bestWord} - Points: ${activeModule.GetPointsLetters(gameObjects.game.bestWord)}`;
    document.getElementById("multiupgradesStat")!.textContent = `Multiupgrades: ${gameObjects.game.multiUpgrades[0].amountBought} - ${gameObjects.game.multiUpgrades[1].amountBought} - ${gameObjects.game.multiUpgrades[2].amountBought}`;
    document.getElementById("achievementsAmountStat")!.textContent = `Achievements Amount: ${gameObjects.game.achievements.length}`;
    document.getElementById("wordsAmountStat")!.textContent = `Words Typed: ${gameObjects.game.wordsAmount}`;
    document.getElementById("passiveLengthStat")!.textContent = `Passive Word Length: ${gameObjects.game.passiveLength}`;
    document.getElementById("passivePointsStat")!.textContent = `Passive Points: ${gameObjects.game.passivePoints}`;
    document.getElementById("cardsAmountStat")!.textContent = `Cards Amount: ${gameObjects.game.cards.length}`;
}