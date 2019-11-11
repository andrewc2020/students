"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _check = require("express-validator/check");

var _lodash = _interopRequireDefault(require("lodash"));

var _age = _interopRequireDefault(require("../utils/age"));

var _models = _interopRequireDefault(require("../models"));

var _student = _interopRequireDefault(require("../models/student"));

var StudentController =
/*#__PURE__*/
function () {
  // Get all students
  function StudentController() {
    (0, _classCallCheck2["default"])(this, StudentController);
  }

  (0, _createClass2["default"])(StudentController, null, [{
    key: "getAllStudents",
    value: function getAllStudents(req, res) {
      _student["default"].find(function (err, students) {
        return res.status(200).json({
          students: students,
          message: "All the students"
        });
      });
    } // Get a single student

  }, {
    key: "getSingleStudent",
    value: function getSingleStudent(req, res) {
      _student["default"].findById(req.params.id, function (err, student) {
        return res.status(200).json({
          student: student,
          message: "A single student record"
        });
      });
    } // Get students sorted by age descending

  }, {
    key: "getStudentsByAge",
    value: function getStudentsByAge(req, res) {
      _student["default"].find(function (err, students) {
        var sortedByAge = students.sort(function (a, b) {
          return new Date(a.dob) > new Date(b.dob) ? 1 : -1;
        });
        return res.status(200).json({
          sortedByAge: sortedByAge,
          message: "Students by age descending - oldest to youngest"
        });
      });
    } // Get students sorted by age ascending

  }, {
    key: "getStudentsByAgeAsc",
    value: function getStudentsByAgeAsc(req, res) {
      _student["default"].find(function (err, students) {
        var sortedByAge = students.sort(function (a, b) {
          return new Date(a.dob) < new Date(b.dob) ? 1 : -1;
        });
        return res.status(200).json({
          sortedByAge: sortedByAge,
          message: "Students by age ascending - youngest to oldest"
        });
      });
    } // Get students sorted by name

  }, {
    key: "getStudentsByName",
    value: function getStudentsByName(req, res) {
      _student["default"].find(function (err, students) {
        var sortedByName = students.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        return res.status(200).json({
          sortedByName: sortedByName,
          message: "Students by name"
        });
      });
    } //update a student

  }, {
    key: "updateStudent",
    value: function updateStudent(req, res) {
      // const student = students.find( s => s.id === parseInt(req.params.id));
      // if(!student){
      _student["default"].updateOne({
        _id: req.params.id
      }, function (err, student) {
        student.name = req.body.student.name;
        student.dob = req.body.student.dob;
        return res.status(200).json({
          student: student,
          message: "updated successfully"
        });
      });
    } // delete a student

  }, {
    key: "deleteStudent",
    value: function deleteStudent(req, res) {
      _student["default"].deleteOne({
        _id: req.params.id
      }, function (err) {
        return StudentController.getAllStudents(req, res);
      });
    } // add a student

  }, {
    key: "addStudent",
    value: function addStudent(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      var errors = (0, _check.validationResult)(req);

      if (req.body.student.name.length < 2) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      if ((0, _age["default"])(new Date(req.body.student.dob)) < 18) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      var my_param = req.body.student; // info to create new student

      if (!my_param) {
        res.status(400).json({
          error: 'data is missing'
        });
        return;
      }

      var s = new _student["default"](req.body.student);
      s.save(function (err) {
        if (err) {
          res.status(500);
        }

        return StudentController.getAllStudents(req, res);
      });
    }
  }]);
  return StudentController;
}();

var _default = StudentController;
exports["default"] = _default;