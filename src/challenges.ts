import * as utilModule from "./util";
import { gameObjects } from "./classes/game";
import * as prestigeModule from "./prestige";
import { Challenge } from "./classes/challenge";

var challengesElements = document.querySelectorAll(".challenge");

challengesElements.forEach((challenge, index) => {
  const challengeId = challenge.getAttribute("id");
  const challengeNumber = challengeId!.match(/\d+$/);
  if (challengeNumber) {
    challenge.addEventListener("click", (e) => {
      StartChallenge(parseInt(challengeNumber[0]));
    });
  }
});

const challenges: Challenge[] = [];

challenges.push(new Challenge("Accuracy", 50, 210, 1));
challenges.push(new Challenge("Speed", 50, 0, 2));

function StartChallenge(challengeNumber: number) {
  if (gameObjects.game.isInChallenge)
    return alert("You are already in a Challenge");
    if(!gameObjects.game.challenges.find(x => x.id == challengeNumber)) gameObjects.game.challenges.push(challenges.find(x => x.id == challengeNumber)!);
    const challenge = gameObjects.game.challenges.find(x => x.id == challengeNumber);
    if(!challenge) return;
  prestigeModule.Prestige();
  setTimeout(function () {
    LoadAchievements();
    LoadChallenges();
    gameObjects.game = utilModule.Copy(gameObjects.challengeGame);
    gameObjects.game.isInChallenge = true;
    StartTimer(60, challengeNumber);
    gameObjects.game.challenges.find(x => x.id == challengeNumber)!.onChallenge = true;
  }, 500);
}

const exitChallengeButton = document.querySelector("#exitChallengeButton");

if (exitChallengeButton) {
  exitChallengeButton.addEventListener("click", (e) => {
    ExitAnyChallenge();
  });
}

function ExitAnyChallenge() {
  const challenge = gameObjects.game.challenges.find((x) => x.onChallenge);
  if (challenge) ExitChallenge(challenge.id);
}

function ExitChallenge(challengeNumber: number) {
  gameObjects.game = utilModule.Copy(gameObjects.activeGame);
  gameObjects.game.isInChallenge = false;
  gameObjects.game.challenges.find(x => x.id == challengeNumber)!.onChallenge = false;
  gameObjects.game.letterCounter = 0;
}

const progressBar = document.querySelector("#challengeProgress");
const timer = document.querySelector("#challengeTimer");

function StartTimer(seconds: number, challengeNumber: number) {
  if (!timer || !(timer instanceof HTMLElement)) return;
  if (!progressBar) return;
  timer.textContent = seconds.toString();
  timer.style.color = "white";
  timer.classList.remove("success");
  timer.classList.add("show");
  var intervalId = setInterval(function minusSeconds() {
    seconds--;
    timer.textContent = seconds.toString();
    if (seconds <= 10) {
      timer.style.color = "red";
      timer.classList.add("expand");
    }
    if (
      gameObjects.game.wordsAmount >=
      gameObjects.game.challenges.find(x => x.id == challengeNumber)!.objective
    ) {
      timer.textContent = "Success!";
      timer.classList.add("success");
      gameObjects.activeGame.challenges.find(x => x.id == challengeNumber)!.amount++;
      gameObjects.game.challengesAmount++;
      if(challengeNumber == 1) gameObjects.game.rollsAmount += gameObjects.game.challenges.find(x => x.id == challengeNumber)!.amount;
      progressBar.classList.add("green");
      progressBar.classList.add("hide");
      clearInterval(intervalId);
      ExitChallenge(challengeNumber);
      return;
    }
    if (seconds <= 0 || !gameObjects.game.isInChallenge) {
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

if (timer) {
  timer.addEventListener("transitionend", function (e: Event) {
    if ((e as TransitionEvent).propertyName === "transform") {
      timer.classList.remove("expand");
    }
  });
}

if (progressBar && progressBar instanceof HTMLElement) {
  progressBar.addEventListener("transitionend", function (e) {
    if ((e as TransitionEvent).propertyName === "width") {
      progressBar.classList.remove("red");
      progressBar.classList.remove("green");
      progressBar.classList.remove("hide");
    }
    if (progressBar.style.width == "100%") {
      progressBar.style.width = "0%";
    }
  });
}

function LoadAchievements() {
  gameObjects.challengeGame.achievements = utilModule.Copy(
    gameObjects.game.achievements
  );
}

function LoadChallenges() {
  gameObjects.challengeGame.challenges = utilModule.Copy(
    gameObjects.game.challenges
  );
}

export function CheckProgress() {
  if (!progressBar || !(progressBar instanceof HTMLElement)) return;
  var progress =
    (gameObjects.game.wordsAmount * 100) / GetActiveChallengeObjective()!;
  progressBar.style.width = `${progress}%`;
}

function GetActiveChallengeObjective() {
  const challenge = gameObjects.game.challenges.find((x) => x.onChallenge);
  if(challenge) return challenge.objective;
}
