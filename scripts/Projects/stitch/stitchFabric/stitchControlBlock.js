var BLOCK_NAME = "§cКонтролер Камеры§r"
var BLOCK;

var stateID = "state"

var error = "error"

var ingredients = ["stewitems:medicine_sotocvet", "biomesoplenty:flower_1", "stewitems:alchemy_rubedo"]
var costs = ["3", "12", "3"]

var intakeCoords = [-164, 29, 306];
var outputCoords = [-163, 32, 303];
var doorCoords = [-156, 31, 303]
var chamberMonitorCoords = [-154, 30, 303]
var terminalCoords = [-160, 30, 306]

var door = "door"
var intake = "intake"
var output = "output"
var chamberMonitor = "chamberMonitor"
var terminal = "terminal"

var counter;

function tick(e) {

    switch (e.block.getStoreddata().get(stateID)) {
        case 3:
            e.block.getWorld().playSoundAt(e.block.getPos(), "immersiveengineering:crusher", 0.5, 0)

            break;

        case 4:

            e.block.getWorld().playSoundAt(e.block.getPos(), "flansmod:_ambirconsteamriflereload", 1, 0)


            e.block.world.spawnParticle(
                "cloud",
                chamberMonitorCoords[0],
            chamberMonitorCoords[1] + 3,
                chamberMonitorCoords[2],
                0.1, 0.1, 0.1, 0.1,
                30)

            e.block.world.spawnParticle(
                "cloud",
                doorCoords[0],
                doorCoords[1],
                doorCoords[2],
                0.1, 0.1, 0.1, 0.1,
                10)

            break;

        case 5:
            e.block.getWorld().playSoundAt(e.block.getPos(), "flansmod:_ambirconsteamriflereload", 1, 0)


            e.block.world.spawnParticle(
                "bubble",
                chamberMonitorCoords[0],
            chamberMonitorCoords[1] + 3,
                chamberMonitorCoords[2],
                1, 1, 1, 0.1,
                30)

            e.block.world.spawnParticle(
                "cloud",
                chamberMonitorCoords[0],
            chamberMonitorCoords[1] + 3,
                chamberMonitorCoords[2],
                0.1, 0.1, 0.1, 0.1,
                30)

            e.block.world.spawnParticle(
                "cloud",
                doorCoords[0],
                doorCoords[1],
                doorCoords[2],
                0.1, 0.1, 0.1, 0.2,
                30)

            break;

        case 6:
            e.block.getWorld().playSoundAt(e.block.getPos(), "flansmod:_ambirconsteamriflereload", 1, 0)
            e.block.getWorld().playSoundAt(e.block.getPos(), "thaumcraft:bubble", 1, 0)


            e.block.world.spawnParticle(
                "dragonbreath",
                chamberMonitorCoords[0],
            chamberMonitorCoords[1] + 3,
                chamberMonitorCoords[2],
                1, 1, 1, 0.1,
                30)

            e.block.world.spawnParticle(
                "cloud",
                chamberMonitorCoords[0],
            chamberMonitorCoords[1] + 3,
                chamberMonitorCoords[2],
                0.1, 0.1, 0.1, 0.1,
                50)

            e.block.world.spawnParticle(
                "cloud",
                doorCoords[0],
                doorCoords[1],
                doorCoords[2],
                0.1, 0.1, 0.1, 0.2,
                30)

            e.block.world.spawnParticle(
                "dragonbreath",
                doorCoords[0],
            doorCoords[1] + 3,
                doorCoords[2],
                1, 1, 1, 0.1,
                30)

            break;

        case 7:
            e.block.getWorld().playSoundAt(e.block.getPos(), "thaumcraft:bubble", 1, 0)
            break;

    }

}


