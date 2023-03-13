function StartChallenge(challengeNumber) {
    if(game.isInChallenge) return alert("You are already in a Challenge");
    Prestige();
    setTimeout(function () {
        LoadAchievements();
        game = Copy(challengeGame);
        game.isInChallenge = true;
        StartTimer(60, challengeNumber);
        game.challenges[challengeNumber].OnChallenge = 1;
    }, 500);
}

function ExitChallenge(challengeNumber) {
    game = Copy(activeGame);
    game.isInChallenge = false;
    game.challenges[challengeNumber].OnChallenge = 0;
    game.letterCounter = 0;
}

var progressBar = document.getElementById("challengeProgress");
var timer = document.getElementById("challengeTimer");

function StartTimer(seconds, challengeNumber) {
    timer.textContent = seconds;
    timer.style.color = "white";
    timer.classList.remove("success");
    var intervalId = setInterval(function minusSeconds() {
        seconds--;
        timer.textContent = seconds;
        if(seconds <= 10)
        {
            timer.style.color = "red";
            timer.classList.add("expand");

        }
        if(game.wordsAmount >= game.challenges[challengeNumber].Objective) {
            timer.textContent = "Success!";
            timer.classList.add("success");
            activeGame.challenges[challengeNumber].Amount++;
            progressBar.classList.add("green");
            progressBar.classList.add("hide");
            clearInterval(intervalId);
            ExitChallenge(challengeNumber);
            return;
        }
        if(seconds <= 0 || !game.isInChallenge){
            
            timer.textContent = "Failed!";
            timer.style.color = "red";
            progressBar.classList.add("red");
            progressBar.classList.add("hide");
            clearInterval(intervalId);
            ExitChallenge(challengeNumber);
            return;
        } 
        
        
    }, 1000);
}

timer.addEventListener("transitionend", function(e) {
    if(e.propertyName === 'transform') {
        timer.classList.remove("expand");
    }
});

progressBar.addEventListener("transitionend", function(e) {
    if(e.propertyName === 'width') {
        progressBar.classList.remove("red");
        progressBar.classList.remove("green");
        progressBar.classList.remove("hide");
    }
});

function LoadAchievements() {
    challengeGame.achievements = Copy(game.achievements);
}

function CheckProgress() {
    var progress = game.wordsAmount * 100 / GetActiveChallengeObjective();

    progressBar.style.width = `${progress}%`;
}

var GetActiveChallengeObjective = () => game.challenges.find(x => x.OnChallenge == 1).Objective;

