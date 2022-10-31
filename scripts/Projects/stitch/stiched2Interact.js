var API;

var PLAYER_TP_SANITY_COST = 10;
var PLAYER_TP_INTEGRITY_COST = 30;
var TARGET_TP_PLAYER_SANITY_COST;
var TARGET_TP_PLAYER_INTEGRITY_COST;
var TARGET_TP_TARGET_SANITY_COST;
var TARGET_TP_TARGET_INTEGRITY_COST;


function attack(e) {

    if (e.player.name == "Baron" && e.player.getTempdata().get("stitched") == true) {

        API = e.API;

        switch (e.player.getTempdata().get("stitchSpell")) {
            case "teleport":
                var SANITYCOST = PLAYER_TP_SANITY_COST;
                var INTEGRITYCOST = PLAYER_TP_INTEGRITY_COST;
                var distance = e.player.getStoreddata().get("stitchDistance");

                var result = teleportPlayer(e, distance);
                if (result > 0) {
                    e.player.getTempdata().put("stitched", false);
                    e.player.getTempdata().put("stitchSpell", 0);
                }
                e.API.executeCommand(e.player.getWorld(), "needs " + e.player.name
                + " san add " + -SANITYCOST)
                e.API.executeCommand(e.player.getWorld(), "needs " + e.player.name
                + " int add " + -INTEGRITYCOST)

                break;

            case "teleport_others":
                var SANITYCOST = TARGET_TP_PLAYER_SANITY_COST;
                var INTEGRITYCOST = TARGET_TP_PLAYER_INTEGRITY_COST;
                var SANITYCOST_TARGET = TARGET_TP_TARGET_SANITY_COST;
                var INTEGRITYCOST_TARGET = TARGET_TP_TARGET_INTEGRITY_COST;

                var distance = e.player.getStoreddata().get("stitchDistance");

                var target;

                if (e.player.getTempdata().get("stitchTarget") == null) {
                    e.player.message("Is null")
                    target = getTeleportTarget(e, distance);
                    e.player.getTempdata().put("stitchTarget", target)
                    break;
                }

                target = e.player.getTempdata().get("stitchTarget");

                var result = teleportTargetToBlock(e, target, distance);


                if (result > 0) {
                    e.player.getTempdata().put("stitched", false);
                    e.player.getTempdata().put("stitchSpell", 0);

                    e.API.executeCommand(e.player.getWorld(), "needs " + e.player.name
                    + " san add " + -SANITYCOST)
                    e.API.executeCommand(e.player.getWorld(), "needs " + e.player.name
                    + " int add " + -INTEGRITYCOST)

                    if (target.getType() == 1) {
                        e.API.executeCommand(e.player.getWorld(), "needs " + e.target.name
                        + " san add " + -SANITYCOST_TARGET)
                        e.API.executeCommand(e.player.getWorld(), "needs " + e.target.name
                        + " int add " + -INTEGRITYCOST_TARGET)
                    }

                    e.player.getTempdata().remove("stitchTarget")

                }

                break;

        }

    }

}

function teleportPlayer(e, distance) {

    var target = e.player.rayTraceBlock(distance, false, true);

    if (target == null) {
        sayTo(e.player, "&c[Шов]&r", "*" + e.player.getDisplayName() + " безуспешно пытается сконцентрироваться на цели. Место должно быть конкретным.*");
        return 0;
    }

    target = target.getBlock();

    var teleported = teleportToBlock(target, e.player)

    //no free 2-blocks space
    if (teleported == 0) {
        sayTo(e.player, "&c" + "[Шов]" + "&r",
            "*Шов срывается, не успев замкнуться — на пути стало препятствие. Вам стоит прицелиться лучше.*")
        return 0;
    } else {
        sayToAll(e.player, 15, "&c" + "&c" + e.player.getDisplayName() + "&r",
        "*" + e.player.getDisplayName() + " взрывается кровавым дождём и исчезает.*", false);
        sayTo(e.player, "&c" + "[Шов]" + "&r", "*Вы разлетаетесь дождем со Шва на сотни независимо мыслящих капель — и собираетесь воедино на новом месте*.")

    }


    e.player.getWorld().playSoundAt(e.player.getPos(), "ancientbeasts:ghost_death", 3, 0)

    return 1;


}


