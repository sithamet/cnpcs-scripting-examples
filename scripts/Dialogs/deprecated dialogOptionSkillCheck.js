var PLAYER;
var EVENT;
var NPC;
var DIALOG;
var DIALOGS;
var LOGGING = true;  // ДОЛЖНО быть 'false' в игре, 'true' для тестов

function dialog(e) {/* 
Заполните поля ниже. Скрипт должен быть
— В NPC для обычного диалога по правому клику
— В Игроке для диалога по триггеру 
*/addSkillCheck(
rollDice(20) /* Кубик */,
"Тренированность" /* Навык для проверки */,
20 /* Уровень сложности */ , 
170 /* ID диалога, в опциях которого доступны варианты провала и успеха */, 
172 /* ID диалога успеха */,
171 /* ID диалога провала */,
e /* е НЕ ТРОГАТЬ*/
)

}


function addSkillCheck(roll, skillName, target, hubID, passedID, failedID, dialogEvent) {
    
    DIALOGS = dialogEvent.API.getDialogs();
    NPC = dialogEvent.npc;
    PLAYER = dialogEvent.player; 
    EVENT = dialogEvent
    DIALOG = dialogEvent.dialog;

    //making pass & fail dialogs unavailable 
    makeDialogUnavailable(passedID);
    makeDialogUnavailable(failedID);


    if (DIALOG.getId() == hubID) {
        // подготовка переменных броска 
        var skillID = getSkillID(skillName)
        var base = getSkillValue(skillID);
        var final = base + roll;
        var result = "@p &e@r проверку " + SKILL_NAMES_POS[skillID] + "&r " + "(" + roll + "+" + base + ") из " + target; 
        var passed = false;


        //сравнивается с порогом 
        if (final >= target) {
            result = result
                .replace(/@p/gi, PLAYER.getDisplayName())
                .replace(/@r/gi, "проходит"); 
            makeDialogAvailable(passedID); 
            passed = true;
        } else {
            result = result
                .replace(/@p/gi, PLAYER.getDisplayName())
                .replace(/@r/gi, "проваливает"); 
            makeDialogAvailable(failedID); 
        }

        if (LOGGING) { NPC.say(result); }


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

/**
 * Searches Name-ID map for Skill Faction ID and applies it 
 * @param {String} name skill name
 * @returns Skill Faction Id 
 */
function getSkillID(name) {
    var skillID;
    for (var key in SKILL_NAMES) {
        if (key == name) {
            skillID = SKILL_NAMES[key];
            // EVENT.npc.say(key + " is " + SKILL_NAMES[key]);
        }
    }

    return skillID;
}

/**
 * Gets skill valie from Skill Faction points 
 * @param {Number} skillID Skill faction ID
 * @returns Skill value 
 */
function getSkillValue(skillID) {
    return PLAYER.getFactionPoints(skillID);
}

/**
 * For making fail and pass options unvailable via Environment faction 
 * @param {*} dialogID id to remove; 
 */
function makeDialogUnavailable(dialogID) {
    var option = DIALOGS.get(dialogID);

    //Faction ID 20 = Environment faction, which is ALWAYS hostile 
    option.getAvailability().setFaction(0, 20, 1, 0);
    option.save();
}

function makeDialogAvailable(dialogID) {
    var option = DIALOGS.get(dialogID);
    option.getAvailability().removeFaction(20);
    option.getAvailability().setFaction(0, 20, 1, 2);
    option.save();
    if(LOGGING) {
        NPC.say(dialogID + " is " + option.getAvailability().isAvailable(PLAYER))
    }


}