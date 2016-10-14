var Room = require('./room');
var config = require('./config/config.json');
var baseUrl = config.base_url;

var timesyncServer = require('timesync/server');

var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');

var tracks = require('./tracks.json');

var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('port',(process.env.PORT||3000));
http.listen (app.get('port'),function() {
  console.log("Listening to port number " + app.get('port'));
});

var links = ["demoal","specry","credry","phonal","tactly","nating","fracor","medish","logive","duceur","tactly",
                "fratee","medent","logish","cepess","vokous","biblic","verant","malish","pedous","loging","mitish",
                "tenian","regant","scriby","nomman","cyclee","exlegy","venive","geneur","marure","verter","tensly",
                "cluser","bioics","tainic","geoish","tenish","venure","ferity","fracer","rectly","nateur","legous",
                "capess","dictty","pedman","tenent","mining","domian"];

Room.io = io;

app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.use('/timesync', timesyncServer.requestHandler);

app.set('layout'); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
	res.render('index');
});
app.get('/create/room', function(req, res) {
	res.render('room');
});
app.get('/join/room', function(req, res) {
    res.render('joiner');
});
app.get('/room/:room', function (req, res) {   
    res.render('room');
});

var playerInstances = "";
io.on('connection', function(socket) {
    console.log(Room.isStartTime);
	console.log("User Connected");

    var x = Math.floor(Math.random() * 50);
	var myRoom = links[x];
	var room;

	// console.log(socket.handshake.headers.referer);
    socket.on('startSetter', function(msg) {
        console.log("Socket recieved");
        if (!Room.isStartTime) {
            Room.isStartTime = true;
            Room.startTime = msg;
        }
        console.log(Room.startTime);
        socket.emit("start", Room.startTime);
    });

    socket.emit("roomAll", playerInstances);
    if (socket.handshake.headers.referer.split('/')[3] == 'create') {
        if(socket.handshake.headers.referer.split('/')[5] == undefined) {
                room = Room.allocateFirst(socket,myRoom);
                var selector = Math.floor(Math.random() * tracks.count);
                console.log(tracks.ids[selector]);
                socket.emit('songId', String(tracks.ids[selector]));
                socket.emit('alertLink', baseUrl + "/room/" + myRoom);
                playerInstances = playerInstances + " " + baseUrl + "/room/" + myRoom;
                console.log("New room allocated");
            }
    } else if (socket.handshake.headers.referer.split('/')[3] == 'room') {
                console.log("Room '" + socket.handshake.headers.referer.split('/')[4] + "' joined" );    
                room = Room.allocateOther(socket, socket.handshake.headers.referer.split('/')[4]);
    } else {
        console.log(socket.handshake.headers.referer);
    }
});