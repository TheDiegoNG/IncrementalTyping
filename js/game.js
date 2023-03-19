
class Game {
    constructor() {
        this.points = 1000000000000000000000;
        this.allTimePoints = 1000000000000000;
        this.upgrades = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [50, 200, 500, 1500, 2500, 6000, 10000, 40000, 100000, 200000, 5000000, 10000000]];
        this.maxLength = 4;
        this.bestWord = "";
        this.multiUpgrades = [[0, 0, 0],
        [50, 100, 500]];
        this.achievements = [];
        this.wordsAmount = 0;
        this.passiveGenerators = [[1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [5, 6, 9, 12, 15, 18, 21]];
        this.passiveUpgrades = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [100, 250, 500, 1000, 0, 0, 0, 0, 0, 0]];
        this.passiveLength = 4
        this.passivePoints = 0;
        this.passiveRate = 1000;
        this.cards = [];
        this.cardCost = 0;
        this.rollsAmount = 10;
        this.challenges = [{ OnChallenge: 0, Objective: 20, Amount: 0, Restriction: 210 },
            { OnChallenge: 0, Objective: 50, Amount: 0, Restriction: 210 }];
        this.isInChallenge = false;
        this.challengesAmount = 0;
        this.letterCounter = 0;
        this.prestigePoints = 0;
        this.prestigeCount = 0;
        this.prestigeUpgrades = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [10, 50, 100, 500, 0, 0, 0, 0, 0, 0]];
    }
}

 let game = new Game();
 let challengeGame = new Game();
 let activeGame = new Game();

 export const gameObjects = {
    game,
    challengeGame,
    activeGame,
  };