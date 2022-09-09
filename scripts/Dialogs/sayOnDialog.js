
function dialog(e) {

    sayOnDialog(171,
        "&a" + "@p" + "&r",
        "*Начинает яростно срать в штаны.*",
        10,
        e);

    sayOnDialog(172,
        "&a" + "@p" + "&r",
        "*Побеждает свою жопу...*",
        10,
        e);

    sayOnDialog(170,
        "&a" + "@p" + "&r",
        "*Вступает в бой со своей жопой...*",
        10,
        e);


}

function sayOnDialog(id, actorName, message, radius, event) {

    var PLAYER = event.player;
    var MESSAGE = message;
    var TRIGGER_ID = id;
    var DIALOG = event.dialog;
    var RADIUS = radius;
    var ACTOR = actorName;
    var STOREDDATA = event.player.world.getStoreddata();

    if (DIALOG.getId() == TRIGGER_ID) {

        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName()); 

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);

        

        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}

