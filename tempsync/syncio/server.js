var isStartTime, startTime;

var express = require('express');
var timesyncServer = require('timesync/server');
 
// create an express app 
var port = 8081;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.listen(port);
console.log('Server listening at http://localhost:' + port);
 
// serve static index.html 
app.get('/', express.static(__dirname));
 
// handle timesync requests 
app.use('/timesync', timesyncServer.requestHandler);

io.on('connection',function(socket) {
	if (isStartTime==false) {
		isStartTime = true;
		socket.on('startsetter',function(msg) {
			startTime = msg;
		})
		socket.emit('start',startTime);
	}
	else {
		socket.emit('start',startTime);
	}	
});