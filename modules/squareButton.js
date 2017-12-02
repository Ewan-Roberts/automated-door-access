const five = require("johnny-five");

const squareButton = new five.Button(7);

let lockServo = require('./lockServo.js')

squareButton.on("hit", socket => {

    lockServo.action(true)

}).on("release", () => {

 

});