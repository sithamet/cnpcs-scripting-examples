/**
 * Starts dialog when Player is within visibility
 * @param event TargetEvent(ICustomNpc npc, net.minecraft.entity.EntityLivingBase entity)
 */
function target(event) {

    showOnTrigger (
        72, //ID диалога чтобы показать
        true, //true — показывать всякий раз, когда игрок входит в зону вилимости NPC.
        //false — показывать один раз (пока игроку не откроется диалог
        "§e[Окружение]§r", //от чьего имени ведется диалог
        event //не трогать
    )

}

function showOnTrigger(id, repeat, actor, event) {
    var PLAYER;

    if (event.entity.getType() == 1) {
        PLAYER = event.entity;
    } else {return}

    var canShow;

    if (!repeat) {
        canShow = !PLAYER.hasReadDialog(id);
    } else {
        canShow = true;
    }

    if (canShow) {
        PLAYER.showDialog(id, actor);
    }
}