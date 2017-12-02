'use strict';

const fs = require("fs");

let globals = require('../globals.json');

module.exports.state = () => {
	
    return globals.doorState

}

module.exports.change = bool => {

	try {
    	
    	if(typeof(bool) !== "boolean") throw "non bool passed into global object";

	    if(bool === globals.doorState) throw "bool passed in is " + bool + " current state " + globals.doorState;

        globals.doorState = bool

        fs.writeFile('../globals.json', JSON.stringify(globals), err => {
            if (err) return console.log(err);
        });

	} 

    catch (err) {

		console.log("Throw error (state.js): " + err)

	}

}
