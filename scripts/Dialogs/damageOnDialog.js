/*
Просто добавьте в свободную вкладу или ваш хендлер dialogEvent
*/

function dialog(dialogEvent) {

    if(dialogEvent.dialog.getId() == 153) {
        dialogEvent.player.damage(5); 
    }
}