
function dialog(e) {

    sayOnDialog(143,
        "&a" + "@p" + "&r",
        "*@p говорит «Нет» — и в тот же момент, молот Судьи падает на череп. Он раскалывается на мелкий прах — но когда молот поднимается, череп собирается из пыли обратно, как в замедленной перемотке.*",
        20,
        e);
    sayOnDialog(143,
        "&a" + "@p" + "&r",
        "*И в тот же момент, исчезает @p — на месте остается лишь прах*",
        20,
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
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);

        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}



