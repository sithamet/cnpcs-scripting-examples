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
        "§b§l//Правый клик:§r§b перемещает во времени на ~30 секунд назад,",
        "§b//перенося во времени и восстанавливая здоровье на тот момент.",
        "§b§l//Левый клик (только в боевке):§r§b запоминает позицию во времени.",
        "§e§l[Быстрое Действие]:§r§eПереместиться во времени, взять часы в руки"
    ])

}

var time = 600;
var count = 0;
function tick(e) {

    if (e.player.getStoreddata().has("clockUser")) {
        if (count == 0 || count % time == 0) {
            e.player.getStoreddata().put("lastLocationX", e.player.getX());
            e.player.getStoreddata().put("lastLocationY", e.player.getY());
            e.player.getStoreddata().put("lastLocationZ", e.player.getZ());


            e.player.getStoreddata().put("lastHealth", e.player.getHealth());

            if (count % time == 0) {
                count = 0;
            }

        }



    }

    if (e.player.getMainhandItem().getDisplayName() == "§bЧас Порядка") {

        e.player.getWorld().playSoundAt(e.player.getPos(), "flansmod:_ambirconsteamriflereload", 1, 0)
        e.player.getWorld().playSoundAt(e.player.getPos(), "flansmod:_ambirconsteamriflereload", 1, 0)

    }


}

