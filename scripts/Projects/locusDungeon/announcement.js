var PLAYER;
var SCOREBOARD

function target(e) {
    var RADIUS = RADIUS;

    sayOnTrigger(
        "dinner_an",
        "Aaron",
        "&3Глашатай&r",
        "Гроза несправедливости, Оруженосец Святого Солнца и один в поле воин — Аарон из потока Праведности! Вопреки гордыне и соблазнам, остался в Культе Порядка, и приглашен лично Отцом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Failin",
        "&3Глашатай&r",
        "В зал входит Фейлин Фульгур, член семьи Экзо Фергюса, дочь Короля Пик! Ассистент босса Скорп-Стрит, психомант, музыкант и геральд закона морали Нового Морхиля! Приглашена на ужин лично Локусом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Argia",
        "&3Глашатай&r",
        "Встречайте Куратора Скорп-Стрит, Аргию — она любит неизведанное, и тайна отвечает ей взаимностью! Гостья Звёздной Матери Артемии. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Baron",
        "&3Глашатай&r",
        "Встречайте Барона Деиччиде, убийцу Семи Богов, преступника всия Меиссы! Ему даровано прощение Семьей, и приглашен он к Отца столу",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Alv",
        "&3Глашатай&r",
        "Некромант на стороне живых, Альв! Гость Саны, Девы в Белом, и надежда Морхиля в грядущей Ночи. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "A715Z",
        "&3Глашатай&r",
        "Поприветствуем же A-715Z, Грозу Тайны и Царицу Сети! Первой встретила Звездную Мать Артемию, и приглашена на Родительский Ужин ею лично. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Bertram",
        "&3Глашатай&r",
        "Приветствуем Бертрама Беккерхайма — он влюблен в секреты прошлого и готов сделать ради них всё, и тайны не чают в нём души тоже. Гость Артемии, Звёздной Матери.",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Desma",
        "&3Глашатай&r",
        "В зал входит Десма Сицини, Хранительница Культа Порядка и его основательница, глашатай Правды и друг Закона! Чемпионка Отца и Матери, Геральд Второй Реставрации Храма, Десма Локусом и Артемией одновременно — и вольна выбирать стол. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )

}

function sayOnTrigger(id, name, actorName, message, radius, event) {

    if (event.entity.getType() == 1) {
        PLAYER = event.entity;
    } else {return}

    if (name != PLAYER.name) {
        return;
    }

    SCOREBOARD = PLAYER.world.getScoreboard();

    if (getScore(id) == 0) {

        actorName = actorName.replace(/@p/gi, PLAYER.getDisplayName());
        message = message.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), radius, 1);
        setScore(id, 1);



        for (var i = 0; i < players.length; i++) {
            players[i].message(actorName + ": " + message);

        }

    }

}

function getScore(id) {
    var result;

    try {
        result = SCOREBOARD.getPlayerScore(PLAYER.name, id, "");

    } catch (error) {
        result = 0;
    }

    return Number(result);

}

function setScore(id, score) {

    try {
        // @ts-ignore
        SCOREBOARD.setPlayerScore(PLAYER.name, id, score, "");
    } catch (error) {
        // @ts-ignore
        SCOREBOARD.addObjective(id, "dummy");
        // @ts-ignore
        SCOREBOARD.setPlayerScore(PLAYER.name, id, score, "")
    }

}
