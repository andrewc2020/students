"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _joi = _interopRequireDefault(require("joi"));

var catSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  }
}); // NOTE: methods must be added to the schema before compiling it with mongoose.model()

catSchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
}; //function to validate user 


function validateCat(Cat) {
  var schema = {
    name: _joi["default"].string().min(2).max(50).required()
  };
  return _joi["default"].validate(Cat, schema);
}

var Cat = _mongoose["default"].model('Cat', catSchema);

exports.validate = validateCat;
var _default = Cat;
exports["default"] = _default;