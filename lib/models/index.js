"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.connectDb = void 0;

var _student = require("./student");

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL);
};

exports.connectDb = connectDb;
var models = {
  Student: _student.Student,
  Students: _student.Students
};
var _default = models;
exports["default"] = _default;