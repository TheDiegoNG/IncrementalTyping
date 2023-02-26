
function createWord() {
    var passivePoints = document.getElementById("passivePointsWord");
    var passiveWord = GetRandomString(game.passiveLength);
    passivePoints.innerHTML = passiveWord;
    var points = GetPassivePoints(passiveWord);
    if(game.upgrades[0][3] == 1) game.passivePoints += points;
}

setInterval(createWord, 1000);

function GetPassivePoints(passiveWord) {

    var totalPoints = 0;
    totalPoints += passiveWord.length;
    if(game.passiveUpgrades[0][3] == 1) totalPoints += GetPointsLetters(new String(passiveWord.toLowerCase()).split(''));
    if(game.passiveUpgrades[0][1] == 1) totalPoints += 5;   
    if(game.passiveUpgrades[0][0] == 1) totalPoints *= 1.25;   
    if(game.passiveUpgrades[0][2] == 1) totalPoints *= 1.5; 
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