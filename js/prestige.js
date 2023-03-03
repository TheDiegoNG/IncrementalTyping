function SetPrestige() {
    document.getElementById("prestigePointsToGet").textContent = "Prestige Points when Prestige: " + Math.round(Math.cbrt(game.allTimePoints));
}