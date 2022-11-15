var EFFECT1_ID = 510;
var EFFECT2_ID = 509;
var EFFECT3_ID = 511;
var LEVEL_1 = 503;

var GM3_DURATION = 20;

/**
 * This function handles Stitch timed effect in it's entirety
 * Dialog close event activates the "spell" and the timer to turn it off
 * @param e
 */
function dialogClose(e) {

    var closeID = e.dialog.getId();
    var item = e.player.getMainhandItem();

    switch (closeID) {
        case LEVEL_1:

            setScore(e.player, "stitchLevel", 1)

            break;

        case EFFECT1_ID:
            var COST = 0.4
            if (COST > item.getDurabilityValue()) {
                sayTo(e.player, "&c[Шов]&r", "*Шва оказывается слишком мало. Вы останавливаетесь, сохраняя драгоценную жидкость на что-то более простое.*");
                return;

            }
            item.setDurabilityValue(item.getDurabilityValue() - COST);

            var bonus = 0; //duration изменяется в тиках, 20 тиков на секунду

        {
            var level = getScore("stitchLevel", e.player)

            var skillLevels = [e.player.getFactionPoints(18), e.player.getFactionPoints(17), e.player.getFactionPoints(16)];
            skillLevels.sort();
            var skillLevel = skillLevels[2]

            if (level == 1) {
                bonus = skillLevel * 20;
            } else if (level == 2) {
                bonus = (skillLevel * 2) * 20;
            } else if (level == 3) {
                bonus = (skillLevel * 3) * 20;
            } else if (level > 3) {
                bonus = 20 * 60;
            }
        }

            bonus = bonus <= 0 ? GM3_DURATION + 20 : bonus;


            sayToAll(e.player, 15, "&c[" + e.player.getDisplayName() + "]&r",
            "*" + e.player.getDisplayName() + " делает глоток из бутылочки — и разрывается на вихрь кровавых капель.*",
                false)
            sayTo(e.player, "&c[Шов]&r", "*Вы откидываетесь на волю Шва — и проваливаетесь в тонкую грань между Полотном и его изнанкой.*\n&7\\\\У вас есть от " + bonus / 20 + " до " + bonus / 10 + " секунд чтобы переместиться.");

            stitchGM3(e.player, e.API, bonus);
            break;

        case EFFECT2_ID:
            var COST = 0.2

            if (COST > item.getDurabilityValue()) {
                sayTo(e.player, "&c[Шов]&r", "*Шва оказывается слишком мало. Вы останавливаетесь, сохраняя драгоценную жидкость на что-то более простое.*");
                return;

            }

            var bonus = 0;
            var baseDistance = 20;


        {
            var level = getScore("stitchLevel", e.player)

            var skillLevels = [e.player.getFactionPoints(18), e.player.getFactionPoints(17), e.player.getFactionPoints(16)];
            skillLevels.sort();
            var skillLevel = skillLevels[2]

            if (level == 1) {
                bonus = (skillLevel - 7) * 3;
            } else if (level == 2) {
                bonus = (skillLevel - 5) * 3;
            } else if (level == 3) {
                bonus = (skillLevel - 2) * 3;
            } else if (level > 3) {
                bonus = 100;
            }

            bonus = bonus < 0 ? 0 : bonus;
        }
            var distance = baseDistance + bonus;

            e.player.getStoreddata().put("stitchDistance", distance)

            item.setDurabilityValue(item.getDurabilityValue() - COST);
            sayToAll(e.player, 15, "&c" + e.player.getDisplayName() + "&r", "*" + e.player.getDisplayName() + " делает глоток из бутылочки. Очертания Эго тут же начинают плыть багровыми каплями, как тающий воск*",
                false)
            e.player.getTempdata().put("stitched", true);
            e.player.getTempdata().put("stitchSpell", "teleport");
            sayTo(e.player, "&c[Шов]&r", "*Вы уверены: стоит указать рукой на место — и вы пройдете туда сквозь Изнанку*\n&7\\\\Используйте левый клик по блоку в радиусе " + distance + " блоков.");

            break;

        case EFFECT3_ID:
            var COST = 0.2
            if (COST > item.getDurabilityValue()) {
                sayTo(e.player, "&c[Шов]&r", "*Шва оказывается слишком мало. Вы останавливаетесь, сохраняя драгоценную жидкость на что-то более простое.*");
                return;

            }
            var skillLevels = [e.player.getFactionPoints(18), e.player.getFactionPoints(17), e.player.getFactionPoints(16)];
            var maxSkill;
            var maxSkillValue;

            if (skillLevels[0] >= skillLevels[1] && skillLevels[0] >= skillLevels[2]) {
                maxSkill = "Самообладание";
            } else if (skillLevels[1] >= skillLevels[0] && skillLevels[1] >= skillLevels[2]) {
                maxSkill = "Обаяние"
            } else if (skillLevels[2] >= skillLevels[0] && skillLevels[1] >= skillLevels[1]) {
                maxSkill = "Магия"
            }
            e.player.getStoreddata().put("stitchSkill", maxSkill);
            e.player.getStoreddata().put("stitchSkillValue", maxSkillValue)

            var bonus = 0;
            var baseDistance = 20;


        {
            var level = getScore("stitchLevel", e.player)

            var skillLevels = [e.player.getFactionPoints(18), e.player.getFactionPoints(17), e.player.getFactionPoints(16)];
            skillLevels.sort();
            var skillLevel = skillLevels[2]

            if (level == 1) {
                bonus = (skillLevel - 7) * 3;
            } else if (level == 2) {
                bonus = (skillLevel - 5) * 3;
            } else if (level == 3) {
                bonus = (skillLevel - 2) * 3;
            } else if (level > 3) {
                bonus = 100;
            }

            bonus = bonus < 0 ? 0 : bonus;
        }
            var distance = baseDistance + bonus;

            e.player.getStoreddata().put("stitchDistance", distance)

            sayToAll(e.player, 15, "&c" + e.player.getDisplayName() + "&r", "*" + e.player.getDisplayName() + " омывает руки красной жидкостью из бутылки. Их очертания тут же начинают плыть и меняться.*",
                false)
            e.player.getTempdata().put("stitched", true);
            e.player.getTempdata().put("stitchSpell", "teleport_others");
            sayTo(e.player, "&c[Шов]&r", "*Вы уверены: стоит указать рукой на существо — и Изнанка перенесет его по вашей воле.*\n&7\\\\Используйте левый клик в радиусе " + distance + " блоков для захвата цели; еще клик — чтобы телепортировать.");
            item.setDurabilityValue(item.getDurabilityValue() - COST);

            break;
    }


}

