function attack(e) {


    e.target.say("Here's waht I have...");
    // var dataKeys = e.target.getStoreddata.getKeys(); 

    // for (var i = 0; i < dataKeys.length; i++) {
    //     e.target.say(e.target.getStoreddata.get(dataKeys[i])); 
    // }

    e.target.getStoreddata().clear();
    e.target.say("Stored data cleared"); 

}