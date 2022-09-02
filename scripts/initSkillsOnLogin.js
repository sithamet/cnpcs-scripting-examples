
/**
 * @param {{ player: { getDisplayName: () => any; message: (arg0: string) => void; }; }} event
 */
function login(event) {

    var player = event.player; 
    var name = event.player.getDisplayName(); 
    event.player.message("&bДобро пожаловать на Полотно, " + name); 
    
    
    var skills = player.getEntityNbt().getCompound("ForgeCaps").getCompound("misca:sheet").getIntegerArray("skills");

    if (name === "Интра") { //Add dislay names here to enable logging 
        player.message("&cLogging current stats..."); 
        for (var key in SKILL) {
        player.message(key + ": " + skills[SKILL[key]]);
        }
    }
    
  
    for (var i = 10; i < 19; i++) {
        var temp = player.getFactionPoints(i); 
        player.addFactionPoints(i, -temp); 
    }
     
    player.addFactionPoints(10, skills[0]); // FITNESS
    player.addFactionPoints(11, skills[1]); // PERCEPTION
    player.addFactionPoints(12, skills[2]); // AGILITY
    player.addFactionPoints(13, skills[3]); // COORDINATION
    player.addFactionPoints(14, skills[4]); // INGENUITY
    player.addFactionPoints(15, skills[5]); // TECH
    player.addFactionPoints(16, skills[6]); // MAGIC
    player.addFactionPoints(17, skills[7]); // CHARISMA
    player.addFactionPoints(18, skills[8]); // COMPOSURE
    

    if (name === "Интра") {
        player.message("&cLogging stat factions points...");

        for (var i = 10; i < 19; i++) {
           player.message(player.getFactionPoints(i));
     }
   }

}

var SKILL = {
    FITNESS: 0,
    PERCEPTION: 1,
    AGILITY: 2,
    COORDINATION: 3,
    INGENUITY: 4,
    TECH: 5, 
    MAGIC: 6,
    CHARISMA: 7,
    COMPOSURE: 8
}