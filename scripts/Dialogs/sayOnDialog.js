/*
Sends a message to the chat to all players in a certain radius if dialog is open by the player
If dialog is not in NPC and triggered by showDialog(), this script must be placed in Player instance
(Script's Showel click on air)
 */
function dialog(e) {

    sayOnDialog(143,
        "&a" + "@p" + "&r", //от чьего имени пишется реплика
        //реплика
        "*@p говорит «Нет» — и в тот же момент, молот Судьи падает на череп.*",
        20, //радиус слышимости
        e);
}

function sayOnDialog(id, actorName, message, radius, event) {

    var PLAYER = event.player;
    var MESSAGE = message;
    var TRIGGER_ID = id;
    var DIALOG = event.dialog;
    var RADIUS = radius;
    var ACTOR = actorName;

    if (DIALOG.getId() == TRIGGER_ID) {

        //todo Replace @p while string has this token
        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName());
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);

        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}



