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

var _check = require("express-validator/check");

var _lodash = _interopRequireDefault(require("lodash"));

var _age = _interopRequireDefault(require("../utils/age"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _student = _interopRequireDefault(require("../models/student"));

var _user = _interopRequireDefault(require("../models/user"));

var StudentController = /*#__PURE__*/function () {
  // Get all students
  function StudentController() {
    (0, _classCallCheck2["default"])(this, StudentController);
  }

  (0, _createClass2["default"])(StudentController, null, [{
    key: "getAllStudents",
    value: function getAllStudents(req, res) {
      _student["default"].find( /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, students) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return res.status(200).json({
                    students: students,
                    message: "All the students"
                  });

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());
    } // Get a single student

  }, {
    key: "getSingleStudent",
    value: function () {
      var _getSingleStudent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _student["default"].findById(req.params.id, function (err, student) {
                  return res.status(200).json({
                    student: student,
                    message: "A single student record"
                  });
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSingleStudent(_x3, _x4) {
        return _getSingleStudent.apply(this, arguments);
      }

      return getSingleStudent;
    }() // Get students sorted by age descending

  }, {
    key: "getStudentsByAge",
    value: function getStudentsByAge(req, res) {
      _student["default"].find( /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, students) {
          var sortedByAge;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  sortedByAge = students.sort(function (a, b) {
                    return new Date(a.dob) > new Date(b.dob) ? 1 : -1;
                  });
                  _context3.next = 3;
                  return res.status(200).json({
                    sortedByAge: sortedByAge,
                    message: "Students by age descending - oldest to youngest"
                  });

                case 3:
                  return _context3.abrupt("return", _context3.sent);

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }());
    } // Get students sorted by age ascending

  }, {
    key: "getStudentsByAgeAsc",
    value: function getStudentsByAgeAsc(req, res) {
      _student["default"].find( /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(err, students) {
          var sortedByAge;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  sortedByAge = students.sort(function (a, b) {
                    return new Date(a.dob) < new Date(b.dob) ? 1 : -1;
                  });
                  _context4.next = 3;
                  return res.status(200).json({
                    sortedByAge: sortedByAge,
                    message: "Students by age ascending - youngest to oldest"
                  });

                case 3:
                  return _context4.abrupt("return", _context4.sent);

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x7, _x8) {
          return _ref3.apply(this, arguments);
        };
      }());
    } // Get students sorted by name

  }, {
    key: "getStudentsByName",
    value: function getStudentsByName(req, res) {
      _student["default"].find( /*#__PURE__*/function () {
        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(err, students) {
          var sortedByName;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  sortedByName = students.sort(function (a, b) {
                    return a.name > b.name ? 1 : -1;
                  });
                  _context5.next = 3;
                  return res.status(200).json({
                    sortedByName: sortedByName,
                    message: "Students by name"
                  });

                case 3:
                  return _context5.abrupt("return", _context5.sent);

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x9, _x10) {
          return _ref4.apply(this, arguments);
        };
      }());
    } //update a student

  }, {
    key: "updateStudent",
    value: function updateStudent(req, res) {
      // const student = students.find( s => s.id === parseInt(req.params.id));
      // if(!student){
      _student["default"].updateOne({
        _id: req.params.id
      }, /*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(err, student) {
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  student.userName = req.body.student.userName;
                  student.dob = req.body.student.dob;
                  _context6.next = 4;
                  return res.status(200).json({
                    student: student,
                    message: "updated successfully"
                  });

                case 4:
                  return _context6.abrupt("return", _context6.sent);

                case 5:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x11, _x12) {
          return _ref5.apply(this, arguments);
        };
      }());
    } // delete a student

  }, {
    key: "deleteStudent",
    value: function deleteStudent(req, res) {
      _student["default"].deleteOne({
        _id: req.params.id
      }, /*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(err) {
          return _regenerator["default"].wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return StudentController.getAllStudents(req, res);

                case 2:
                  return _context7.abrupt("return", _context7.sent);

                case 3:
                case "end":
                  return _context7.stop();
              }
            }
          }, _callee7);
        }));

        return function (_x13) {
          return _ref6.apply(this, arguments);
        };
      }());
    } // add a student

  }, {
    key: "addStudent",
    value: function () {
      var _addStudent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var my_param, errors, user, saltRounds;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // Finds the validation errors in this request and wraps them in an object with handy functions
                my_param = req.body; // info to create new student

                if (my_param) {
                  _context8.next = 4;
                  break;
                }

                res.status(400).json({
                  error: 'data is missing'
                });
                return _context8.abrupt("return");

              case 4:
                // Finds the validation errors in this request and wraps them in an object with handy functions
                errors = (0, _check.validationResult)(req);

                if (errors.isEmpty()) {
                  _context8.next = 7;
                  break;
                }

                return _context8.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 7:
                if (!((0, _age["default"])(new Date(req.body.student.dob)) < 18)) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 9:
                _context8.next = 11;
                return _user["default"].findOne({
                  email: req.body.student.email
                });

              case 11:
                user = _context8.sent;

                if (!user) {
                  _context8.next = 14;
                  break;
                }

                return _context8.abrupt("return", res.status(400).send("User already registered."));

              case 14:
                saltRounds = 10;
                _context8.next = 17;
                return _bcrypt["default"].hash(req.body.student.password, saltRounds, function (err, hash) {
                  var student = new _student["default"]({
                    userName: req.body.student.userName,
                    password: hash,
                    isAdmin: false,
                    email: req.body.student.email,
                    dob: req.body.student.dob
                  });
                  student.save(function (err, result) {
                    var token = student.generateAuthToken();
                    res.header("x-auth-token", token).send({
                      _id: result._id,
                      __t: result.__t,
                      userName: result.userName,
                      email: result.email,
                      dob: result.dob
                    });
                  });
                });

              case 17:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function addStudent(_x14, _x15) {
        return _addStudent.apply(this, arguments);
      }

      return addStudent;
    }()
  }]);
  return StudentController;
}();

var _default = StudentController;
exports["default"] = _default;