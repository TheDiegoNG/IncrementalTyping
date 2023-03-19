import * as utilModule from "./util.js";
import { gameObjects } from "./game.js";

var commonCards = [
    { name: "Fast+ Progress (C)", description: "+5% Points", type: "Common", bonusType: "PointsPercentage", bonusAmount: 1.05 },
    { name: "+1 Points (C)", description: "+1 Point Per Word", type: "Common", bonusType: "PointsAmount", bonusAmount: 1 },
    { name: "10% Passive Points (C)", description: "10% Passive Points!", type: "Common", bonusType: "PassivePointsPercentage", bonusAmount: 1.1 },
    { name: "+2 Passive Points (C)", description: "+2 Passive Points Per Word!", type: "Common", bonusType: "PassivePointsAmount", bonusAmount: 2 },
]

var uncommonCards = [
    { name: "Faster Progress (UC)", description: "+25% Points", type: "Uncommon", bonusType: "PointsPercentage", bonusAmount: 1.25 },
    { name: "+3 Points (UC)", description: "+3 Points Per Word", type: "Uncommon", bonusType: "PointsAmount", bonusAmount: 3 },
    { name: "25% Passive Points (UC)", description: "25% Passive Points!", type: "Uncommon", bonusType: "PassivePointsPercentage", bonusAmount: 1.25 },
    { name: "+5 Passive Points (UC)", description: "+5 Passive Points Per Word!", type: "Uncommon", bonusType: "PassivePointsAmount", bonusAmount: 5 },
    { name: "Faster Passive Words (UC)", description: "Generate Passive Words 5% Faster", type: "Uncommon", bonusType: "PassivePointsSpeed", bonusAmount: 1.05 },
    { name: "Longer Passive Words (UC)", description: "+1 Letter Per Passive Word", type: "Uncommon", bonusType: "PassivePointsLength", bonusAmount: 1 },
]

var epicCards = [
    { name: "Fasterer Progress (E)", description: "+50% Points", type: "Epic", bonusType: "PointsPercentage", bonusAmount: 1.5 },
    { name: "All Lowercase (E)", description: "From now on, every word is lowercase", type: "Epic", bonusType: "Lowercase", bonusAmount: 0 },
    { name: "+6 Points (E)", description: "+6 Points Per Word", type: "Epic", bonusType: "PointsAmount", bonusAmount: 6 },
    { name: "50% Passive Points (E)", description: "50% Passive Points!", type: "Epic", bonusType: "PassivePointsPercentage", bonusAmount: 1.5 },
    { name: "+10 Passive Points (E)", description: "+10 Passive Points Per Word!", type: "Epic", bonusType: "PassivePointsAmount", bonusAmount: 10 },
    { name: "Fasterer Passive Words (E)", description: "Generate Passive Words 10% Faster", type: "Epic", bonusType: "PassivePointsSpeed", bonusAmount: 1.1 },
    { name: "Longerer Passive Words (E)", description: "+2 Letters Per Passive Word", type: "Epic", bonusType: "PassivePointsLength", bonusAmount: 2 },
]

var legendaryCards = [
    { name: "Fastest Progress (L)", description: "+100% Points", type: "Legendary", bonusType: "PointsPercentage", bonusAmount: 2 },
    { name: "+10 Points (L)", description: "+10 Points Per Word", type: "Legendary", bonusType: "PointsAmount", bonusAmount: 10 },
    { name: "x2 Passive Points (L)", description: "Double Passive Points!", type: "Legendary", bonusType: "PassivePointsPercentage", bonusAmount: 2 },
    { name: "+25 Passive Points (L)", description: "+25 Passive Points Per Word!", type: "Legendary", bonusType: "PassivePointsAmount", bonusAmount: 25 },
    { name: "Fastest Passive Words (L)", description: "Generate Passive Words 20% Faster", type: "Legendary", bonusType: "PassivePointsSpeed", bonusAmount: 1.2 },
    { name: "Longest Passive Words (L)", description: "+5 Letters Per Passive Word", type: "Legendary", bonusType: "PassivePointsLength", bonusAmount: 5 },
]

var viewerCards = document.getElementById("viewerCardsContainer");
var cardsContainer = document.getElementById("cardsContainer");
var overlay = document.getElementById("overlay");

