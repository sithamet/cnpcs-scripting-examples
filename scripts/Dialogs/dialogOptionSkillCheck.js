var PLAYER;
var EVENT;
var DIALOG;
var DIALOGS;
var SCOREBOARD;
var STOREDDATA;
var LOGGING = false;  // ДОЛЖНО быть 'false' в игре, 'true' для тестов

function dialog(e) {/*
Заполните поля ниже. Скрипт должен быть
— В NPC для обычного диалога по правому клику
- Условие доступности для повтора выставляется в самом диалоге ("Диалоги" - перед/после)
*/
    addSkillCheck(
        rollDice(20) /* Кубик */,
        "Техника" /* Навык для проверки */,
        15 /* Уровень сложности */,
        207 /* ID диалога, в опциях которого доступны варианты провала и успеха */,
        219 /* ID диалога успеха */,
        220 /* ID диалога провала */,
        "уник",
        /* уник — один бросок, результат сохраняется для игрока навсегда.
        переброс - можно пытаться перебросить вплоть до успеха. если хаб доступен
        разблок - если хоть один игрок прошел проверку, опция успеха доступна для всех*/
        0 /* рост сложности при провале, 0 для отключения штрафа, отрицательные для облегчения */,
        /* Ниже — сообщение, что добавляется при провале к хабу.
        "" чтобы не добавлять */
        "",
        /* Ниже — сообщение, что добавляется при успехе к хабу.
        Есть смысл лишь для диалогов, которые можно пересмотреть
        "" чтобы не добавлять */
        "\n\n" + "Видно, что в консоли уже кто-то покопошился: порты снизу раскрыты и с царапинами.",
        e /* е НЕ ТРОГАТЬ*/
    )

}


function addSkillCheck(roll, skillName, target, hubID, passedID, failedID, retriable, penalty, penaltyText, successText, dialogEvent) {

    var id = "check" + hubID;
    var failCountID = "fail" + hubID;

    DIALOGS = dialogEvent.API.getDialogs();
    PLAYER = dialogEvent.player;
    EVENT = dialogEvent
    DIALOG = dialogEvent.dialog;
    SCOREBOARD = PLAYER.world.getScoreboard();
    STOREDDATA = EVENT.player.world.getStoreddata();

    if (DIALOG.getId() === hubID) {

        if (LOGGING) {
            PLAYER.message("§aEntered processing of " + id)
        }

        //making pass & fail dialogs unavailable w/o check
        configureFailed(id, failedID);
        configurePassed(id, passedID);

        var data = Number(getScore(id));
        //0 never passed
        //1 failed
        //2 passed
        var passedData = Number(STOREDDATA.get("passed" + hubID));
        //0 or null = never passed
        //1 passed
        //2 passed & appended the hub dialog

        if (LOGGING) {
            PLAYER.message("Data is " + id + ":" + data);
        }

        if (LOGGING) {
            PLAYER.message("passedData is " + id + ":" + data);
        }



        //If "разблок", success option is instantly available to everyone;
        //it requires Storeddata to have "passedID" key == 1
        //used a safety measure if dialog is passed by another player
        if (retriable == "разблок" && passedData >= 1) {
            var option = DIALOGS.get(passedID);
            option.getAvailability().setScoreboard(0, "", 1, 0);
            option.save();
            return;
        }

        //Can dice role be made?
        var canCheck =
            ((retriable == "переброс") && data != 2) //check is not yet passed
            || (data == 0) //check has never been passed at all
            || (retriable == "разблок") && passedData < 1
            //global check is not yet passed


        //appending the dialog with success text if it was failed
        if (getScore(id) == 2 && successText !== "" && passedData > 0) {
            appendDialogText(hubID, successText);
            STOREDDATA.put("passed" + hubID, 2);
        }

        if (canCheck) {

            if (LOGGING) {PLAYER.message("&eCanCheck = true")}

            // building variables for a skill check
            var skillID = getSkillID(skillName)
            var base = getSkillValue(skillID);
            var final = base + roll;

            if (LOGGING) {PLAYER.message("failCountID" +  "is " + STOREDDATA.get(failCountID)); }

            var penaltyPoints = (Number(STOREDDATA.get(failCountID)) * penalty);
            var finalTarget = target + penaltyPoints;

            if (LOGGING) {
                PLAYER.message("The check is:" + skillName + ": " + roll + " + " + base + " vs " + finalTarget + " (" + target + "+" + penaltyPoints + " penalty");
            }

            var result = "@p &e@r проверку " + SKILL_NAMES_POS[skillID] + "&r " + "(" + roll + "+" + base + ") из " + finalTarget;

            //if reached or beat target OR critical luck
            if (final >= finalTarget || roll > 18) {

                if (LOGGING) {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проходит");
                }

                setScore(id, 2);

                if (LOGGING) {PLAYER.message("In dialog " + DIALOG.getId() + " check has been passed. Result: score is "
                    +  id + "=" + getScore(id) + ". Dialog " + passedID + " is now available?" + DIALOGS.get(passedID).getAvailability().isAvailable(PLAYER))}

                //1 for passed
                STOREDDATA.put("passed" + hubID, 1);

                //If "разблок", success option is instantly available to everyone;
                if (retriable === "разблок") {
                    option = DIALOGS.get(passedID);
                    option.getAvailability().setScoreboard(0, "", 1, 0);
                    option.save();
                }

            } else { //not passed

                if (LOGGING) {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проваливает");
                }

                setScore(id, 1);

                //if that's the fist fail, appending penalty text to the hub dialog
                if (Number(STOREDDATA.get(failCountID)) == 1 && penaltyText !== "") {
                    appendDialogText(hubID, penaltyText);
                }

                //saving new fail count
                var i = Number(STOREDDATA.get(failCountID)) + 1;
                if (LOGGING) {PLAYER.message("fail count is" + i)}
                STOREDDATA.put(failCountID, i);

            }

            if (LOGGING) {PLAYER.message(result);}


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
// @ts-ignore
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
        if (key === name) {
            // @ts-ignore
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
        result = SCOREBOARD.getPlayerScore(PLAYER.name, id, "");

    } catch (error) {
        result = 0;
    }

    return Number(result);

}

// @ts-ignore
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

// @ts-ignore
function appendDialogText(hubID, penaltyText) {
    // @ts-ignore
    var dialog = DIALOGS.get(hubID);

    var currentText = dialog.getText();
    dialog.setText(currentText + " " + penaltyText);
    dialog.save();

}