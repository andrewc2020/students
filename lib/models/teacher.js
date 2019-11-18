"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _user = _interopRequireDefault(require("./user"));

var Teacher = _user["default"].discriminator('Teacher', new _mongoose["default"].Schema({
  dob: {
    type: String,
    required: true
  }
}));

var _default = Teacher;
exports["default"] = _default;