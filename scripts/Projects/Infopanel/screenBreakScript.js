function dialogClose(event) {
    var PLAYER = event.player;
    var NPC = event.npc;
    var DIALOG = event.dialog;
    var FAILIDS = [224, 232, 228, 230]
    var PASSIDS = [225, 229, 231];
    var LOGGING = true;


    var x = 88.0;
    var y = 6.0;
    var z = -27.0;

    var isFail;
    var isPass;

    for (var i = 0; i < FAILIDS.length; i++) {
        if (FAILIDS[i] == DIALOG.getId()) {
            isFail = true;
        }
    }
    for (var i = 0; i < PASSIDS.length; i++) {
        if (PASSIDS[i] == DIALOG.getId()) {
            isPass = true;
        }
    }

    if (isPass || isFail) {

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), 15, 1);

        for (var i = 0; i < players.length; i++) {

            players[i].addPotionEffect(12, 300, 1, true);
            if (LOGGING) {players[i].message("Effect applied to " + players[i].name)}
        }


        PLAYER.world.explode(x, y, z, 5, true, false);
        PLAYER.world.getBlock(x, y, z).setBlock("lava");
        PLAYER.world.getBlock(x, y-1, z).setBlock("lava");
        PLAYER.world.getBlock(x, y-2, z).setBlock("lava");
        PLAYER.world.getBlock(x, y-2, z).setBlock("lava");
        PLAYER.world.getBlock(x, y-2, z+1).setBlock("lava");
        PLAYER.world.getBlock(x, y-2, z-1).setBlock("lava");



        if (isFail) {

            NPC.executeCommand("warp betweenworld " + PLAYER.name);
            PLAYER.message("&c" + PLAYER.getDisplayName() + " — жертва от информационной нестабильности. Нужно открыть тикет Междумирья.")
            NPC.setDialog(0, event.API.getDialogs().get(233));
            NPC.updateClient();

        }

    }

}


