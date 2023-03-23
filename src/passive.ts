import { gameObjects } from "./classes/game";
import * as utilModule from "./util";
import * as activeModule from "./active";

function createWord() {
  const passivePointsWord = document.querySelector("#passivePointsWord");
  var passiveWord = GetRandomString(gameObjects.game.passiveLength);
  if (passivePointsWord) passivePointsWord.textContent = passiveWord;
  var points = GetPassivePoints(passiveWord);
  points *= gameObjects.game.passiveGenerators[0].amountGained;
  if (utilModule.IsPurchasedUpgrade(3))
    gameObjects.game.passivePoints += points;
}

setInterval(createWord, gameObjects.game.passiveRate);

function GetPassivePoints(passiveWord: string) {
  var totalPoints = 0;
  totalPoints += passiveWord.length;
  if (utilModule.IsPurchasedPassiveUpgrade(3))
    totalPoints += activeModule.GetPointsLetters(passiveWord);
  if (utilModule.HasCard("+2 Passive Points (C)"))
    totalPoints +=
      2 *
      gameObjects.game.cards.filter((x) => x.name === "+2 Passive Points (C)")
        .length;
  if (utilModule.HasCard("+5 Passive Points (UC)"))
    totalPoints +=
      5 *
      gameObjects.game.cards.filter((x) => x.name === "+5 Passive Points (UC)")
        .length;
  if (utilModule.HasCard("+10 Passive Points (E)"))
    totalPoints +=
      10 *
      gameObjects.game.cards.filter((x) => x.name === "+10 Passive Points (E)")
        .length;
  if (utilModule.HasCard("+25 Passive Points (L)"))
    totalPoints +=
      25 *
      gameObjects.game.cards.filter((x) => x.name === "+25 Passive Points (L)")
        .length;
  if (utilModule.IsPurchasedPassiveUpgrade(1)) totalPoints += 5;
  if (utilModule.IsPurchasedPassiveUpgrade(0)) totalPoints *= 1.25;
  if (utilModule.IsPurchasedPassiveUpgrade(2)) totalPoints *= 1.5;
  if (utilModule.HasCard("10% Passive Points (C)"))
    totalPoints *=
      1 +
      0.1 *
        gameObjects.game.cards.filter(
          (x) => x.name === "10% Passive Points (C)"
        ).length;
  if (utilModule.HasCard("25% Passive Points (UC)"))
    totalPoints *=
      1 +
      0.25 *
        gameObjects.game.cards.filter(
          (x) => x.name === "25% Passive Points (UC)"
        ).length;
  if (utilModule.HasCard("50% Passive Points (E)"))
    totalPoints *=
      1 +
      0.5 *
        gameObjects.game.cards.filter(
          (x) => x.name === "50% Passive Points (E)"
        ).length;
  if (utilModule.HasCard("x2 Passive Points (L)"))
    totalPoints *=
      1 +
      1 *
        gameObjects.game.cards.filter((x) => x.name === "x2 Passive Points (L)")
          .length;
  return totalPoints;
}

