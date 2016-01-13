var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ssmsv2';
config.yunUser=process.env.GMAIL_USER;
config.yunPass=process.env.GMAIL_PASS;
config.mqttUser=process.env.MQTT_USER;
config.mqttPass=process.env.MQTT_PASS;
module.exports = config;