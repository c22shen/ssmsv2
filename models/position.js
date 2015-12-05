var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionSchema = new Schema({
  machineId: String,
  x_pos:  Number,
  y_pos: Number
});

var Position = mongoose.model('Position', positionSchema);
module.exports = {
  Position: Position
};