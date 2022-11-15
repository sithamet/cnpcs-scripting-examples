function init(e) {
    e.block.setBlockModel("stewblocks:door_crusted_metal_tagged")
    e.block.getTempdata().put("name", "door")


}


function interact(e) {

    sayTo(e.player, "&c[Люк камеры]&r", "Люк не поддается. Похоже, он контролируется не здесь.")
    e.setCanceled(true)

}

function sayTo(target, name, message) {
    target.message(name + ": " + message);
}
