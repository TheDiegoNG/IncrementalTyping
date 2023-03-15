
function createWord() {
  var passivePointsWord = document.getElementById("passivePointsWord");
  var passiveWord = GetRandomString(game.passiveLength);
  passivePointsWord.innerHTML = passiveWord;
  var points = GetPassivePoints(passiveWord);
  points *= game.passiveGenerators[1][0];
  if (IsPurchasedUpgrade(3)) game.passivePoints += points;
}

setInterval(createWord, game.passiveRate);

function GetPassivePoints(passiveWord) {
  var totalPoints = 0;
  totalPoints += passiveWord.length;
  if (IsPurchasedPassiveUpgrade(3)) totalPoints += GetPointsLetters(passiveWord);
  if (HasCard("+2 Passive Points (C)")) totalPoints += 2 * game.cards.filter(x => x.name === "+2 Passive Points (C)").length;
  if (HasCard("+5 Passive Points (UC)")) totalPoints += 5 * game.cards.filter(x => x.name === "+5 Passive Points (UC)").length;
  if (HasCard("+10 Passive Points (E)")) totalPoints += 10 * game.cards.filter(x => x.name === "+10 Passive Points (E)").length;
  if (HasCard("+25 Passive Points (L)")) totalPoints += 25 * game.cards.filter(x => x.name === "+25 Passive Points (L)").length;
  if (IsPurchasedPassiveUpgrade(1)) totalPoints += 5;
  if (IsPurchasedPassiveUpgrade(0)) totalPoints *= 1.25;
  if (IsPurchasedPassiveUpgrade(2)) totalPoints *= 1.5;
  if (HasCard("10% Passive Points (C)")) totalPoints *= 1 + 0.1 * game.cards.filter(x => x.name === "10% Passive Points (C)").length;
  if (HasCard("25% Passive Points (UC)")) totalPoints *= 1 + 0.25 * game.cards.filter(x => x.name === "25% Passive Points (UC)").length;
  if (HasCard("50% Passive Points (E)")) totalPoints *= 1 + 0.5 * game.cards.filter(x => x.name === "50% Passive Points (E)").length;
  if (HasCard("x2 Passive Points (L)")) totalPoints *= 1 + 1 * game.cards.filter(x => x.name === "x2 Passive Points (L)").length;
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

var basicGenerator = document.getElementById("PassivePointsGenerator0");
var PPGenerator = document.getElementById("PassivePointsGenerator1");
var PPGenerator2 = document.getElementById("PassivePointsGenerator2");
var PPGenerator3 = document.getElementById("PassivePointsGenerator3");
var PPGenerator4 = document.getElementById("PassivePointsGenerator4");
var PPGenerator5 = document.getElementById("PassivePointsGenerator5");
var PPGenerator6 = document.getElementById("PassivePointsGenerator6");

function SetGenerators() {
  basicGenerator.textContent = `Generate Passive Points! | Generators: ${game.passiveGenerators[1][0].toFixed(2)} | Cost: ${game.passiveGenerators[2][0].toFixed(2)} Passive Points`
  PPGenerator.textContent = `Generate the First Generator | Generators: ${game.passiveGenerators[1][1].toFixed(2)} | Cost: ${game.passiveGenerators[2][1].toFixed(2)} 1st Generators`
  PPGenerator2.textContent = `Generate the Second Generator | Generators: ${game.passiveGenerators[1][2].toFixed(2)} | Cost: ${game.passiveGenerators[2][2].toFixed(2)} 2nd Generators`
  PPGenerator3.textContent = `Generate the Third Generator | Generators: ${game.passiveGenerators[1][3].toFixed(2)} | Cost: ${game.passiveGenerators[2][3].toFixed(2)} 3rd Generators`
  PPGenerator4.textContent = `Generate the Fourth Generator | Generators: ${game.passiveGenerators[1][4].toFixed(2)} | Cost: ${game.passiveGenerators[2][4].toFixed(2)} 4th Generators`
  PPGenerator5.textContent = `Generate the Fifth Generator | Generators: ${game.passiveGenerators[1][5].toFixed(2)} | Cost: ${game.passiveGenerators[2][5].toFixed(2)} 5th Generators`
  PPGenerator6.textContent = `Generate the Sixth Generator | Generators: ${game.passiveGenerators[1][6].toFixed(2)} | Cost: ${game.passiveGenerators[2][6].toFixed(2)} 6th Generators`
}

function BuyGenerator(generatorNumber) {
  if (generatorNumber == 0 && game.passivePoints >= game.passiveGenerators[2][generatorNumber]) {
    game.passivePoints -= game.passiveGenerators[2][generatorNumber];
    game.passiveGenerators[0][generatorNumber]++;
    game.passiveGenerators[1][generatorNumber]++;
    game.passiveGenerators[2][generatorNumber] = game.passiveGenerators[2][generatorNumber] * (game.passiveGenerators[0][generatorNumber] + 1) ** Math.log10((game.passiveGenerators[0][generatorNumber] + 1));
  }
  if (game.passiveGenerators[1][generatorNumber - 1] >= game.passiveGenerators[2][generatorNumber]) {
    game.passiveGenerators[1][generatorNumber - 1] -= game.passiveGenerators[2][generatorNumber];
    game.passiveGenerators[0][generatorNumber]++;
    game.passiveGenerators[1][generatorNumber]++;
    game.passiveGenerators[2][generatorNumber] = game.passiveGenerators[2][generatorNumber] * (game.passiveGenerators[0][generatorNumber] + 1) ** Math.log10((game.passiveGenerators[0][generatorNumber] + 1));
  }
}

function CalculatePassiveGenerators() {
  for (let index = 1; index < game.passiveGenerators[0].length; index++) {
    game.passiveGenerators[1][index - 1] += game.passiveGenerators[1][index];
  }
}