export class Card {
  name: string;
  description: string;
  type: string;
  bonusType: string;
  bonusAmount: number;

  constructor(
    cardName: string,
    cardDesc: string,
    cardType: string,
    bonusType: string,
    bonusAmount: number
  ) {
    this.name = cardName;
    this.description = cardDesc;
    this.type = cardType;
    this.bonusType = bonusType;
    this.bonusAmount = bonusAmount;
  }
}
