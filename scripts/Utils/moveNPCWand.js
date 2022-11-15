var memory = "memoryPuppet";
var speed = 1.0
var maxDistance = 300

function init(event) {

    var ITEM = event.item;

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(23, "minecraft:feather");
    ITEM.setItemDamage(23);
    ITEM.setCustomName("§cПутеводитель");

    ITEM.setLore([
        "§7Правый клик чтобы выбрать НПЦ или в воздух дабы сбросить",
        "§7Левый чтобы переместить ",
        "§7Текущая скорость - §r" + speed,
        "§7Shift + Правый Клик -> вкл. 1 чтобы изменить скорость"
    ])

}

function interact(e) {
    if (e.type == 1) {
        e.player.getTempdata().put(memory, e.target);
        e.player.message("§bПутеводитель§r: " + e.target.getName() + " захвачен")
        return;
    } else if (e.type === 0) {
        e.player.getTempdata().remove(memory)
        e.player.message("§bПутеводитель§r: цель сброшена");
        return;
    }

}

function attack(e) {

    if (!e.player.getTempdata().has(memory)) {
        e.player.message("§bПутеводитель§r: нет цели чтобы вести.");
        e.setCanceled(true)
        return;

    }


    var target = e.player.rayTraceBlock(maxDistance, false, true);

    if (target == null) {
        e.player.message("§bПутеводитель§r: нужно кликнуть по конкретному твердому блоку");
    }

    target = target.getBlock();

    e.player.message("§bПутеводитель§r: " + e.player.getTempdata().get(memory).getName() +
    " пошел в путь-дорожку на " + target.getX() + " " + target.getY() + " " + target.getZ());

    if (e.player.getTempdata().get(memory).typeOf(EntityType_NPC)) {
        e.player.getTempdata().get(memory).getAi().setReturnsHome(false);
        e.player.getTempdata().get(memory).updateClient()

    }

    e.player.getTempdata().get(memory).navigateTo(
        target.getX(), target.getY(), target.getZ(),
        speed
        )






    e.setCanceled(true)

}