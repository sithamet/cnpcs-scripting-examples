var PLAYER;
var EVENT;
var SCOREBOARD;

function target(e) {
    PLAYER = e.entity;
    EVENT = e;

    // ВОЗЬМИ КАМЕНЬ ДУШ! 
    // Настрой бросок на проверку, успех которого стартанет диалог

    startDialogAfterCheck(
        rollDice(20), //Куб, например 20 = d20
        "Восприятие", //Навык
        1, //Сложность (порог >=)
        150, //ID диалога (показывается возле названия)
        "§6[Окружение]§r", // от чьего имени ведется диалог
        "@p вдруг что-то замечает.", //сообщение другим игрокам
        "@p проходит мимо, ничего не заметив", //сообщение если игрок провалил проверку
        true, //можно ли попытаться еще (уйдя и вернувшись в зону триггера)
        true //true — результат запоминается всеми идентичными NPC с диалогом в мире 
        //false — результат запоминается только этим NPC
    );

}

function startDialogAfterCheck_noDice(skillName, target, dialogID, actor, publicMessage, failedMessage) {
    startDialogAfterCheck(rollDice(20), skillName, target, dialogID, actor, publicMessage, failedMessage, false, true);
}

function startDialogAfterCheck(roll, skillName, target, dialogID, actor, publicMessage, failedMessage, retriable, global) {

    var id = PLAYER.name + "_" + dialogID;
    var isTried = false;
    var data;
    if (global) {
        data = String(EVENT.entity.world.getStoreddata().get(id));
    } else {
        data = String(EVENT.entity.getStoreddata().get(id));
    }
    // EVENT.npc.say("Data="+data); 

    if (!retriable) {
        if (data != "null") {
            isTried = true;
            //  EVENT.npc.say("Not null"); 
        } else {
            //  EVENT.npc.say("Is null"); 
        }
    }

    if (!PLAYER.hasReadDialog(dialogID) && (isTried == false)) {


        var skillID;

        for (var key in SKILL_NAMES) {
            if (key == skillName) {
                skillID = SKILL_NAMES[key];
                // EVENT.npc.say(key + " is " + SKILL_NAMES[key]);
            }
        }

        var base = PLAYER.getFactionPoints(skillID);
        var final = base + roll;
        var result = "";
        var passed = false;

        if (final >= target) {
            //  result = "&eпроходит проверку " + SKILL_NAMES_POS[skillID] + "&r";
            passed = true;

        } else {
            //result = "&cпроваливает проверку " + SKILL_NAMES_POS[skillID] + "&r";
        }

        if (global) {
            String(EVENT.entity.world.getStoreddata().put(id, String(passed)));
        } else {
            String(EVENT.entity.getStoreddata().put(id, String(passed)));
        }


        // EVENT.npc.say("&b" + PLAYER.getDisplayName() + "&r " + result + ": " + final + "(" + roll + "+" +
        //  base + ")" + " из " + target);


        if (passed) {
            var result = publicMessage.replace(/@p/gi, PLAYER.getDisplayName());
            EVENT.npc.say(result);
            PLAYER.showDialog(dialogID, actor);
        }
        else {
            var result = failedMessage.replace(/@p/gi, PLAYER.getDisplayName());
            EVENT.npc.say(result);
        }
    }

}

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

function rollDice(size) {
    return Math.floor(Math.random() * size) + 1;
}





