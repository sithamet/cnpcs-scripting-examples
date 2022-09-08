function interact(e) {

    var SCOREBOARD = e.player.world.getScoreboard();
    
    e.player.clearData();
    //e.player.getTempdata().clear(); 
    e.player.getStoreddata().clear(); 
    e.npc.world.getStoreddata().clear(); 
    
    var objectives = SCOREBOARD.getObjectives(); 
    
    for (var i = 0; i < objectives.length; i++) {
        e.player.message("Deleting " + objectives[i].getName() + ":" + SCOREBOARD.getPlayerScore(e.player.name, objectives[i].getName(), "")); 
        SCOREBOARD.deletePlayerScore(e.player.name, objectives[i].getName(), ""); 
    }
    
    
    e.player.message("Данные CustomNPC сброшены");
    
    
    }