const SocketEvents = require('../Enums/SocketEvents.js');
const Errors = require('../Enums/Errors');
const { Room } = require('../Entities/Room');

const G_ID = 'room';

// Waiting room contains Players with their respective Sockets
let waitingPlayers = [];


let rooms = [];
let players = [];

exports.Game = function(http) {

  const io = require('socket.io')(http);

  io.on('connection', (socket) => {

    socket.on(SocketEvents.REQUEST_ROOM, (player) => {
      waitingPlayers.push({socket, player});

      console.log('Player added:' + player.nickName);
      
      if(waitingPlayers.length == 2) {
        // Generate room and assign to it the first two players
        const room = new Room(G_ID + rooms.length);
        
        waitingPlayers.forEach((p) => {
          room.players.push(p.player);
          p.socket.join(room.id);
          p.player.room = room.id;
          players.push(p.player);
        });


        console.log('Emitting ' + SocketEvents.ROOM_ASSIGNED + ' for room: ' + room.id);

        io.to(room.id)
          .emit(SocketEvents.ROOM_ASSIGNED, {
            error: {status: Errors.SUCCESS},
            roomId: room.id
          });

        rooms.push(room);
        waitingPlayers = [];
      }

      
    });
  
  });

}
