var sz, cx, x, y, z;
var p;
var length = 7; //Длина телепорта
var c = 90; //Угол телепорта
var RADIUS = 15;
var COST = 15;
var id = "bahaSoulCount"
function attack(e) {


    if (e.type == 0) {

        e.player.world.getStoreddata().put(id, 660)

        if (Number( e.player.world.getStoreddata().get(id) >= COST)) {


            p = e.player;
            cx = length * Math.cos((p.getRotation() - c) * Math.PI / 180);
            sz = length * Math.sin((p.getRotation() - c) * Math.PI / 180);
            x = p.getX() - cx;
            z = p.getZ() - sz;
            y = p.getY();
            if(p.world.getBlock(x, y, z).getName() == "minecraft:air" &&
                p.world.getBlock(x, y + 1, z).getName() == "minecraft:air") {

                e.player.world.spawnParticle(
                    "explode",
                    x,
                y + 1.5,
                    z,
                    0.1, 0.1, 0.1, 0.1,
                    40)

                var players = e.player.world.getNearbyEntities(p.getPos(), RADIUS, 1);


                for (var i = 0; i < players.length; i++) {
                    players[i].message("&a" + p.getDisplayName() + "&r" + ": *"
                    + p.getDisplayName() + " взмахивает Душегубом — и тут же пожирается разноцветными огнями душ*");
                    players[i].playSound("ancientbeasts:ghost_death", 5, 0);

                }


                e.player.setPosition(x, y, z);

                players = e.player.world.getNearbyEntities(p.getPos(), RADIUS, 1);


                for (var i = 0; i < players.length; i++) {
                    players[i].message("&a" + p.getDisplayName() + "&r" + ": *"
                    + p.getDisplayName() + " появляется из дыма и пламени!*");
                    players[i].playSound("ancientbeasts:ghost_death", 5, 0);

                }
                modSoulCount(e, -COST)

            } else {
                e.player.message("&a" + e.player.getDisplayName() + "&r" + ": *Похоже, на пути Душителя стало препятствие.*");
            }



        } else {
            e.player.message("&a" + e.player.getDisplayName() + "&r" + ": *Душитель теперь пуст — и попытки заставить души нести себя не приносят плодов.*")
        }


    }

}

function modSoulCount(e, mod) {

    var data =  e.player.world.getStoreddata().get(id)

    e.player.world.getStoreddata().put(id, Number(data) + mod)

    var lore = ["§7Меч из застывшей мысли, впитавший в себя",
        "§7однажды 645 душ. Теперь они рвутся на волю,",
        "§7готовые услужить любым способом тому, кто",
        "§7высвободит их потенциал",
        "§b§l[Душепортация]§r§b: атака в воздух переносит владельца на",
        "§bсвободное место впереди §lбыстрым действием§r§b, ценой " + COST + " душ",
        "§bБаланс Душ: §с" +  e.player.world.getStoreddata().get(id)]

    e.item.setLore(lore);


}
