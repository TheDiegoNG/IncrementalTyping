var cards = [ 
    {name: "Faster Progress", description: "+25% Points"},
    {name: "Fasterer Progress", description: "+50% Points"},
    {name: "All Lowercase", description: "From now on, every word is lowercase"},
    {name: "+4 Points", description: "+4 Points Per Word"},
    {name: "x2 Passive Points", description: "Double Passive Points!"},
    {name: "Faster Passive Words", description: "Generate Passive Words 20% Faster"},
    {name: "Longer Passive Words", description: "+2 Letters Per Passive Word"},
]


function GetCard() {
    if(game.points >= game.cardCost)
    {
        game.points -= game.cardCost
        game.cardCost = 10 ** 6 + game.cards.length;
        var card = cards[Math.floor(Math.random() * cards.length)];
        game.cards.push(card);
        alert(`You got the "${card.name}" card: ${card.description}`);
        var cardText = document.getElementById("cards");
        cardText.textContent += `${card.name} - `;
        if(card.name === "Longer Passive Words") game.passiveLength += 2;
    } 
}