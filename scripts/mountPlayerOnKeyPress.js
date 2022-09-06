function keyPressed(e) {



    if (e.isCtrlPressed && e.key == 35) {

        var entities = e.player.rayTraceEntities(2, false, true);

        if (entities.length > 0) {
            var id = e.player.name + "_mount";

            var target = entities[0];

            if (target.typeOf(1)
                || target.typeOf(4)) {

                var isNull = target.getMount() === null; 

                if (!isNull) {
                    return; 
                }

                if (e.player.getTempdata().get(id) < 1) {

                    target.setMount(e.player);
                    e.player.getTempdata().put(id, e.player.getTempdata().get(id) + 1);

                } else {
                    return;
                }

                var targetName = "";

                if (target.typeOf(1) || target.typeOf(1)) {
                    targetName = target.getDisplayName();
                } else {
                    targetName = target.getEntityName();
                }

                var text = "§a" + e.player.getDisplayName() + "§r берет " + "§a" +
                    targetName + "§r на руки!"
                e.player.message(text);

                if (target.typeOf(1)) {
                    target.message(text);
                }
            }
        }
    }

    if (e.isShiftPressed && e.key == 35) {
        var entities = e.player.rayTraceEntities(2, false, true);

        if (entities.length > 0) {
            var target = entities[0];

            var isNull = target.getMount() === null; 

            if (target.typeOf(1)
                || target.typeOf(2)
                || target.typeOf(3)
                || target.typeOf(4)) {

            if (!isNull) {
                target.setMount(null); 
            } else {return}; 

                e.player.getTempdata().put(id, e.player.getTempdata().get(id) - 1)

            } else {
                return;
            }


            if (target.typeOf(1) || target.typeOf(1)) {
                targetName = target.getDisplayName();
            } else {
                targetName = target.getEntityName();
            }


            var text = "§a" + e.player.getDisplayName() + "§r выпускает " + "§a" +
                targetName + "§r из рук!"
            e.player.message(text);

            if (target.typeOf(1)) {
                target.message(text);
            }

        }
    }
}