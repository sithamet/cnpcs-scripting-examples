function interact(e) {

    if (e.type !== 0) {
        e.target.getTempdata().clear();
        e.target.getStoreddata().clear();
    }

    e.setCanceled(true)
    e.player.message("Data cleared")
}