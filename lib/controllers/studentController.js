"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _students = _interopRequireDefault(require("../dummy/students"));

var _check = require("express-validator/check");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StudentController =
/*#__PURE__*/
function () {
  function StudentController() {
    _classCallCheck(this, StudentController);
  }

  _createClass(StudentController, null, [{
    key: "getAllStudents",
    // Get all students
    value: function getAllStudents(req, res) {
      return res.status(200).json({
        students: _students["default"],
        message: "All the students"
      });
    } // Get a single student

  }, {
    key: "getSingleStudent",
    value: function getSingleStudent(req, res) {
      var findStudent = _students["default"].find(function (student) {
        return student.id === parseInt(req.params.id, 10);
      });

      if (findStudent) {
        return res.status(200).json({
          student: findStudent,
          message: "A single student record"
        });
      }

      return res.status(404).json({
        message: "Student record not found"
      });
    } // Get students sorted by age

  }, {
    key: "getStudentsByAge",
    value: function getStudentsByAge(req, res) {
      var sortedbyage = _students["default"].sort(function (a, b) {
        return a.age > b.age ? 1 : -1;
      });

      return res.status(200).json({
        sortedbyage: sortedbyage,
        message: "Students by age"
      });
    } // Get students sorted by name

  }, {
    key: "getStudentsByName",
    value: function getStudentsByName(req, res) {
      var sortedbyname = _students["default"].sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
      });

      return res.status(200).json({
        sortedbyname: sortedbyname,
        message: "Students by name"
      });
    } //update a student

  }, {
    key: "updateStudent",
    value: function updateStudent(req, res) {
      var student = _students["default"].find(function (s) {
        return s.id === parseInt(req.params.id);
      });

      if (!student) {
        return res.status(404).json({
          message: 'student not found'
        });
      }

      _students["default"].find(function (student) {
        return student.id === parseInt(req.params.id, 10);
      }).age = parseInt(req.body.data.student.age);
      _students["default"].find(function (student) {
        return student.id === parseInt(req.params.id, 10);
      }).name = req.body.data.student.name;
      return res.status(200).json({
        students: _students["default"],
        message: "All the students"
      });
    } // delete a student

  }, {
    key: "deleteStudent",
    value: function deleteStudent(req, res) {
      var student = _students["default"].find(function (s) {
        return s.id === parseInt(req.params.id);
      });

      if (!student) {
        return res.status(404).json({
          message: 'student not found'
        });
      }

      _lodash["default"].remove(_students["default"], {
        id: parseInt(req.params.id)
      });

      return res.status(200).json({
        students: _students["default"],
        message: "all the students"
      });
    } // add a student

  }, {
    key: "addStudent",
    value: function addStudent(req, res) {
      //check('name','Name empty').isLength({ min: 2 }).trim().withMessage('Name empty.').isAlpha().withMessage('Name must be alphabet letters.')
      // Finds the validation errors in this request and wraps them in an object with handy functions
      var errors = (0, _check.validationResult)(req);

      if (req.body.data.student.name.length < 2) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      if (req.body.data.student.age < 18) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      _students["default"].push({
        "id": _students["default"].length + 1,
        name: req.body.data.student.name,
        "age": req.body.data.student.age
      });

      var myparam = req.body.data.student; // info to create new student

      if (!myparam) {
        res.status(400).json({
          error: 'data is missing'
        });
        return;
      }

      return res.status(200).json({
        students: _students["default"],
        message: "student added successfully"
      });
    }
  }]);

  return StudentController;
}();

var _default = StudentController;
exports["default"] = _default;