var START_ID = 497;

function interact(e) {

    if (e.player.getTempdata().get("stitched")) {
        e.player.message("&c[" + e.item.getDisplayName() + "]:&r " +
        "*Шов отказывается открываться — он буквально требует выплеснуть почерпнутый вами потенциал.*")
    }

    else if (e.item.getDurabilityValue() > 0) {
        e.player.showDialog(START_ID, "§c"+ e.item.getDisplayName() + "§r");

    }    else {
        e.player.message("&c[" + e.item.getDisplayName() + "]:&r " +
            "Бутылка Шва пуста и ее толстое стекло отсвечивает коричневым — как засохшая кровь. Её пустота вселяет тревогу.")
    }


}