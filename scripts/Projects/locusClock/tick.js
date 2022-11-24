var time = 600;
var count = 0;
var count2 = 0;
function tick(e) {

    if (e.player.getStoreddata().has("clockUser")) {
        if (count == 0 || count % time == 0) {
            e.player.getStoreddata().put("lastLocationX", e.player.getX());
            e.player.getStoreddata().put("lastLocationY", e.player.getY());
            e.player.getStoreddata().put("lastLocationZ", e.player.getZ());


            e.player.getStoreddata().put("lastHealth", e.player.getHealth());
            count++

            if (count % time == 0) {
                count = 0;
            }

        }



    }

    if (e.player.getMainhandItem().getDisplayName() == "§bЧас Порядка") {

        if (count2 == 1) {

            e.player.getWorld().playSoundAt(e.player.getPos(), "bibliocraft:tock", 1, 0)
            count2 = 0;
        } else {
            e.player.getWorld().playSoundAt(e.player.getPos(), "bibliocraft:tick", 1, 0)
            count2 = 1;
        }

    }


}

function init(event) {

    var ITEM = event.item;

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(77, "minecraft:clock");
    ITEM.setItemDamage(77);
    ITEM.setCustomName("§bЧас Порядка");

    ITEM.setLore([
        "§7Часы начинают идти лишь когда на них смотрят.",
        "§7Стрелочка уверенно ползет вперед, уверенная в ",
        "§7незыблемом Порядке: после сегодня наступит",
        "§7завтра, а до сегодня было вчера. ",
        "§7//§lПравый клик:§r§7 перемещает во времени на ~30 секунд назад, восстанавливая позицию и здоровье на тот момент.",
        "§7§l//Левый клик (только в боевке):§r§7 запоминает позицию во времени.",
        "§e§l[Быстрое Действие]: §r§eПереместиться во времени."
    ])

}
