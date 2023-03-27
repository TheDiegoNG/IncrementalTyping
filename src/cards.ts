import * as utilModule from "./util";
import { gameObjects } from "./classes/game";
import { Card } from "./classes/card";

export const commonCards: Card[] = [];

commonCards.push(
  new Card(
    "Fast+ Progress (C)",
    "+5% Points",
    "Common",
    "PointsPercentage",
    1.05, 1
  )
);
commonCards.push(
  new Card("+1 Points (C)", "+1 Point Per Word", "Common", "PointsAmount", 1, 2)
);
commonCards.push(
  new Card(
    "10% Passive Points (C)",
    "10% Passive Points!",
    "Common",
    "PassivePointsPercentage",
    1.1, 3
  )
);
commonCards.push(
  new Card(
    "+2 Passive Points (C)",
    "+2 Passive Points Per Word!",
    "Common",
    "PassivePointsAmount",
    2, 4
  )
);

export const uncommonCards: Card[] = [];

uncommonCards.push(
  new Card(
    "Faster Progress (UC)",
    "+25% Points",
    "Uncommon",
    "PointsPercentage",
    1.25, 5
  )
);
uncommonCards.push(
  new Card(
    "+3 Points (UC)",
    "+3 Points Per Word",
    "Uncommon",
    "PointsAmount",
    3, 6
  )
);
uncommonCards.push(
  new Card(
    "25% Passive Points (UC)",
    "25% Passive Points!",
    "Uncommon",
    "PassivePointsPercentage",
    1.25, 7
  )
);
uncommonCards.push(
  new Card(
    "+5 Passive Points (UC)",
    "+5 Passive Points Per Word!",
    "Uncommon",
    "PassivePointsAmount",
    5, 8
  )
);
uncommonCards.push(
  new Card(
    "Faster Passive Words (UC)",
    "Generate Passive Words 5% Faster",
    "Uncommon",
    "PassivePointsSpeed",
    1.05, 9
  )
);
uncommonCards.push(
  new Card(
    "Longer Passive Words (UC)",
    "+1 Letter Per Passive Word",
    "Uncommon",
    "PassivePointsLength",
    1, 10
  )
);

export const epicCards: Card[] = [];

epicCards.push(
  new Card(
    "Fasterer Progress (E)",
    "+50% Points",
    "Epic",
    "PointsPercentage",
    1.5, 11
  )
);
epicCards.push(
  new Card(
    "All Lowercase (E)",
    "From now on, every word is lowercase",
    "Epic",
    "Lowercase",
    0, 12
  )
);
epicCards.push(
  new Card("+6 Points (E)", "+6 Points Per Word", "Epic", "PointsAmount", 6, 13)
);
epicCards.push(
  new Card(
    "50% Passive Points (E)",
    "50% Passive Points!",
    "Epic",
    "PassivePointsPercentage",
    1.5, 14
  )
);
epicCards.push(
  new Card(
    "+10 Passive Points (E)",
    "+10 Passive Points Per Word!",
    "Epic",
    "PassivePointsAmount",
    10, 15
  )
);
epicCards.push(
  new Card(
    "Fasterer Passive Words (E)",
    "Generate Passive Words 10% Faster",
    "Epic",
    "PassivePointsSpeed",
    1.1, 16
  )
);
epicCards.push(
  new Card(
    "Longerer Passive Words (E)",
    "+2 Letters Per Passive Word",
    "Epic",
    "PassivePointsLength",
    2, 17
  )
);

export const legendaryCards: Card[] = [];

legendaryCards.push(
  new Card(
    "Fastest Progress (L)",
    "+100% Points",
    "Legendary",
    "PointsPercentage",
    2, 18
  )
);
legendaryCards.push(
  new Card(
    "+10 Points (L)",
    "+10 Points Per Word",
    "Legendary",
    "PointsAmount",
    10, 19
  )
);
legendaryCards.push(
  new Card(
    "x2 Passive Points (L)",
    "Double Passive Points!",
    "Legendary",
    "PassivePointsPercentage",
    2, 20
  )
);
legendaryCards.push(
  new Card(
    "+25 Passive Points (L)",
    "+25 Passive Points Per Word!",
    "Legendary",
    "PassivePointsAmount",
    25, 21
  )
);
legendaryCards.push(
  new Card(
    "Fastest Passive Words (L)",
    "Generate Passive Words 20% Faster",
    "Legendary",
    "PassivePointsSpeed",
    1.2, 22
  )
);
legendaryCards.push(
  new Card(
    "Longest Passive Words (L)",
    "+5 Letters Per Passive Word",
    "Legendary",
    "PassivePointsLength",
    5, 23
  )
);

