export class Generator {
  name: string;
  amountBought: number;
  amountGained: number;
  cost: number;

  constructor(achievementName: string, upgradeCost: number) {
    this.name = achievementName;
    this.amountBought = 0;
    this.amountGained = 0;
    this.cost = upgradeCost;
  }
}
