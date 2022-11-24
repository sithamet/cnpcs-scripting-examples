var memory = "memoryWand";
var speed = 20
var maxDistance = 100

function init(event) {

    var ITEM = event.item;

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(33, "stewprops:tech_laser_device");
    ITEM.setItemDamage(33);
    ITEM.setCustomName("§cЛазерная указка Локуса");

    ITEM.setLore([
        "§7Лазерная указка — последний подарок Локуса,",
        "§7Бога Порядка, Верховного Судьи и Отца, для некой Форай.",
        "§7Так написано на корпусе. И приписка:",
        "§b«Доверяю Познание тебе как божество божеству»",
        "§7//Правый клик чтобы выбрать Грифона",
        "§7//Левый чтобы переместить. Можно кликать сквозь него: не ударит",
        "§7//Луч должен попать на твёрдый блок в радиусе 16-32 блоков"
    ])

}

function interact(e) {

    if ((e.type == 1) && e.target.typeOf(EntityType_NPC) && (e.target.getName() === "Звездный Грифон Отца")) {
        e.player.getTempdata().put(memory, e.target);
        sayToAll(e.player, 15, "&bЗвёздный Грифон&r", "*" + e.player.getDisplayName() + " показывает Грифону лазерную указку, и тот с готовностью начинает шарить глазами-зорями по земле в поисках заветной точки.*", true)


    }
}

function attack(e) {

    var noCount = 0;

    if (!e.player.getTempdata().has(memory)) {

        ++noCount;

    } else if (e.player.getMount() === null) {

        ++noCount;
    }

    if (noCount == 2) {
        e.player.message("§cЛазерная указка§r: §7//Вам некого вести. Оседлайте Грифона, или кликните по нему правым кликом.");
        e.setCanceled(true)
    }

    var target = e.player.rayTraceBlock(maxDistance, false, true);

    if (target == null) {
        e.player.message("§cЛазерная указка§r: §7//нужно кликнуть по конкретному твердому блоку");
        return;
    }

    target = target.getBlock();

    var entity;

    if (e.player.getMount() !== null && e.player.getMount().typeOf(EntityType_NPC)) {
        entity = e.player.getMount();
    } else {
       if (e.player.getTempdata().has(memory)) {
           entity = e.player.getTempdata().get(memory);
       } else {
           return;
       }
    }


    if (entity.typeOf(EntityType_NPC)) {
        entity.getAi().setReturnsHome(false);
        entity.updateClient()
    }

    entity.navigateTo(
        target.getX(), target.getY(), target.getZ(),
        speed
        )


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
