 socket.on('alertLink', function(msg){
    alertLink("Give This Link To Your Friend", msg, true);
    var clipboard = new Clipboard('button.cancel', {
        target: function (trigger) {
            return $(".sweet-alert p:first")[0];
        }
    });
