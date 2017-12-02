var security = function() {

    var  count = 0;

    $(".holder").hide()

    jQuery('<div/>', {
        id: 'security',
        rel: 'external',
        success: function() {

            loadImage('images/34279.png', "#security")

        }
    
    }).appendTo('body');

    console.log('Fired!');
    
    responsiveVoice.speak("Detected. Please tell me your name")

        annyang.addCommands({

            '*name': function(name) {

                if (name === "James"){
                    
                    $("#security").hide()
                    
                    $(".holder").show()
                    
                    responsiveVoice.speak("Hello you giant cunt", "UK English Male")
                    
                    annyang.removeCommands('*name')
                }


                if (name === "parrot"){

                    $("#security").hide()
                    
                    $(".holder").show()

                    responsiveVoice.speak("Hi Parrot, tell me all about your girlfriend", "UK English Male")

                    annyang.removeCommands('*name')
                        
                    
                }


                if (name === "lemon"){
                
                    $("#security").hide()
                    
                    $(".holder").show()

                    responsiveVoice.speak("Hey Ewan. You are good to go", "UK English Male")

                    annyang.removeCommands('*name')
                        
                }

                else {

                    count++

                    if (count >= 3 ) {

                        responsiveVoice.speak("busted")

                    } 

                    else {
                        
                        responsiveVoice.speak("Not recognised, you have " + (4 - count) + " more tries until the flat is alerted", "UK English Male")

                    }

                }


            }

        });

    console.log('Fired!');

}