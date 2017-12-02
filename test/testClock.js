'use strict';

let clock = require("../modules/clock.js");

clock.startTimer(5000)

setTimeout(function() {

    console.log('override please')
    clock.startTimer(5000)

}, 4000);

//Assign the event handler to an event:
clock.on('timer', function() {
    console.log('fwefew')
});