function init(event) {

    var ITEM = event.item;
    ITEM.setDurabilityColor(15342849);
    ITEM.setDurabilityValue(1)
    ITEM.setDurabilityShow(true);

    ITEM.setMaxStackSize(1);
    ITEM.setTexture(7, "stewprops:bottle_big_red");
    ITEM.setItemDamage(7);
    ITEM.setCustomName("§cНестабильный Шов");

    ITEM.setLore([
        "§7Бутылка из толстого стекла с красной этикеткой §cШов§r",
        "§7закрытая пробкой с выжженой буквой «А». ",
        "§7Бутылка выглядит как настоящее произведение искусства.",
        "§7Горлышко — это две фигуры, держащиеся за руки в танце.",
        "§7Одна из них — красивая человеческая девушка, а другая",
        "§7— искаженное человекоподобное чудовище. ",
        "§e§l[Быстрое Действие]:§r§eВзять бутылку в руку. Навыки применяются с бутылкой в руке",
        "§e§l[Основное Действие]:§r§e Применить навык"
        ])

}
