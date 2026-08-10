const { sendPushNotification } = require('../config/cloud');

async function sendSOSAlertToFamily(familyPhone, alertData) {
  console.log(`🚨 [SMS/Push] Sending SOS alert to family (${familyPhone}):`, alertData.description);
  return await sendPushNotification(familyPhone, 'EMERGENCY ALERT: MAYDAY SOS', alertData.description);
}

module.exports = { sendSOSAlertToFamily };
