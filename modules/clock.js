'use strict';

let moment = require("moment");

let events = require('events');

let clock = undefined;

module.exports = new events.EventEmitter();

module.exports.startTimer = interger => {

	clearTimeout(clock)
	
	clock = setTimeout(() => {

		module.exports.emit('timer');
		
	},interger)

}
