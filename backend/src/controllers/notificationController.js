const Notification = require('../models/Notification');

exports.sendNotification = async (req, res) => {
  const { deviceToken, title, message } = req.body;
  const result = await Notification.sendAlert(deviceToken || 'token-demo', title, message);
  res.json({ message: 'Notification sent', result });
};
