var name = "&c[Шовный Кран]&r"
var nameGeneric = "Шов"
var nameSpecial = "Нестабильный Шов"

function init(e) {
    e.block.setModel("minecraft:hopper")
    e.block.getTempdata().put("name", "output")

}

function tick(e) {
    var level = e.block.getStoreddata().get("level");

    if (level > 0.1) {
        e.API.executeCommand(e.block.getWorld(), "particle blockdust " + e.block.getX() + " " + e.block.getY() + " " + e.block.getZ() + " 0.1 0.9 0.1 0 1 normal @a 214")
    }

}

function interact(e) {

    var level = e.block.getStoreddata().get("level")
    sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )



    // sayTo(e.player, name, level)
    var isUsualStitch = e.player.getMainhandItem().getDisplayName().substring(2).startsWith(nameGeneric)
    var isSpecialStitch = e.player.getMainhandItem().getDisplayName().substring(2).startsWith(nameSpecial)
    var isEmptyBottle = e.player.getMainhandItem().getName() == "minecraft:glass_bottle"

    // sayTo(e.player, name, "usual " + isUsualStitch + " special " + isSpecialStitch + " empty " + isEmptyBottle)


    if (isEmptyBottle) {

        var item = e.block.getWorld().createItem("stewprops:bottle_big_red", 0, 1)
        item.setCustomName("§4Шов§r")
        var lore = [
            "§7Сладкий на нюх экстракт, похожий на сироп.",
            "§7Бирка на довольно угловатой бутылке презентует",
            "§7название и способ применения: разбавить 1 ложку",
            "§7препарата на 500мл воды или 50мс спирта.",
            "§7Нельзя пить чистым без подготовки!",
            "§4Вызывает привыкание",
            "Эффекты: [кубик 1-20 ГМский тикет Maryjo/Reuder]"
        ]
        item.setLore(lore);
        item.setStackSize(1)

        e.player.getMainhandItem().setStackSize(e.player.getMainhandItem().getStackSize() - 1)
        e.player.dropItem(item);

        if (level >= 10) {
            sayTo(e.player, name, "*" + e.player.getDisplayName() + " подносит пустую бутылку к крану. Хитрый механизм всасывает ее в себя, наполняет бутылку по горлышко, запечатывает и выдает назад в руки.")
            e.block.getStoreddata().put("level", level - 10)
            sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )
        } else {
            sayTo(e.player, name, "*Кран сух. Бутылка вставляется в приемник, но ничего не происходит. Похоже, Шва недостаточно для наполнения.*")
            sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )
        }
        return;


    }

    if (isUsualStitch) {
        e.player.getMainhandItem().setStackSize(e.player.getMainhandItem().getStackSize() - 1)
        e.block.getStoreddata().put("level", level + 10)
        e.player.dropItem(e.block.getWorld().createItem("minecraft:glass_bottle", 0, 1));
        sayTo(e.player, name, "*" + e.player.getDisplayName() + " подносит бутылку Шва к крану. Тот хватает ее горлышко хитрым зажимом, и резервуар всасывает Шов в себя*.")
        sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )

        return;
    }

    if (isSpecialStitch) {

        if (e.player.getMainhandItem().getDurabilityValue() >= 1) {
            sayTo(e.player, name, "*Горлышко бутылки идеально подходит к крану, но поток не открывается. Похоже, она и так полна.*")
            sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )

            return;
        }

        if (level >= 0.1) {
            while (level >= 0 && e.player.getMainhandItem().getDurabilityValue() < 1) {
                e.player.getMainhandItem().setDurabilityValue(e.player.getMainhandItem().getDurabilityValue() + 0.1)
                level = level - 1;
            }
            e.player.getMainhandItem().setItemDamage(7);
            e.block.getStoreddata().put("level", level)
            sayTo(e.player, name, "*" + e.player.getDisplayName() + " подносит бутылку Шва к крану. Тот хватает горлышко хитрым зажимом и наполняет резную бутыль*.")
            sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )

        }
        else {
            sayTo(e.player, name, "*Кран сух. Бутылка вставляется в приемник, но ничего не происходит. Похоже, Шва недостаточно для наполнения.*")
            sayTo(e.player, name, "*В резервуаре осталось примерно " + e.block.getStoreddata().get("level")/10 + " порции*." )


        }
    }


}


function sayToAllAroundBLock(block, radius, name, message) {

    var players = block.getWorld().getNearbyEntities(block.getPos(), radius, 1);

    for (var i = 0; i < players.length; i++) {

        players[i].message(name + ": " + message);

    }

}

function sayTo(target, name, message) {
    if (target.typeOf(EntityType_PLAYER)) {
        target.message(name + ": " + message);
    }
}