function GetCards() {

    if (gameObjects.game.points >= gameObjects.game.cardCost) {
        gameObjects.game.points -= gameObjects.game.cardCost
        gameObjects.game.cardCost = 100000 * 2 ** (gameObjects.game.cards.length / 10);
        var card;
        for (let index = 0; index < gameObjects.game.rollsAmount; index++) {
            var randomNumber = Math.floor(Math.random() * 100);
            if (randomNumber >= 40) {
                card = GetCommonCard();
            }
            else if (randomNumber >= 10) {
                card = GetUncommonCard();
            }
            else if (randomNumber >= 1) {
                card = GetEpicCard();
            }
            else {
                card = GetLegendaryCard();
            }
            if (card.name == "All Lowercase (E)" && utilModule.HasCard("All Lowercase (E)")) {
                index--
                continue;
            }
            AppendCard(card);
            gameObjects.game.cards.push(card);
            if (card.name === "Longer Passive Words (UC)") gameObjects.game.passiveLength++;
            if (card.name === "Longerer Passive Words (E)") gameObjects.game.passiveLength += 2;
            if (card.name === "Longest Passive Words (L)") gameObjects.game.passiveLength += 5;
            if (card.name === "Faster Passive Words (UC)") gameObjects.game.passiveRate -= gameObjects.game.passiveRate * 5 / 100;
            if (card.name === "Fasterer Passive Words (E)") gameObjects.game.passiveRate -= gameObjects.game.passiveRate * 10 / 100;
            if (card.name === "Fastest Passive Words (L)") gameObjects.game.passiveRate -= gameObjects.game.passiveRate * 20 / 100;
        }
        viewerCards.classList.add("viewerActive");
        overlay.classList.add("show");
        light.classList.add("show");
    }


}

function AppendCard(cardData) {
    const card = document.createElement("div");
    card.classList.add("singleCard");

    switch (cardData.type) {
        case "Common":
            card.classList.add("commonCard");
            break;
        case "Uncommon":
            card.classList.add("uncommonCard");
            break;
        case "Epic":
            card.classList.add("epicCard");
            break;
        case "Legendary":
            card.classList.add("legendaryCard");
            break;

        default:
            break;
    }

    card.textContent = cardData.description;
    viewerCards.appendChild(card);
}

function HideViewer() {
    viewerCards.classList.remove("viewerActive");
    overlay.classList.remove("show");
    light.classList.remove("show");

    const cards = viewerCards.querySelectorAll("*")
    cards.forEach(x => {
        const card = document.createElement("div");
        x.classList.forEach(y => {
            card.classList.add(y);
        });
        card.classList.remove("singleCard");
        card.classList.add("normalCard");
        card.textContent = x.textContent;
        cardsContainer.appendChild(card);
    });

    while (viewerCards.firstChild) {
        viewerCards.removeChild(viewerCards.firstChild);
    }
}

export function CalculateBonus() {
    var bonusPercentage = 1;
    var bonusPointAmount = 0;
    var bonusPassivePercentage = 1;
    var bonusPassiveAmount = 0;
    var bonusPassiveSpeed = 1;
    var bonusPassiveLength = 0;
    var extraBonus = "";
    gameObjects.game.cards.forEach(x => {
        switch (x.bonusType) {
            case "PointsPercentage":
                bonusPercentage *= x.bonusAmount;
                break;
            case "PointsAmount":
                bonusPointAmount += x.bonusAmount;
                break;
            case "PassivePointsPercentage":
                bonusPassivePercentage *= x.bonusAmount;
                break;
            case "PassivePointsAmount":
                bonusPassiveAmount += x.bonusAmount;
                break;
            case "PassivePointsSpeed":
                bonusPassiveSpeed *= x.bonusAmount;
                break;
            case "PassivePointsLength":
                bonusPassiveLength += x.bonusAmount;
                break;
            case "Lowercase":
                extraBonus += "- All Lowercase"
                break;
            default:
                break;
        }
    });

    document.getElementById("cardBonus").textContent = `You have x${bonusPercentage.toFixed(2)} + ${bonusPointAmount} bonus Points,
     x${bonusPassivePercentage.toFixed(2)} + ${bonusPassiveAmount} bonus Passive Points, x${bonusPassiveSpeed.toFixed(2)} faster and ${bonusPassiveLength} letter/s longer Passive Words ${extraBonus}`

}

var GetCommonCard = () => commonCards[Math.floor(Math.random() * commonCards.length)];

var GetUncommonCard = () => uncommonCards[Math.floor(Math.random() * uncommonCards.length)];

var GetEpicCard = () => epicCards[Math.floor(Math.random() * epicCards.length)];

var GetLegendaryCard = () => legendaryCards[Math.floor(Math.random() * legendaryCards.length)];