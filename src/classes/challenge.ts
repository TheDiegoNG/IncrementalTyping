export class Challenge {
  name: string;
  onChallenge: boolean;
  objective: number;
  amount: number;
  restriction: number;
  id: number;

  constructor(
    challengeName: string,
    challengeObjective: number,
    challengeRestriction: number,
    challengeNumber: number
  ) {
    this.name = challengeName;
    this.onChallenge = false;
    this.objective = challengeObjective;
    this.amount = 0;
    this.restriction = challengeRestriction;
    this.id = challengeNumber;
  }
}
