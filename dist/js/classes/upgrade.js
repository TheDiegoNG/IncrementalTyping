export class Upgrade {
    constructor(upgradeName, upgradeDesc, upgradeCost, upgradeNumber) {
        this.name = upgradeName;
        this.description = upgradeDesc;
        this.amountBought = 0;
        this.cost = upgradeCost;
        this.id = upgradeNumber;
    }
}
