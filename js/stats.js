function SetStats() {
    document.getElementById("pointsStat").textContent = `Points Amount: ${game.points}`;
    document.getElementById("maxLengthStat").textContent = `Max Length: ${game.maxLength}`;
    document.getElementById("bestWordStat").textContent = `Best Word: ${game.bestWord} - Points: ${GetPointsLetters(game.bestWord)}`;
    document.getElementById("multiupgradesStat").textContent = `Multiupgrades: ${game.multiUpgrades[0][0]} - ${game.multiUpgrades[0][1]} - ${game.multiUpgrades[0][2]}`;
    document.getElementById("achievementsAmountStat").textContent = `Achievements Amount: ${game.achievements.filter(x => x.unlocked).length}`;
    document.getElementById("wordsAmountStat").textContent = `Words Typed: ${game.wordsAmount}`;
    document.getElementById("passiveLengthStat").textContent = `Passive Word Length: ${game.passiveLength}`;
    document.getElementById("passivePointsStat").textContent = `Passive Points: ${game.passivePoints}`;
    document.getElementById("cardsAmountStat").textContent = `Cards Amount: ${game.cards.length}`;
}