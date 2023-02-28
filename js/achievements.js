function CheckAchievements() {

    if (game.wordsAmount >= 1 && !IsUnlockedAchievement(0)) {
        game.achievements[0].unlocked = true;
      ShowAchievement("First Word");
    }
  
    if (game.wordsAmount >= 10 && !IsUnlockedAchievement(1)) {
        game.achievements[1].unlocked = true;
      ShowAchievement("Ten Words");
    }
  
    if (game.wordsAmount >= 50 && !IsUnlockedAchievement(2)) {
        game.achievements[2].unlocked = true;
      ShowAchievement("Fifty Words");
    }

    if (game.wordsAmount >= 100 && !!IsUnlockedAchievement(3)) {
        game.achievements[3].unlocked = true;
        ShowAchievement("One Hundred Words");
    }

    if (game.points >= 100 && !IsUnlockedAchievement(4)) {
        game.achievements[4].unlocked = true;
        ShowAchievement("100 Points");
    }

    if (game.points >= 500 && !IsUnlockedAchievement(5)) {
        game.achievements[5].unlocked = true;
        ShowAchievement("500 Points");
    }

    if (game.points >= 1000 && !IsUnlockedAchievement(6)) {
        game.achievements[6].unlocked = true;
        ShowAchievement("1000 Points");
    }

    if (game.points >= 5000 && !IsUnlockedAchievement(7)) {
        game.achievements[7].unlocked = true;
        ShowAchievement("5000 Points");
    }

    if (game.points >= 10000 && !IsUnlockedAchievement(8)) {
        game.achievements[8].unlocked = true;
        ShowAchievement("10000 Points");
    }

    if (game.points >= 50000 && !IsUnlockedAchievement(9)) {
        game.achievements[9].unlocked = true;
        ShowAchievement("50000 Points");
    }

    if (game.points >= 100000 && !IsUnlockedAchievement(10)) {
        game.achievements[10].unlocked = true;
        ShowAchievement("100000 Points");
    }

    if (game.points >= 200000 && !IsUnlockedAchievement(11)) {
        game.achievements[11].unlocked = true;
        ShowAchievement("200000 Points");
    }
  }
  
  function ShowAchievement(achievementName) {
    var achievement = game.achievements.find(a => a.name === achievementName);
    alert(`Congratulations! You've unlocked the "${achievement.name}" achievement: ${achievement.description}`);
  }



  