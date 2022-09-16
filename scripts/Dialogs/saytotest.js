
function target(e) {


}

function sayOnTrigger(name, actorName, message, radius, event) {

    var PLAYER;
    if (event.entity.getType() == 1) {
        PLAYER = event.entity;
    } else {return}
    var MESSAGE = message;
    var RADIUS = radius;
    var ACTOR = actorName;



    if () {

        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName());
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);



        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}

