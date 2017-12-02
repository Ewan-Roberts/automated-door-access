const five = require("johnny-five");

module.exports = new five.Button(7);

module.exports.on("hit", callback => {

    callback()

}).on("release", () => {

});