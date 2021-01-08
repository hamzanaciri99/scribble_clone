const RoomConfigs = require('../Enums/RoomConfigs');

class Room {

  constructor(id) {
    this.id = id;
    this.maxPlayers = RoomConfigs.DEFAULT_MAX_PLAYERS;
    this.maxRounds = RoomConfigs.DEFAULT_MAX_ROUNDS;
    this.maxTime = RoomConfigs.DEFAULT_MAX_TIME;
    this.currentRound = 1;
    this.players = [];
    this.currentPlayer = 0;
  }
  
  nextRound() {

  }

  nextDrawer() {

  }

  nextWord() {

  }

}

exports.Room = Room;