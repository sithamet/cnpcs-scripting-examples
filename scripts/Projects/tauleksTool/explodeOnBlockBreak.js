var LOG = false;
var PLAYER;
var CHANCE = 1;
var RADIUS = 30;

function broken(event) {

    PLAYER = event.player;
    var BLOCK = event.block;


    if (PLAYER.getGamemode() != 1 ) {

        var roll = Math.floor(Math.random() * 100) + 1;


        if (roll <= CHANCE) {
            var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);


            for (var i = 0; i < players.length; i++) {
                players[i].message("&c" + PLAYER.getDisplayName() +"&r"+ ": " + "Когда " + PLAYER.getDisplayName() + " касается к очередному предмету, движение вдруг вкладывает в объект невероятную энергию — и происходит взрыв!");
            }
            PLAYER.message("&c" + PLAYER.getDisplayName() +"&r"+ ": " + "Когда " + PLAYER.getDisplayName() + " касается к очередному предмету, движение вдруг вкладывает в объект невероятную энергию — и происходит взрыв!");

            PLAYER.world.explode(PLAYER.getPos().getX(),
                PLAYER.getPos().getY(),
                PLAYER.getPos().getZ(),
                2, true, false);
        }
    }

    log("Chance was " + roll);


}

function log(message) {

    if (LOG) {
        PLAYER.message(message);
    }

}