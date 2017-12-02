  console.log('commands loaded')

  var commands = {
  
    'what is the travel': function() { 
        
        socket.emit('travel', 'get me the travel info')

        socket.on('travelData', function(res) {

            console.log(res)

        })

        // setTimeout(function() {

        //     responsiveVoice.speak("There are currently" + numberOfBikes + "bikes at, " + locationOfBike+ " and there is a " + lineStatus + " on the " + line + " line", "UK English Male", {rate: 0.9});   

        //     }, 3000)

    },

    'test lights': function() {

        setTimeout(function() {

            socket.emit('bedroom', "on")

            responsiveVoice.speak("TEST: bedroom lights on")         

        },1000)

        setTimeout(function() {

            socket.emit('bedroom', "off")

            responsiveVoice.speak("TEST: bedroom lights off")         

        },5000)

        setTimeout(function() {

            socket.emit('bathroom', "on")

            responsiveVoice.speak("TEST: bathroom lights on")         

        },10000)

        setTimeout(function() {

            socket.emit('bathroom', "off")

            responsiveVoice.speak("TEST: bathroom lights off")         

        },15000)

        setTimeout(function() {

            socket.emit('lights', "on")

            responsiveVoice.speak("TEST: both lights on")         

        },20000)

        setTimeout(function() {

            socket.emit('lights', "off")

            responsiveVoice.speak("TEST: both lights off")         

        },25000)

        setTimeout(function() {

            socket.emit('bathroom', "on")

            responsiveVoice.speak("TEST: bathroom lights on")         

        },30000)

        setTimeout(function() {

            socket.emit('lights', "on")

            responsiveVoice.speak("TEST: both lights on")         

        },35000)

        setTimeout(function() {

            socket.emit('bedroom', "off")

            responsiveVoice.speak("TEST: bathroom lights on")         

        },40000)

        setTimeout(function() {

            socket.emit('lights', "off")

            responsiveVoice.speak("TEST: both lights on. TEST COMPLETE")         

        },45000)

    },

    'test morning': function() { 

        console.log('testing')

        var action = true

        socket.emit('keepTheLight', action)

    },

    'let me sleep': function() { 

        var action = true

        socket.emit('keepTheLight', action)

    },

    'keep the lights *action': function(action) { 

        console.log(action)

        socket.emit('keepTheLight', action)

    },

    'snooze': function(action) { 

        socket.emit('snooze', action)

    },

    'open everything': function(action) { 

        socket.emit('screen', action)

    },

    'screen *action': function(action) { 

        socket.emit('screen', action)

    },

    'reload': function() {

        window.location.reload()

    },

    'refresh': function() {

        window.location.reload()

    },

    'LED *action': function(action) { 
        
        socket.emit('LEDblink', action)

    },

    'bedroom *action': function(action) { 
        
        socket.emit('bedroom', action)

    },

    'bathroom *action': function(action) { 
        
        socket.emit('bathroom', action)

        console.log('hit hit ')

    },

    'lights *action': function(action) { 
        
        socket.emit('lights', action)

        console.log('hit hit ')

    },

    'test': function() { 

        // console.log('test command')

        // socket.emit('readyBoard', 'poo')

    },

    'what is the weather': function() { 
        //false its not the morning
        socket.emit('weather', false)

    },

    'what is the time' : function () {

        responsiveVoice.speak("Today is; " + moment().format('dddd') + ", and the time is. " + moment().format('HH:mm'), "UK English Male");

    },

    'stop (stop)' : function () {

        socket.emit('musicControls', 'pause')   

        responsiveVoice.cancel();
        
    },

    'open *application' : function (application) {

        console.log(application)

        socket.emit('browserControls', application)
        
    },

    '*application search for *video' : function (application,video) {

        res = {

            vessel: application,
            search: video

        }

        socket.emit('applicationSearch', res)
        
    },

    'play *user playlist' : function (user) {

        socket.emit('playUserPlaylist', 'go')

    },

    'play some (music)' : function () {

        socket.emit('playTrack', '2jplimH0b7Abf5LQSPx27A')

        socket.on('trackInfo', function(res) {

            console.log(res)

        }) 
        
    },

    'search for song *name': function(name) {

        //put track and song and artist search in
        $.ajax({

            url: 'https://api.spotify.com/v1/search',

            data: {
                q: name,
                type: 'track'
            },

            success: function (response) {

                socket.emit('playTrack', response.tracks.items[0].id) 

                socket.on('trackInfo', function(res) {

                    console.log(res)

                })

            }
        });

    },

    'set user to :user': function(user) {

         switch(user) {
      
                case 'Ali':

                    socket.emit('setGlobalUser', 'Ali')

                break; 
                
                case 'my':
                case 'Ewan':
                case 'you win':

                    console.log('Ewan hit ')
                    socket.emit('setGlobalUser', 'Ewan')
                    responsiveVoice.speak('Hi Ewan,. Can i help with anything?', "UK English Male", {rate: 0.9})
                    

                break;  

                default: 
                
                    responsiveVoice.speak('say again?', "UK English Male", {rate: 0.9})
                    
            }
            
    },

    'search for artist *name': function(name) {
 
        $('.artist').remove()

        getArtistMatches(name)

        annyang.addCommands({

            '*index': function(index) {
                    
                if(index == (1||"one"||"1"||"first")) {

                    console.log($('.overlay')[0].id)

                    getArtistTopTracks($('.overlay')[0].id)

                }

                else if (index == (2||"two"||"2"||"second")) {

                    console.log($('.overlay')[1].id)

                    getArtistTopTracks($('.overlay')[1].id)
                    
                }

                else if (index == (3||"three"||"3"||"third")) {

                    console.log($('.overlay')[2].id)

                    getArtistTopTracks($('.overlay')[2].id)
                    
                }

            }
        })

    },     

    'Wikipedia *term': function(term) {

        socket.emit('wikiQuery', term)

        socket.on("wikiResult", function(res){

            var removeCrap = res.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, ' ')

            responsiveVoice.speak(removeCrap, "UK English Male", {rate: 0.9})

        })

    },
    'clear': function() { 

        $('.leftTab').fadeOut('slow') 
        $('.weatherTab').fadeOut('slow')

    },
    'volume up (up)': function() {

        socket.emit('musicControls', 'up')
        socket.on('setVolume', 6)

    },

    'volume down (down)': function() {

        socket.emit('musicControls', 'down')   
        socket.on('setVolume', 6)             

    },

    'volume full (full)': function() {

        socket.emit('musicControls', 'full') 
        socket.on('setVolume', 10)                

    },

    'volume half (half)': function() {

        socket.emit('musicControls', 'half') 
        socket.on('setVolume', 6)               

    },

    'pause (pause)': function() {

        socket.emit('musicControls', 'pause')                

    },


    'cheese (cheese)': function() {

        socket.emit('musicControls', 'pause')                

    },    

    'horse (horse)': function() {

        socket.emit('musicControls', 'pause')                

    },

    'play (play)': function() {

        socket.emit('musicControls', 'play')

    },

    'next (next)': function() {

        socket.emit('musicControls', 'next')

    },   

    'back (back)': function() {

        socket.emit('musicControls', 'back')
        socket.emit('musicControls', 'back')

    },

    'thanks Jarvis': function() {

        responsiveVoice.speak('you are welcome you win', "UK English Male", {rate: 0.9})

    },

    'hi Jarvis': function() {

        responsiveVoice.speak('Hi youwan how are you today?', "UK English Male", {rate: 0.9})

    },

    'what is the news' : function () {

        getNews()

    },
    'shutdown everything': function () {

        socket.emit('shutDown', 'go')

    },

    'spanish word' : function () {

        socket.emit("spanishWordRequest", "send word")

    },

    'kill everything': function () {

        socket.emit('shutDown', 'go')

    },

    'resurrection': function () {

        socket.emit('turnOn', 'go')

    }

  };