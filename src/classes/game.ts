import { Achievement } from "./achievement.js";
import { Card } from "./card.js";
import { Challenge } from "./challenge.js";
import { Generator } from "./generator.js";
import { Upgrade } from "./upgrade.js";

class Game {
  points: number;
  allTimePoints: number;
  upgrades: Upgrade[];
  maxLength: number;
  bestWord: string;
  multiUpgrades: Upgrade[];
  achievements: Achievement[];
  wordsAmount: number;
  passiveGenerators: Generator[];
  passiveUpgrades: Upgrade[];
  passiveLength: number;
  passivePoints: number;
  passiveRate: number;
  cards: Card[];
  cardCost: number;
  rollsAmount: number;
  challenges: Challenge[];
  isInChallenge: boolean;
  challengesAmount: number;
  letterCounter: number;
  prestigePoints: number;
  prestigeCount: number;
  prestigeUpgrades: Upgrade[];

  constructor(pointsAmount: number) {
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

let game = new Game(1000000000000000000000);
let challengeGame = new Game(0);
let activeGame = new Game(0);

export const gameObjects = {
  game,
  challengeGame,
  activeGame,
};
