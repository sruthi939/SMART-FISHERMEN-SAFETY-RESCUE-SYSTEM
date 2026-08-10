const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'sfsrs_maritime_super_secret_jwt_key_2026',
  dbType: process.env.DB_TYPE || 'sqlite',
  mqttBroker: process.env.MQTT_BROKER || 'mqtt://broker.hivemq.com:1883'
};
