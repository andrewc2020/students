"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var kittySchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}); // NOTE: methods must be added to the schema before compiling it with mongoose.model()

kittySchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
}; //function to validate user 


function validateKitten(kitten) {
  var schema = {
    name: _joi["default"].string().min(2).max(50).required()
  };
  return _joi["default"].validate(kitten, schema);
}

var Kitten = _mongoose["default"].model('Kitten', kittySchema);

exports.validate = validateKitten;
var _default = Kitten;
exports["default"] = _default;