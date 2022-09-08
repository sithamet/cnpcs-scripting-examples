function interact(e)  {
    var id_num = 10; 
    var PLAYER = e.player; 
    
    var id = "check" + 10; 
    
    var scoreBoard = e.player.world.getScoreboard(); 
    var objective = scoreBoard.getObjective(id); 
    
    e.player.message("Name is" + objective.getName()); 
    
    // var score = objective.getScore(PLAYER.name); 
    // score.setValue(12);
   
    
    // PLAYER.message("Score is =" + score.getValue()); 
    
    // scoreBoard.setPlayerScore(PLAYER.name, id, 333, ""); 
    
    PLAYER.message("Score from direct getter is is =" + scoreBoard.getPlayerScore(PLAYER.name, id, "")); 
    
    
 



   
   
   }
    