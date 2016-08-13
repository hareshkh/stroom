function Room(name) {
  this.name = name;
  this.strength = 0;
  this.active = false;
  this.playersHandle = {};
}
Room.rooms = {};
Room.allocateFirst = function(socket, id) {
      var rooms = Room.rooms;
      console.log("created new room");
      rooms[id] = new Room (id);
      var room = rooms[id];
      room.name = id;
      room.strength = 1;
      socket.join(room.name);
      socket.room = room;
      return room;
};
Room.allocateOther = function(socket, id) {
  console.log("allocating other");
  var rooms = Room.rooms;
    if(rooms[id] === null)
    {

       return ;
    }
    var room = rooms[id];
    room.strength++;
    socket.join(room.name);
    room.players[room.strength-1]=socket.id;
    socket.room= room;
    room.active = true;
    return room;
};
module.exports = Room;