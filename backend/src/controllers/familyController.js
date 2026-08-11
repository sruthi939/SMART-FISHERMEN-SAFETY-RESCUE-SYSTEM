const { readData, writeData } = require('../config/database');

let ioInstance = null;

function setSocketIO(io) {
  ioInstance = io;
}

function getMessages(req, res) {
  const { boatId } = req.params;
  const db = readData();
  const messages = (db.familyMessages || []).filter(m => m.boatId === boatId);
  res.json({ messages });
}

function sendMessage(req, res) {
  const { boatId, senderName, senderRole, messageText } = req.body;
  const db = readData();

  if (!db.familyMessages) db.familyMessages = [];

  const newMessage = {
    id: `msg-${Date.now().toString().slice(-4)}`,
    boatId: boatId || 'b-102',
    senderName: senderName || 'Family Member',
    senderRole: senderRole || 'FAMILY',
    messageText: messageText || 'Stay safe!',
    timestamp: new Date().toISOString(),
    bearerUsed: 'LORA_MESH_RELAY'
  };

  db.familyMessages.push(newMessage);
  writeData(db);

  if (ioInstance) {
    ioInstance.emit('family:chat', { message: newMessage });
  }

  res.status(201).json({ message: 'Family message transmitted over mesh bearer', chatMessage: newMessage });
}

function getMarketPrices(req, res) {
  const db = readData();
  res.json({ marketPrices: db.fishMarketPrices || [], teleMedicine: db.teleMedicineHotlines || [] });
}

module.exports = {
  setSocketIO,
  getMessages,
  sendMessage,
  getMarketPrices
};
