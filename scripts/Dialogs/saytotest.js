
function dialog(e) {

    sayOnDialog(175,
        "&a" + "@p" + "&r",
        "Замирает, как словно услышав что-то. Однако, никаких звуков точно нет рядом.",
        10,
        e);

    sayOnDialog(186,
        "&a" + "@p" + "&r",
        "Невольно вздрагивает, как словно испугавшись чего-то.",
        10,
        e);

    sayOnDialog(181,
        "&a" + "@p" + "&r",
        "@p принимает очень сосредоточенный вид, как словно решает сложную задачу",
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

    if (DIALOG.getId() == TRIGGER_ID && !PLAYER.hasReadDialog(TRIGGER_ID)) {

        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName());
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);



        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}

