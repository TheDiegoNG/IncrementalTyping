import { gameObjects } from "./classes/game";
import * as activeModule from "./active";
import translator from "./translator";


export function SetStats() {
    document.getElementById("pointsStat")!.textContent = `${translator.t('pointsStat')}: ${gameObjects.game.points}`;
    document.getElementById("maxLengthStat")!.textContent = `${translator.t('maxLengthStat')}: ${gameObjects.game.maxLength}`;
    document.getElementById("bestWordStat")!.textContent = `${translator.t('bestWordStat')}: ${gameObjects.game.bestWord} - ${translator.t('Points')}: ${activeModule.GetPointsLetters(gameObjects.game.bestWord)}`;
    
    const multiUpgrade1 = gameObjects.game.multiUpgrades.find(x => x.id ==  1);
    const multiUpgrade2 = gameObjects.game.multiUpgrades.find(x => x.id ==  2);
    const multiUpgrade3 = gameObjects.game.multiUpgrades.find(x => x.id ==  3);

    document.getElementById("multiupgradesStat")!.textContent = `${translator.t('multiUpgradesStat')}: ${multiUpgrade1 ? multiUpgrade1.amountBought : 0} - ${multiUpgrade2 ? multiUpgrade2.amountBought : 0} - ${multiUpgrade3 ? multiUpgrade3.amountBought : 0}`;
    document.getElementById("achievementsAmountStat")!.textContent = `${translator.t('achievementsAmountStat')}: ${gameObjects.game.achievements.length}`;
    document.getElementById("wordsAmountStat")!.textContent = `${translator.t('wordsAmountStat')}: ${gameObjects.game.wordsAmount}`;
    document.getElementById("passiveLengthStat")!.textContent = `${translator.t('passiveLengthStat')}: ${gameObjects.game.passiveLength}`;
    document.getElementById("passivePointsStat")!.textContent = `${translator.t('passivePointsStat')}: ${gameObjects.game.passivePoints}`;
    document.getElementById("cardsAmountStat")!.textContent = `${translator.t('cardsAmountStat')}: ${gameObjects.game.cards.length}`;
}