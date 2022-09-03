function login(event) {

    var player = event.player;
    var name = event.player.getDisplayName();
    event.player.message("&bДобро пожаловать на Полотно, " + name);

    //getting skill array 
    var skills = player.getEntityNbt().getCompound("ForgeCaps").getCompound("misca:sheet").getIntegerArray("skills");

    //logging on if name is
    if (name === "Интра") {
        player.message("&cLogging current stats...");
        for (var key in SKILL) {
            player.message(key + ": " + skills[SKILL[key]]);
        }
    }

    //re-setting faction points to 0 
    for (var i = 10; i < 19; i++) {
        var temp = player.getFactionPoints(i);
        player.addFactionPoints(i, -temp);
    }

    //adding faction points from skills array 
    player.addFactionPoints(10, skills[0]);
    player.addFactionPoints(11, skills[1]);
    player.addFactionPoints(12, skills[2]);
    player.addFactionPoints(13, skills[3]);
    player.addFactionPoints(14, skills[4]);
    player.addFactionPoints(15, skills[5]);
    player.addFactionPoints(16, skills[6]);
    player.addFactionPoints(17, skills[7]);
    player.addFactionPoints(18, skills[8]);


    if (name === "Интра") {
        player.message("&cLogging stat factions points...");
        for (var i = 10; i < 19; i++) {
            player.message(player.getFactionPoints(i));
        }
    }

}

//skill values map
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