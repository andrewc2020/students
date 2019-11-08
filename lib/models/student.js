"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var studentSchema = new _mongoose.Mongoose.Schema({
  id: {
    type: int,
    unique: true
  },
  name: {
    type: String,
    unique: false
  },
  dob: {
    type: String,
    unique: false
  },
  age: {
    type: int,
    unique: false
  }
});
var studentsSchema = new _mongoose.Mongoose.Schema([studentSchema]);

var Student = _mongoose["default"].model('Student', studentSchema);

var Students = _mongoose["default"].model('Students', studentsSchema);

var _default = {
  Student: Student,
  Students: Students
};
exports["default"] = _default;