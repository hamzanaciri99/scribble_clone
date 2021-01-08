import * as SocketEvents from '../Enums/SocketEvents.js';
import * as Errors from '../Enums/Errors.js';

class Player {

  constructor(name, id) {
    this.id = id;
    this.nickName = name;
    this.score = 0;
    this.isDrawing = false;
    this.guessedWord = false;
    this.room = null;

    this.start = this.start.bind(this);
    this.inGame = this.inGame.bind(this);
    this.submitGuess = this.submitGuess.bind(this);
    this.quit = this.quit.bind(this);
  }

  inGame() {
    return this.room != null;
  }

  start(socket) {

    socket.emit(SocketEvents.REQUEST_ROOM, this);

    socket.on(SocketEvents.ROOM_ASSIGNED, ({error, roomId}) => {
      console.log(SocketEvents.ROOM_ASSIGNED + ' Event recieved!');
      if(error.status == Errors.FAILED) {
        throw new Error(error.message);
      }
      this.room = roomId;
      console.log('Room assigned ' + this.roomId);
    })
  }

  submitGuess() {
    if(!inGame()) return;

  }

  quit() {
    if(!inGame()) return;

  }
}

window.Player = Player;