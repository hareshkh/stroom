console.log("jslinked");
var socket = io.connect('http://localhost');	
 socket.on('alertLink', function(msg){
    alertLink("Give This Link To Your Friend", msg, true);
  });