const viewerCards = document.querySelector("#viewerCardsContainer");
const cardsContainer = document.querySelector("#cardsContainer");
const overlay = document.querySelector("#overlay");
const light = document.querySelector("#light");

var cardsHeaderContainer = document.querySelector("#cardsHeaderContainer");

if (cardsHeaderContainer) {
  cardsHeaderContainer.addEventListener("click", (e) => {
    GetCards();
  });
}

function GetCards() {
  if (gameObjects.game.points >= gameObjects.game.cardCost) {
    gameObjects.game.points -= gameObjects.game.cardCost;
    gameObjects.game.cardCost =
      100000 * 2 ** (gameObjects.game.cards.length / 10);
    var card;
    for (let index = 0; index < gameObjects.game.rollsAmount; index++) {
      var randomNumber = Math.floor(Math.random() * 100);
      if (randomNumber >= 40) {
        card = GetCommonCard();
      } else if (randomNumber >= 10) {
        card = GetUncommonCard();
      } else if (randomNumber >= 1) {
        card = GetEpicCard();
      } else {
        card = GetLegendaryCard();
      }
      if (
        card.id == 12 &&
        utilModule.HasCard("All Lowercase (E)")
      ) {
        index--;
        continue;
      }
      AppendCard(card);
      gameObjects.game.cards.push(card);
      if (card.id == 10)
        gameObjects.game.passiveLength++;
      if (card.id == 17)
        gameObjects.game.passiveLength += 2;
      if (card.id == 23)
        gameObjects.game.passiveLength += 5;
      if (card.id == 9)
        gameObjects.game.passiveRate -=
          (gameObjects.game.passiveRate * 5) / 100;
      if (card.id == 16)
        gameObjects.game.passiveRate -=
          (gameObjects.game.passiveRate * 10) / 100;
      if (card.id == 22)
        gameObjects.game.passiveRate -=
          (gameObjects.game.passiveRate * 20) / 100;
    }
    if (viewerCards) viewerCards.classList.add("viewerActive");
    if (overlay) overlay.classList.add("show");
    if (light) light.classList.add("show");
  }
}

function AppendCard(cardData: Card) {
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
  if (viewerCards) viewerCards.appendChild(card);
}

if (viewerCards) {
  viewerCards.addEventListener("click", (e) => {
    viewerCards.classList.remove("viewerActive");
    if (overlay) overlay.classList.remove("show");
    if (light) light.classList.remove("show");

    const cards = viewerCards.querySelectorAll("*");
    cards.forEach((x) => {
      const card = document.createElement("div");
      x.classList.forEach((y) => {
        card.classList.add(y);
      });
      card.classList.remove("singleCard");
      card.classList.add("normalCard");
      card.textContent = x.textContent;
      if (cardsContainer) cardsContainer.appendChild(card);
    });

    while (viewerCards.firstChild) {
      viewerCards.removeChild(viewerCards.firstChild);
    }
  });
}

export function CalculateBonus() {
  var bonusPercentage = 1;
  var bonusPointAmount = 0;
  var bonusPassivePercentage = 1;
  var bonusPassiveAmount = 0;
  var bonusPassiveSpeed = 1;
  var bonusPassiveLength = 0;
  var extraBonus = "";
  gameObjects.game.cards.forEach((x) => {
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
        extraBonus += "- All Lowercase";
        break;
      default:
        break;
    }
  });

  const cardBonus = document.querySelector("#cardBonus");
  if (cardBonus)
    cardBonus.textContent = `You have x${bonusPercentage.toFixed(
      2
    )} + ${bonusPointAmount} bonus Points,
    x${bonusPassivePercentage.toFixed(
      2
    )} + ${bonusPassiveAmount} bonus Passive Points, x${bonusPassiveSpeed.toFixed(
      2
    )} faster and ${bonusPassiveLength} letter/s longer Passive Words ${extraBonus}`;
}

var GetCommonCard = () =>
  commonCards[Math.floor(Math.random() * commonCards.length)];

var GetUncommonCard = () =>
  uncommonCards[Math.floor(Math.random() * uncommonCards.length)];

var GetEpicCard = () => epicCards[Math.floor(Math.random() * epicCards.length)];

var GetLegendaryCard = () =>
  legendaryCards[Math.floor(Math.random() * legendaryCards.length)];
