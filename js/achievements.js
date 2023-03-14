var achievements = [{ name: "First Word", description: "Write your first word. Congratulations! You know how to write!" },
{ name: "Ten Words", description: "Write 10 words. Pay attention, it seems that you are close to your first upgrade." },
{ name: "Fifty Words", description: "Write 50 words." },
{ name: "One Hundred Words", description: "Write 100 words." },
{ name: "100 Points", description: "Save 100 points" },
{ name: "500 Points", description: "Save 500 Points" },
{ name: "1000 Points", description: "Save 1000 points" },
{ name: "5000 Points", description: "Save 5000 points" },
{ name: "10000 Points", description: "Save 10000 points" },
{ name: "50000 Points", description: "Save 50000 points" },
{ name: "100000 Points", description: "Save 100000 points" },
{ name: "200000 Points", description: "Save 200000 points" },
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
        game.achievements.push(achievements[0]);
      ShowAchievement("First Word");
    }
  
    if (game.wordsAmount >= 10 && !IsUnlockedAchievement("Ten Words")) {
        game.achievements.push(achievements[1]);
      ShowAchievement("Ten Words");
    }
  
    if (game.wordsAmount >= 50 && !IsUnlockedAchievement("Fifty Words")) {
        game.achievements.push(achievements[2]);
      ShowAchievement("Fifty Words");
    }

    if (game.wordsAmount >= 100 && !IsUnlockedAchievement("One Hundred Words")) {
        game.achievements.push(achievements[3]);
        ShowAchievement("One Hundred Words");
    }

    if (game.points >= 100 && !IsUnlockedAchievement("100 Points")) {
        game.achievements.push(achievements[4]);
        ShowAchievement("100 Points");
    }

    if (game.points >= 500 && !IsUnlockedAchievement("500 Points")) {
        game.achievements.push(achievements[5]);
        ShowAchievement("500 Points");
    }

    if (game.points >= 1000 && !IsUnlockedAchievement("1000 Points")) {
        game.achievements.push(achievements[6]);
        ShowAchievement("1000 Points");
    }

    if (game.points >= 5000 && !IsUnlockedAchievement("5000 Points")) {
        game.achievements.push(achievements[7]);
        ShowAchievement("5000 Points");
    }

    if (game.points >= 10000 && !IsUnlockedAchievement("10000 Points")) {
        game.achievements.push(achievements[8]);
        ShowAchievement("10000 Points");
    }

    if (game.points >= 50000 && !IsUnlockedAchievement("50000 Points")) {
        game.achievements.push(achievements[9]);
        ShowAchievement("50000 Points");
    }

    if (game.points >= 100000 && !IsUnlockedAchievement("100000 Points")) {
        game.achievements.push(achievements[10]);
        ShowAchievement("100000 Points");
    }

    if (game.points >= 200000 && !IsUnlockedAchievement("200000 Points")) {
        game.achievements.push(achievements[11]);
        ShowAchievement("200000 Points");
    }
  }
  
  function ShowAchievement(achievementName) {
    var achievement = game.achievements.find(a => a.name === achievementName);
    var achievementElement = document.getElementById(achievementName);
    achievementElement.classList.add("unlocked");
    alert(`Congratulations! You've unlocked the "${achievement.name}" achievement: ${achievement.description}`);
  }



  