var state = "gm1state"
var timed = true;
var durationTicks = 20;
var PLAYER;

function init(e) {

    var ITEM = e.item;

    ITEM.setDurabilityShow(false);

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(24, "ancientbeasts:ice_dart");
    ITEM.setItemDamage(24);
    ITEM.setCustomName("§aСовершенная отметина Интры");

    ITEM.setLore([
        "§7На вашем деле изображено падающее вниз головой",
        "§7тело Интры. Она не приносит никаких ощущений, ",
        "§7но сама мысль о ней заставляет оживать силу.",
        "§7Вы узнаете её — это мощь Орудия Таулеков.",
        "§e§l[Основное Действие]:§r§e Применить навык (левый клик)",
        "§e§l[Основное Действие]:§r§e создать в мире до 5-ти блоков или",
        "§eматериализовать любой объект в инвентаре.",
        "§l§4Важно!:§r§7 Не делает неуязвимым в бою против Эго!"
    ])


}

function attack(e) {

    e.setCanceled(true);

    e.player.getGamemode() === 0 ? e.player.setGamemode(1) : e.player.setGamemode(0)

    if (e.player.getGamemode() === 1) {

        sayTo(e.player, "&b[Совершенная Отметина Интры]&r", e.player.getDisplayName()
        + " чувствует, как в Эго врезается луч силы Орудия Таулеков. Это одно из самых чувств, что можно испытать — не ограниченная ничем творческая мощь.")
        for (var i = 0; i < 10; i++) {

            e.player.getWorld().thunderStrike(e.player.getX(), e.player.getY(), e.player.getZ())
            e.player.getTempdata().put(state, true)
        }

        if (timed == true) {
            e.player.getTimers().forceStart(3, durationTicks, false);
        }

        sayToAll(e.player, 30, "&b[Окружение]&r", "*" + e.player.getDisplayName() + " вдруг пронзается десятком сверхзаряженных молний. Они впитываются в Эго как в губку, не причиняя вреда.*", false)
    } else {
        sayTo(e.player, "&b[Совершенная Отметина Интры]&r", e.player.getDisplayName()
        + " отпускает силу Орудия. Оно растворяется в Рифе, готовое явиться назад в любой момент.")
        e.player.getTempdata().put(state, false)

    }
}

function timer(event) {

    if (event.id === 1) {
        event.player.setGamemode(0);
        sayTo(e.player, "&b[Совершенная Отметина Интры]&r", e.player.getDisplayName()
        + " чувствует, как его отпускает сила Орудия. Оно растворяется в Рифе, готовое явиться назад в любой момент.")
        event.player.getTempdata().put(state, false)
    }

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
    if (target.typeOf(EntityType_PLAYER)) {
        target.message(name + ": " + message);
    }
}
