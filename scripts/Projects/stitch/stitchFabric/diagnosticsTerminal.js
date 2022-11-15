function init(e) {
    e.npc.getTempdata().put("name", "terminal")
}

function interact(e) {

    sayTo(e.player, "&b[Терминал диагностики]&r", e.npc.getStoreddata().get("error"))
}

function sayTo(target, name, message) {
    target.message(name + ": " + message);
}