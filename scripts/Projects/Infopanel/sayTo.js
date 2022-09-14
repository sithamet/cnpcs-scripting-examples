
function dialog(e) {

    var FAIL = "…И ловит громадную раскаленную каплю прямо в голову. @p вспыхивает, как спичка, и падает прямо в раскаленную жидкость, скрываясь с ней с головой. "

    var SUCCESS = "…И вы отскакиваете ровно на край громадной раскаленной лужи, что вытекает из дисплея. "

    sayOnDialog(207,
        "&a" + "@p" + "&r",
        "*Тянется под консоль перед дисплеем и начинает копошиться там*.",
        5,
        e);

    sayOnDialog(211,
        "&a" + "@p" + "&r",
        "*Пытается сломать Инфодисплей, но крепкое стекло выдерживает все попытки*",
        15,
        e);

    sayOnDialog(210,
        "&a" + "@p" + "&r",
        "КРЯК! \n" +
        "\n" +
        "@p наносит удар, и толстое армированное стекло лопается. Трещины бегут по детскому лицу робота, как по льду. Изображение помутнилось. На миг, все чувствуют запах *победы*.\n" +
        "\n" +
        "Внезапно, к нему примешивается дух жара!\n" +
        "\n" +
        "Поток раскаленной плазмы из дисплея вырывается сквозь трещины. Он летит прямо на окружающих! \n" +
        "\n" +
        "Это был §oплазменный§r дисплей. ",
        30,
        e);

    sayOnDialog(212,
        "&a" + "@p" + "&r",
        "*Тело реагирует быстрее разума, и @p делает рывок в сторону, прочь от раскаленных брызг… *",
        30,
        e);
    sayOnDialog(225,
        "&a" + "@p" + "&r",
        SUCCESS,
        30,
        e);
    sayOnDialog(224,
        "&a" + "@p" + "&r",
        FAIL,
        30,
        e);

    sayOnDialog(213,
        "&a" + "@p" + "&r",
        "*Расправляется и бросает на раскаленную плазму не менее жгучий взгляд. Так просто плазма не победит.*",
        30,
        e);
    sayOnDialog(232,
        "&a" + "@p" + "&r",
        FAIL,
        30,
        e);

    sayOnDialog(214,
        "&a" + "@p" + "&r",
        "*Разум реагирует быстрее тела. Каким-то невероятным чутьем, @p понимает, что нужно не бежать назад — а вперед. И прежде чем успевает остановить себя, бросается в рискованный рывок...*",
        30,
        e);
    sayOnDialog(229,
        "&a" + "@p" + "&r",
        SUCCESS,
        30,
        e);
    sayOnDialog(228,
        "&a" + "@p" + "&r",
        FAIL,
        30,
        e);

    sayOnDialog(215,
        "&a" + "@p" + "&r",
        "*Тело реагирует быстрее разума. @p ловко скользит между брызг плазмы, как танцор. С поражающей грацией, Эго проходит в сантиметрах от обжигающего потока…*",
        30,
        e);
    sayOnDialog(231,
        "&a" + "@p" + "&r",
        SUCCESS,
        30,
        e);
    sayOnDialog(230,
        "&a" + "@p" + "&r",
        FAIL,
        30,
        e);

}

function sayOnDialog(id, actorName, message, radius, event) {

    var PLAYER = event.player;
    var MESSAGE = message;
    var TRIGGER_ID = id;
    var DIALOG = event.dialog;
    var RADIUS = radius;
    var ACTOR = actorName;

    if (DIALOG.getId() == TRIGGER_ID && !PLAYER.hasReadDialog(TRIGGER_ID)) {

        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName());
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);



        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}

