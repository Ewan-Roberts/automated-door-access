'use strict';

let server = require("../modules/server.js");

server.on('data', function(res) {
    console.log(res + "balls")

});