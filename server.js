var Room = require('./room.js');
var express = require('express')
var app = express();
var expressLayouts = require('express-ejs-layouts');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('port',(process.env.PORT||3000));
http.listen (app.get('port'),function() {
  console.log("listening to port number "+app.get('port'));
});
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('layout');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get( '/', function(req, res) {
	res.render('arena');
});
app.get( '/create/room', function(req, res) {
	res.render('room');
});
io.on('connection',function(socket){
	var myroom = "";
	var room;
	if (socket.handshake.headers.referer.split('/')[3] == 'room')
	{
		console.log("room alloaction staarted");
		if(games[socket.handshake.headers.referer.split('/')[4]] == undefined)
            {
            	myRoom = socket.id;
            	room = Room.allocateFirst(socket,socket.id);
            	socket.emit('alertLink',baseUrl+"/room/"+socket.id);
            	console.log("room allocated");
            }
        else
            {
            	console.log("join my room,Beaches");
                room = Room.allocateOther(socket,socket.handshake.headers.referer.split('/')[4]);
                socket.emit("players",[room.playersHandle[0],room.playersHandle[1]]);
            }
	}

});