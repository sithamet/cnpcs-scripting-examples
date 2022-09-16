var PLAYER;
var SCOREBOARD

/**
 * Sends message to all players in a radius if the Player enters trigger zone
 * In order to work, the script must be placed in an NPC of the hostile faction
 * @param e TargetEvent(ICustomNpc npc, net.minecraft.entity.EntityLivingBase entity
 */
function target(e) {
    sayOnTrigger(
        "dinner_an", //уникальное имя до 15 символов
        "W_Maryjo", //логин персонажа
        "&3Глашатай&r", //От кого отправляются сообщения, @p — имя игрока
        //сообщение, @p — имя игрока
        "Привет, @p.",
        30, //радиус в блоках
        e //не трогать

        )

}

/**
 * Sends message to all players in a radius if the Player enters trigger zone (NPC's agro radius)
 * In order to work, the script must be placed in an NPC of the hostile faction
 * @param id unique ID to avoid repetition, 15 chars max
 * @param name player login name
 * @param actorName from whom the message is sent. Format "actorName: message"
 * @param message message
 * @param radius radius in blocks
 * @param event TargetEvent(ICustomNpc npc, net.minecraft.entity.EntityLivingBase entity
 */
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
