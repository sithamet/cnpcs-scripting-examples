var ID = "stitchLevel"

function init(e) {
    var ITEM = e.item;
    ITEM.setMaxStackSize(1);
    ITEM.setTexture(22, "minecraft:stick");
    ITEM.setItemDamage(22);
    ITEM.setCustomName("§bПравый клик чтобы прокачать во Шве, левый чтобы снизить уровень");
    ITEM.setLore(["§bКлики в воздухе применяют действие на себя",
                    "§7Уровень 0 — не пробовал, может пройти линию первой пробы",
                    "§7Уровень 1 — пробовал один раз, может телепортировать себя",
                    "§7Уровень 2 — проникся секретныеми знаниями, может входить в ГМ3",
                    "§7Уровень 3 — уровень Аргеаса-обычного, может телепортировать других",
                    "§7Уровень 4+ — уровень сюжетных боссов, все лимиты на дальность ТП выкручены"
    ])

}




function attack(e) {
    e.setCanceled(true);
    if (e.type === 1 && e.target.getType() === 1) {
        modStitch(e.player, e.target, -1);
    } else if (e.type === 0) {
        modStitch(e.player, e.player, -1);
    }

}

function interact(e) {
    e.setCanceled(true);
    if (e.type === 1 && e.target.getType() === 1) {
        modStitch(e.player, e.target, 1);
    } else if (e.type === 0) {
        modStitch(e.player, e.player, 1);
    }
}

function modStitch(player, target, mod) {
    var currentScore = getScore(ID, target)
    var actionString = mod > 0 ? "повышен" : "понижен"
    if (currentScore == 0 && mod < 0) {
        player.message("&c[Шов]&r: stitchLevel " + target.getDisplayName() + " уже 0, ниже некуда")
    } else {
        setScore(ID, target, currentScore + mod);
        player.message("&c[Шов]&r: stitchLevel " + target.getDisplayName() + " " + actionString + " с " + currentScore + " до " + getScore(ID, target))
    }
}




function setScore(id, player, score) {
    var SCOREBOARD = player.world.getScoreboard();

    try {
        // @ts-ignore
        SCOREBOARD.setPlayerScore(player.name, id, score, "");
    } catch (error) {
        // @ts-ignore
        SCOREBOARD.addObjective(id, "dummy");
        // @ts-ignore
        SCOREBOARD.setPlayerScore(player.name, id, score, "")
    }

}


function getScore(id, player) {
    var SCOREBOARD = player.world.getScoreboard();

    var result;

    try {
        result = SCOREBOARD.getPlayerScore(player.name, id, "");

    } catch (error) {
        result = 0;
    }

    return Number(result);

}

