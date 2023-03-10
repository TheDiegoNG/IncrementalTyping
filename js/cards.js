var commonCards = [ 
    {name: "Fast+ Progress (C)", description: "+5% Points"},
    {name: "+1 Points (C)", description: "+1 Point Per Word"},
    {name: "10% Passive Points (C)", description: "10% Passive Points!"},
    {name: "+2 Passive Points (C)", description: "+2 Passive Points Per Word!"},
]

var uncommonCards = [ 
    {name: "Faster Progress (UC)", description: "+25% Points"},
    {name: "+3 Points (UC)", description: "+3 Points Per Word"},
    {name: "25% Passive Points (UC)", description: "25% Passive Points!"},
    {name: "+5 Passive Points (UC)", description: "+5 Passive Points Per Word!"},
    {name: "Faster Passive Words (UC)", description: "Generate Passive Words 5% Faster"},
    {name: "Longer Passive Words (UC)", description: "+1 Letter Per Passive Word"},
]

var epicCards = [ 
    {name: "Fasterer Progress (E)", description: "+50% Points"},
    {name: "All Lowercase (E)", description: "From now on, every word is lowercase"},
    {name: "+6 Points (E)", description: "+6 Points Per Word"},
    {name: "50% Passive Points (E)", description: "50% Passive Points!"},
    {name: "+10 Passive Points (E)", description: "+10 Passive Points Per Word!"},
    {name: "Fasterer Passive Words (E)", description: "Generate Passive Words 10% Faster"},
    {name: "Longerer Passive Words (E)", description: "+2 Letters Per Passive Word"},
]

var legendaryCards = [ 
    {name: "Fastest Progress (L)", description: "+100% Points"},
    {name: "+10 Points (L)", description: "+10 Points Per Word"},
    {name: "x2 Passive Points (L)", description: "Double Passive Points!"},
    {name: "+25 Passive Points (L)", description: "+25 Passive Points Per Word!"},
    {name: "Fastest Passive Words (L)", description: "Generate Passive Words 20% Faster"},
    {name: "Longest Passive Words (L)", description: "+5 Letters Per Passive Word"},
]

var viewerCards = document.getElementById("viewerCardsContainer");
var overlay = document.getElementById("overlay");

function GetCards() {
    viewerCards.classList.add("viewerActive");
    overlay.classList.add("show");
    light.classList.add("show");

    if(game.points >= game.cardCost)
    {
        game.points -= game.cardCost
        game.cardCost = 100000 * 2 ** (game.cards.length / 10);
        var card;
        for (let index = 0; index < game.rollsAmount; index++) {
            var randomNumber = Math.floor(Math.random() * 100);
            if(randomNumber >= 40) card = GetCommonCard();
            else if(randomNumber >= 10) card = GetUncommonCard();
            else if(randomNumber >= 1) card = GetEpicCard();
            else card = GetLegendaryCard();
            game.cards.push(card);
            // alert(`You got the "${card.name}" card: ${card.description}`);
            if(card.name === "Longer Passive Words (UC)") game.passiveLength ++;
            if(card.name === "Longerer Passive Words (E)") game.passiveLength += 2;
            if(card.name === "Longest Passive Words (L)") game.passiveLength += 5;
            if(card.name === "Faster Passive Words (UC)") game.passiveRate -= game.passiveRate * 5 / 100;
            if(card.name === "Fasterer Passive Words (E)") game.passiveRate -= game.passiveRate * 10 / 100;
            if(card.name === "Fastest Passive Words (L)") game.passiveRate -= game.passiveRate * 20 / 100;
        }
        
    } 
}

function HideViewer() {
    viewerCards.classList.remove("viewerActive");
    overlay.classList.remove("show");
    light.classList.remove("show");
}

var GetCommonCard = () => commonCards[Math.floor(Math.random() * commonCards.length)];

var GetUncommonCard = () => uncommonCards[Math.floor(Math.random() * uncommonCards.length)];

var GetEpicCard = () => epicCards[Math.floor(Math.random() * epicCards.length)];

var GetLegendaryCard = () => legendaryCards[Math.floor(Math.random() * legendaryCards.length)];