function teleportTargetToBlock (e, target, distance) {

    e.player.message("&eDistance is = " + distance)
    var destination = e.player.rayTraceBlock(distance, false, true);

    if (destination == null) {
        sayTo(e.player, "&c[Шов]&r", "*" + e.player.getDisplayName() + "  безуспешно пытается сконцентрироваться на цели. Место должно быть конкретным..*");
        return 0;
    }

    destination = destination.getBlock();

    var teleported = teleportToBlock(destination, target)

    var targetName = target.getType() == 1 ? target.getDisplay() : target.getEntityName();

    //no free 2-blocks space
    if (teleported == 0) {
        sayTo(e.player, "&c" + "[Шов]" + "&r",
            "*Шов срывается, не успев замкнуться — на пути стало препятствие. Вам стоит прицелиться лучше.*")
        return 0;
    } else {
        sayToAll(target, 15, "&c" + "&c" + targetName + "&r",
        "*" + targetName + " взрывается кровавым дождём и исчезает.*", false);

       if (target.getType() == 1) {
           sayTo(target, "&c" + "[Шов]" + "&r", "*Вы разлетаетесь дождем со Шва на сотни независимо мыслящих капель — и собираетесь воедино на новом месте*.")
       }

       sayTo(e.player, "&c" + "[Шов]" + "&r",
           "*Вы протягиваете " + targetName + " сквозь Швы Изнанки — и собираете на новом месте.*")

    }

    target.getWorld().playSoundAt(target.getPos(), "ancientbeasts:ghost_death", 3, 0)

    return 1;
}

function getTeleportTarget(e, distance) {

    var target = e.player.rayTraceEntities(distance, false, true)

    if (target.length < 1) {
        sayTo(e.player, "&c[Шов]&r", "*" + e.player.getDisplayName() + "  безуспешно пытается сконцентрироваться на цели. Это должна быть сущность...*");
        return "";
    }

    target = target[0];


    if (target.getType() == 1) {

        sayTo(target, "&c" + "[Шов]" + "&r", "*" + e.player.getDisplayName() + " делает жест, и ваши очертания начинают плыть багровыми каплями, как тающий воск.*")
        sayTo(e.player, "&c" + "[Шов]" + "&r", "*" + target.getDisplayName() + " теперь во Швах — осталось выбрать, куда переместить нить этого Эго.*")
        target.getTempdata().put("stitched", true);

    } else {
        sayTo(e.player, "&c" + "[Шов]" + "&r", "*" + target.getEntityName() + " теперь во Швах — осталось выбрать, куда переместить нить этого Эго.*")

    }
    return target;


}


function rollDice(size) {
    return Math.floor(Math.random() * size) + 1;
}


/**
 * @param target iBlock where
 * @param entity iEntity who
 * @return 0 if obstructed, 1 if success
 */
function teleportToBlock(target, entity) {

    var teleportOnBlock = !target.isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 1, target.getZ()).isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 2, target.getZ()).isAir();

    var teleportOnXMinus = !target.isAir()
        && target.getWorld().getBlock(target.getX() - 1, target.getY() + 1, target.getZ()).isAir()
        && target.getWorld().getBlock(target.getX() - 1, target.getY() + 2, target.getZ()).isAir();
    var teleportOnXPlus = !target.isAir()
        && target.getWorld().getBlock(target.getX() + 1, target.getY() + 1, target.getZ()).isAir()
        && target.getWorld().getBlock(target.getX() + 1, target.getY() + 2, target.getZ()).isAir()
    var teleportOnZMinus = !target.isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 1, target.getZ() - 1).isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 2, target.getZ() - 1).isAir()
    var teleportOnZPlus = !target.isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 1, target.getZ() + 1).isAir()
        && target.getWorld().getBlock(target.getX(), target.getY() + 2, target.getZ() + 1).isAir()

    if (!(teleportOnBlock || teleportOnXMinus || teleportOnXPlus || teleportOnZMinus || teleportOnZPlus)) {
        return 0;
    }
    var pos;


    if (teleportOnBlock) {
        pos = target.getWorld().getBlock(target.getX(), target.getY() + 1, target.getZ()).getPos()
    } else if (teleportOnXMinus) {
        pos = target.getWorld().getBlock(target.getX() - 1, target.getY(), target.getZ()).getPos();
    } else if (teleportOnXPlus) {
        pos = target.getWorld().getBlock(target.getX() + 1, target.getY(), target.getZ()).getPos();
    } else if (teleportOnZPlus) {
        pos = target.getWorld().getBlock(target.getX(), target.getY(), target.getZ() + 1).getPos();
    } else if (teleportOnZMinus) {
        pos = target.getWorld().getBlock(target.getX(), target.getY(), target.getZ() - 1).getPos();

    }

    API.executeCommand(target.getWorld(), "particle blockdust " + entity.getX() + " " + entity.getY() + " " + entity.getZ() + " 0.3 0.9 0.3 0.3 200 normal @a 214")
    entity.setPosition(pos.getX(), pos.getY(), pos.getZ());
    API.executeCommand(target.getWorld(), "particle blockdust " + entity.getX() + " " + entity.getY() + " " + entity.getZ() + " 0.3 0.9 0.3 0.3 200 normal @a 214")


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

