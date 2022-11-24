var chamberMonitorCoords = [-154, 30, 303]
var name = "&b[Монитор Жизнеобеспечения]&r"
var controlCoords = [-159, 31, 301];

function interact(e) {
    var chamberMonitorBlock = e.player.getWorld().getBlock(chamberMonitorCoords[0], chamberMonitorCoords[1], chamberMonitorCoords[2]);
    if (chamberMonitorBlock.getTempdata().get("name") !== "chamberMonitor") {
        e.npc.say("Неверная конфигурация " + "chamberMonitor")
    }

    var controlBlock = e.player.getWorld().getBlock(controlCoords[0], controlCoords[1], controlCoords[2]);
    if (controlBlock.getTempdata().get("name") !== "control") {
        e.npc.say("Неверная конфигурация " + "control")
    }


    var state = chamberMonitorBlock.getTempdata().get("state");

    switch (state) {
        case 1:
            sayTo(e.player, name, "*Датчики обнулены, подсветка дисплея приглушена.*")
            break;
        case 2:
            sayTo(e.player, name, "*Датчики обнулены. В углу мигает красная иконка гирьки.*")
            break;
        case 3:
            sayTo(e.player, name, "*Датчики ожили — некоторые работают, некоторые нет. В углу мигает красная надпись &4«ЭГО»&r.*")
            break;
        case 4:

            var target = chamberMonitorBlock.getTempdata().get("target")

            var health = target.getHealth();
            var maxHealth = target.getMaxHealth();

            var totalStatus;

            switch (Number(controlBlock.getStoreddata().get("state"))) {
                case 0:
                case 1:
                case 2:
                case 3:
                    totalStatus = "иное состояние, не вызванное ШВМ."
                    break;

                case 4:
                    totalStatus = "предварительная сверхстимуляция."
                    break;
                case 54:
                    totalStatus = "тревога от осознания. &4Внимание&r: игнорировать крики!"
                    break;
                case 6:
                    totalStatus = "синдром выпаривания. &4Внимание&r: риск ментального повреждения!"
                    break;
                case 7:
                    totalStatus = "экстрационный мультисистемный синдром отказа."
                    break;
            }

            sayTo(e.player, name, "*Датчики работают, описывая состояния того, кто внутри камеры. В углу зеленым светится надпись &a«ЭГО»&r.\n"
            +"Датчики гласят: &bРЦЭ&r: (" + health + "/" + maxHealth + "); &bСтатус&r: «" + totalStatus +  "»*")
            break;

    }


}

function sayTo(target, name, message) {
    target.message(name + ": " + message);
}
