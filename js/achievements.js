import * as utilModule from "./util.js";
import { gameObjects } from "./game.js";

var achievements = [{ name: "First Word", description: "Write your first word. Congratulations! You know how to write!" },
{ name: "Ten Words", description: "Write 10 words. Pay attention, it seems that you are close to your first upgrade." },
{ name: "Fifty Words", description: "Write 50 words." },
{ name: "One Hundred Words", description: "Write 100 words." },
{ name: "250 Words", description: "Write 250 words." },
{ name: "500 Words", description: "Write 500 words." },
{ name: "1000 Words", description: "Write 1000 words." },
{ name: "100 Points", description: "Save 100 points" },
{ name: "500 Points", description: "Save 500 Points" },
{ name: "1000 Points", description: "Save 1000 points" },
{ name: "5000 Points", description: "Save 5000 points" },
{ name: "10000 Points", description: "Save 10000 points" },
{ name: "50000 Points", description: "Save 50000 points" },
{ name: "100000 Points", description: "Save 100000 points" },
{ name: "200000 Points", description: "Save 200000 points" },
{ name: "100 Passive Points", description: "Reach 100 Passive Points" },
{ name: "500 Passive Points", description: "Reach 500 Passive Points" },
{ name: "1000 Passive Points", description: "Reach 1000 Passive Points" },
{ name: "2500 Passive Points", description: "Reach 2500 Passive Points" },
{ name: "10 Cards", description: "You bought your first pack!" },
{ name: "50 Cards", description: "Have 50 Cards" },
{ name: "100 Cards", description: "Have 100 Cards" },
{ name: "1 Challenge", description: "Complete your first challenge" },
{ name: "5 Challenges", description: "Complete 5 challenges" },
{ name: "Reach Prestige!", description: "Prestige for the first time" },
{ name: "100 Prestige Points", description: "Have 100 Prestige Points" },
{ name: "250 Prestige Points", description: "Have 250 Prestige Points" },
{ name: "500 Prestige Points", description: "Have 500 Prestige Points" },
{ name: "10-letter Word", description: "Write a 10-letter word" },
{ name: "Best Word", description: "Write the best word possible" }]

var achievementContainer = document.getElementById("achievementContainer");

export function CreateAchievements() {
    achievements.forEach(x => {
        const achievement = document.createElement("div");
        achievement.classList.add("achievement");
        achievement.textContent = x.name;
        achievement.id = x.name;
        achievementContainer.appendChild(achievement);
    });
}

