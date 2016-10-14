function Room(name) {
    this.name = name;
    this.playersHandle = {};
    this.players = {};
    this.isstartTime = false;
    this.startTime;
}

Room.rooms = {};

Room.allocateFirst = function(socket, id) {
    var rooms = Room.rooms;
    console.log("created new room");
    rooms[id] = new Room (id);
    var room = rooms[id];
    room.name = id;
    socket.join(id);
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
    socket.join(id);
    socket.room= room;
    return room;
};

module.exports = Room;