const { sendPushNotification } = require('../config/cloud');

class Notification {
  static async sendAlert(userToken, title, message) {
    return await sendPushNotification(userToken, title, message);
  }
}

module.exports = Notification;
