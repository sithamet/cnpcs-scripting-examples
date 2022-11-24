var firstUseIntro = 0;
var storedData = "clockUser"


function interact(e) {

    if (e.player.getStoreddata().has(storedData)) {

        var posX;
        var posY;
        var posZ;
        var health;

        if (e.player.getStoreddata().has("override")) {
            e.player.message("has pos")
            posX = e.player.getStoreddata().get("overridePosX")
            posY = e.player.getStoreddata().get("overridePosY")
            posZ = e.player.getStoreddata().get("overridePosZ")
            health = Number(e.player.getStoreddata().get("overrideHealth"))

        } else {
            posX = e.player.getStoreddata().get("lastLocationX")
            posY = e.player.getStoreddata().get("lastLocationY")
            posZ = e.player.getStoreddata().get("lastLocationZ")
            health = Number(e.player.getStoreddata().get("lastHealth"))
        }


        sayToAll(e.player, 15, "&a" + e.player.getDisplayName() + "&r",
        "*" + e.player.getDisplayName() + " переводит стрелку часов назад." + "*",
            true)


        e.player.setHealth(health);

        if (e.player.getMount() !== null) {
            e.player.getMount().setPosition(posX, posY, posZ)
        } else {
            e.player.setPosition(posX, posY, posZ)
        }

        e.player.getWorld().playSoundAt(e.player.getPos(), "bibliocraft:chime", 1, 0)


        sayTo(e.player, "&b[Час Порядка]&r", "*И вместе с часами, " + e.player.getDisplayName() + " переходит в прошлое.*\n&7//Отыграйте, если было заметное перемещение в пространстве или сменя состояния.")

        if (e.player.getStoreddata().has("override")) {
            e.player.getStoreddata().remove("override")
        }


    } else {
        sayTo(e.player, "&b[Час Порядка]&r", "*Когда " + e.player.getDisplayName() + " берет часы в руки, они оживают — и начинают мерно резать время на маленькие кусочки*")
        e.player.getStoreddata().put(storedData, "1")

    }

}

function attack(e) {

    e.player.getStoreddata().put("override", "true")

    e.player.getStoreddata().put("overridePosX", e.player.getX());
    e.player.getStoreddata().put("overridePosY", e.player.getY());
    e.player.getStoreddata().put("overridePosZ", e.player.getZ());

    e.player.getStoreddata().put("overrideHealth", e.player.getHealth())

    sayTo(e.player, "&b[Час Порядка]&r", "&7//Вы запомнили время.")

    e.setCanceled(true)

}


function sayToAll(speaker, radius, name, message, playerIncluded) {

    var players = speaker.world.getNearbyEntities(speaker.getPos(), radius, 1);


    for (var i = 0; i < players.length; i++) {

        if (players[i].name == speaker.name && !playerIncluded) {
            continue;
        }

        players[i].message(name + ": " + message);

    }

}

function sayTo(target, name, message) {
    target.message(name + ": " + message);
}

