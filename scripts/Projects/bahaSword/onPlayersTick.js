//эффекты всякие визуальные
function tick(event) {

    if (event.player.getMainhandItem().getDisplayName() == "§bДушитель") {

        event.player.world.spawnParticle(
            "reddust",
            event.player.getX(),
        event.player.getY() + 1.5,
            event.player.getZ(),
            0.4, 0.4, 0.4, 0.4,
            15)

    }

    if (event.player.getTempdata().get("stitched") == true) {

        event.API.executeCommand(event.player.getWorld(), "particle blockdust "  + event.player.getX() + " " + event.player.getY() + " " +  event.player.getZ() + " 0.3 0.9 0.3 0 20 normal @a 214")
        event.player.getWorld().playSoundAt(event.player.getPos(), "ancientbeasts:ghost_ambient", 4, 0)

    }



}