function stitchGM3(player, API, bonus) {

    player.getTempdata().put("stitched", true);
    player.getTempdata().put("stitchSpell", "GM3");
    API.executeCommand(player.getWorld(), "particle blockdust " + player.getX() + " " + player.getY() + " " + player.getZ() + " 0.3 0.9 0.3 0.3 200 normal @a 214")
    API.executeCommand(player.getWorld(), "gm 3 " + player.name)

    player.getTimers().start(1, bonus, false);
}

function timer(event) {

    switch (event.id) {
        case 1:
            var SANITYCOST = 40;
            var INTEGRITYCOST = 40;

            event.API.executeCommand(event.player.getWorld(), "needs " + event.player.name
            + " san add " + -SANITYCOST)
            event.API.executeCommand(event.player.getWorld(), "needs " + event.player.name
            + " int add " + -INTEGRITYCOST)

            event.player.getTempdata().put("stitched", false)
            event.player.getTempdata().put("stitchSpell", 0);

            event.API.executeCommand(event.player.getWorld(), "gm 0 " + event.player.name)

            event.API.executeCommand(event.player.getWorld(), "particle blockdust " + event.player.getX() + " " + event.player.getY() + " " + event.player.getZ() + " 0.3 0.9 0.3 0.3 200 normal @a 214")

            sayTo(event.player, "&c[Шов]&r", "*Швы спадают — и " + event.player.getDisplayName() +
            " вмазывается в до боли твердую реальность.*")
            sayToAll(event.player, 15, "&c[" + event.player.getDisplayName() + "]&r",
            "*" + event.player.getDisplayName() + " внезапно сшивается в воздухе из вихря кровавых капель.*",
                false);

            event.player.getWorld().playSoundAt(event.player.getPos(), "ancientbeasts:ghost_death", 3, 0)

            break;
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

function sayTo(target, name, message) {
    target.message(name + ": " + message);
}

function getScore(id, player) {
    var SCOREBOARD = player.world.getScoreboard();

    var result;

    try {
        result = SCOREBOARD.getPlayerScore(player.name, id, "");

    } catch (error) {
        result = 0;
    }

    return Number(result);

}

function setScore(player, id, score) {

    var SCOREBOARD = player.world.getScoreboard();

    try {
        // @ts-ignore
        SCOREBOARD.setPlayerScore(player.name, id, score, "");
    } catch (error) {
        // @ts-ignore
        SCOREBOARD.addObjective(id, "dummy");
        // @ts-ignore
        SCOREBOARD.setPlayerScore(player.name, id, score, "")
    }

}