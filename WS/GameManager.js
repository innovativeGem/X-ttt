function createGameManager(io) {
    let players = [];
    let playersAvail = [];
  
    function addPlayer(data, socket) {
      const newPlayer = {
        uid: -1,
        name: data.name,
        status: 'looking',
        sockid: socket.id,
        socket: socket,
        mode: null,
        opp: null,
      };
  
      players.push(newPlayer);
      playersAvail.push(newPlayer);
  
      console.log(`New player added: ${data.name}`);
      pairAvailPlayers();
      return newPlayer;
    }
  
    // Remove a player when they disconnect
    function removePlayer(socket) {
      const index = players.findIndex(p => p.sockid === socket.id);
      if (index !== -1) {
        const removed = players.splice(index, 1)[0];
        playersAvail = playersAvail.filter(p => p.sockid !== socket.id);
        console.log(`Player removed: ${removed.name}`);
      }
    }
  
    // Try pairing available players
    function pairAvailPlayers() {
      if (playersAvail.length < 2) return;
  
      const p1 = playersAvail.shift();
      const p2 = playersAvail.shift();
  
      // Set modes and update statuses
      p1.mode = 'm';
      p2.mode = 's';
      p1.status = 'paired';
      p2.status = 'paired';
      p1.opp = p2;
      p2.opp = p1;
  
      // Emit pairing info to both players
      io.to(p1.sockid).emit("pair_players", { opp: { name: p2.name, uid: p2.uid }, mode: 'm' });
      io.to(p2.sockid).emit("pair_players", { opp: { name: p1.name, uid: p1.uid }, mode: 's' });
  
      console.log(`Paired players: ${p1.name} and ${p2.name}`);
    }
  
    // Handle a player's turn and notify the opponent
    function handleTurn(data, socket) {
      const player = players.find(p => p.sockid === socket.id);
      if (player && player.opp) {
        io.to(player.opp.sockid).emit("opp_turn", { cell_id: data.cell_id });
        console.log(`Turn from ${player.name} relayed to ${player.opp.name} for cell: ${data.cell_id}`);
      }
    }
  
    // Return the public API for the game manager
    return {
      addPlayer,
      removePlayer,
      handleTurn
    };
  }
  
  module.exports = { createGameManager };
  