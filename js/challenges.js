function StartChallenge(challengeNumber) {
    if(game.isInChallenge) return alert("You are already in a Challenge");
    game = Copy(challengeGame);
    game.isInChallenge = true;
    StartTimer(60, challengeNumber);
    game.challenges[0][challengeNumber] = 1;
}

function ExitChallenge(challengeNumber) {
    game = Copy(activeGame);
    game.isInChallenge = false;
    game.challenges[0][challengeNumber] = 0;
}

function StartTimer(seconds, challengeNumber) {
    var timer = document.getElementById("challengeTimer");
    timer.textContent = seconds;

    var intervalId = setInterval(function minusSeconds() {
        seconds--;
        timer.textContent = seconds;
        if(game.wordsAmount >= game.challenges[1][challengeNumber]) {
            timer.textContent = "Success!";
            activeGame.challenges[2][challengeNumber]++;
            clearInterval(intervalId);
            ExitChallenge(challengeNumber);
            return;
        }
        if(seconds <= 0 || !IsInChallenge(challengeNumber)){
            
            timer.textContent = "Failed!";
            clearInterval(intervalId);
            ExitChallenge(challengeNumber);
            return;
        } 
        
    }, 1000);
}
