var SCOREBOARD;

function interact(e) {

   SCOREBOARD = e.npc.world.getScoreboard();

   var players = SCOREBOARD.getPlayerList();
   var objectives = SCOREBOARD.getObjectives();

   e.npc.say("&eLogging players");
   for (var i = 0; i < players.length; i++) {
      e.npc.say(players[i].getDisplayName);
   }

   e.npc.say("&eLogging objectives");
   for (var i = 0; i < objectives.length; i++) {
      e.npc.say(objectives[i].getDisplayName());

   }


}