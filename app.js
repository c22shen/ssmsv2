var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var socketio = require('socket.io');

var config = require('./config');

var routes = require('./routes/index');
//var machines = require('./routes/machines');
var contact = require('./routes/contact');

var MachineService = require('./services/machine-service');
var Machine = require('./models/machine').Machine;
var Position = require('./models/position').Position;

mongoose.connect(config.mongoUri);
var app = express();



server = http.createServer(app);
io = socketio.listen(server);
//routes(app, io);
server.listen(process.env.PORT || 3000);

io.sockets.on('connection', function(socket){
  console.log("socketio connected");
  Position.find({}, function(err, positions) {
    if (err) {
      console.log("getMachinePositions",err);
    } else {
      socket.emit("initStatus", {
        positions:positions
      });
     console.log("positions:",positions);
    }
  })
  socket.on('updateStatus', function(status){
    console.log("--------app.js---------socketon:",status);
    MachineService.storeMachineStatus(status.machine_id,status.machine_status);
  });
});



// init status data array


    
/*-----------MQTT------------*/
var mqtt = require('mqtt');

// Create a client connection
var client = mqtt.createClient(19506, 'm10.cloudmqtt.com', {
  username: config.mqttUser,
  password: config.mqttPass 
});

client.on('connect', function() { // When connected

  // subscribe to a topic
  client.subscribe('machine', function() {
    // when a message arrives, do something with it
    client.on('message', function(topic, message, packet) {
      var current_value_parsed = message.toString().split(":");
      current_value = parseInt(current_value_parsed[1], 16) * 256 + parseInt(current_value_parsed[2], 16);
      io.sockets.emit("receiveStatus", {
        machine_id: current_value_parsed[0],
        current_value: current_value
      });
    });
  });
});
/*-----------MQTT------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/contact',contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

