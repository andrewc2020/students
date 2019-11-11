"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var kittySchema = new _mongoose["default"].Schema({
  id: int,
  name: String
}); // NOTE: methods must be added to the schema before compiling it with mongoose.model()

kittySchema.methods.speak = function () {
  var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
  console.log(greeting);
};

var Kitten = _mongoose["default"].model('Kitten', kittySchema);

var _default = Kitten;
exports["default"] = _default;