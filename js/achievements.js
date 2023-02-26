function CheckAchievements() {

    if (game.wordsAmount >= 1 && !game.achievements[0].unlocked) {
        game.achievements[0].unlocked = true;
      ShowAchievement("First Word");
    }
  
    if (game.wordsAmount >= 10 && !game.achievements[1].unlocked) {
        game.achievements[1].unlocked = true;
      ShowAchievement("Ten Words");
    }
  
    if (game.wordsAmount >= 50 && !game.achievements[2].unlocked) {
        game.achievements[2].unlocked = true;
      ShowAchievement("Fifty Words");
    }

    if (game.points >= 100 && !game.achievements[4].unlocked) {
        game.achievements[4].unlocked = true;
        ShowAchievement("100 Points");
    }

    if (game.points >= 500 && !game.achievements[5].unlocked) {
        game.achievements[5].unlocked = true;
        ShowAchievement("500 Points");
    }

    if (game.points >= 1000 && !game.achievements[6].unlocked) {
        game.achievements[6].unlocked = true;
        ShowAchievement("1000 Points");
    }
  }
  
  // Function to show the achievement notification
  function ShowAchievement(achievementName) {
    var achievement = game.achievements.find(a => a.name === achievementName);
    alert(`Congratulations! You've unlocked the "${achievement.name}" achievement: ${achievement.description}`);
  }