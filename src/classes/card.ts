export class Card {
  name: string;
  description: string;
  type: CardType;
  bonusType: BonusType;
  bonusAmount: number;

  constructor(
    cardName: string,
    cardDesc: string,
    cardType: CardType,
    bonusType: BonusType,
    bonusAmount: number
  ) {
    this.name = cardName;
    this.description = cardDesc;
    this.type = cardType;
    this.bonusType = bonusType;
    this.bonusAmount = bonusAmount;
  }
}

type BonusType =
  | "PointsPercentage"
  | "PointsAmount"
  | "PassivePointsPercentage"
  | "PassivePointsAmount"
  | "PassivePointsSpeed"
  | "PassivePointsLength"
  | "Lowercase";
  

type CardType = "Common" | "Uncommon" | "Epic" | "Legendary";
