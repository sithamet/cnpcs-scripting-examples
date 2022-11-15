/**
 * Broadcasts the dialog to the list of players on login.
 * Right-click with Scrip showel on air and click "Player" to use
 * @param event LoginEvent(IPlayer player)
 */
function login(event) {

    broadcast (
        519, //id диалога чтобы показать
        "§e[Мировая волна]§r", //имя НПЦ от которого ведется диалог
        //список логинов игроков
        ["Mordret", "Baron"],
        "always", //"once" - однажды, "always" - каждый логин
        event //не трогать
        )

}

function broadcast(dialogID, actor, targets,  regularity, event) {
    var PLAYER = event.player;

    var canShow;

    if (regularity === "once") {
        canShow = !PLAYER.hasReadDialog(dialogID);
    } else if (regularity === "always") {
        canShow = true;
    }

    for (var i = 0; i < targets.length; i++) {
        if (targets[i] == PLAYER.name && canShow) {
            PLAYER.showDialog(dialogID, actor);
        }
    }
}

