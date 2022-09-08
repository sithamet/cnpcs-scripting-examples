function interact(e) {

    var SCOREBOARD = e.player.world.getScoreboard();

    var objectives = SCOREBOARD.getObjectives();

    for (var i = 0; i < objectives.length; i++) {
        e.player.message("Deleting " + objectives[i].getName() + ":" + SCOREBOARD.getPlayerScore(e.player.name, objectives[i].getName(), ""));
    }
}
