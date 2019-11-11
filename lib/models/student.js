"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _age = _interopRequireDefault(require("../utils/age"));

var studentSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    unique: false
  },
  dob: {
    type: String,
    unique: false
  }
});
studentSchema.methods.age = (0, _age["default"])(new Date(studentSchema.dob));

var Student = _mongoose["default"].model('Student', studentSchema);

var _default = Student;
exports["default"] = _default;