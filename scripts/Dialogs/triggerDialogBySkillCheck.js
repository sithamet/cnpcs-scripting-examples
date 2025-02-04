var PLAYER;
var EVENT;
var SCOREBOARD;

function target(e) {
    // Настрой бросок на проверку, успех которого стартанет диалог

    startDialogAfterCheck(
        rollDice(20) /* Куб, например 20 = d20*/,
        "Восприятие" /* Навык */,
        1 /* Сложность (порог >=) */,
        150 /* ID диалога (показывается возле названия) */,
        "§6[Окружение]§r" /* от чьего имени ведется диалог */,
        "@p вдруг что-то замечает." /* сообщение другим игрокам, не показывается если пусто */,
        15, /* радиус сообщения другим игрокам*/
        "@p проходит мимо, ничего не заметив"/* сообщение если игрок провалил проверку, не показывается если пусто */,
        "переброс" /* можно ли попытаться еще */, /* 
"переброс" — можно войти-выйти в зону триггера, чтобы перебросить кубы, покуда диалог не прочитан хотя бы раз 
"пересмотр" — проверку и диалог можно проходить сколько угодно
"уник" — одна проверка, больше недоступна */
        "игрок" /* К кому привязан результат */, /*
"нпц" — результат запоминается только этим NPC
"мир" — результат запоминается всеми идентичными NPC с диалогом в мире. Риф и Индуры — 2 разных мира
"игрок" — результат крепится за игроком */
        e /* е НЕ УДАЛЯТЬ! */
    );

}


function startDialogAfterCheck(roll, skillName, target, dialogID, actor, publicMessage, radius, failedMessage, retriable, memoryLocation, e) {

    PLAYER = e.entity;
    EVENT = e;

    var LOG = true;
    // подпись
    var id = PLAYER.name + "_" + dialogID;
    var isTried = false;

    //читаем данные из нужного места.  
    var data;
    if (memoryLocation == "мир") {
        data = String(EVENT.npc.world.getStoreddata().get(id));
    } else if (memoryLocation == "нпц") {
        data = String(EVENT.npc.getStoreddata().get(id));
    } else if (memoryLocation == "игрок") {
        data = String(PLAYER.getStoreddata().get(id))
    } else {
        //Кричим что обосрались, если обосрались
        PLAYER.message("Я неверно настроен! Меня зовут \"" + EVENT.npc.name + "\" на \n"
            + " x:" + EVENT.npc.getPos().getX()
            + " y:" + EVENT.npc.getPos().getY()
            + " z:" + EVENT.npc.getPos().getZ()
            + " ошибка: " + "память")
    }

    if (LOG) { PLAYER.message("Data=" + data + " id: " + id); }

    // Если проверка бросается впервые, запрос данных вернет null 
    if (retriable == "уник") {
        if (data != "null") {
            isTried = true;
            if (LOG) { EVENT.npc.sayTo(PLAYER, id + " has been once attempted.") };
        }
    } else if (retriable == "переброс") {
        if (data == "true") {
            isTried = true;
            if (LOG) { EVENT.npc.sayTo(PLAYER, id + " Data is " + data) };

        }
    }


    /* 
    Главное условие показа диалога. 
    Todo — сделать опциональным проверку диалога для перепоказа 
    */
    if (!isTried) {


        var skillID;

        // ищется ID фракции навыка 
        for (var key in SKILL_NAMES) {
            if (key == skillName) {
                skillID = SKILL_NAMES[key];
                // EVENT.npc.say(key + " is " + SKILL_NAMES[key]);
            }
        }

        // подготовка переменных броска 
        var base = PLAYER.getFactionPoints(skillID);
        var final = base + roll;
        var result = "@p &e@r проверку " + SKILL_NAMES_POS[skillID] + "&r " + "(" + roll + "+" + base + ") из " + target;
        var passed = false;


        //сравнивается с порогом 
        if (final >= target) {
            result = result
                .replace(/@p/gi, PLAYER.getDisplayName())
                .replace(/@r/gi, "проходит");
            passed = true;
        } else {
            result = result
                .replace(/@p/gi, PLAYER.getDisplayName())
                .replace(/@r/gi, "проваливает");
        }

        if (LOG) { EVENT.npc.sayTo(PLAYER, result); }


        if (memoryLocation == "мир") {
            data = String(EVENT.npc.world.getStoreddata().put(id, String(passed)));
        } else if (memoryLocation == "нпц") {
            data = String(EVENT.npc.getStoreddata().put(id, String(passed)));
        } else if (memoryLocation == "игрок") {
            data = String(PLAYER.getStoreddata().put(id, String(passed)));
        }


        // EVENT.npc.say("&b" + PLAYER.getDisplayName() + "&r " + result + ": " + final + "(" + roll + "+" +
        //  base + ")" + " из " + target);

        //пишем результат в нужное место 
        //+ показываем публичную реплику начала диалога или провала 
        //+ заменяем wildcard на имя игрока 
        // todo - добавить вериант чтения изнутри игрока 
        if (passed) {


            PLAYER.showDialog(dialogID, actor);

            if (publicMessage != "") {

                actor = actor.replace(/@p/gi, PLAYER.getDisplayName());
                publicMessage = publicMessage.replace(/@p/gi, PLAYER.getDisplayName());

                var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), radius, 1);

                for (var i = 0; i < players.length; i++) {
                    players[i].message(actor + ": " + publicMessage);
                }
            }


        }
        else {

            if (failedMessage != "") {
                failedMessage = failedMessage.replace(/@p/gi, PLAYER.getDisplayName());
                PLAYER.message(actor + ": " + failedMessage);
            }
        }
    }

}

// айдишники 
var SKILL_IDS = {
    FITNESS: 10,
    PERCEPTION: 11,
    AGILITY: 12,
    COORDINATION: 13,
    INGENUITY: 14,
    TECH: 15,
    MAGIC: 16,
    CHARISMA: 17,
    COMPOSURE: 18
}

// для поиска по названию 
var SKILL_NAMES = {
    Тренированность: 10,
    Восприятие: 11,
    Проворство: 12,
    Координация: 13,
    Изобретательность: 14,
    Техника: 15,
    Магия: 16,
    Обаяние: 17,
    Самообладание: 18
}

//для склонения (Проверку Тренированности)
var SKILL_NAMES_POS = {
    10: "Тренированности",
    11: "Восприятия",
    12: "Проворства",
    13: "Координации",
    14: "Изобретательности",
    15: "Техники",
    16: "Магии",
    17: "Обаяния",
    18: "Самообладания",
}

//Бросок кубика. Без нормального распределения. 
function rollDice(size) {
    return Math.floor(Math.random() * size) + 1;
}