export function CheckAchievements() {

    if (gameObjects.game.wordsAmount >= 1 && !utilModule.IsUnlockedAchievement("First Word")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "First Word"));
        ShowAchievement("First Word");
    }

    if (gameObjects.game.wordsAmount >= 10 && !utilModule.IsUnlockedAchievement("Ten Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "Ten Words"));
        ShowAchievement("Ten Words");
    }

    if (gameObjects.game.wordsAmount >= 50 && !utilModule.IsUnlockedAchievement("Fifty Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "Fifty Words"));
        ShowAchievement("Fifty Words");
    }

    if (gameObjects.game.wordsAmount >= 100 && !utilModule.IsUnlockedAchievement("One Hundred Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "One Hundred Words"));
        ShowAchievement("One Hundred Words");
    }

    if (gameObjects.game.wordsAmount >= 250 && !utilModule.IsUnlockedAchievement("250 Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "250 Words"));
        ShowAchievement("250 Words");
    }

    if (gameObjects.game.wordsAmount >= 500 && !utilModule.IsUnlockedAchievement("500 Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "500 Words"));
        ShowAchievement("500 Words");
    }

    if (gameObjects.game.wordsAmount >= 1000 && !utilModule.IsUnlockedAchievement("1000 Words")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "1000 Words"));
        ShowAchievement("1000 Words");
    }

    if (gameObjects.game.points >= 100 && !utilModule.IsUnlockedAchievement("100 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "100 Points"));
        ShowAchievement("100 Points");
    }

    if (gameObjects.game.points >= 500 && !utilModule.IsUnlockedAchievement("500 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "500 Points"));
        ShowAchievement("500 Points");
    }

    if (gameObjects.game.points >= 1000 && !utilModule.IsUnlockedAchievement("1000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "1000 Points"));
        ShowAchievement("1000 Points");
    }

    if (gameObjects.game.points >= 5000 && !utilModule.IsUnlockedAchievement("5000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "5000 Points"));
        ShowAchievement("5000 Points");
    }

    if (gameObjects.game.points >= 10000 && !utilModule.IsUnlockedAchievement("10000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "10000 Points"));
        ShowAchievement("10000 Points");
    }

    if (gameObjects.game.points >= 50000 && !utilModule.IsUnlockedAchievement("50000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "50000 Points"));
        ShowAchievement("50000 Points");
    }

    if (gameObjects.game.points >= 100000 && !utilModule.IsUnlockedAchievement("100000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "100000 Points"));
        ShowAchievement("100000 Points");
    }

    if (gameObjects.game.points >= 200000 && !utilModule.IsUnlockedAchievement("200000 Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "200000 Points"));
        ShowAchievement("200000 Points");
    }

    if (gameObjects.game.passivePoints >= 100 && !utilModule.IsUnlockedAchievement("100 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "100 Passive Points"));
        ShowAchievement("100 Passive Points");
    }

    if (gameObjects.game.passivePoints >= 500 && !utilModule.IsUnlockedAchievement("500 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "500 Passive Points"));
        ShowAchievement("500 Passive Points");
    }

    if (gameObjects.game.passivePoints >= 1000 && !utilModule.IsUnlockedAchievement("1000 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "1000 Passive Points"));
        ShowAchievement("1000 Passive Points");
    }

    if (gameObjects.game.passivePoints >= 2500 && !utilModule.IsUnlockedAchievement("2500 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "2500 Passive Points"));
        ShowAchievement("2500 Passive Points");
    }

    if (gameObjects.game.cards.length >= 10 && !utilModule.IsUnlockedAchievement("10 Cards")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "10 Cards"));
        ShowAchievement("10 Cards");
    }

    if (gameObjects.game.cards.length >= 50 && !utilModule.IsUnlockedAchievement("50 Cards")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "50 Cards"));
        ShowAchievement("50 Cards");
    }

    if (gameObjects.game.cards.length >= 100 && !utilModule.IsUnlockedAchievement("100 Cards")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "100 Cards"));
        ShowAchievement("100 Cards");
    }

    if (gameObjects.game.challengesAmount >= 1 && !utilModule.IsUnlockedAchievement("1 Challenge")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "1 Challenge"));
        ShowAchievement("1 Challenge");
    }

    if (gameObjects.game.challengesAmount >= 5 && !utilModule.IsUnlockedAchievement("5 Challenges")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "5 Challenges"));
        ShowAchievement("5 Challenges");
    }

    if (gameObjects.game.prestigeCount >= 1 && !utilModule.IsUnlockedAchievement("Reach Prestige!")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "Reach Prestige!"));
        ShowAchievement("Reach Prestige!");
    }

    if (gameObjects.game.prestigePoints >= 100 && !utilModule.IsUnlockedAchievement("100 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "100 Prestige Points"));
        ShowAchievement("100 Prestige Points");
    }

    if (gameObjects.game.prestigePoints >= 250 && !utilModule.IsUnlockedAchievement("250 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "250 Prestige Points"));
        ShowAchievement("250 Prestige Points");
    }

    if (gameObjects.game.prestigePoints >= 500 && !utilModule.IsUnlockedAchievement("500 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find(x => x.name == "500 Prestige Points"));
        ShowAchievement("500 Prestige Points");
    }
}
export function ShowAchievement(achievementName) {
    var achievementElement = document.getElementById(achievementName);
    achievementElement.classList.add("unlocked");
}


