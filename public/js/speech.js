

















jQuery(document).ready(function($){
    
    var variable='London'


  var socket = io.connect();
    
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + variable + "&APPID=b0b57b788f25abe95a358de9116a043d", function(data){  
    console.log(data)
    console.log(data.main.temp_min)
    console.log(data.main.temp_max)
});


})







if (annyang) {

	annyang.addCallback('result', function (userSaid, commandText, phrases) {
		console.log(userSaid); // sample output: 'hello'
		console.log(commandText); // sample output: 'hello (there)'
		console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']

	});
  // Let's define a command.
  var commands = {
    'hello': function() { 

    	responsiveVoice.speak("hello world", "UK English Male");

    },
     'love': function() { 

    	responsiveVoice.speak("hello poop world", "UK English Male");

    },
    'weather': function() { 

      var person = "john";
$.getJSON("https://graph.facebook.com/" + person, function(person){

    $.each(person, function(key, value){
        document.write(key+": "+value+"<br />"); 
    });
}); 




    }
  };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening.
	annyang.start({ autoRestart: true });



}