function redstone(e) {

    BLOCK = e.block;
    var data = e.block.getStoreddata();
    var tempData = e.block.getTempdata();



    //init components
    if (tempData.getKeys().length <= 2) {
        say("Контролер жужжит реле и щелкает конденсаторами, просчитывая что-то внутри...")
        //intake
        var intakeBlock = e.block.getWorld().getBlock(intakeCoords[0], intakeCoords[1], intakeCoords[2]);
        var container = e.block.getWorld().getBlock(intakeCoords[0], intakeCoords[1] + 1, intakeCoords[2]);
        intakeBlock.getTempdata().get("name") === intake ? tempData.put(intake, intakeBlock) : say("Неверная конфигурация " + intake)
        container.isContainer() ? say("Мигает зеленая лампочка: «Загрузочная воронка».") : say("Неверная конфигурация, на " + intakeCoords[0] + " " + intakeCoords[1] + 1 + " " + intakeCoords[2] + "ожидается контейнер")

        //output
        var outputBlock = e.block.getWorld().getBlock(outputCoords[0], outputCoords[1], outputCoords[2]);
        outputBlock.getTempdata().get("name") === output ? tempData.put(output, outputBlock) : say("Неверная конфигурация " + output)

        //door
        var doorBlock = e.block.getWorld().getBlock(doorCoords[0], doorCoords[1], doorCoords[2]);
        doorBlock.getTempdata().get("name") === door ? tempData.put(door, doorBlock) : say("Неверная конфигурация " + door)

        //chamberMonitorchamberMonitor
        var chamberMonitorBlock = e.block.getWorld().getBlock(chamberMonitorCoords[0], chamberMonitorCoords[1], chamberMonitorCoords[2]);
        chamberMonitorBlock.getTempdata().get("name") === chamberMonitor ? tempData.put(chamberMonitor, chamberMonitorBlock) : say("Неверная конфигурация " + chamberMonitor)

        //terminal
        var terminalNPC = e.block.getWorld().getNearbyEntities(e.block.getWorld().getBlock(terminalCoords[0], terminalCoords[1] + 1, terminalCoords[2]).getPos(), 1, EntityType_NPC)[0]
        terminalNPC.getTempdata().get("name") === terminal ? tempData.put(terminal, terminalNPC) : say("Неверная конфигурация, НПЦ не найдет над  " + terminal)

        tempData.put("name", "control")
        return;
    }

    var state = data.get(stateID)

    if (e.power == 0) {
        say("Внутри щелкают реле, готовясь к следующему действию.")
        return;
    }

    if (state == null) {
        data.put(stateID, 0)
        state = data.get(stateID)
    }

    // say("State is now " + state)

    /**
     * Main Code
     */

    var target = e.block.getWorld().getNearbyEntities(
        tempData.get(chamberMonitor).getPos(),
        2,
        EntityType_ANY
        )


    if (target.length == 0) {

        tempData.get(terminal).getStoreddata().put(error, "*Критический сбой: система Эгопригодности потеряла субъект!*")
        tempData.get(door).setOpen(true);
        sayToAllAroundBLock(tempData.get(door), 30, "&c[Люк Камеры]&r", "Шипят поршни, и люк камеры открывается нараспашку.")
        data.put(stateID, 1)
        return;

    }

    var target = target[0];

    var targetName = target.typeOf(EntityType_PLAYER) ? target.getDisplayName() : target.getName();


    switch (state) {


        case 0:
            tempData.get(door).setOpen(true);
            sayToAllAroundBLock(tempData.get(door), 30, "&c[Люк Камеры]&r", "*Шипят поршни, и люк камеры открывается нараспашку.*")
            data.put(stateID, 1)
            tempData.get(terminal).getStoreddata().put(error, "*Система Шововарения работает по регламенту.*")

            break;

        case 1:
            var monitorState = tempData.get(chamberMonitor).getTempdata().get("state");
            if (monitorState != 4) {
                say("*Рычаг опускается без сопротивления — механизмы внутри контролера отсоединились. Похоже, что-то в системе не так*.")
                tempData.get(terminal).getStoreddata().put(error, "*Сбой системы оценки Эгопригодности.*")
            } else {
                sayToAllAroundBLock(tempData.get(door), 30, "&c[Люк камеры]&r",
                    "*Шипят поршни, и люк камеры резко закрывается*.")

                tempData.get(door).setOpen(false);

                data.put(stateID, 2)
                tempData.get(terminal).getStoreddata().put(error, "*Система Шововарения работает по регламенту.*")

            }

            break;
        case 2:
            var container = e.block.getWorld().getBlock(intakeCoords[0], intakeCoords[1] + 1, intakeCoords[2]).getContainer();

            var notAll;
            var notEnough;

            for (var i = 0; i < ingredients.length; i++) {

                var item = e.block.getWorld().createItem(ingredients[i], 0, 1);
                var count = container.count(item, true, true);

                //say("Количество " + ingredients[i] + " равно " + count)
                if (count == 0) {
                    notAll = true;
                    break;
                } else if (count < costs[i]) {
                    notEnough = true
                    break;
                }
            }

            if (notEnough) {
                sayToAllAroundBLock(tempData.get(intake), 30, "&c[Входная Воронка]&r",
                    "*Слышится сбивчивое тарахтение. Затем клапаны шумно сдувают собранное давление*.")
                tempData.get(terminal).getStoreddata().put(error, "*Сбой системы загрузки  код 2: субоптимальный вес.*")


                break;
            }

            if (!notAll) {
                var items = container.getItems();

                for (var i = 0; i < items.length; i++) {
                    for (var k = 0; k < ingredients.length; k++) {
                        if (items[i].getName() == ingredients[k]) {
                            items[i].setStackSize(items[i].getStackSize() - costs[k]);
                        }
                    }
                }

                sayToAllAroundBLock(tempData.get(intake), 30, "&c[Входная Воронка]&r",
                    "*Слышится шум воды. Ингредиенты смывает внутрь машины, и она начинает смешивать их с мерным гулом*.")
                data.put(stateID, 3)
                tempData.get(terminal).getStoreddata().put(error, "*Система Шововарения работает по регламенту.*")


                break;
            } else {
                sayToAllAroundBLock(tempData.get(intake), 30, "&c[Входная Воронка]&r",
                    "*Слышится сбивчивое тарахтение. Затем, слышится звук водяного насоса.*")
                tempData.get(terminal).getStoreddata().put(error, "*Сбой системы загрузки код 5: некорректная  подача. Запущена аварийная промывка.*")
                e.block.getWorld().setBlock(intakeCoords[0], intakeCoords[1] + 2, intakeCoords[2], "water", 0)

                break;
            }
            break;

        case 3:


            if (target.typeOf(EntityType_PLAYER)) {
                sayTo(target, "&c[Камера]&r", "*" + targetName + " окутывается паром. Сладкая лаванда неожиданно бодрит, исцеляя душу и тело — и в тоже время, пробуждает голод....*")

                e.API.executeCommand(e.block.getWorld(), "effect " + target.name + " minecraft:regeneration 20 2")

                e.API.executeCommand(e.block.getWorld(), "effect " + target.name + " 17 80 10")

                e.API.executeCommand(e.block.getWorld(), "effect " + target.name + "misca:restoresanity 20 2")
                e.API.executeCommand(e.block.getWorld(), "effect " + target.name + "misca:restoreintegrity 20 2")
                e.API.executeCommand(e.block.getWorld(), "effect " + target.name + "misca:restorestamina 20 2")
            }

            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&c[Камера]&r", "*Трубы шипят — и камера наполняется душистым сладко-лавадновым паром. Он выползает сквозь щели.*")

            data.put(stateID, 4)
            break;

        case 4:

            sayTo(target, "&c[Камера]&r", "*" + targetName + " чувствует, что поток пара становится сильнее — и горячее.*")

            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&c[Камера]&r", "*Напор пара становится сильнее. Поток скозь дверь увеличивается — обжигающие клубы летают по всему залу.*")

            var result = passTest(target, 15, "Самообладание")
            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&6[DICE]&r", createPassString(result))


            if (!result.win) {

                sayTo(target, "&c[Камера]&r", "*" + targetName + " поддается необъяснимому чувству тревоги — упорно кажется, что пар способен растворить.*\n&7//Отыграйте это!")
                if (target.typeOf(EntityType_PLAYER)) {
                    e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add san " + "-30");
                }
            } else {
                sayTo(target, "&c[Камера]&r", "*" + targetName + " успешно подавляет невесть откуда взявшееся чувство тревоги.*\n&7//Отыграйте это!")
            }

            data.put(stateID, 5)

            break;

        case 5:

            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&c[Камера]&r", "*Пар начинает дрожать от §oШума§r. В нем появляются новые ноты — разноцветные, разнообразные на вкус.*")

            var players = e.block.getWorld().getNearbyEntities(tempData.get(chamberMonitor).getPos(), 30, EntityType_PLAYER);

            for (var i = 0; i < players.length; i++) {
                var result = passTest(players[i], 20, "Обаяние")
                sayTo(players[i], "&6[DICE]", createPassString(result))

                if (result.win) {
                    sayTo(players[i], "&c[Камера]&r", "Вам приходит навязчивая мысль, что всё это разнообразие вкуса пара — " + targetName
                    + ". Как будто пар растворяет весь сложный букет личности и разносит его с собой.")

                    var result2 = passTest(players[i], 20, "Магия")
                    sayTo(players[i], "&6[DICE]", createPassString(result2))

                    if (result2.win) {
                        sayTo(players[i], "&c[Камера]&r", "...Как очищают монету от налипших со временем грязи и ржавчины, чтобы очистить дорогу к ее сияющему нутру")
                    }
                }
            }


            var result = passTest(target, 25, "Самообладание");
            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&6[DICE]&r", createPassString(result))

            if (!result.win) {
                sayTo(target, "&c[Камера]&r", "*Напор сладкого жгучего пара смывает с вас слоем за слоем. Тело, разум, стремления — они начинают таять, стекать и капать, как воск.*")
                target.damage(10);
                e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add san " + "-20");
                e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add int " + "-20");
                sayTo(target, "&6&l[Камера]&r", "&6 " + targetName + " получает болезнь " + DISEASE_NAMES[rollDice(DISEASE_NAMES.length - 1)] + "\n&7//Отыграйте это!");
            } else {
                sayTo(target, "&c[Камера]&r", "*Напор сладкого жгучего пара заставляет ваше тело таять, стекать и капать, как воск. Но усилие воли помогает удержать от плавки ваш разум.*")
                e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add int " + "-30");
                target.damage(5);
            }

            target.getTempdata().put("stitched", true)

            data.put(stateID, 6)

            break;

        case 6:

            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&c[Машина]&r", "*Как титанический зверь, застрявший в стенах, начинает реветь вытяжка. Включаются насосы. Пар пропадает — но вместо него, сквозь щели и стыки в трубах сочится красная вязка жидкость.*")

            var count = 1;

            sayTo(target, "&c[Камера]&r", "*Машина гудит, втягивая из вас тягучий мёд вашего естества, вытопленного под паром. Это оказывается нежиданно больно.*")

            var resultFit = passTest(target, 20, "Тренированность");
            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&6[DICE]&r", createPassString(resultFit))

            if (resultFit.win) {
                sayTo(target, "&c[Шов]&r", "*Но " + targetName + " прекрасно владеет телом — и осознает, что плавится не оно. А что-то незримое по ту сторону плоти.*")
                count++;
            } else {
                sayTo(target, "&c[Шов]&r", "*Нет ничего невыносимее чем быть соком, что втягивается через трубочку.")
            }

            var resultMag = passTest(target, 20, "Магия");
            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&6[DICE]&r", createPassString(resultMag))


            if (resultMag.win) {
                sayTo(target, "&c[Шов]&r", "*Машина охотится не за душой — а за тем, на что душа крепится к струнам Полотна. Ловкостью своего паранормального Эго, " + targetName + " уворачивается от течения.*")
                count++;
            } else {
                sayTo(target, "&c[Шов]&r", "*Машина цепляется в саму суть. Рвет ее когтями. Нечто большее чем разум или душа трепещет на ее крючке. *");
            }

            data.put(stateID, 7)

            target.damage(30 - (count * 10))
            var penalty = 60 - (20 * count);

            e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add sta " + "-" + penalty);
            e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add san " + "-" + penalty);
            e.API.executeCommand(e.block.getWorld(), "needs " + target.name + " add int " + "-" + penalty);

            sayToAllAroundBLock(tempData.get(chamberMonitor), 30, "&c[Машина]&r", "*Насосы замолкают. Вытяжка перестает выть. Давление труб падает. И только слышно, как что-то глухо булькает по трубам, перетекая в правую половину устройства.*")


            break;

        case 7:

            tempData.get(door).setOpen(true);

            var added = 0;
            var result = passTest(target, 1, "Тренированность");
            added = added + result.dice + result.base - 10;

            result = passTest(target, 1, "Магия");
            added = added + result.dice + result.base - 10;

            result = passTest(target, 1, "Самообладание");
            added = added + result.dice + result.base - 10;

            added = added <= 10 ? 10 : added;


            var currentStitchStored = tempData.get(output).getStoreddata().get("level")
            tempData.get(output).getStoreddata().put("level", currentStitchStored + added)

            sayToAllAroundBLock(tempData.get(door), 30, "&c[Шовный Кран]&r", "*Начинает тихо капать тягучей красной смолой*.")
            target.getTempdata().put("stitched", false);
            sayTo(target, "&c[Шов]&r", "Ваши очертания возвращаются в норму. Вы больше не плавитесь. Все, что выплавилось из вас, было втянуто машиной.")

            sayToAllAroundBLock(tempData.get(door), 30, "&c[Люк Камеры]&r", "*Шипят поршни, и люк камеры открывается нараспашку*.")
            data.put(stateID, 1)
            tempData.get(terminal).getStoreddata().put(error, "*Система Шововарения работает по регламенту.*")

            break;


    }


}

