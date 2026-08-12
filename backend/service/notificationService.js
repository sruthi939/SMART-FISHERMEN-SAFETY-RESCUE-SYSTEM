const notifications = [];

module.exports = {
  sendNotification: (userId, title, message) => {
    const notif = { id: `${Date.now()}`, userId, title, message, read: false, createdAt: new Date() };
    notifications.unshift(notif);
    return notif;
  },
  getUserNotifications: (userId) => notifications.filter(n => n.userId === userId)
};
