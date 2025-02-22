module.exports = function setGameSocketHandlers(socket, gameManager) {
	socket.on('new player', function(data) {
	  gameManager.addPlayer(data, socket);
	});
  
	socket.on('ply_turn', function(data) {
	  gameManager.handleTurn(data, socket);
	});
  
	socket.on('disconnect', function() {
	  gameManager.removePlayer(socket);
	});
  };
  