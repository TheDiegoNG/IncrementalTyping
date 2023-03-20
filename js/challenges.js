import * as utilModule from "./util.js";
import { gameObjects } from "./game.js";
import * as prestigeModule from "./prestige.js"


var challenges = document.querySelectorAll(".challenge");

challenges.forEach((challenge, index) => {
    const challengeId = challenge.getAttribute("id");
    const challengeNumber = challengeId.match(/\d+$/);
    challenge.addEventListener('click', e => {
        StartChallenge(challengeNumber - 1)
    });
});

function StartChallenge(challengeNumber) {
    if(gameObjects.game.isInChallenge) return alert("You are already in a Challenge");
    prestigeModule.Prestige();
    setTimeout(function () {
        LoadAchievements();
        gameObjects.game = utilModule.Copy(gameObjects.challengeGame);
        gameObjects.game.isInChallenge = true;
        StartTimer(60, challengeNumber);
        gameObjects.vgame.challenges[challengeNumber].OnChallenge = 1;
    }, 500);
}

var exitChallengeButton = document.getElementById("exitChallengeButton");

exitChallengeButton.addEventListener('click', e => {
    ExitAnyChallenge();
});

function ExitAnyChallenge() {
    if(gameObjects.game.challenges.filter(x => x.OnChallenge == 1).length > 0) ExitChallenge(gameObjects.game.challenges.findIndex(x => x.OnChallenge == 1));
}

function ExitChallenge(challengeNumber) {
    gameObjects.game = utilModule.Copy(gameObjects.activeGame);
    gameObjects.game.isInChallenge = false;
    gameObjects.game.challenges[challengeNumber].OnChallenge = 0;
    gameObjects.game.letterCounter = 0;
}

var progressBar = document.getElementById("challengeProgress");
var timer = document.getElementById("challengeTimer");

function StartTimer(seconds, challengeNumber) {
    timer.textContent = seconds;
    timer.style.color = "white";
    timer.classList.remove("success");
    timer.classList.add("show");
    var intervalId = setInterval(function minusSeconds() {
        seconds--;
        timer.textContent = seconds;
        if(seconds <= 10)
        {
            timer.style.color = "red";
            timer.classList.add("expand");

        }
        if(gameObjects.game.wordsAmount >= gameObjects.game.challenges[challengeNumber].Objective) {
            timer.textContent = "Success!";
            timer.classList.add("success");
            gameObjects.activeGame.challenges[challengeNumber].Amount++;
            gameObjects.game.challengesAmount++;
            progressBar.classList.add("green");
            progressBar.classList.add("hide");
            clearInterval(intervalId);
            ExitChallenge(challengeNumber);
            return;
        }
        if(seconds <= 0 || !gameObjects.game.isInChallenge){
            
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
    if(progressBar.style.width == "100%")
    {
        progressBar.style.width = "0%";
    }
});

export function SetChallengesBonuses() {
    gameObjects.game.rollsAmount = 10 + gameObjects.game.challenges[0].Amount;
}

function LoadAchievements() {
    gameObjects.challengeGame.achievements = utilModule.Copy(gameObjects.game.achievements);
}

export function CheckProgress() {
    var progress = gameObjects.game.wordsAmount * 100 / GetActiveChallengeObjective();

    progressBar.style.width = `${progress}%`;
}

var GetActiveChallengeObjective = () => gameObjects.game.challenges.find(x => x.OnChallenge == 1).Objective;

