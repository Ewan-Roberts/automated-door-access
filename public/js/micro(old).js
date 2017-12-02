
function setUpMicrophone() {

    // LISTENS TO YOUR MICROPHONE.
    function gotStream(stream) {
        
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        var audioContext = new AudioContext();

        // Create an AudioNode from the stream.
        var mediaStreamSource = audioContext.createMediaStreamSource( stream );

        var src
          , fftSize = 1024
          , ac = new webkitAudioContext()
          , analyser = ac.createAnalyser()
          , timeData = new Uint8Array(fftSize)
          , bar = document.querySelector('.bar');

        analyser.fftSize = fftSize;

        navigator.webkitGetUserMedia({audio: true}, function( stream ) {
          src = ac.createMediaStreamSource(stream);
          src.connect(analyser);
          draw();
        }, function( e ) {
          throw e;
        });

        function draw() {
          var total = i = 0
            , percentage
            , float
            , rms
            , db;
          analyser.getByteTimeDomainData(timeData);
          while ( i < fftSize ) {
             float = ( timeData[i++] / 0x80 ) - 1;
             total += ( float * float );
          }
          rms = Math.sqrt(total / fftSize);
          db  = 20 * ( Math.log(rms) / Math.log(10) );
          // sanity check
          db = Math.max(-48, Math.min(db, 0));
          percentage = 100 + ( db * 2.083 );

          //65 is like a click

            if(percentage > 88){
                
                loudNoise()

            }
            
            bar.style.webkitTransform = 'scale('+percentage+','+percentage+')'
            
            webkitRequestAnimationFrame(draw);

        }

    }


    /* 

    the voices get pulled in from the internet, check man

    GET https://code.responsivevoice.org/getvoice.php?t=Yes%3F&tl=en-GB&sv=g1&vn=rjs&pitch=0.5&rate=0.45&vol=1 net::ERR_INTERNET_DISCONNECTED

    */

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    navigator.getUserMedia( {audio:true}, gotStream, function(err){console.log(err)} );


}




var loudNoise = function() { 

    // responsiveVoice.speak('Yes?', "UK English Male", {rate: 0.9})

    // responsiveVoice.cancel();

    // socket.emit('musicControls', 'pause')

}


var spoofMusic = function () { 


    socket.emit('playTrack', "2jplimH0b7Abf5LQSPx27A")


}

var spoofWeather = function () { 

    socket.emit('weather', 'Get me weather')

    socket.on('weatherData', function(res) {

        weatherData = res;

        console.log(weatherData)

        responsiveVoice.speak("todays weather status is, " + weatherData.weather[0].description + " and the temperature will be. " + (weatherData.main.temp).toString(), "UK English Male", {rate: 0.8}); 

    })

}

/*

Make sure the light turns on when i come in

Set up a LCD board 

Set up a stay on function so if i want i can not have the light turn off after 5 mins

build a function so that the light turns off after a while 

and the motion sensing doesnt happen at night 

LCD:

    Set a funtion to turn off the LCD, possibly after dark

    tie the LCD to the time command

    Get the LCD to show the temperature

MORNING:
    
    Daily update for day

    Pulse an LED in the morning

    set a path to turn everything off

    snooze function 

    turn on the light at some point in the morning routine


Temperature update?

and set a funtion to set the user name 

ultrasonic module is for distance! use it to see if the door is closed! 

Think about how to open the front door




*/


var spoofTravel = function () {

    var numberOfBikes = '';
    var locationOfBike = '';
    var line = '';
    var lineStatus = ''

    $.get('https://api-prod5.tfl.gov.uk/Place/BikePoints_489', function (response) {

        numberOfBikes = response.additionalProperties[6].value

    });

    $.get('https://api.tfl.gov.uk/Line/hammersmith-city/Status?detail=False&app_id=&app_key=', function (response) {

        line = response[0].name

        lineStatus = response[0].lineStatuses[0].statusSeverityDescription

        console.log(lineStatus)

        console.log(numberOfBikes)
        console.log(line)
        console.log(lineStatus)

    });



}

