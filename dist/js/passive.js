import { gameObjects } from "./classes/game.js";
import * as utilModule from "./util.js";
import * as activeModule from "./active.js";
import { Generator } from "./classes/generator.js";
const generators = [];
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
    const portableGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Portable Generator");
    if (!portableGenerator)
        return;
    var passiveWord = GetRandomString(gameObjects.game.passiveLength);
    if (passivePointsWord)
        passivePointsWord.textContent = passiveWord;
    var points = GetPassivePoints(passiveWord);
    points *= portableGenerator.amountGained;
    if (utilModule.IsPurchasedUpgrade(3))
        gameObjects.game.passivePoints += points;
}
setInterval(createWord, gameObjects.game.passiveRate);
function GetPassivePoints(passiveWord) {
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
    if (utilModule.IsPurchasedPassiveUpgrade(1))
        totalPoints += 5;
    if (utilModule.IsPurchasedPassiveUpgrade(0))
        totalPoints *= 1.25;
    if (utilModule.IsPurchasedPassiveUpgrade(2))
        totalPoints *= 1.5;
    if (utilModule.HasCard("10% Passive Points (C)"))
        totalPoints *=
            1 +
                0.1 *
                    gameObjects.game.cards.filter((x) => x.name === "10% Passive Points (C)").length;
    if (utilModule.HasCard("25% Passive Points (UC)"))
        totalPoints *=
            1 +
                0.25 *
                    gameObjects.game.cards.filter((x) => x.name === "25% Passive Points (UC)").length;
    if (utilModule.HasCard("50% Passive Points (E)"))
        totalPoints *=
            1 +
                0.5 *
                    gameObjects.game.cards.filter((x) => x.name === "50% Passive Points (E)").length;
    if (utilModule.HasCard("x2 Passive Points (L)"))
        totalPoints *=
            1 +
                1 *
                    gameObjects.game.cards.filter((x) => x.name === "x2 Passive Points (L)")
                        .length;
    return totalPoints;
}
function GetRandomString(lettersAmount) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < lettersAmount; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
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
    const portableGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Portable Generator");
    if (basicGenerator)
        basicGenerator.textContent = `Generate Passive Points! | Generators: ${portableGenerator ? portableGenerator.amountGained.toFixed(2) : 0} (Bought: ${portableGenerator ? portableGenerator.amountBought : 0}) | Cost: ${portableGenerator ? portableGenerator.cost.toFixed(2) : 5} Passive Points`;
    const smallGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Small Generator");
    if (PPGenerator)
        PPGenerator.textContent = `Generate the First Generator | Generators: ${smallGenerator ? smallGenerator.amountGained.toFixed(2) : 0} (Bought: ${smallGenerator ? smallGenerator.amountBought : 0}) | Cost: ${smallGenerator ? smallGenerator.cost.toFixed(2) : 6} 1st Generators`;
    const mediumsizedGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Medium-sized Generator");
    if (PPGenerator2)
        PPGenerator2.textContent = `Generate the Second Generator | Generators: ${mediumsizedGenerator ? mediumsizedGenerator.amountGained.toFixed(2) : 0} (Bought: ${mediumsizedGenerator ? mediumsizedGenerator.amountBought : 0}) | Cost: ${mediumsizedGenerator ? mediumsizedGenerator.cost.toFixed(2) : 9} 2nd Generators`;
    const ampleGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Ample Generator");
    if (PPGenerator3)
        PPGenerator3.textContent = `Generate the Third Generator | Generators: ${ampleGenerator ? ampleGenerator.amountGained.toFixed(2) : 0} (Bought: ${ampleGenerator ? ampleGenerator.amountBought : 0}) | Cost: ${ampleGenerator ? ampleGenerator.cost.toFixed(2) : 12} 3rd Generators`;
    const substantialGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Substantial Generator");
    if (PPGenerator4)
        PPGenerator4.textContent = `Generate the Fourth Generator | Generators: ${substantialGenerator ? substantialGenerator.amountGained.toFixed(2) : 0} (Bought: ${substantialGenerator ? substantialGenerator.amountBought : 0}) | Cost: ${substantialGenerator ? substantialGenerator.cost.toFixed(2) : 15} 4th Generators`;
    const reasonableGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Reasonable Generator");
    if (PPGenerator5)
        PPGenerator5.textContent = `Generate the Fifth Generator | Generators: ${reasonableGenerator ? reasonableGenerator.amountGained.toFixed(2) : 0} (Bought: ${reasonableGenerator ? reasonableGenerator.amountBought : 0}) | Cost: ${reasonableGenerator ? reasonableGenerator.cost.toFixed(2) : 18} 5th Generators`;
    const largeGenerator = gameObjects.game.passiveGenerators.find((x) => x.name == "Large Generator");
    if (PPGenerator6)
        PPGenerator6.textContent = `Generate the Sixth Generator | Generators: ${largeGenerator ? largeGenerator.amountGained.toFixed(2) : 0} (Bought: ${largeGenerator ? largeGenerator.amountBought : 0}) | Cost: ${largeGenerator ? largeGenerator.cost.toFixed(2) : 21} 6th Generators`;
    if (GeneratorButton)
        GeneratorButton.textContent = `Buy the next Tier of Generators! | Cost ${generators.find((x) => x.id == gameObjects.game.passiveGenerators.length + 1).cost} Previous Tier Generators!`;
}
function BuyGenerator(generatorNumber) {
    const yourGenerator = gameObjects.game.passiveGenerators.find((x) => x.id == generatorNumber);
    const generator = generators.find((x) => x.id == generatorNumber);
    if (!generator || !yourGenerator)
        return;
    if (generatorNumber == 0 &&
        gameObjects.game.passivePoints >= yourGenerator.cost) {
        gameObjects.game.passivePoints -= yourGenerator.cost;
        yourGenerator.amountBought++;
        yourGenerator.amountGained++;
        yourGenerator.cost =
            yourGenerator.cost *
                Math.pow((yourGenerator.amountBought + 1), Math.log10(yourGenerator.amountBought + 1));
    }
    if (gameObjects.game.passiveGenerators.find((x) => x.id == generatorNumber - 1)
        .amountGained >= yourGenerator.amountGained) {
        gameObjects.game.passiveGenerators.find((x) => x.id == generatorNumber - 1).amountGained -= yourGenerator.cost;
        yourGenerator.amountBought++;
        yourGenerator.amountGained++;
        yourGenerator.cost =
            yourGenerator.cost *
                Math.pow((yourGenerator.amountBought + 1), Math.log10(yourGenerator.amountBought + 1));
    }
}
function BuyGeneratorTier() {
    const generatorToBuy = generators.find((x) => x.id == gameObjects.game.passiveGenerators.length + 1);
    if (!generatorToBuy)
        return;
    if (gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id - 1).amountGained >= generatorToBuy.cost) {
        gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id - 1).amountGained -= generatorToBuy.cost;
        gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)
            .amountBought++;
        gameObjects.game.passiveGenerators.find((x) => x.id == generatorToBuy.id)
            .amountGained++;
        const generator = document.querySelector(`#PassivePointsGenerator${generatorToBuy.id}`);
        if (generator && generator instanceof HTMLElement)
            generator.style.display = "block";
    }
}
export function CalculatePassiveGenerators() {
    for (let index = 1; index < gameObjects.game.passiveGenerators.length; index++) {
        if (utilModule.IsPurchasedPassiveUpgrade(5)) {
            gameObjects.game.passiveGenerators.find((x) => x.id == index - 1).amountGained +=
                gameObjects.game.passiveGenerators.find((x) => x.id == index)
                    .amountGained *
                    gameObjects.game.passiveGenerators.reduce((acc, val) => acc + val.amountBought, 0);
        }
        else {
            gameObjects.game.passiveGenerators.find((x) => x.id == index - 1).amountGained += gameObjects.game.passiveGenerators.find((x) => x.id == index).amountGained;
        }
    }
}
