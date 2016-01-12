var config = {};

config.mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/ssms';
config.yunUser=process.env.Yun_User;
config.yunPass=process.env.Yun_Pass;
module.exports = config;