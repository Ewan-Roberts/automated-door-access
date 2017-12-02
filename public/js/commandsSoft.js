  var commandsSoft = {

    '(jarvis) can you tell me the weather': function() { 

        socket.emit('weather', 'Get me weather')

        socket.on('weatherData', function(res) {

            console.log(res)

            for (var i = 0; i < res.list.length; i++) {
                
                updateWeather(res.list[i], i)

            };
            
            responsiveVoice.speak("todays weather status is, " + res.list[0].weather[0].description + " and the temperature will be. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8}); 

        })

    },

    '(jarvis) tell me the weather': function() { 

        socket.emit('weather', 'Get me weather')

        socket.on('weatherData', function(res) {

            console.log(res)

            for (var i = 0; i < res.list.length; i++) {
                
                updateWeather(res.list[i], i)

            };
            
            responsiveVoice.speak("todays weather status is, " + res.list[0].weather[0].description + " and the temperature will be. " + (res.list[0].temp.day).toString(), "UK English Male", {rate: 0.8}); 

        })

    },

    '(jarvis) can you tell me the time' : function () {

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

    '(jarvis) play *user playlist' : function (user) {

        switch(user) {
  
            case 'James':

                var musicSchema = {

                    userName: "James",
                    track: "2jplimH0b7Abf5LQSPx27A",
                    user: "1130242707",
                    playlist: "6Gj9EYigkSxPRFox6rLSC8"

                }

                break; 
            
            case 'my':

                var musicSchema = {

                    userName: "Ewan",
                    track: "2jplimH0b7Abf5LQSPx27A",
                    user: "1130242707",
                    playlist: "6Gj9EYigkSxPRFox6rLSC8"

                }

                break;  
        }

        console.log(user)

        socket.emit('playPlaylist', musicSchema)

    },

    'play some (music)' : function () {
        

        var musicSchema = {

            userName: "Ewan",
            track: "2jplimH0b7Abf5LQSPx27A",
            user: "1130242707",
            playlist: "6Gj9EYigkSxPRFox6rLSC8"

        }

        socket.emit('playPlaylist', musicSchema)

        socket.on('trackInfo', function(res) {

            console.log(res)

        }) 
        
    },

    'search for the song *name': function(name) {

        //put track and song and artist search in
        $.ajax({

            url: 'https://api.spotify.com/v1/search',

            data: {
                q: name,
                type: 'track'
            },

            success: function (response) {

                console.log(response)

                var musicSchema = {

                    uri: response.tracks.items[0].id,
                    volume: 100

                }

                console.log(response)

                socket.emit('musicPlay', musicSchema) 

                socket.on('trackInfo', function(res) {

                    console.log(res)

                })

            }
        });

    },

    //artist search
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

    'jimi (hendrix)': function() {

        var musicSchema = {

            uri: '2aoo2jlRnM3A0NyLQqMN2f',
            volume: 50

        }

        socket.emit('musicPlay', musicSchema)

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

    },

    'volume down (down)': function() {

        socket.emit('musicControls', 'down')                

    },

    'volume full (full)': function() {

        socket.emit('musicControls', 'full')                

    },

    'volume half (half)': function() {

        socket.emit('musicControls', 'half')                

    },

    'pause (pause)': function() {

        socket.emit('musicControls', 'pause')                

    },


    'cheese (cheese)': function() {

        socket.emit('musicControls', 'pause')                

    },    

    'Porsche (Porsche)': function() {

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

    }

  };