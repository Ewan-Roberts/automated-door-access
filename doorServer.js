'use strict';

const five = require("johnny-five");

const board = new five.Board();

board.on("ready", function() {

     let servo = require("./modules/lockServo.js");

     let touch = require("./modules/touch.js");

     let door = require("./modules/state.js");

     touch.on("allow", () => {

          servo.action(true)

          door.change(true)

    })

     servo.action(true)


});









// 'use strict';

// let express = require("express");
// let app = express();
// let router = express.Router();
// let path = __dirname + '/views/';
// let fs = require("fs");

// const http = require('https');

// router.use(function (req,res,next) {
//   console.log("/" + req.method);
//   next();
// });

// router.get("/",function(req,res){
//   res.sendFile(path + "index.html");
// });

// app.use("/",router);

// app.use("*",function(req,res){
//   res.sendFile(path + "404.html");
// });

// app.listen(3000,function(){
//   console.log("Live at Port 3000");
// });

// const options = {

//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('key-cert.pem')

// };

// const server = http.createServer(options, app).listen(app.get('port'), () => {
 
//   console.log('Express server listening on port ' + app.get('port'));

// });

// let io = require('socket.io').listen(server);

// // const five = require("johnny-five");

// // const board = new five.Board();

// // const fs = require("fs");

// // let fileName = './globals.json';

// // let file = require(fileName);


// // board.on("ready", () => {

// //     console.log('board up');

// // });

// io.sockets.on('connection', socket => {

//     console.log('Connected!!')

// });

// setInterval(() => {

//     //?? do i need this? 

// }, 60000)

