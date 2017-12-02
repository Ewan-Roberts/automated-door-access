'use strict';

let five = require("johnny-five");

module.exports = new five.Pin(7);

module.exports.on("on",() => {
    
    module.exports.high()

})

module.exports.on("off",() => {
    
    module.exports.low()

})

module.exports.on("high", () => {
    
    console.log('transistor on')

})

module.exports.on("low", () => {

    console.log('transistor off')

})