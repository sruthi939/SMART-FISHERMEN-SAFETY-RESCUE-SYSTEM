module.exports = function rescueSocket(io, socket) {
  socket.on('join:rescue_command', () => {
    socket.join('rescue_command_center');
    console.log(`Socket ${socket.id} joined rescue_command_center room`);
  });
};
