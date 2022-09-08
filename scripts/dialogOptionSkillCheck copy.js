var PLAYER;
var EVENT;
var NPC;
var DIALOG;
var DIALOGS;
var SCOREBOARD;
var LOGGING = true;  // ДОЛЖНО быть 'false' в игре, 'true' для тестов

function dialog(e) {/* 
Заполните поля ниже. Скрипт должен быть
— В NPC для обычного диалога по правому клику
— В Игроке для диалога по триггеру 
- Условие доступности для повтора выставляется в самом диалоге
*/addSkillCheck(
    rollDice(20) /* Кубик */,
    "Тренированность" /* Навык для проверки */,
    20 /* Уровень сложности */,
    170 /* ID диалога, в опциях которого доступны варианты провала и успеха */,
    172 /* ID диалога успеха */,
    171 /* ID диалога провала */,
    "переброс", /* уник, переброс */
    5 /* рост сложности при провале, допустим 0 */,
    e /* е НЕ ТРОГАТЬ*/
)

}


function addSkillCheck(roll, skillName, target, hubID, passedID, failedID, retriable, penalty, dialogEvent) {

    var id = "check" + hubID;
    var failScore = "fail" + hubID;

    DIALOGS = dialogEvent.API.getDialogs();
    NPC = dialogEvent.npc;
    PLAYER = dialogEvent.player;
    EVENT = dialogEvent
    DIALOG = dialogEvent.dialog;
    SCOREBOARD = PLAYER.world.getScoreboard();

    if (DIALOG.getId() == hubID) {

        configureFailed(id, failedID);
        configurePassed(id, passedID);

        //making pass & fail dialogs unavailable 
        if (LOGGING) { PLAYER.message("Entered processing") }

        var data = getScore(id);

        if (LOGGING) { PLAYER.message("Data is " + id + ":" + data) }

        var canCheck = ((retriable == "переброс") && data != 2)
            || (data == 0)

        if (canCheck) {

            if (LOGGING) { PLAYER.message("CanCheck...") }


            // подготовка переменных броска 
            var skillID = getSkillID(skillName)
            var base = getSkillValue(skillID);
            var final = base + roll;

            if(LOGGING) {PLAYER.message("failScore is " + getScore(failScore))}

            var penaltyPoints = ((getScore(failScore)) * penalty);
            var finalTarget = target + penaltyPoints;

            if (LOGGING) {
                PLAYER.message("The check is:" + skillName + ": " +  roll +  " + "  + base + " vs " + finalTarget + " (" + target + "+" + penaltyPoints + " penalty");

                var result = "@p &e@r проверку " + SKILL_NAMES_POS[skillID] + "&r " + "(" + roll + "+" + base + ") из " + finalTarget;
                var passed = false;


                //сравнивается с порогом 
                if (final >= finalTarget) {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проходит");

                    setScore(id, 2);
                    passed = true;

                } else {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проваливает");
                    setScore(id, 1);
                    var i = Number(getScore(failScore) + 1); 
                    setScore(failScore, i);

                }

                if (LOGGING) { NPC.say(result); }



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


function configureFailed(objectiveID, optionID) {
    var option = DIALOGS.get(optionID);

    option.getAvailability().setScoreboard(0, objectiveID, 1, 1);
    option.save();
}


function configurePassed(objectiveID, optionID) {
    var option = DIALOGS.get(optionID);

    option.getAvailability().setScoreboard(0, objectiveID, 1, 2);
    option.save();
}


function getScore(id) {
    var result; 

    try {
        var result = SCOREBOARD.getPlayerScore(PLAYER.name, id, "");
        
    } catch (error) {
        result = 0; 
    }

    return result; 

}

function setScore(id, score) {

    try {
        SCOREBOARD.setPlayerScore(PLAYER.name, id, score, ""); 
    } catch (error) {
        SCOREBOARD.addObjective(id, "dummy");
        SCOREBOARD.setPlayerScore(PLAYER.name, id, score, "")
    }

}