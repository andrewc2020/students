"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _course = _interopRequireDefault(require("../models/course"));

var _check = require("express-validator/check");

var _lodash = _interopRequireDefault(require("lodash"));

var CourseController =
/*#__PURE__*/
function () {
  function CourseController() {
    (0, _classCallCheck2["default"])(this, CourseController);
  }

  (0, _createClass2["default"])(CourseController, null, [{
    key: "getAllCourses",
    value: function getAllCourses(req, res) {
      _course["default"].find(function (err, courses) {
        return res.status(200).json({
          courses: courses,
          message: "All the courses"
        }); // end return
      });
    } // Get a single course

  }, {
    key: "getSingleCourse",
    value: function getSingleCourse(req, res) {
      _course["default"].findById(req.params.id, function (err, course) {
        if (err) {
          return res.status(404).json({
            message: "course not found"
          });
        }

        return res.status(200).json({
          course: course,
          message: "a single course record"
        });
      });
    } // Get courses sorted by name

  }, {
    key: "getCoursesByName",
    value: function getCoursesByName(req, res) {
      _course["default"].find(function (err, courses) {
        if (err) {
          return res.status(500);
        }

        var sortedByName = courses.sort(function (a, b) {
          return a.name > b.name ? 1 : -1;
        });
        return res.status(200).json({
          sortedByName: sortedByName,
          message: "all the courses sorted by name"
        });
      });
    } // add a course

  }, {
    key: "addCourse",
    value: function () {
      var _addCourse = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(req, res) {
        var errors, c;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 3:
                c = new _course["default"]({
                  name: req.body.course.name
                });
                _context.next = 6;
                return c.save(function (err, result) {
                  if (err) {
                    return res.status(422).json({
                      message: err
                    });
                  }

                  return res.status(200).json({
                    result: result,
                    message: "success"
                  });
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addCourse(_x, _x2) {
        return _addCourse.apply(this, arguments);
      }

      return addCourse;
    }() //update a course

  }, {
    key: "updateCourse",
    value: function updateCourse(req, res) {
      var course = _course["default"].find({
        _id: req.params.id
      }, function (err, course) {
        if (err) {
          return res.status(404).json({
            message: 'course not found'
          });
        }

        course.name = req.body.course.name;
        return res.status(200).json({
          course: course,
          message: "Course name updated"
        });
      });
    } // delete a student

  }, {
    key: "deleteCourse",
    value: function deleteCourse(req, res) {
      _course["default"].findById(req.params.id, function (err, course) {
        _course["default"].deleteOne(course, function (err) {
          if (err) {
            return status(404);
          }

          return CourseController.getAllCourses(req, res);
        });
      });
    }
  }]);
  return CourseController;
}(); // end of class


var _default = CourseController;
exports["default"] = _default;