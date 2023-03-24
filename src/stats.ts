import { gameObjects } from "./classes/game.js";
import * as activeModule from "./active.js"


export function SetStats() {
    document.getElementById("pointsStat")!.textContent = `Points Amount: ${gameObjects.game.points}`;
    document.getElementById("maxLengthStat")!.textContent = `Max Length: ${gameObjects.game.maxLength}`;
    document.getElementById("bestWordStat")!.textContent = `Best Word: ${gameObjects.game.bestWord} - Points: ${activeModule.GetPointsLetters(gameObjects.game.bestWord)}`;
    
    const multiUpgrade1 = gameObjects.game.multiUpgrades.find(x => x.id ==  1);
    const multiUpgrade2 = gameObjects.game.multiUpgrades.find(x => x.id ==  2);
    const multiUpgrade3 = gameObjects.game.multiUpgrades.find(x => x.id ==  3);

    document.getElementById("multiupgradesStat")!.textContent = `Multiupgrades: ${multiUpgrade1 ? multiUpgrade1.amountBought : 0} - ${multiUpgrade2 ? multiUpgrade2.amountBought : 0} - ${multiUpgrade3 ? multiUpgrade3.amountBought : 0}`;
    document.getElementById("achievementsAmountStat")!.textContent = `Achievements Amount: ${gameObjects.game.achievements.length}`;
    document.getElementById("wordsAmountStat")!.textContent = `Words Typed: ${gameObjects.game.wordsAmount}`;
    document.getElementById("passiveLengthStat")!.textContent = `Passive Word Length: ${gameObjects.game.passiveLength}`;
    document.getElementById("passivePointsStat")!.textContent = `Passive Points: ${gameObjects.game.passivePoints}`;
    document.getElementById("cardsAmountStat")!.textContent = `Cards Amount: ${gameObjects.game.cards.length}`;
}