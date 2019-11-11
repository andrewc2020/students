"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _kitten = _interopRequireDefault(require("./kitten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var connectDb = function connectDb() {
  return _mongoose["default"].connect(process.env.DATABASE_URL, {
    dbName: 'test',
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

var models = {
  Kitten: _kitten["default"]
};
var _default = connectDb;
exports["default"] = _default;