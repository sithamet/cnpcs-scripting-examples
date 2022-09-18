/**
 * If any player has any of dialogs active from BLOCKEDIDS,
 * a dialog BUSYID is shown when other players attempts to
 * open any of BLOCKEDIDS
 * If COMMENT = true, it also sends a message to the rejected
 * player in chat
 */
var BLOCKEDIDS = [158, 159, 160] //айди для блокировки
var BUSYID = 174; //диалог, который показывается при блокировке. 174 дефолт

var COMMENT = true; //сообщать ли о занятости в чат?
var ACTOR = "&a" + "@dp" + "&r"; //от кого оправляется сообщение.
//@p - игрок что пытается открыть диалог. @dp - игрок, у которого диалог сейчас открыт
var MESSAGE = "@p пытается подойти к консоли, но её занимает @dp";

var LOG = false;
var DIALOG_ID;
var STOREDDATA;

function dialog(event) {
    STOREDDATA = event.player.world.getStoreddata();

    DIALOG_ID = event.dialog.getId();

    //if at least one of blocked ids active
    for (var i = 0; i < BLOCKEDIDS.length; i++) {
        var data = String(STOREDDATA.get("active"+BLOCKEDIDS[i]))

        if (LOG) {event.player.message("data is " + "active"+BLOCKEDIDS[i] +" = " + data)}

        if (data !== "0" && data !== "null") {

            if (data !== event.player.getDisplayName()) {
                event.player.showDialog(BUSYID, String(data))

                if (COMMENT) {
                    event.player.message(buildMessage(ACTOR, MESSAGE, event.player.getDisplayName(), data));
                }


                return;
            }
        }

    }



    var includes;

    for (var i = 0; i < BLOCKEDIDS.length; i++) {
        if (BLOCKEDIDS[i] == DIALOG_ID) {
            includes = true;
        }
    }

    if (includes) {
        STOREDDATA.put("active" + DIALOG_ID, event.player.getDisplayName());
        if (LOG) {event.player.message("&eput&r active" + DIALOG_ID + "=" + STOREDDATA.get("active" + DIALOG_ID))}
    }

}

function dialogClose(event) {

    STOREDDATA = event.player.world.getStoreddata();
    DIALOG_ID = event.dialog.getId();

    var includes;

    for (var i = 0; i < BLOCKEDIDS.length; i++) {
        if (BLOCKEDIDS[i] == DIALOG_ID) {
            includes = true;
        }
    }

    if (includes) {
        STOREDDATA.put("active" + DIALOG_ID, "0");
    }

    if (LOG) {event.player.message("&eon finish&ractive" + DIALOG_ID + "=" + STOREDDATA.get("active" + DIALOG_ID))}

}

function buildMessage(actor, message, playerCurrent, playerBusy) {

    var result = String(ACTOR + ": " + MESSAGE);

    while (result.indexOf("@p") != -1) {
        result = result.replace(/@p/gi, playerCurrent);
    }

    while (result.indexOf("@dp") != -1) {
        result = result.replace(/@dp/gi, playerBusy);
    }


    return result;
}