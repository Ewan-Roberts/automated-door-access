function once(fn, context) { 
    var result;

    return function() { 
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}



function loadImage(path, target) {

    $('<img src="'+ path +'">').load(function() {

      $(this).appendTo(target);

    });

}

var timeReminder = function (time, trigger, statement) {

    
    if(time === trigger) {
        
        audio.play();
        
        responsiveVoice.speak(statement, "UK English Male"); 

    }

    else{

        return false;
    }


}

var dayReminder = function (time, trigger, day, statement) {
    
    if (day === "Saturday" || "Sunday"){

        if(time === trigger) {
            audio.play();
         responsiveVoice.speak(statement, "UK English Male"); 

        }

        else{

            return false;
        }

    }

}
var canOnlyFireOnce = once(function() {
    
    console.log('SOUND DETECTED');
    // security()

});


