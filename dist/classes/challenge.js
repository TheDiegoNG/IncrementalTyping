export class Challenge {
    constructor(challengeName, challengeObjective, challengeRestriction) {
        this.name = challengeName;
        this.onChallenge = false;
        this.objective = challengeObjective;
        this.amount = 0;
        this.restriction = challengeRestriction;
    }
}
