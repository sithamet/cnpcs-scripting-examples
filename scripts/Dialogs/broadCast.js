
function login(event) {


    var PLAYER = event.player;
    var DIALOG = 170;
    var TARGETS = ["Baron", "W_Maryjo"]
    var ACTOR = "Test"

    for (var i = 0; i < TARGETS.length; i++) {
        if (TARGETS[i] == PLAYER.name && !PLAYER.hasReadDialog(DIALOG)) {
            PLAYER.showDialog(DIALOG, ACTOR);
        }
    }

}