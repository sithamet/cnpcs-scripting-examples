function init(event) {

    var ITEM = event.item;

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(17, "variedcommodities:pipe_wrench");
    ITEM.setItemDamage(17);
    ITEM.setCustomName("§cГаечный ключ для Шовмашины");

    ITEM.setLore([
        "§7Обычный гаечный ключ со множеством царапин.",
        "§7Рукоять перемотана изолентой для удобного хвата."
    ])

}




function interact(e) {

    if (e.type !== 0) {
        e.target.getTempdata().clear();
        e.target.getStoreddata().clear();
    }

    e.setCanceled(true)
    e.player.message("&c[Гаечный ключ]&r: *От одного вида ключа, стрелки блока начинают дергаться, а реле переключаются. Можно уже и не стукать — если не хочется, конечно*")
}