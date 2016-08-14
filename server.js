var Room = require('./room');
var config = require('./config/config.json');
var baseUrl = config.base_url;
var express = require('express');
var timesyncServer = require('timesync/server');
var app = express();
var baseUrl = "172.23.0.131:3000";
var expressLayouts = require('express-ejs-layouts');
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('port',(process.env.PORT||3000));
http.listen (app.get('port'),function() {
  console.log("listening to port number "+app.get('port'));
});
var links = ["demoal","specry","credry","phonal","tactly","nating","fracor","medish","logive","duceur","tactly","fratee","medent","logish","cepess","vokous","biblic","verant","malish","pedous","loging","mitish","tenian","regant","scriby","nomman","cyclee","exlegy","venive","geneur","marure","verter","tensly","cluser","bioics","tainic","geoish","tenish","venure","ferity","fracer","rectly","nateur","legous","capess","dictty","pedman","tenent","mining","domian"];
Room.io = io;
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);
app.set('layout'); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use('/timesync', timesyncServer.requestHandler);
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
    console.log(Room.isStartTime);
	console.log("user connected");
    var x = Math.floor((Math.random() * 50));
    var y = Math.floor((Math.random() * 50));
	var myRoom = links[x]+links[y];
	var room;
	console.log(socket.handshake.headers.referer);
    socket.on('startSetter',function(msg){
        console.log("socket recieved");
        if(!Room.isStartTime){
            Room.startTime = msg;
        }
        socket.emit("start",Room.startTime);
    });
    if (socket.handshake.headers.referer.split('/')[4] == 'room')
    {
        if(socket.handshake.headers.referer.split('/')[5] == undefined)
            {
                room = Room.allocateFirst(socket,myRoom);
                socket.emit('alertLink',baseUrl+"/room/"+myRoom);
                console.log("room allocated");  
            }
    }
    else if (socket.handshake.headers.referer.split('/')[3] == 'room') {
                console.log("join my room,Beaches");    
                room = Room.allocateOther(socket,socket.handshake.headers.referer.split('/')[4]);
    }
    else {
        console.log(socket.handshake.headers.referer);
    }
});