var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ssmsv2';
config.yunUser=process.env.GMAIL_USER||'yunlaboratory@gmail.com';
config.yunPass=process.env.GMAIL_PASS||'UofWaterloo15';
config.mqttUser=process.env.MQTT_USER||'mfbscall';
config.mqttPass=process.env.MQTT_PASS||'3sTu31WtAqZ6';
module.exports = config;