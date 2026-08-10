module.exports = function emergencySocket(io, socket) {
  socket.on('join:emergency_feed', () => {
    socket.join('emergency_alerts');
    console.log(`Socket ${socket.id} joined emergency_alerts room`);
  });
};
