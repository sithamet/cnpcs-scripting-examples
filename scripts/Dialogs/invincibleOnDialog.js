function dialog(e) {

    e.player.getStoreddata().put("activeDialog", e.dialog.getId())
}

function dialogClose(e) {
    e.player.getStoreddata().put("activeDialog", "");
}

function damaged(e) {
    var active = e.player.getStoreddata().get("activeDialog")
    if (active !== "" && active !== null) {
        e.setCanceled(true);
    }

}