var spoofWiki = function () {
        
        socket.emit('wikiQuery', term)

        socket.on("wikiResult", function(res){

            var removeCrap = res.replace(/[`~!@#$0123456789%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gi, ' ')

            responsiveVoice.speak(removeCrap, "UK English Male", {rate: 0.9})

        })

}

//WEATHER FUNCTIONS

var updateWeather = function(object,i) {

    $(".weatherTab").fadeIn()

    console.log(object)

    $('<div/>', {
        class: 'weatherTab',
        fadeIn: 'slow',
        success: function() {
            
            $(this).append(

                $('<div/>', {
                    class: "day",
                    text: moment().add(i, 'd').format('dddd')
                    
                })
            ),

            $(this).append(

                $('<div/>', {
                    class: "location",
                    text: "London"
                    
                })
            ),

            $(this).append(

                $('<div/>', {
                    class: "icon",
                    success: function () {

                        $(this).append(

                            $('<img/>', {
                                id: "iconImage",
                                src: "https://openweathermap.org/img/w/" + object.weather[0].icon + ".png"

                            })

                        )

                    }
                })
            ),
            $(this).append(

                $('<div/>', {
                    class: "temperature",
                    text: object.temp.day + "ºC"
                    
                })
            )

        }
    }).appendTo('.weatherHolder');

}

//NEWS FUNCTIONS

var getNews = function () {

    socket.emit('setSpotifyVolume', 10)
    socket.emit('news', 'Get me the news')
    $('.newsStory').remove()
    $('.leftTab').fadeIn('slow')

    socket.on('newsData', function(res) {

        console.log(res)

        var headlineTogether = ''

        for (var i = 0; i < 4; i++) {

            displayStories(res.results[i])
            //[`~!@#$0123456789.%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' '
            headlineTogether += (res.results[i].title).replace(/[`~!@#$.%^&*()_|+\-=?;<>\{\}\[\]\\\/]/gi, ' ') + ". new story: "

        };

        responsiveVoice.speak(headlineTogether, "UK English Male", {rate: 0.9, pitch: 1})
        
    })
    setTimeout(function() { 

        socket.emit('setVolume', 5)
        socket.emit('setSpotifyVolume', 100)

    }, 25000)
    
}

var displayStories = function(story) {

    if (story.media[0]["media-metadata"][0].url === undefined) {

        console.log('error getting story')

    }

    else{
    
        $('<div/>', {
            class: 'newsStory',
            fadeIn: 'slow',
            success: function() {
                
                $(this).append(

                    $('<img/>', {
                        src: story.media[0]["media-metadata"][0].url
                    })
                ),

                $(this).append(

                    $('<h3/>', {
                        text: story.title
                    })
                ),

                $(this).append(

                    $('<a/>', {
                        text: story.abstract
                    })
                )

            },
            click: function () {
                window.location = story.url 
            }
        }).appendTo('.leftTab');

    }

}

// MUSIC
var updateTrackInfo = function(res){

    socket.emit('spotifyGetTrack', 'Get me the track')

    socket.on('spotifyTrackInfo', function(res) {

        updateSongBar(res)

    }) 
}

var updateSongBar = function (object){

    if (object !== null) {

        $('.musicName').text(object.artist + " - " + object.name )

    }

    else {

        console.log('couldnt get artist or name')

    }

}

var getTimeOfSong = function () {

    socket.emit('trackTime', 'get me the time')

    socket.on('trackTimeInfo', function(res){

        if (res.position !== null) {

            // $('.timing').animate({"width" : res.position}, 7000)

        }

        else {

            console.log('error in getting song position')

        }

    })

}


var getArtistMatches = function(name) {

    $.ajax({
        
        url: 'https://api.spotify.com/v1/search',

        data: {
            q: name,
            type: 'artist'
        },

        success: function (response) {

            console.log(response)

            displayArtistMatches(response)

        }
    });

}

var getArtistTopTracks = function(artistID) {

    console.log(artistID)

    $.ajax({
        
        url: 'https://api.spotify.com/v1/artists/'+ artistID+'/top-tracks?country=ES',

        success: function (response) {

            console.log(response)

            var musicSchema = {

                uri: response.tracks[0].id,
                volume: 100

            }

            socket.emit('musicPlay', musicSchema) 

        }
    }); 

}

var displayArtistMatches = function(object) {

     $('.leftTab').fadeIn('slow')

    for (var i = 0; i < 5; i++) {

            $('<div/>', {
                class: 'artist',
                fadeIn: 'slow',
                success: function() {
                    
                    $(this).append(

                        $('<div/>', {
                            class: "overlay",
                            text: i +1,
                            success: function() {

                                $(this).attr("id", object.artists.items[i].id)
                                // console.log($(this).attr('id'))
                            }
                        })
                    ),                    
                    $(this).append(

                        $('<img/>', {
                            src: object.artists.items[i].images[2].url
                        })
                    ),

                    $(this).append(

                        $('<h3/>', {
                            text: object.artists.items[i].name
                        })
                    )

                }
            }).appendTo('.leftTab');

    };

}

jQuery(document).ready(function($){

var audio = new Audio('./sound/Blop.mp3');

time = moment().format('HH:mm');

timePlusAMinute = moment().add(10,'minute').format('HH:mm');

try {

    audio.play();

    setUpMicrophone();

    clock();

}

catch(e){

    console.log(e)
}

getTimeOfSong()

updateTrackInfo()

socket.emit('readyBoard', 'ready the board')

socket.emit('startBoard', true)

socket.emit('setGlobalUser', "Ewan")

socket.on('motionSensed', function(res) {

    console.log(res)
    
    audio.play();
    
    responsiveVoice.speak('Name?', "UK English Male", {rate: 0.9})

})

socket.on('globalUserSet', function() {

    console.log('remove ewan command')

    annyang.removeCommands();

    annyang.addCommands(commands)

})

if (annyang){

    annyang.start();
    annyang.setLanguage('en-GB')

    annyang.addCallback('resultNoMatch', function () {
        console.log("result NoMatch world");
    });

    console.log('rest?')
    annyang.addCallback('result', function (userSaid, commandText, phrases) {
        
        console.log('rest?')

        $(".voiceMatch").text(userSaid)

        // console.log(commandText); // sample output: 'hello (there)'
        // console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']

    });

    annyang.addCommands(commands);
    annyang.addCommands(commandsSoft);
}

if(annyang === undefined) {

    console.log('annyang undefined')
}


function morning (time, trigger) {
    
    if (time === trigger) {

        socket.emit('setSpotifyVolume', 40)

        socket.emit('setVolume',10)

        socket.emit('playTrack', '2jplimH0b7Abf5LQSPx27A')

        socket.emit('light', 'pulse')

        setTimeout(function() {

            socket.emit('weather', 'Get me weather')

            socket.on('weatherData', function(res) {

                for (var i = 0; i < res.list.length; i++) {
                    
                    updateWeather(res.list[i], i)

                };
                
                responsiveVoice.speak("Good morning Ewan. Today is " + moment().format('dddd') + " and todays weather will be, " + res.list[0].weather[0].description + " and the temperature is. " + (res.list[0].temp.day).toString() + " do you want to hear the news? ", "UK English Male", {rate: 0.8}); 

                annyang.addCommands({

                    'ok': function() {
                        
                        getNews()
                        
                    },              

                    'yes': function() {
                        
                        getNews()
                    }
                });
            });  

        }, 25000)

    }

}

function removeCommandsAfterTwoMinutes (time, timePlusAMinute) {
    
    if(time === timePlusAMinute){
        console.log('havent heard anything in a minute remove commands')
        socket.emit('startBoard', true)
    }
}



function clock() {

    var time = moment().format('HH:mm');
    


    $(".currentTime").text(time)

    morning(time,"10:12")
    morning(time,"08:00")

    timeReminder(time, '22:00', "Hey Ewan, its getting a little late, tommorow is  " + moment().add(1, 'day').format('dddd'))

    timeReminder(time, '23:30', "Hey Ewan, its getting late, probably time for bed mate. Tommorow is  " + moment().add(1, 'day').format('dddd'))

    setTimeout(clock, 60000);

    removeCommandsAfterTwoMinutes(time, timePlusAMinute)

}


                /*
                track = {
                    artist: 'Bob Dylan',
                    album: 'Highway 61 Revisited',
                    disc_number: 1,
                    duration: 370,
                    played count: 0,
                    track_number: 1,
                    starred: false,
                    popularity: 71,
                    id: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc',
                    name: 'Like A Rolling Stone',
                    album_artist: 'Bob Dylan',
                    spotify_url: 'spotify:track:3AhXZa8sUQht0UEdBJgpGc' }
                }
                */



//Focus on one thing at a time: 

// make weather pretty and working


//Music Controls

$('.musicPrevious').click(function(){


    socket.emit('musicControls', 'back')
    socket.emit('musicControls', 'back')

})


$('.musicNext').click(function(){

    socket.emit('musicControls', 'next')
    
})


$('.musicState').click(function(){

    if ($(this).text() === "ll"){

        $(this).text(">")
        $(this).css({"background-color": "green"})
        socket.emit('musicControls', 'pause')
    }

    else{

        $(this).text("ll")
        $(this).css({"background-color": "red"})
        socket.emit('musicControls', 'play')
    }
    
})

/* 

    I initiate jarvis

    if i keep using the commands i keep the refreshing the commands until i dont use them for 1 minute

    if i shout jarvis he will talk and ask what i want

    get spotify playlists to work and pull in

    move all the requests to the backend
*/





//end of jquery document ready
})


/*

        // socket.emit('weather', 'Get me weather')


        // var numberOfBikes = '';
        // var locationOfBike = '';
        // var line = '';
        // var lineStatus = ''
        // socket.on('trackInfo', function(res) {

        //     console.log(res)

        // }) 

        // $.get('https://api-prod5.tfl.gov.uk/Place/BikePoints_489', function (response) {

        //     numberOfBikes = response.additionalProperties[6].value

        // });

        // $.get('https://api.tfl.gov.uk/Line/hammersmith-city/Status?detail=False&app_id=&app_key=', function (response) {

        //     line = response[0].name

        //     lineStatus = response[0].lineStatuses[0].statusSeverityDescription

        //     console.log(lineStatus)

        // });


    // 'everything' : function () {

    //     var numberOfBikes = '';
    //     var locationOfBike = '';
    //     var line = '';
    //     var lineStatus = ''

    //     $.get('https://api-prod5.tfl.gov.uk/Place/BikePoints_489', function (response) {


    //             console.log(response)

    //             locationOfBike = response.commonName

    //             numberOfBikes = response.additionalProperties[6].value

    //     });

    //     $.get('https://api.tfl.gov.uk/Line/hammersmith-city/Status?detail=False&app_id=&app_key=', function (response) {


    //             console.log(response)

    //             console.log(response[0].name)

    //             line = response[0].name

    //             lineStatus = response[0].lineStatuses[0].statusSeverityDescription

    //     });

    //     socket.emit('weather', 'Get me weather')

    //     socket.on('weatherData', function(res) {

    //         res = JSON.parse(res)

    //         weatherData = res;

    //         console.log(newsData)
    //         audio.play();

   
    //     })

   

    //     socket.emit('news', 'Get me the news')

    //     socket.on('newsData', function(res) {

    //         res = JSON.parse(res)

    //         newsData = res;

    //         console.log(newsData)
    //         audio.play(newsData);
    //         responsiveVoice.speak("weather. " +  weather.forcast() + " " + weather.warmth() + weather.temp() + " celsius " + " sunset at " + weather.sunset() + 
    //         "transport. "+ numberOfBikes + " bikes at, " + locationOfBike + lineStatus + " on the " + line + " line"+
    //         "time. " + todayIs + moment().format('HH:mm') +
    //         "headlines. "
    //         , "UK English Male", {rate: 0.9});  
            
    //     })





    // },   
// var getSpotify = function (track) {


//     var spoof = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+ track +'" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'



//     var url = '<iframe src="https://embed.spotify.com/?uri=spotify:track:34a7VkqKRQ4pA2598XizKN" margin-left= "30" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'

//     console.log(spoof)

//     console.log(url)


//     $(spoof).appendTo("#playerHolder")



// }
        // $.ajax({

        //     url: 'https://numbersapi.com/' + moment().format('d/mm') +'date?json',

        //     success: function (response) {


        //         console.log(response.text)

        //     }
        // });

var daysOfTheWeek = [

    {
        day:                    "Monday",
        times : 
        [
            {
                time:              "08:10",
                message:        "Wake up Ewan, its a Monday",
                timeFunction : function () {
                        
                    annyang.addCommands(commands);

                    var musicSchema = {

                        uri: "2jplimH0b7Abf5LQSPx27A",
                        volume: 50

                    }

                    socket.emit('musicPlay', musicSchema)

                }
            },

            {
                time :              "08:30",
                message:            "You have snoozed for 10 minutes get up",
                timeFunction : function () {
                            
                        annyang.addCommands(commands);
                }
            },
            {
                time :              "11:30",
                message:            "it's 11 30, go to bed",
                timeFunction : function () {
                            
                    annyang.addCommands(commands);
                }
            }
        ]
    },
    {
        day:                "Monday",
        times : 
        [
            {
                time:          "08:10",
                message:        "Wake up Ewan, its a Monday",
                timeFunction : function () {
                        
                    annyang.addCommands(commands);

                    var musicSchema = {

                        uri: "2jplimH0b7Abf5LQSPx27A",
                        volume: 50

                    }

                    socket.emit('musicPlay', musicSchema)

                }
            },

            {
                time :              "08:30",
                message:            "You have snoozed for 10 minutes get up",
                timeFunction : function () {
                            
                        annyang.addCommands(commands);
                }
            },
            {
                time :              "11:30",
                message:            "it's 11 30, go to bed",
                timeFunction : function () {
                            
                    annyang.addCommands(commands);
                }
            }
        ]
    },
    {
        day:                "Monday",
        times : 
        [
            {
                time:          "08:10",
                message:        "Wake up Ewan, its a Monday",
                timeFunction : function () {
                        
                    annyang.addCommands(commands);

                    var musicSchema = {

                        uri: "2jplimH0b7Abf5LQSPx27A",
                        volume: 50

                    }

                    socket.emit('musicPlay', musicSchema)

                }
            },

            {
                time :              "08:30",
                message:            "You have snoozed for 10 minutes get up",
                timeFunction : function () {
                            
                        annyang.addCommands(commands);
                }
            },
            {
                time :              "11:30",
                message:            "it's 11 30, go to bed",
                timeFunction : function () {
                            
                    annyang.addCommands(commands);
                }
            }
        ]
    },
    ]


*/
