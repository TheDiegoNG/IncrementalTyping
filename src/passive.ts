import { gameObjects } from "./classes/game";
import * as utilModule from "./util";
import * as activeModule from "./active";
import { Generator } from "./classes/generator";
import translator from "./translator";

export const generators: Generator[] = [];

generators.push(new Generator("Portable Generator", 5, 1));
generators.push(new Generator("Small Generator", 6, 2));
generators.push(new Generator("Medium-sized Generator", 9, 3));
generators.push(new Generator("Ample Generator", 12, 4));
generators.push(new Generator("Substantial Generator", 15, 5));
generators.push(new Generator("Reasonable Generator", 18, 6));
generators.push(new Generator("Large Generator", 21, 7));
generators.push(new Generator("Major Generator", 24, 8));
generators.push(new Generator("Jumbo Generator", 27, 9));
generators.push(new Generator("Colossal Generator", 30, 10));

function createWord() {
  const passivePointsWord = document.querySelector("#passivePointsWord");
  const portableGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.name == "Portable Generator"
  );
  if (!portableGenerator) return;
  var passiveWord = GetRandomString(gameObjects.game.passiveLength);
  if (passivePointsWord) passivePointsWord.textContent = passiveWord;
  var points = GetPassivePoints(passiveWord);
  points *= portableGenerator.amountGained;
  if (utilModule.IsPurchasedUpgrade(4))
    gameObjects.game.passivePoints += points;
}

setInterval(createWord, gameObjects.game.passiveRate);

function GetPassivePoints(passiveWord: string) {
  var totalPoints = 0;
  totalPoints += passiveWord.length;
  if (utilModule.IsPurchasedPassiveUpgrade(4))
    totalPoints += activeModule.GetPointsLetters(passiveWord);
  if (utilModule.HasCard(4))
    totalPoints +=
      2 *
      gameObjects.game.cards.filter((x) => x.name === "+2 Passive Points (C)")
        .length;
  if (utilModule.HasCard(8))
    totalPoints +=
      5 *
      gameObjects.game.cards.filter((x) => x.name === "+5 Passive Points (UC)")
        .length;
  if (utilModule.HasCard(15))
    totalPoints +=
      10 *
      gameObjects.game.cards.filter((x) => x.name === "+10 Passive Points (E)")
        .length;
  if (utilModule.HasCard(21))
    totalPoints +=
      25 *
      gameObjects.game.cards.filter((x) => x.name === "+25 Passive Points (L)")
        .length;
  if (utilModule.IsPurchasedPassiveUpgrade(2)) totalPoints += 5;
  if (utilModule.IsPurchasedPassiveUpgrade(1)) totalPoints *= 1.25;
  if (utilModule.IsPurchasedPassiveUpgrade(3)) totalPoints *= 1.5;
  if (utilModule.HasCard(3))
    totalPoints *=
      1 +
      0.1 *
        gameObjects.game.cards.filter(
          (x) => x.name === "10% Passive Points (C)"
        ).length;
  if (utilModule.HasCard(7))
    totalPoints *=
      1 +
      0.25 *
        gameObjects.game.cards.filter(
          (x) => x.name === "25% Passive Points (UC)"
        ).length;
  if (utilModule.HasCard(14))
    totalPoints *=
      1 +
      0.5 *
        gameObjects.game.cards.filter(
          (x) => x.name === "50% Passive Points (E)"
        ).length;
  if (utilModule.HasCard(20))
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
    BuyGenerator(1);
  });

const PPGenerator = document.querySelector("#PassivePointsGenerator1");

if (PPGenerator)
  PPGenerator.addEventListener("click", (e) => {
    BuyGenerator(2);
  });

const PPGenerator2 = document.querySelector("#PassivePointsGenerator2");

if (PPGenerator2)
  PPGenerator2.addEventListener("click", (e) => {
    BuyGenerator(3);
  });

const PPGenerator3 = document.querySelector("#PassivePointsGenerator3");

if (PPGenerator3)
  PPGenerator3.addEventListener("click", (e) => {
    BuyGenerator(4);
  });

const PPGenerator4 = document.querySelector("#PassivePointsGenerator4");

if (PPGenerator4)
  PPGenerator4.addEventListener("click", (e) => {
    BuyGenerator(5);
  });

const PPGenerator5 = document.querySelector("#PassivePointsGenerator5");

if (PPGenerator5)
  PPGenerator5.addEventListener("click", (e) => {
    BuyGenerator(6);
  });

const PPGenerator6 = document.querySelector("#PassivePointsGenerator6");

if (PPGenerator6)
  PPGenerator6.addEventListener("click", (e) => {
    BuyGenerator(7);
  });

const GeneratorButton = document.querySelector("#GeneratorButton");

if (GeneratorButton)
  GeneratorButton.addEventListener("click", (e) => {
    BuyGeneratorTier();
  });

