var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ssms';
config.yunUser=process.env.YUN_USER;
config.yunPass=process.env.YUN_PASS;
config.mqttUser=process.env.MQTT_USER;
config.mqttPass=process.env.MQTT_PASS;
module.exports = config;