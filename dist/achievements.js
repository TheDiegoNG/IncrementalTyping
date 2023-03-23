import * as utilModule from "./util.js";
import { gameObjects } from "./classes/game.js";
import { Achievement } from "./classes/achievement.js";
export const achievements = [];
achievements.push(new Achievement("First Word", "Write your first word. Congratulations! You know how to write!"));
achievements.push(new Achievement("Ten Words", "Write 10 words. Pay attention, it seems that you are close to your first upgrade."));
achievements.push(new Achievement("Fifty Words", "Write 50 words."));
achievements.push(new Achievement("One Hundred Words", "Write 100 words."));
achievements.push(new Achievement("250 Words", "Write 250 words."));
achievements.push(new Achievement("500 Words", "Write 500 words."));
achievements.push(new Achievement("1000 Words", "Write 1000 words."));
achievements.push(new Achievement("100 Points", "Save 100 points"));
achievements.push(new Achievement("500 Points", "Save 500 points"));
achievements.push(new Achievement("1000 Points", "Save 1000 points"));
achievements.push(new Achievement("5000 Points", "Save 5000 points"));
achievements.push(new Achievement("10000 Points", "Save 10000 points"));
achievements.push(new Achievement("50000 Points", "Save 50000 points"));
achievements.push(new Achievement("100000 Points", "Save 100000 points"));
achievements.push(new Achievement("200000 Points", "Save 200000 points"));
achievements.push(new Achievement("100 Passive Points", "Reach 100 Passive Points"));
achievements.push(new Achievement("500 Passive Points", "Reach 500 Passive Points"));
achievements.push(new Achievement("1000 Passive Points", "Reach 1000 Passive Points"));
achievements.push(new Achievement("2500 Passive Points", "Reach 2500 Passive Points"));
achievements.push(new Achievement("10 Cards", "You bought your first pack!"));
achievements.push(new Achievement("50 Cards", "Have 50 Cards"));
achievements.push(new Achievement("100 Cards", "Have 100 Cards"));
achievements.push(new Achievement("1 Challenge", "Complete your first challenge"));
achievements.push(new Achievement("5 Challenges", "Complete 5 challenges"));
achievements.push(new Achievement("Reach Prestige!", "Prestige for the first time"));
achievements.push(new Achievement("100 Prestige Points", "Have 100 Prestige Points"));
achievements.push(new Achievement("250 Prestige Points", "Have 250 Prestige Points"));
achievements.push(new Achievement("500 Prestige Points", "Have 500 Prestige Points"));
achievements.push(new Achievement("10-letter Word", "Write a 10-letter word"));
achievements.push(new Achievement("Best Word", "Write the best word possible"));
const achievementContainer = document.querySelector("#achievementContainer");
export function CreateAchievements() {
    if (!achievementContainer)
        return;
    achievements.forEach((x) => {
        const achievement = document.createElement("div");
        achievement.classList.add("achievement");
        achievement.textContent = x.name;
        achievement.id = x.name;
        achievementContainer.appendChild(achievement);
    });
}
export function CheckAchievements() {
    if (gameObjects.game.wordsAmount >= 1 &&
        !utilModule.IsUnlockedAchievement("First Word")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "First Word"));
        ShowAchievement("First Word");
    }
    if (gameObjects.game.wordsAmount >= 10 &&
        !utilModule.IsUnlockedAchievement("Ten Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "Ten Words"));
        ShowAchievement("Ten Words");
    }
    if (gameObjects.game.wordsAmount >= 50 &&
        !utilModule.IsUnlockedAchievement("Fifty Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "Fifty Words"));
        ShowAchievement("Fifty Words");
    }
    if (gameObjects.game.wordsAmount >= 100 &&
        !utilModule.IsUnlockedAchievement("One Hundred Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "One Hundred Words"));
        ShowAchievement("One Hundred Words");
    }
    if (gameObjects.game.wordsAmount >= 250 &&
        !utilModule.IsUnlockedAchievement("250 Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "250 Words"));
        ShowAchievement("250 Words");
    }
    if (gameObjects.game.wordsAmount >= 500 &&
        !utilModule.IsUnlockedAchievement("500 Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "500 Words"));
        ShowAchievement("500 Words");
    }
    if (gameObjects.game.wordsAmount >= 1000 &&
        !utilModule.IsUnlockedAchievement("1000 Words")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "1000 Words"));
        ShowAchievement("1000 Words");
    }
    if (gameObjects.game.points >= 100 &&
        !utilModule.IsUnlockedAchievement("100 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "100 Points"));
        ShowAchievement("100 Points");
    }
    if (gameObjects.game.points >= 500 &&
        !utilModule.IsUnlockedAchievement("500 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "500 Points"));
        ShowAchievement("500 Points");
    }
    if (gameObjects.game.points >= 1000 &&
        !utilModule.IsUnlockedAchievement("1000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "1000 Points"));
        ShowAchievement("1000 Points");
    }
    if (gameObjects.game.points >= 5000 &&
        !utilModule.IsUnlockedAchievement("5000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "5000 Points"));
        ShowAchievement("5000 Points");
    }
    if (gameObjects.game.points >= 10000 &&
        !utilModule.IsUnlockedAchievement("10000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "10000 Points"));
        ShowAchievement("10000 Points");
    }
    if (gameObjects.game.points >= 50000 &&
        !utilModule.IsUnlockedAchievement("50000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "50000 Points"));
        ShowAchievement("50000 Points");
    }
    if (gameObjects.game.points >= 100000 &&
        !utilModule.IsUnlockedAchievement("100000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "100000 Points"));
        ShowAchievement("100000 Points");
    }
    if (gameObjects.game.points >= 200000 &&
        !utilModule.IsUnlockedAchievement("200000 Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "200000 Points"));
        ShowAchievement("200000 Points");
    }
    if (gameObjects.game.passivePoints >= 100 &&
        !utilModule.IsUnlockedAchievement("100 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "100 Passive Points"));
        ShowAchievement("100 Passive Points");
    }
    if (gameObjects.game.passivePoints >= 500 &&
        !utilModule.IsUnlockedAchievement("500 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "500 Passive Points"));
        ShowAchievement("500 Passive Points");
    }
    if (gameObjects.game.passivePoints >= 1000 &&
        !utilModule.IsUnlockedAchievement("1000 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "1000 Passive Points"));
        ShowAchievement("1000 Passive Points");
    }
    if (gameObjects.game.passivePoints >= 2500 &&
        !utilModule.IsUnlockedAchievement("2500 Passive Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "2500 Passive Points"));
        ShowAchievement("2500 Passive Points");
    }
    if (gameObjects.game.cards.length >= 10 &&
        !utilModule.IsUnlockedAchievement("10 Cards")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "10 Cards"));
        ShowAchievement("10 Cards");
    }
    if (gameObjects.game.cards.length >= 50 &&
        !utilModule.IsUnlockedAchievement("50 Cards")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "50 Cards"));
        ShowAchievement("50 Cards");
    }
    if (gameObjects.game.cards.length >= 100 &&
        !utilModule.IsUnlockedAchievement("100 Cards")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "100 Cards"));
        ShowAchievement("100 Cards");
    }
    if (gameObjects.game.challengesAmount >= 1 &&
        !utilModule.IsUnlockedAchievement("1 Challenge")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "1 Challenge"));
        ShowAchievement("1 Challenge");
    }
    if (gameObjects.game.challengesAmount >= 5 &&
        !utilModule.IsUnlockedAchievement("5 Challenges")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "5 Challenges"));
        ShowAchievement("5 Challenges");
    }
    if (gameObjects.game.prestigeCount >= 1 &&
        !utilModule.IsUnlockedAchievement("Reach Prestige!")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "Reach Prestige!"));
        ShowAchievement("Reach Prestige!");
    }
    if (gameObjects.game.prestigePoints >= 100 &&
        !utilModule.IsUnlockedAchievement("100 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "100 Prestige Points"));
        ShowAchievement("100 Prestige Points");
    }
    if (gameObjects.game.prestigePoints >= 250 &&
        !utilModule.IsUnlockedAchievement("250 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "250 Prestige Points"));
        ShowAchievement("250 Prestige Points");
    }
    if (gameObjects.game.prestigePoints >= 500 &&
        !utilModule.IsUnlockedAchievement("500 Prestige Points")) {
        gameObjects.game.achievements.push(achievements.find((x) => x.name == "500 Prestige Points"));
        ShowAchievement("500 Prestige Points");
    }
}
export function ShowAchievement(achievementName) {
    var achievementElement = document.getElementById(achievementName.toString());
}
export function SetUnlockedAchievements() {
    if (!achievementContainer)
        return;
    let achievements = achievementContainer.querySelectorAll(".achievement");
    achievements.forEach((value, index) => {
        var obtainedAchievement = gameObjects.game.achievements.find((x) => x.name == value.id);
        if (obtainedAchievement != undefined &&
            !value.classList.contains("unlocked"))
            value.classList.add("unlocked");
    });
}
