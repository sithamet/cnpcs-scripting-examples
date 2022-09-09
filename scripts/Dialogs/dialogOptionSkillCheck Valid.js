//TODO Устроить нормальную синхронизацию ддля "разблока"

var PLAYER;
var EVENT;
var DIALOG;
var DIALOGS;
var SCOREBOARD;
var ENDID;
var STOREDDATA;
var LOGGING = true;  // ДОЛЖНО быть 'false' в игре, 'true' для тестов

function dialog(e) {/* 
Заполните поля ниже. Скрипт должен быть
— В NPC для обычного диалога по правому клику
— В Игроке для диалога по триггеру 
- Условие доступности для повтора выставляется в самом диалоге
*/
    addSkillCheck(
        rollDice(20) /* Кубик */,
        "Тренированность" /* Навык для проверки */,
        20 /* Уровень сложности */,
        170 /* ID диалога, в опциях которого доступны варианты провала и успеха */,
        172 /* ID диалога успеха */,
        171 /* ID диалога провала */,
        170,
        "переброс", /* уник, переброс, разблок */
        0 /* рост сложности при провале, 0 для отключения штрафа, отрицательные для облегчения */,
        /* Ниже — сообщение, что добавляется при провале к хабу.
        "" чтобы не добавлять */
        "\n\n" + "От постоянных усилий, жопа уже надорвана. Сжать её будет еще сложнее.",
        /* Ниже — сообщение, что добавляется при успехе к хабу.
        Есть смысл лишь для диалогов, которые можно пересмотреть
        "" чтобы не добавлять */
        "\n\n" + "Жопа уже сжата. Больше ее можно не сжимать.",
        //личное сообщение при попытке открыть диалог, если диалог в пользовании.
        // Будет показываться вместо диалога. "" в первом для отключения
        ["&a" + "@p" + "&r", "*борется со своей жопой, пробуйте позже*"],
        e /* е НЕ ТРОГАТЬ*/
    )

}

// @ts-ignore
function addSkillCheck(roll, skillName, target, hubID, passedID, failedID, endID, retriable, penalty, penaltyText, successText, broadCasts, dialogEvent) {

    var id = "check" + hubID;
    var failScore = "fail" + hubID;

    DIALOGS = dialogEvent.API.getDialogs();
    PLAYER = dialogEvent.player;
    EVENT = dialogEvent
    DIALOG = dialogEvent.dialog;
    SCOREBOARD = PLAYER.world.getScoreboard();
    ENDID = endID;
    STOREDDATA = EVENT.player.world.getStoreddata();

    if (DIALOG.getId() === hubID) {

        if (LOGGING) {
            PLAYER.message("&aSTART LOGIC&rBefore start, state is " + "active" + ENDID + STOREDDATA.get("active" + endID))
        }

        if (String(STOREDDATA.get("active" + ENDID)) == "0"
            || String(STOREDDATA.get("active" + ENDID)) == "null") {

            if (LOGGING) {
                PLAYER.message("Dialog is not active")
                PLAYER.message("active" + ENDID + "=" + STOREDDATA.get("active" + ENDID))
            }

            STOREDDATA.put("active" + ENDID, PLAYER.getDisplayName());

        } else {

            if (broadCasts[0] !== "") {

                var name = broadCasts[0].replace(/@p/gi, STOREDDATA.get("active" + ENDID));
                var text = broadCasts[1].replace(/@p/gi, STOREDDATA.get("active" + ENDID));

                PLAYER.message(name + ": " + text);

                PLAYER.showDialog(174, String(STOREDDATA.get("active" + endID)))
            }
        }


        //making pass & fail dialogs unavailable w/o check

        configureFailed(id, failedID);
        configurePassed(id, passedID);


        if (retriable == "разлок" && STOREDDATA.get("passed" + hubID) == "1") {
            var option = DIALOGS.get(passedID);
            option.getAvailability().setScoreboard(0, "", 1, 0);
            option.save();
        }


        if (LOGGING) {
            PLAYER.message("§aEntered processing of " + id)
        }

        var data = getScore(id);

        if (LOGGING) {
            PLAYER.message("Data is " + id + ":" + data)
        }


        var canCheck =
            ((retriable === "переброс") && data !== 2)
            || (data === 0)
            || (retriable === "переброс") && Number(STOREDDATA.get("passed" + hubID)) !== 1

        if (getScore(id) === 2 && successText !== "" && Number(STOREDDATA.get("passed" + hubID)) !== 1) {
            appendDialogText(hubID, successText);
            STOREDDATA.put("passed" + hubID, 2);
        }

        if (canCheck) {

            if (LOGGING) {
                PLAYER.message("CanCheck...")
            }


            // подготовка переменных броска 
            var skillID = getSkillID(skillName)
            var base = getSkillValue(skillID);
            var final = base + roll;

            if (LOGGING) {
                PLAYER.message("failScore is " + STOREDDATA.get(failScore))
            }

            var penaltyPoints = (Number(STOREDDATA.get(failScore)) * penalty);
            var finalTarget = target + penaltyPoints;

            if (LOGGING) {
                PLAYER.message("The check is:" + skillName + ": " + roll + " + " + base + " vs " + finalTarget + " (" + target + "+" + penaltyPoints + " penalty");
            }

            // @ts-ignore
            var result = "@p &e@r проверку " + SKILL_NAMES_POS[skillID] + "&r " + "(" + roll + "+" + base + ") из " + finalTarget;
            var passed = false;


            //сравнивается с порогом 
            if (final >= finalTarget) {

                if (LOGGING) {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проходит");
                }

                setScore(id, 2);
                passed = true;
                STOREDDATA.put("passed" + hubID, 1);


                if (retriable === "разблок") {
                    option = DIALOGS.get(passedID);

                    option.getAvailability().setScoreboard(0, "", 1, 0);
                    option.save();
                }

            } else {

                if (LOGGING) {
                    result = result
                        .replace(/@p/gi, PLAYER.getDisplayName())
                        .replace(/@r/gi, "проваливает");
                }
                setScore(id, 1);

                if (Number(STOREDDATA.get(failScore)) === 1 && penaltyText !== "") {
                    appendDialogText(hubID, penaltyText);
                }

                var i = Number(STOREDDATA.get(failScore)) + 1;
                if (LOGGING) {
                    PLAYER.message("failscore is" + i)
                }
                STOREDDATA.put(failScore, i);

            }

            if (LOGGING) {
                PLAYER.message.say(result);
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
    // @ts-ignore
    return PLAYER.getFactionPoints(skillID);
}


// @ts-ignore
function configureFailed(objectiveID, optionID) {
    // @ts-ignore
    var option = DIALOGS.get(optionID);

    option.getAvailability().setScoreboard(0, objectiveID, 1, 1);
    option.save();
}


// @ts-ignore
function configurePassed(objectiveID, optionID) {
    // @ts-ignore
    var option = DIALOGS.get(optionID);

    option.getAvailability().setScoreboard(0, objectiveID, 1, 2);
    option.save();
}


// @ts-ignore
function getScore(id) {
    var result;

    try {
        // @ts-ignore
        var result = SCOREBOARD.getPlayerScore(PLAYER.name, id, "");

    } catch (error) {
        result = 0;
    }

    return result;

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

function dialogClose(event) {

    if (LOGGING) {
        PLAYER.message("Before removal, state is " + "active" + ENDID + STOREDDATA.get("active" + ENDID))
    }

    if (event.dialog.getId() === ENDID && STOREDDATA.get("active" + ENDID) !== "0") {
        // @ts-ignore
        STOREDDATA.put("active" + ENDID, 0);
    }
}