function say(message) {
    sayToAllAroundBLock(BLOCK, 30, BLOCK_NAME, message)
}

function sayToAllAroundBLock(block, radius, name, message) {

    var players = block.getWorld().getNearbyEntities(block.getPos(), radius, 1);


    for (var i = 0; i < players.length; i++) {


        players[i].message(name + ": " + message);

    }

}

function sayTo(target, name, message) {
    if (target.typeOf(EntityType_PLAYER)) {
        target.message(name + ": " + message);
    }
}

function findInArray(array, target) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return true;
        }

    }
    return false;
}


// для поиска по названию
var SKILL_NAMES = {
    Тренированность: 10,
    Восприятие: 11,
    Проворство: 12,
    Координация: 13,
    Изобретательность: 14,
    Техника: 15,
    Магия: 16,
    Обаяние: 17,
    Самообладание: 18
}

//для склонения (Проверку Тренированности)
var SKILL_NAMES_POS = {
    10: "Тренированности",
    11: "Восприятия",
    12: "Проворства",
    13: "Координации",
    14: "Изобретательности",
    15: "Техники",
    16: "Магии",
    17: "Обаяния",
    18: "Самообладания",
}

var DISEASE_NAMES = ["Дисморфофобия", "Дереализация", "Груз мертвецов", "Антероградная амнезия", "Падение личности"]