export function SetGenerators() {
  const portableGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 1
  );
  if (basicGenerator) {
    basicGenerator.textContent = `${translator.t('passiveFirstGenerator')} ${
      portableGenerator ? portableGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${
      portableGenerator ? portableGenerator.amountBought : 0
    }) | ${translator.t('cost')}: ${
      portableGenerator ? portableGenerator.cost.toFixed(2) : 5
    } ${translator.t('passiveCurrency1')}`;
  }
  const smallGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 2
  );
  if (PPGenerator)
    PPGenerator.textContent = `${translator.t('passiveSecondGenerator')} ${
      smallGenerator ? smallGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${smallGenerator ? smallGenerator.amountBought : 0}) | ${translator.t('cost')}: ${
      smallGenerator ? smallGenerator.cost.toFixed(2) : 6
    } ${translator.t('passiveCurrency2')}`;
  const mediumsizedGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 3
  );
  if (PPGenerator2)
    PPGenerator2.textContent = `${translator.t('passiveThirdGenerator')} ${
      mediumsizedGenerator ? mediumsizedGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${
      mediumsizedGenerator ? mediumsizedGenerator.amountBought : 0
    }) | ${translator.t('cost')}: ${
      mediumsizedGenerator ? mediumsizedGenerator.cost.toFixed(2) : 9
    } ${translator.t('passiveCurrency3')}`;
  const ampleGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 4
  );
  if (PPGenerator3)
    PPGenerator3.textContent = `${translator.t('passiveFourthGenerator')} ${
      ampleGenerator ? ampleGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${ampleGenerator ? ampleGenerator.amountBought : 0}) | ${translator.t('cost')}: ${
      ampleGenerator ? ampleGenerator.cost.toFixed(2) : 12
    } ${translator.t('passiveCurrency4')}`;
  const substantialGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 5
  );
  if (PPGenerator4)
    PPGenerator4.textContent = `${translator.t('passiveFifthGenerator')} ${
      substantialGenerator ? substantialGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${
      substantialGenerator ? substantialGenerator.amountBought : 0
    }) | ${translator.t('cost')}: ${
      substantialGenerator ? substantialGenerator.cost.toFixed(2) : 15
    } ${translator.t('passiveCurrency5')}`;
  const reasonableGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 6
  );
  if (PPGenerator5)
    PPGenerator5.textContent = `${translator.t('passiveSixthGenerator')} ${
      reasonableGenerator ? reasonableGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${
      reasonableGenerator ? reasonableGenerator.amountBought : 0
    }) | ${translator.t('cost')}: ${
      reasonableGenerator ? reasonableGenerator.cost.toFixed(2) : 18
    } ${translator.t('passiveCurrency6')}`;
  const largeGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == 7
  );
  if (PPGenerator6)
    PPGenerator6.textContent = `${translator.t('passiveSeventhGenerator')} ${
      largeGenerator ? largeGenerator.amountGained.toFixed(2) : 0
    } (${translator.t('bought')}: ${largeGenerator ? largeGenerator.amountBought : 0}) | ${translator.t('cost')}: ${
      largeGenerator ? largeGenerator.cost.toFixed(2) : 21
    } ${translator.t('passiveCurrency7')}`;
  if (GeneratorButton)
    GeneratorButton.textContent = `${translator.t('tierCurrency')} | ${translator.t('cost')} ${
      generators.find(
        (x) => x.id == gameObjects.game.passiveGenerators.length + 1
      )!.cost
    } ${translator.t('tierCurrencyAddition')}`;
}

function BuyGenerator(generatorNumber: number) {
  const yourGenerator = gameObjects.game.passiveGenerators.find(
    (x) => x.id == generatorNumber
  );
  if (!yourGenerator) return;
  if (generatorNumber == 1) {
    if (gameObjects.game.passivePoints >= yourGenerator.cost) {
      gameObjects.game.passivePoints -= yourGenerator.cost;
      yourGenerator.amountBought++;
      yourGenerator.amountGained++;
      yourGenerator.cost =
        yourGenerator.cost *
        (yourGenerator.amountBought + 1) **
          Math.log10(yourGenerator.amountBought + 1);
    }
  } else {
    if (
      gameObjects.game.passiveGenerators.find((x) => x.id == generatorNumber - 1)!
        .amountGained >= yourGenerator.cost
    ) {
      gameObjects.game.passiveGenerators.find(
        (x) => x.id == generatorNumber - 1
      )!.amountGained -= yourGenerator.cost;
      yourGenerator.amountBought++;
      yourGenerator.amountGained++;
      yourGenerator.cost =
        yourGenerator.cost *
        (yourGenerator.amountBought + 1) **
          Math.log10(yourGenerator.amountBought + 1);
    }
  }
}

function BuyGeneratorTier() {
  const generatorToBuy = generators.find(
    (x) => x.id == gameObjects.game.passiveGenerators.length + 1
  );
  if (!generatorToBuy) return;
  if (
    gameObjects.game.passiveGenerators.find(
      (x) => x.id == generatorToBuy.id - 1
    )!.amountGained >= generatorToBuy.cost
  ) {
    gameObjects.game.passiveGenerators.find(
      (x) => x.id == generatorToBuy.id - 1
    )!.amountGained -= generatorToBuy.cost;
    gameObjects.game.passiveGenerators.push(generatorToBuy);
    gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)!
      .amountBought++;
    gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)!
      .amountGained++;

    const generator = document.querySelector(
      `#PassivePointsGenerator${generatorToBuy.id - 1}`
    );
    if (generator && generator instanceof HTMLElement)
      generator.style.display = "block";
  }
}

export function CalculatePassiveGenerators() {
  if(gameObjects.game.passiveGenerators.length == 1) return;
  for (
    let index = 2;
    index <= gameObjects.game.passiveGenerators.length;
    index++
  ) {
    if (utilModule.IsPurchasedPassiveUpgrade(6)) {
      gameObjects.game.passiveGenerators.find(
        (x) => x.id == index - 1
      )!.amountGained +=
        gameObjects.game.passiveGenerators.find((x) => x.id == index)!
          .amountGained *
        gameObjects.game.passiveGenerators.reduce(
          (acc, val) => acc + val.amountBought,
          0
        );
    } else {
      gameObjects.game.passiveGenerators.find(
        (x) => x.id == index - 1
      )!.amountGained += gameObjects.game.passiveGenerators.find(
        (x) => x.id == index
      )!.amountGained;
    }
  }
}
