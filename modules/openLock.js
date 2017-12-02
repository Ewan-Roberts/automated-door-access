'use strict';

let five = require("johnny-five");

let board = new five.Board();


board.on("ready", function() {

	let servo = require("../modules/lockServo.js");

	// let door = require("../modules/state.js");

    servo.action(true)

    // door.change(true)
    

});



module.exports.servo()

module.exports.open = () => {

	servo()

    servo.action(true)

    door.change(true)

}

module.exports.close = () => {

    servo.action(false)

    door.change(false)

}
