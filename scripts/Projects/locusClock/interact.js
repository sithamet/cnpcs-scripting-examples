var PARTS = ["руку", "ногу", "голову", "руку", "задницу", "рот", "ухо", "место, о котором не говорят вслух"]


function interact(e) {


    if (e.player.name === "Forai" || e.player.name === "Baron") {

        e.player.setMount(e.npc)

        sayToAll(e.player, 15, "§bЗвёздный Грифон§r", "Когда " + e.player.getDisplayName() + " приближается, Грифон почтительно склоняет лапы и опускает спектральные крылья.", true)
   return;
    }


    var relation = e.player.getStoreddata().get("gryphonRelation");
    if (relation === null) {
        e.player.getStoreddata().put("gryphonRelation", 0)
    }

    if (relation === 0) {
        var result = passTest(e.player, 25, "Обаяние")

        sayToAll(e.player, 15, "&6[DICE]", createPassString(result), true)

        if (result.win) {
            e.player.getStoreddata().put("gryphonRelation", 1);

            var message = success[rollDice(success.length - 1)].replace(/@p/gi, e.player.getDisplayName())

            sayToAll(e.player, 15, "§bЗвёздный Грифон§r", message, true)
        } else {

            var evade = passTest(e.player, 25, "Проворство")

            sayToAll(e.player, 15, "&6[DICE]", createPassString(evade), true)

            var message;

            if (evade.win) {

                message = "*" + e.player.getDisplayName() + " пытается приблизиться к Грифону, но звёздный зверь пытается его клюнуть в " + PARTS[rollDice(PARTS.length- 1)] + ". К счастью, " + e.player.getDisplayName() + " удается увернуться.*"

            } else {
                e.player.damage(5)
                message = "*" + e.player.getDisplayName() + " пытается приблизиться к Грифону — но звёздный зверь метко клюет " + e.player.getDisplayName() + " прямо в " + PARTS[rollDice(PARTS.length - 1)] + ".*"

            }

            sayToAll(e.player, 15, "§bЗвёздный Грифон§r", message, true)

        }

    } else if (relation > 0) {
        var message = success[rollDice(success.length - 1)].replace(/@p/gi, e.player.getDisplayName())

        sayToAll(e.player, 15, "§bЗвёздный Грифон§r", message, true)
    }


}

function sayToAll(speaker, radius, name, message, playerIncluded) {

    var players = speaker.world.getNearbyEntities(speaker.getPos(), radius, 1);


    for (var i = 0; i < players.length; i++) {

        if (players[i].name == speaker.name && !playerIncluded) {
            continue;
        }

        players[i].message(name + ": " + message);

    }

}

var success = [
    "*Грифон косится недоверчиво звёздным взглядом, но разрешает себя погладить. @p так и делает*",
    "*@p дает понюхать себя Грифону. Тот, подумав, лижет холодным языком из туманностей руку Эго*",
    "*@p шепчет что-то Грифону доверительно, и звёздный зверь позволяет поиграть его галактическими перьями*",
    "*Грифон явно настроен на драку — но @p делает обманный маневр, и Грифон обнаруживает, что его клюв гладят. Зверь принуждёт щурить звёздные глаза от удовольствия.*",
    "*@p устанавливает с Грифоном невербальный контакт. Спустя миг, Эго держит в руках холодную лапу с когтями из протуберанцев.*",
    "*@p не успевает ничего сделать: Грифон уже ластится к Эго сам, овевая звёздной пылью и холодом космоса*"
]


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


function createPassString(result) {
    var resultString = result.win ? "§a(Успех)§r" : "§c(Провал)§r"
    var critStart = result.dice == 1 || result.dice == 20 ? ["§l", "§r§6"] : ["", ""]
    var string = "§6" + result.name + ": " + result.skill + " = " + critStart[0] + (result.dice + result.base) + critStart[1] + " " + resultString
    return string;
}

function passTest(actor, difficulty, skill) {

    var result = {};

    result.win = false;

    result.base = getSkillValue(getSkillID(skill), actor);

    result.dice = rollDice(20)

    result.skill = skill;

    result.skillGen = SKILL_NAMES_POS[getSkillID(skill)]

    result.name = actor.typeOf(EntityType_PLAYER) ? actor.getDisplayName() : actor.getName();

    if (result.dice == 20) {
        result.win = true;
    } else if (result.dice == 1) {
        result.win = false;
    }

    if (result.win !== true && result.base + result.dice >= difficulty) {
        result.win = true;
    }

    return result;

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
 * @param actor Player (otherwise defaults to 5)
 * @returns Skill value
 */
function getSkillValue(skillID, actor) {
    return actor.typeOf(EntityType_PLAYER) ? actor.getFactionPoints(skillID) : 5;
}
