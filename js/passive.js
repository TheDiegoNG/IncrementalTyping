
function createWord() {
    var passivePointsWord = document.getElementById("passivePointsWord");
    var passiveWord = GetRandomString(game.passiveLength);
    passivePointsWord.innerHTML = passiveWord;
    var points = GetPassivePoints(passiveWord);
    if(IsPurchasedUpgrade(3)) game.passivePoints += points;
}

setInterval(createWord, game.passiveRate);

function GetPassivePoints(passiveWord) {
    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if(IsPurchasedPassiveUpgrade(3)) totalPoints += GetPointsLetters(passiveWord);
    if(HasCard("+2 Passive Points (C)")) totalPoints += 2 * game.cards.filter(x => x.name === "+2 Passive Points (C)").length;
    if(HasCard("+5 Passive Points (UC)")) totalPoints += 5 * game.cards.filter(x => x.name === "+5 Passive Points (UC)").length;
    if(HasCard("+10 Passive Points (E)")) totalPoints += 10 * game.cards.filter(x => x.name === "+10 Passive Points (E)").length;
    if(HasCard("+25 Passive Points (L)")) totalPoints += 25 * game.cards.filter(x => x.name === "+25 Passive Points (L)").length;
    if(IsPurchasedPassiveUpgrade(1)) totalPoints += 5;   
    if(IsPurchasedPassiveUpgrade(0)) totalPoints *= 1.25;   
    if(IsPurchasedPassiveUpgrade(2)) totalPoints *= 1.5; 
    if(HasCard("10% Passive Points (C)")) totalPoints *= 1 + 0.1 * game.cards.filter(x => x.name === "10% Passive Points (C)").length;
    if(HasCard("25% Passive Points (UC)")) totalPoints *= 1 + 0.25 * game.cards.filter(x => x.name === "25% Passive Points (UC)").length;
    if(HasCard("50% Passive Points (E)")) totalPoints *= 1 + 0.5 * game.cards.filter(x => x.name === "50% Passive Points (E)").length;
    if(HasCard("x2 Passive Points (L)")) totalPoints *= 1 + 1 * game.cards.filter(x => x.name === "x2 Passive Points (L)").length;
    return totalPoints;
}

function GetRandomString(numberLetters) {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  for (let i = 0; i < numberLetters; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}