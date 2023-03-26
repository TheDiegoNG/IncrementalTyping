class Game {
    constructor(pointsAmount) {
        this.points = pointsAmount;
        this.allTimePoints = pointsAmount;
        this.upgrades = [];
        this.maxLength = 4;
        this.bestWord = "";
        this.multiUpgrades = [];
        this.achievements = [];
        this.wordsAmount = 0;
        this.passiveGenerators = [];
        this.passiveUpgrades = [];
        this.passiveLength = 4;
        this.passivePoints = 0;
        this.passiveRate = 1000;
        this.cards = [];
        this.cardCost = 0;
        this.rollsAmount = 10;
        this.challenges = [];
        this.isInChallenge = false;
        this.challengesAmount = 0;
        this.letterCounter = 0;
        this.prestigePoints = 0;
        this.prestigeCount = 0;
        this.prestigeUpgrades = [];
    }
}
let game = new Game(0);
let challengeGame = new Game(0);
let activeGame = new Game(0);
export const gameObjects = {
    game,
    challengeGame,
    activeGame,
};
