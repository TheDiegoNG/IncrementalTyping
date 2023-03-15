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

function CreateAchievements() {
    achievements.forEach(x => {
        const achievement = document.createElement("div");
        achievement.classList.add("achievement");
        achievement.textContent = x.name;
        achievement.id = x.name;
        achievementContainer.appendChild(achievement);
    });
}

function CheckAchievements() {

    if (game.wordsAmount >= 1 && !IsUnlockedAchievement("First Word")) {
        game.achievements.push(achievements.find(x => x.name == "First Word"));
        ShowAchievement("First Word");
    }

    if (game.wordsAmount >= 10 && !IsUnlockedAchievement("Ten Words")) {
        game.achievements.push(achievements.find(x => x.name == "Ten Words"));
        ShowAchievement("Ten Words");
    }

    if (game.wordsAmount >= 50 && !IsUnlockedAchievement("Fifty Words")) {
        game.achievements.push(achievements.find(x => x.name == "Fifty Words"));
        ShowAchievement("Fifty Words");
    }

    if (game.wordsAmount >= 100 && !IsUnlockedAchievement("One Hundred Words")) {
        game.achievements.push(achievements.find(x => x.name == "One Hundred Words"));
        ShowAchievement("One Hundred Words");
    }

    if (game.wordsAmount >= 250 && !IsUnlockedAchievement("250 Words")) {
        game.achievements.push(achievements.find(x => x.name == "250 Words"));
        ShowAchievement("250 Words");
    }

    if (game.wordsAmount >= 500 && !IsUnlockedAchievement("500 Words")) {
        game.achievements.push(achievements.find(x => x.name == "500 Words"));
        ShowAchievement("500 Words");
    }

    if (game.wordsAmount >= 1000 && !IsUnlockedAchievement("1000 Words")) {
        game.achievements.push(achievements.find(x => x.name == "1000 Words"));
        ShowAchievement("1000 Words");
    }

    if (game.points >= 100 && !IsUnlockedAchievement("100 Points")) {
        game.achievements.push(achievements.find(x => x.name == "100 Points"));
        ShowAchievement("100 Points");
    }

    if (game.points >= 500 && !IsUnlockedAchievement("500 Points")) {
        game.achievements.push(achievements.find(x => x.name == "500 Points"));
        ShowAchievement("500 Points");
    }

    if (game.points >= 1000 && !IsUnlockedAchievement("1000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "1000 Points"));
        ShowAchievement("1000 Points");
    }

    if (game.points >= 5000 && !IsUnlockedAchievement("5000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "5000 Points"));
        ShowAchievement("5000 Points");
    }

    if (game.points >= 10000 && !IsUnlockedAchievement("10000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "10000 Points"));
        ShowAchievement("10000 Points");
    }

    if (game.points >= 50000 && !IsUnlockedAchievement("50000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "50000 Points"));
        ShowAchievement("50000 Points");
    }

    if (game.points >= 100000 && !IsUnlockedAchievement("100000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "100000 Points"));
        ShowAchievement("100000 Points");
    }

    if (game.points >= 200000 && !IsUnlockedAchievement("200000 Points")) {
        game.achievements.push(achievements.find(x => x.name == "200000 Points"));
        ShowAchievement("200000 Points");
    }

    if (game.passivePoints >= 100 && !IsUnlockedAchievement("100 Passive Points")) {
        game.achievements.push(achievements.find(x => x.name == "100 Passive Points"));
        ShowAchievement("100 Passive Points");
    }

    if (game.passivePoints >= 500 && !IsUnlockedAchievement("500 Passive Points")) {
        game.achievements.push(achievements.find(x => x.name == "500 Passive Points"));
        ShowAchievement("500 Passive Points");
    }

    if (game.passivePoints >= 1000 && !IsUnlockedAchievement("1000 Passive Points")) {
        game.achievements.push(achievements.find(x => x.name == "1000 Passive Points"));
        ShowAchievement("1000 Passive Points");
    }

    if (game.passivePoints >= 2500 && !IsUnlockedAchievement("2500 Passive Points")) {
        game.achievements.push(achievements.find(x => x.name == "2500 Passive Points"));
        ShowAchievement("2500 Passive Points");
    }

    if (game.cards.length >= 10 && !IsUnlockedAchievement("10 Cards")) {
        game.achievements.push(achievements.find(x => x.name == "10 Cards"));
        ShowAchievement("10 Cards");
    }

    if (game.cards.length >= 50 && !IsUnlockedAchievement("50 Cards")) {
        game.achievements.push(achievements.find(x => x.name == "50 Cards"));
        ShowAchievement("50 Cards");
    }

    if (game.cards.length >= 100 && !IsUnlockedAchievement("100 Cards")) {
        game.achievements.push(achievements.find(x => x.name == "100 Cards"));
        ShowAchievement("100 Cards");
    }

    if (game.challengesAmount >= 1 && !IsUnlockedAchievement("1 Challenge")) {
        game.achievements.push(achievements.find(x => x.name == "1 Challenge"));
        ShowAchievement("1 Challenge");
    }

    if (game.challengesAmount >= 5 && !IsUnlockedAchievement("5 Challenges")) {
        game.achievements.push(achievements.find(x => x.name == "5 Challenges"));
        ShowAchievement("5 Challenges");
    }

    if (game.prestigeCount >= 1 && !IsUnlockedAchievement("Reach Prestige!")) {
        game.achievements.push(achievements.find(x => x.name == "Reach Prestige!"));
        ShowAchievement("Reach Prestige!");
    }

    if (game.prestigePoints >= 100 && !IsUnlockedAchievement("100 Prestige Points")) {
        game.achievements.push(achievements.find(x => x.name == "100 Prestige Points"));
        ShowAchievement("100 Prestige Points");
    }

    if (game.prestigePoints >= 250 && !IsUnlockedAchievement("250 Prestige Points")) {
        game.achievements.push(achievements.find(x => x.name == "250 Prestige Points"));
        ShowAchievement("250 Prestige Points");
    }

    if (game.prestigePoints >= 500 && !IsUnlockedAchievement("500 Prestige Points")) {
        game.achievements.push(achievements.find(x => x.name == "500 Prestige Points"));
        ShowAchievement("500 Prestige Points");
    }
}

var popUpAchievement = document.getElementById("PopUpAchievement");
var popUpAchievementText = document.getElementById("PopUpAchievementText");

function ShowAchievement(achievementName) {
    var achievement = game.achievements.find(a => a.name === achievementName);
    var achievementElement = document.getElementById(achievementName);
    achievementElement.classList.add("unlocked");
    popUpAchievementText.textContent = `You have obtained the achievement: ${achievementName}!`
    popUpAchievement.classList.add("show");
}

popUpAchievement.addEventListener("transitionend", function() {
    setTimeout(() => {
        popUpAchievement.classList.remove("show");
    }, 5000);
})



