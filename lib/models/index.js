"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.models = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _student = _interopRequireDefault(require("./student"));

var _user = _interopRequireDefault(require("./user"));

var _kitten = _interopRequireDefault(require("./kitten"));

_dotenv["default"].config();

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    dbName: 'test',
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

var models = {
  Kitten: _kitten["default"],
  Student: _student["default"],
  User: _user["default"]
};
exports.models = models;
var _default = connectDb;
exports["default"] = _default;