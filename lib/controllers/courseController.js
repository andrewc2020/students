"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _courses = _interopRequireDefault(require("../dummy/courses"));

var _check = require("express-validator/check");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CourseController =
/*#__PURE__*/
function () {
  function CourseController() {
    _classCallCheck(this, CourseController);
  }

  _createClass(CourseController, null, [{
    key: "getAllCourses",
    value: function getAllCourses(req, res) {
      return res.status(200).json({
        courses: _courses["default"],
        message: "All the courses"
      });
    } // Get a single course

  }, {
    key: "getSingleCourse",
    value: function getSingleCourse(req, res) {
      var findcourse = _courses["default"].find(function (course) {
        return course.id === parseInt(req.params.id, 10);
      });

      if (findcourse) {
        return res.status(200).json({
          course: findcourse,
          message: "A single course record"
        });
      }

      return res.status(404).json({
        message: "Course record not found"
      });
    } // Get courses sorted by name

  }, {
    key: "getCoursesByName",
    value: function getCoursesByName(req, res) {
      var sortedbyname = _courses["default"].sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
      });

      return res.status(200).json({
        sortedbyname: sortedbyname,
        message: "Courses by name"
      });
    } // add a course

  }, {
    key: "addCourse",
    value: function addCourse(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      var errors = (0, _check.validationResult)(req);

      if (req.body.data.course.name.length < 2) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      _courses["default"].push({
        "id": _courses["default"].length + 1,
        name: req.body.data.course.name
      });

      var myparam = req.body.data.course; // info to create new course

      if (!myparam) {
        res.status(400).json({
          error: 'data is missing'
        });
        return;
      }

      return res.status(200).json({
        courses: _courses["default"],
        message: "course added successfully"
      });
    } //update a course

  }, {
    key: "updateCourse",
    value: function updateCourse(req, res) {
      var course = _courses["default"].find(function (s) {
        return s.id === parseInt(req.params.id);
      });

      if (!course) {
        return res.status(404).json({
          message: 'course not found'
        });
      }

      _courses["default"].find(function (course) {
        return course.id === parseInt(req.params.id, 10);
      }).name = req.body.data.course.name;
      return res.status(200).json({
        courses: _courses["default"],
        message: "All the courses"
      });
    } // delete a student

  }, {
    key: "deleteCourse",
    value: function deleteCourse(req, res) {
      var course = _courses["default"].find(function (s) {
        return s.id === parseInt(req.params.id);
      });

      if (!course) {
        return res.status(404).json({
          message: 'course not found'
        });
      }

      _lodash["default"].remove(_courses["default"], {
        id: parseInt(req.params.id)
      });

      return res.status(200).json({
        courses: _courses["default"],
        message: "all the courses"
      });
    }
  }]);

  return CourseController;
}(); // end of class


var _default = CourseController;
exports["default"] = _default;