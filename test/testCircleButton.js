'use strict';

let five = require("johnny-five");
let board = new five.Board();

let globals = require("../modules/state.js");


  
board.on("ready", function() {

	module.exports = new five.Button(2);

    module.exports.on('hit', () => {

        console.log(!globals.check())

    }).on("release", function() {

	    console.log('yo')

	 });


});
