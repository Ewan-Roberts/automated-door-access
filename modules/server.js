
'use strict';

const express = require("express");
const app = express();
const server = require('http').createServer(app); 
const io = require('socket.io').listen(server);
const filePath = __dirname + '/../public/';
const fs = require("fs");
const path = require('path');
const events = require('events');

app.use(express.static(path.join(__dirname, '../public')));

app.use((req,res,next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
  	next();
});

app.get("/", res => {

  res.sendFile(path.resolve(filePath) + "/index.html");

});

module.exports = new events.EventEmitter();

io.on('connection', socket => {

	socket.emit('front', "tits")

	socket.on('control', data =>{

		console.log(data)

		module.exports.emit('data', data)

	})

    console.log('Connected!!')   

});

server.listen(3000);






