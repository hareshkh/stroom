var Room = require('./room');
var express = require('express');
var app = express();
var baseUrl = "172.23.0.131:3000";
var expressLayouts = require('express-ejs-layouts');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('port',(process.env.PORT||3000));
http.listen (app.get('port'),function() {
  console.log("listening to port number "+app.get('port'));
});
Room.io = io;
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('layout');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get( '/', function(req, res) {
	res.render('index');
});
app.get( '/create/room', function(req, res) {
	res.render('room');
});
app.get('/room/:room', function (req, res)
{   
    res.render('room');
});
var playerInstances = {};

io.on('connection',function(socket){
	console.log("user connected");
	var myRoom = "";
	var room;
	console.log(socket.handshake.headers.referer);	
    if (socket.handshake.headers.referer.split('/')[3] == 'create')
    {
        if(socket.handshake.headers.referer.split('/')[5] == undefined)
            {
                myRoom = socket.id;
                room = Room.allocateFirst(socket,socket.id);
                socket.emit('alertLink',baseUrl+"/room/"+socket.id);
                console.log("room allocated");  
            }
    }
    else if (socket.handshake.headers.referer.split('/')[3] == 'room') {
                console.log("join my room,Beaches");    
                room = Room.allocateOther(socket,socket.handshake.headers.referer.split('/')[4]);
                socket.emit("players",[room.playersHandle[0],room.playersHandle[1]]);
    }
    else {
        console.log("Such link,much wow");
    }
});