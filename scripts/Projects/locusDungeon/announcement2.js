var PLAYER;
var SCOREBOARD

function target(e) {
    var RADIUS = RADIUS;
    sayOnTrigger(
        "dinner_an", //уникальное имя до 15 символов
        "Dumile", //логин персонажа
        "&3Глашатай&r", //От кого отправляются сообщения, @p — имя игрока
        //сообщение, @p — имя игрока
        "Встречайте: Думилэй из Манийской Конфедерации — вечный детектив, для которого нет препятствий! Приглашен Отцом на Родительский Ужин. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )

    sayOnTrigger(
        "dinner_an",
        "Jenna",
        "&3Глашатай&r",
        "Приветствуем Дженну О'Нельсон — психолога и бизнесвумен, женщину быстрого ума и широких талантов, кадетку Шестёрен! Гостья Саны, Девы в Белом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )


    sayOnTrigger(
        "dinner_an",
        "Lelia",
        "&3Глашатай&r",
        "В зал влетает Лелия Юссиэль — стилистка, рестораторка, художница и кандидат в мэры Морхиля! Приглашена лично Локусом. Но Шкигабубль Прекрасный просим держать в кармане. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Forai",
        "&3Глашатай&r",
        "Приветствуем Форай — божество в отставке, великий капитан, верующая Церкви Новой Зари и известная шутница! Приглашена Семьей как божественная родственница к столу Отца. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Lugen",
        "&3Глашатай&r",
        "Встречайте — Люген! Главрач Морхильской Больницы, бывшего Храма Жнецов Посмертия! Гость Дочери в Белом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Lapkin",
        "&3Глашатай&r",
        "В зал входит доктор Чайлд Фримен, известный также как Лапкин, для которого нет преград в своих поисках! Приглашен Звёздной Матерью и Девой в Белом одновременно. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Nagel",
        "&3Глашатай&r",
        "Встречайте: Юлиан Бартоломеус ван Нагель, известный также как Желтый Король и автор первого в Новом Морхиле закона! Приглашен Отцом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Harvester",
        "&3Глашатай&r",
        "Сборщик 391, известен под многими лицами и именами, прибыл! Почетный гость Саны, Девы в Белом, за подвиг в борьбе против Старшего Брата Смерти. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Souvur",
        "&3Глашатай&r",
        "Встречайте, Соувур — сооснователь Егерства, герой борьбы против Старшего Брата Смерти и искатель тайн! Приглашен всей Семьёй. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "GaoZhousan",
        "&3Глашатай&r",
        "Приветствуем Доктора Гао Чжоусань — учительница Общества Бирюзового Краба, мистик, врач и влиятельная женщина! Гостья Звездной Матери и Девы в Белом. ",
        RADIUS, //радиус в блоках
        e //не трогать
        )
    sayOnTrigger(
        "dinner_an",
        "Vivian",
        "&3Глашатай&r",
        "В зал входит Вивиан — маг, целитель и талантливый человек! Приглашен на Ужин Девой в Белом за свои деяния.",
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
