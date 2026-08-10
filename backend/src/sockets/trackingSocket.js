module.exports = function trackingSocket(io, socket) {
  socket.on('subscribe:boat', (boatId) => {
    socket.join(`boat:${boatId}`);
    console.log(`Socket ${socket.id} subscribed to boat:${boatId}`);
  });
};
