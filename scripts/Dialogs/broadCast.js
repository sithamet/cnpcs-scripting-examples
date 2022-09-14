
function login(event) {


    var PLAYER = event.player;
    var DIALOG = 170;
    var TARGETS = ["W_Maryjo","GaoZhousan", "Ex", "Bertram", "Lapkin", "Yumost",
        "Miltor", "Rufus", "Mori", "A715Z", "Alv", "Chad", "Aiko", "Baron",
        "CherenHunbish", "Star", "Shailer", "Ishi", "Alune"]
    var ACTOR = "Test"

    for (var i = 0; i < TARGETS.length; i++) {
        if (TARGETS[i] == PLAYER.name && !PLAYER.hasReadDialog(DIALOG)) {
            PLAYER.showDialog(DIALOG, ACTOR);
        }
    }

}

