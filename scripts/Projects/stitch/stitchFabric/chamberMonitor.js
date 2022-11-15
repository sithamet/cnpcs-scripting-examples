var id = "chamberMonitor"
var name = "&b[Монитор Жизнеобеспечения]&r"
var isLoaded;

function init(e) {
    e.block.getTempdata().put("name", id);
    e.block.setModel("stewblocks:metal_rough_ventilation_tube")


}

function tick(e) {


    var entities = e.block.getWorld().getNearbyEntities(
        e.block.getPos(),
        2,
        -1
        )


    if (entities.length === 0) {
        e.block.getTempdata().put("state", 1);
        isLoaded = false;
        return;
    } else if (entities.length > 1) {
        e.block.getTempdata().put("state", 2);
        isLoaded = false;
        return;
    }

    if ((entities[0].getType() === 1) || (entities[0].getType() === 2)) {
        e.block.getTempdata().put("state", 4)
        e.block.getTempdata().put("target", entities[0])
        if (!isLoaded) {
            sayToAllAroundBLock(e.block, 30, name, "*Издает громкий писк.*")
            isLoaded = true
        }
    } else {
        e.block.getTempdata().put("state", 3)

    }




}

function sayToAllAroundBLock(block, radius, name, message) {

    var players = block.getWorld().getNearbyEntities(block.getPos(), radius, 1);


    for (var i = 0; i < players.length; i++) {

        players[i].message(name + ": " + message);

    }

}