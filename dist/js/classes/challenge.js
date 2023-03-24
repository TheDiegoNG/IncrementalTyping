export class Challenge {
    constructor(challengeName, challengeObjective, challengeRestriction, challengeNumber) {
        this.name = challengeName;
        this.onChallenge = false;
        this.objective = challengeObjective;
        this.amount = 0;
        this.restriction = challengeRestriction;
        this.id = challengeNumber;
    }
}
