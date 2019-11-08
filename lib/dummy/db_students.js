"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongodb = _interopRequireDefault(require("mongodb"));

var _age = _interopRequireDefault(require("../utils/age"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var url = "mongodb://localhost:27017/";
var students = [];

_mongodb["default"].MongoClient.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("students").find({}).toArray(function (err, result) {
    if (err) throw err;
    students = JSON.parse(JSON.stringify(result.reduce(function (acc, student) {
      acc[student[0]] = student[0] || [];
      acc.push({
        id: student.id,
        name: student.name,
        dob: student.dob,
        age: (0, _age["default"])(new Date(student.dob))
      });
      return acc;
    }, []), 2));
    db.close();
  }); // end find
}); // end connect


var _default = students;
exports["default"] = _default;