export class Upgrade {
  name: string;
  amountBought: number;
  cost: number;

  constructor(upgradeName: string, upgradeCost: number) {
    this.name = upgradeName;
    this.amountBought = 0;
    this.cost = upgradeCost;
  }
}
