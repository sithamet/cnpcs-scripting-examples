/*
Sends a message to the chat to all players in a certain radius if dialog is open by the player
If dialog is not in NPC and triggered by showDialog(), this script must be placed in Player instance
(Script's Showel click on air)
 */
function dialog(e) {

    sayOnDialog(519,  "&a@p&r", "*Внезапно громко и болезненно стонет*", 15, e)

    sayOnDialog(525, "&a@p&r", "*Кажется, будто его ноги вдруг прилипли к полу. Напрягая мышцы до вздутия вен, @p, тем не менее, пытается сделать шаг — и падает, взрывая землю носом.*", 15, e)

    sayOnDialog(526, "&a@p&r", "*Кажется, будто его ноги вдруг прилипли к полу. Напрягая мышцы до вздутия вен, @p, тем не менее, делает шаг вперед. А потом еще один.*", 15, e)


    sayOnDialog(529, "&a@p&r", "*Кажется, будто его ноги вдруг прилипли к полу. Но тут гремит гром красных молний...*", 15, e)
}

function sayOnDialog(id, actorName, message, radius, event) {

    var PLAYER = event.player;
    var MESSAGE = message;
    var TRIGGER_ID = id;
    var DIALOG = event.dialog;
    var RADIUS = radius;
    var ACTOR = actorName;

    if (DIALOG.getId() == TRIGGER_ID) {

        //todo Replace @p while string has this token
        ACTOR = ACTOR.replace(/@p/gi, PLAYER.getDisplayName());
        MESSAGE = MESSAGE.replace(/@p/gi, PLAYER.getDisplayName());

        var players = PLAYER.world.getNearbyEntities(PLAYER.getPos(), RADIUS, 1);

        for (var i = 0; i < players.length; i++) {
            players[i].message(ACTOR + ": " + MESSAGE);

        }

    }

}



