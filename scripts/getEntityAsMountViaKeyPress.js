function keyPressed(e) {


    // Key 'H'
    if (e.isCtrlPressed && e.key == 35) {

        //Getting entities on eyesight 
        var entities = e.player.rayTraceEntities(2, false, true);

        //if not empty 
        if (entities.length > 0) {

            //taking only first entity 
            var target = entities[0];

            //if Player or Animal
            if (target.typeOf(1)
                || target.typeOf(4)) {


            //if more than limit (1 currently)
                if (e.player.getRiders().length >= 1) {
                    return;
                }

                //adding a rider  ON player 
                e.player.addRider(target);


                var targetName = "";

                //Using correct method to get as informative name as possible
                if (target.typeOf(1) || target.typeOf(1)) {
                    targetName = target.getDisplayName();
                } else {
                    targetName = target.getEntityName();
                }

                var text = "§a" + e.player.getDisplayName() + "§r берет " + "§a" +
                    targetName + "§r на руки!"
                e.player.message(text);

                //Messaging target if it's a Player 
                if (target.typeOf(1)) {
                    target.message(text);
                }
            }
        }
    }

    if (e.isShiftPressed && e.key == 35) {


        if (e.player.getRiders().length > 0) {

            var riders = e.player.getRiders();

            for (var i = 0; i < e.player.getRiders().length; i++) {

                var target = riders[i];

                var targetName = "";

                if (target.typeOf(1)) {
                    targetName = target.getDisplayName();
                } else {
                    targetName = target.getEntityName();
                }

                var text2 = "§a" + e.player.getDisplayName() + "§r выпускает " + "§a" +
                    targetName + "§r из рук!"

                e.player.message(text2);

                if (target.typeOf(1)) {
                    target.message(text2);
                }
            }

            //remove ALL riders 
            e.player.clearRiders();
        } else { return };

    }
}