function createPassString(result) {
    var resultString = result.win ? "§a(Успех)§r" : "§c(Провал)§r"
    var critStart = result.dice == 1 || result.dice == 20 ? ["§l", "§r§6"] : ["", ""]
    var string = "§6" + result.name + ": " + result.skill + " = " + critStart[0] + (result.dice + result.base) + critStart[1] + " " + resultString
    return string;
}

function passTest(actor, difficulty, skill) {

    var result = {};

    result.win = false;

    result.base = getSkillValue(getSkillID(skill), actor);

    result.dice = rollDice(20)

    result.skill = skill;

    result.skillGen = SKILL_NAMES_POS[getSkillID(skill)]

    result.name = actor.typeOf(EntityType_PLAYER) ? actor.getDisplayName() : actor.getName();

    if (result.dice == 20) {
        result.win = true;
    } else if (result.dice == 1) {
        result.win = false;
    }

    if (result.win !== true && result.base + result.dice >= difficulty) {
        result.win = true;
    }

    return result;

}


//Бросок кубика. Без нормального распределения.
// @ts-ignore
function rollDice(size) {
    return Math.floor(Math.random() * size) + 1;
}

/**
 * Searches Name-ID map for Skill Faction ID and applies it
 * @param {String} name skill name
 * @returns Skill Faction Id
 */
function getSkillID(name) {
    var skillID;
    for (var key in SKILL_NAMES) {
        if (key === name) {
            // @ts-ignore
            skillID = SKILL_NAMES[key];
            // EVENT.npc.say(key + " is " + SKILL_NAMES[key]);
        }
    }

    return skillID;
}

/**
 * Gets skill valie from Skill Faction points
 * @param {Number} skillID Skill faction ID
 * @param actor Player (otherwise defaults to 5)
 * @returns Skill value
 */
function getSkillValue(skillID, actor) {
    return actor.typeOf(EntityType_PLAYER) ? actor.getFactionPoints(skillID) : 5;
}

