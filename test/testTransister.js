'use strict';

let five = require("johnny-five");
let board = new five.Board();

board.on("ready", function() {

    let transistor = require("../modules/transistor.js");

    transistor.emit('on');

    console.log('first')

    setTimeout(function() {
        
        console.log('second')
        
        transistor.emit('off');

    },100)

});




// board.on("ready", function() {

    
//     this.pinMode(6, 1);

//     board.digitalWrite(6, board.HIGH);

//     setTimeout(function() {
//         console.log('check')
        
//         console.log(board)
//         board.digitalRead(6, function(value) {
//           console.log("The value of digital pin 2 changed to: " + value);
//         });

//     }, 1000);


// });


// var firmata = require('firmata');
// var board = new firmata.Board('/dev/cu.usbmodem1421',function(){
//     console.log('Connected to Arduino');
//     console.log('Firmware: ' + board.firmware.name + 
//                 '-' + board.firmware.version.major + 
//                 '.' + board.firmware.version.minor);
//     console.log('Enabling motor 1');
//     board.pinMode(6, board.MODES.OUTPUT);

//     console.log(board)
//     setInterval(function(){
//       board.digitalWrite(6, board.HIGH);
//       board.analogWrite(6, 255);
//     },50)
// });