function GetRandomString(lettersAmount: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString: string = "";
  for (let i = 0; i < lettersAmount; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

const basicGenerator = document.querySelector("#PassivePointsGenerator0");

if (basicGenerator)
  basicGenerator.addEventListener("click", (e) => {
    BuyGenerator(0);
  });

const PPGenerator = document.querySelector("#PassivePointsGenerator1");

if (PPGenerator)
  PPGenerator.addEventListener("click", (e) => {
    BuyGenerator(1);
  });

const PPGenerator2 = document.querySelector("#PassivePointsGenerator2");

if (PPGenerator2)
  PPGenerator2.addEventListener("click", (e) => {
    BuyGenerator(2);
  });

const PPGenerator3 = document.querySelector("#PassivePointsGenerator3");

if (PPGenerator3)
  PPGenerator3.addEventListener("click", (e) => {
    BuyGenerator(3);
  });

const PPGenerator4 = document.querySelector("#PassivePointsGenerator4");

if (PPGenerator4)
  PPGenerator4.addEventListener("click", (e) => {
    BuyGenerator(4);
  });

const PPGenerator5 = document.querySelector("#PassivePointsGenerator5");

if (PPGenerator5)
  PPGenerator5.addEventListener("click", (e) => {
    BuyGenerator(5);
  });

const PPGenerator6 = document.querySelector("#PassivePointsGenerator6");

if (PPGenerator6)
  PPGenerator6.addEventListener("click", (e) => {
    BuyGenerator(6);
  });

const GeneratorButton = document.querySelector("#GeneratorButton");

if (PPGenerator)
  PPGenerator.addEventListener("click", (e) => {
    BuyGeneratorTier();
  });

export function SetGenerators() {
  if (basicGenerator)
    basicGenerator.textContent = `Generate Passive Points! | Generators: ${gameObjects.game.passiveGenerators[0].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[0].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[0].cost.toFixed(
      2
    )} Passive Points`;
  if (PPGenerator)
    PPGenerator.textContent = `Generate the First Generator | Generators: ${gameObjects.game.passiveGenerators[1].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[1].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[1].cost.toFixed(
      2
    )} 1st Generators`;
  if (PPGenerator2)
    PPGenerator2.textContent = `Generate the Second Generator | Generators: ${gameObjects.game.passiveGenerators[2].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[2].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[2].cost.toFixed(
      2
    )} 2nd Generators`;
  if (PPGenerator3)
    PPGenerator3.textContent = `Generate the Third Generator | Generators: ${gameObjects.game.passiveGenerators[3].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[3].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[3].cost.toFixed(
      2
    )} 3rd Generators`;
  if (PPGenerator4)
    PPGenerator4.textContent = `Generate the Fourth Generator | Generators: ${gameObjects.game.passiveGenerators[4].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[4].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[4].cost.toFixed(
      2
    )} 4th Generators`;
  if (PPGenerator5)
    PPGenerator5.textContent = `Generate the Fifth Generator | Generators: ${gameObjects.game.passiveGenerators[5].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[5].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[5].cost.toFixed(
      2
    )} 5th Generators`;
  if (PPGenerator6)
    PPGenerator6.textContent = `Generate the Sixth Generator | Generators: ${gameObjects.game.passiveGenerators[6].amountGained.toFixed(
      2
    )} (Bought: ${
      gameObjects.game.passiveGenerators[6].amountBought
    }) | Cost: ${gameObjects.game.passiveGenerators[6].cost.toFixed(
      2
    )} 6th Generators`;
  if (GeneratorButton)
    GeneratorButton.textContent = `Buy the next Tier of Generators! | Cost ${
      (gameObjects.game.passiveGenerators.findIndex(
        (x) => x.amountGained == 0
      ) +
        1) *
      3
    } Previous Tier Generators!`;
}

function BuyGenerator(generatorNumber: number) {
  if (
    generatorNumber == 0 &&
    gameObjects.game.passivePoints >=
      gameObjects.game.passiveGenerators[generatorNumber].cost
  ) {
    gameObjects.game.passivePoints -=
      gameObjects.game.passiveGenerators[generatorNumber].cost;
    gameObjects.game.passiveGenerators[generatorNumber].amountBought++;
    gameObjects.game.passiveGenerators[generatorNumber].amountGained++;
    gameObjects.game.passiveGenerators[generatorNumber].cost =
      gameObjects.game.passiveGenerators[generatorNumber].cost *
      (gameObjects.game.passiveGenerators[generatorNumber].amountBought + 1) **
        Math.log10(
          gameObjects.game.passiveGenerators[generatorNumber].amountBought + 1
        );
  }
  if (
    gameObjects.game.passiveGenerators[generatorNumber - 1].amountGained >=
    gameObjects.game.passiveGenerators[generatorNumber].amountGained
  ) {
    gameObjects.game.passiveGenerators[generatorNumber - 1].amountGained -=
      gameObjects.game.passiveGenerators[generatorNumber].cost;
    gameObjects.game.passiveGenerators[generatorNumber].amountBought++;
    gameObjects.game.passiveGenerators[generatorNumber].amountGained++;
    gameObjects.game.passiveGenerators[generatorNumber].cost =
      gameObjects.game.passiveGenerators[generatorNumber].cost *
      (gameObjects.game.passiveGenerators[generatorNumber].amountBought + 1) **
        Math.log10(
          gameObjects.game.passiveGenerators[generatorNumber].amountBought + 1
        );
  }
}

function BuyGeneratorTier() {
  var generatorToBuy = gameObjects.game.passiveGenerators.findIndex(
    (x) => x.amountBought == 0
  );
  if (
    gameObjects.game.passiveGenerators[generatorToBuy - 1].amountGained >=
    gameObjects.game.passiveGenerators[generatorToBuy].cost
  ) {
    gameObjects.game.passiveGenerators[generatorToBuy - 1].amountGained -=
      gameObjects.game.passiveGenerators[generatorToBuy].cost;
    gameObjects.game.passiveGenerators[generatorToBuy].amountBought++;
    gameObjects.game.passiveGenerators[generatorToBuy].amountGained++;

    const generator = document.querySelector(
      `#PassivePointsGenerator${generatorToBuy}`
    );
    if (generator && generator instanceof HTMLElement)
      generator.style.display = "block";
  }
}

export function CalculatePassiveGenerators() {
  for (
    let index = 1;
    index < gameObjects.game.passiveGenerators.length;
    index++
  ) {
    if (utilModule.IsPurchasedPassiveUpgrade(5)) {
      gameObjects.game.passiveGenerators[index - 1].amountGained +=
        gameObjects.game.passiveGenerators[index].amountGained *
        gameObjects.game.passiveGenerators.reduce(
          (acc, val) => acc + val.amountBought,
          0
        );
    } else {
      gameObjects.game.passiveGenerators[index - 1].amountGained +=
        gameObjects.game.passiveGenerators[index].amountGained;
    }
  }
}
