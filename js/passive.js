import { gameObjects } from "./game.js";
import * as utilModule from "./util.js";

function createWord() {
  var passivePointsWord = document.getElementById("passivePointsWord");
  var passiveWord = GetRandomString(gameObjects.game.passiveLength);
  passivePointsWord.innerHTML = passiveWord;
  var points = GetPassivePoints(passiveWord);
  points *= gameObjects.game.passiveGenerators[1][0];
  if (utilModule.IsPurchasedUpgrade(3)) gameObjects.game.passivePoints += points;
}

setInterval(createWord, gameObjects.game.passiveRate);

function GetPassivePoints(passiveWord) {
  var totalPoints = 0;
  totalPoints += passiveWord.length;
  if (utilModule.IsPurchasedPassiveUpgrade(3)) totalPoints += GetPointsLetters(passiveWord);
  if (utilModule.HasCard("+2 Passive Points (C)")) totalPoints += 2 * gameObjects.game.cards.filter(x => x.name === "+2 Passive Points (C)").length;
  if (utilModule.HasCard("+5 Passive Points (UC)")) totalPoints += 5 * gameObjects.game.cards.filter(x => x.name === "+5 Passive Points (UC)").length;
  if (utilModule.HasCard("+10 Passive Points (E)")) totalPoints += 10 * gameObjects.game.cards.filter(x => x.name === "+10 Passive Points (E)").length;
  if (utilModule.HasCard("+25 Passive Points (L)")) totalPoints += 25 * gameObjects.game.cards.filter(x => x.name === "+25 Passive Points (L)").length;
  if (utilModule.IsPurchasedPassiveUpgrade(1)) totalPoints += 5;
  if (utilModule.IsPurchasedPassiveUpgrade(0)) totalPoints *= 1.25;
  if (utilModule.IsPurchasedPassiveUpgrade(2)) totalPoints *= 1.5;
  if (utilModule.HasCard("10% Passive Points (C)")) totalPoints *= 1 + 0.1 * gameObjects.game.cards.filter(x => x.name === "10% Passive Points (C)").length;
  if (utilModule.HasCard("25% Passive Points (UC)")) totalPoints *= 1 + 0.25 * gameObjects.game.cards.filter(x => x.name === "25% Passive Points (UC)").length;
  if (utilModule.HasCard("50% Passive Points (E)")) totalPoints *= 1 + 0.5 * gameObjects.game.cards.filter(x => x.name === "50% Passive Points (E)").length;
  if (utilModule.HasCard("x2 Passive Points (L)")) totalPoints *= 1 + 1 * gameObjects.game.cards.filter(x => x.name === "x2 Passive Points (L)").length;
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
var GeneratorButton = document.getElementById("GeneratorButton");

export function SetGenerators() {
  basicGenerator.textContent = `Generate Passive Points! | Generators: ${gameObjects.game.passiveGenerators[1][0].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][0]}) | Cost: ${gameObjects.game.passiveGenerators[2][0].toFixed(2)} Passive Points`
  PPGenerator.textContent = `Generate the First Generator | Generators: ${gameObjects.game.passiveGenerators[1][1].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][1]}) | Cost: ${gameObjects.game.passiveGenerators[2][1].toFixed(2)} 1st Generators`
  PPGenerator2.textContent = `Generate the Second Generator | Generators: ${gameObjects.game.passiveGenerators[1][2].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][2]}) | Cost: ${gameObjects.game.passiveGenerators[2][2].toFixed(2)} 2nd Generators`
  PPGenerator3.textContent = `Generate the Third Generator | Generators: ${gameObjects.game.passiveGenerators[1][3].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][3]}) | Cost: ${gameObjects.game.passiveGenerators[2][3].toFixed(2)} 3rd Generators`
  PPGenerator4.textContent = `Generate the Fourth Generator | Generators: ${gameObjects.game.passiveGenerators[1][4].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][4]}) | Cost: ${gameObjects.game.passiveGenerators[2][4].toFixed(2)} 4th Generators`
  PPGenerator5.textContent = `Generate the Fifth Generator | Generators: ${gameObjects.game.passiveGenerators[1][5].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][5]}) | Cost: ${gameObjects.game.passiveGenerators[2][5].toFixed(2)} 5th Generators`
  PPGenerator6.textContent = `Generate the Sixth Generator | Generators: ${gameObjects.game.passiveGenerators[1][6].toFixed(2)} (Bought: ${gameObjects.game.passiveGenerators[0][6]}) | Cost: ${gameObjects.game.passiveGenerators[2][6].toFixed(2)} 6th Generators`
  GeneratorButton.textContent = `Buy the next Tier of Generators! | Cost ${(gameObjects.game.passiveGenerators[0].findIndex(x => x == 0) + 1) * 3} Previous Tier Generators!`
}

function BuyGenerator(generatorNumber) {
  if (generatorNumber == 0 && gameObjects.game.passivePoints >= gameObjects.game.passiveGenerators[2][generatorNumber]) {
    gameObjects.game.passivePoints -= gameObjects.game.passiveGenerators[2][generatorNumber];
    gameObjects.game.passiveGenerators[0][generatorNumber]++;
    gameObjects.game.passiveGenerators[1][generatorNumber]++;
    gameObjects.game.passiveGenerators[2][generatorNumber] = gameObjects.game.passiveGenerators[2][generatorNumber] * (gameObjects.game.passiveGenerators[0][generatorNumber] + 1) ** Math.log10((gameObjects.game.passiveGenerators[0][generatorNumber] + 1));
  }
  if (gameObjects.game.passiveGenerators[1][generatorNumber - 1] >= gameObjects.game.passiveGenerators[2][generatorNumber]) {
    gameObjects.game.passiveGenerators[1][generatorNumber - 1] -= gameObjects.game.passiveGenerators[2][generatorNumber];
    gameObjects.game.passiveGenerators[0][generatorNumber]++;
    gameObjects.game.passiveGenerators[1][generatorNumber]++;
    gameObjects.game.passiveGenerators[2][generatorNumber] = gameObjects.game.passiveGenerators[2][generatorNumber] * (gameObjects.game.passiveGenerators[0][generatorNumber] + 1) ** Math.log10((gameObjects.game.passiveGenerators[0][generatorNumber] + 1));
  }
}

function BuyGeneratorTier() {
  var generatorToBuy = gameObjects.game.passiveGenerators[0].findIndex(x => x == 0);
  if(gameObjects.game.passiveGenerators[1][generatorToBuy - 1] >= gameObjects.game.passiveGenerators[2][generatorToBuy])
  {
    gameObjects.game.passiveGenerators[1][generatorToBuy - 1] -= gameObjects.game.passiveGenerators[2][generatorToBuy];
    gameObjects.game.passiveGenerators[0][generatorToBuy]++;
    gameObjects.game.passiveGenerators[1][generatorToBuy]++;

    var generator = document.getElementById(`PassivePointsGenerator${generatorToBuy}`);
    generator.style.display = "block";
  }
}

export function CalculatePassiveGenerators() {
  for (let index = 1; index < gameObjects.game.passiveGenerators[0].length; index++) {
    if(utilModule.IsPurchasedPassiveUpgrade(5))
    {
      gameObjects.game.passiveGenerators[1][index - 1] += gameObjects.game.passiveGenerators[1][index] * gameObjects.game.passiveGenerators[0].reduce((acc, val) => acc + val, 0);
    }
    else
    {
      gameObjects.game.passiveGenerators[1][index - 1] += gameObjects.game.passiveGenerators[1][index];
    }
  }
}

