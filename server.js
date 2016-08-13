var express = require('express')
var app = express();
// console.log(app);
// var expressLayouts = require('express-ejs-layouts');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
app.set('port',(process.env.PORT||6000));
http.listen (app.get('port'),function(){
  console.log("listening to port number "+app.get('port'));
});