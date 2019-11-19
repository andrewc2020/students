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

var _Teacher = _interopRequireDefault(require("../models/Teacher"));

var _user = _interopRequireDefault(require("../models/user"));

var TeacherController =
/*#__PURE__*/
function () {
  // Get all Teachers
  function TeacherController() {
    (0, _classCallCheck2["default"])(this, TeacherController);
  }

  (0, _createClass2["default"])(TeacherController, null, [{
    key: "getAllTeachers",
    value: function getAllTeachers(req, res) {
      _Teacher["default"].find(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(err, Teachers) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return res.status(200).json({
                    Teachers: Teachers,
                    message: "All the Teachers"
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
    } // Get a single Teacher

  }, {
    key: "getSingleTeacher",
    value: function () {
      var _getSingleTeacher = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Teacher["default"].findById(req.params.id, function (err, Teacher) {
                  return res.status(200).json({
                    Teacher: Teacher,
                    message: "A single Teacher record"
                  });
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getSingleTeacher(_x3, _x4) {
        return _getSingleTeacher.apply(this, arguments);
      }

      return getSingleTeacher;
    }() // Get Teachers sorted by age descending

  }, {
    key: "getTeachersByAge",
    value: function getTeachersByAge(req, res) {
      _Teacher["default"].find(
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err, Teachers) {
          var sortedByAge;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  sortedByAge = Teachers.sort(function (a, b) {
                    return new Date(a.dob) > new Date(b.dob) ? 1 : -1;
                  });
                  _context3.next = 3;
                  return res.status(200).json({
                    sortedByAge: sortedByAge,
                    message: "Teachers by age descending - oldest to youngest"
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
    } // Get Teachers sorted by age ascending

  }, {
    key: "getTeachersByAgeAsc",
    value: function getTeachersByAgeAsc(req, res) {
      _Teacher["default"].find(
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee4(err, Teachers) {
          var sortedByAge;
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  sortedByAge = Teachers.sort(function (a, b) {
                    return new Date(a.dob) < new Date(b.dob) ? 1 : -1;
                  });
                  _context4.next = 3;
                  return res.status(200).json({
                    sortedByAge: sortedByAge,
                    message: "Teachers by age ascending - youngest to oldest"
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
    } // Get Teachers sorted by name

  }, {
    key: "getTeachersByName",
    value: function getTeachersByName(req, res) {
      _Teacher["default"].find(
      /*#__PURE__*/
      function () {
        var _ref4 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee5(err, Teachers) {
          var sortedByName;
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  sortedByName = Teachers.sort(function (a, b) {
                    return a.name > b.name ? 1 : -1;
                  });
                  _context5.next = 3;
                  return res.status(200).json({
                    sortedByName: sortedByName,
                    message: "Teachers by name"
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
    } //update a Teacher

  }, {
    key: "updateTeacher",
    value: function updateTeacher(req, res) {
      // const Teacher = Teachers.find( s => s.id === parseInt(req.params.id));
      // if(!Teacher){
      _Teacher["default"].updateOne({
        _id: req.params.id
      },
      /*#__PURE__*/
      function () {
        var _ref5 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee6(err, Teacher) {
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  Teacher.userName = req.body.Teacher.userName;
                  Teacher.dob = req.body.Teacher.dob;
                  _context6.next = 4;
                  return res.status(200).json({
                    Teacher: Teacher,
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
    } // delete a Teacher

  }, {
    key: "deleteTeacher",
    value: function deleteTeacher(req, res) {
      _Teacher["default"].deleteOne({
        _id: req.params.id
      },
      /*#__PURE__*/
      function () {
        var _ref6 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee7(err) {
          return _regenerator["default"].wrap(function _callee7$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return TeacherController.getAllTeachers(req, res);

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
    } // add a Teacher

  }, {
    key: "addTeacher",
    value: function () {
      var _addTeacher = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8(req, res) {
        var my_param, errors, user, saltRounds;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // Finds the validation errors in this request and wraps them in an object with handy functions
                my_param = req.body; // info to create new Teacher

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
                if (!((0, _age["default"])(new Date(req.body.Teacher.dob)) < 18)) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 9:
                _context8.next = 11;
                return _user["default"].findOne({
                  email: req.body.Teacher.email
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
                return _bcrypt["default"].hash(req.body.Teacher.password, saltRounds, function (err, hash) {
                  var Teacher = new Teacher({
                    userName: req.body.Teacher.userName,
                    password: hash,
                    email: req.body.Teacher.email,
                    dob: req.body.Teacher.dob
                  });
                  Teacher.save(function (err, result) {
                    var token = Teacher.generateAuthToken();
                    res.header("x-auth-token", token).send({
                      _id: result._id,
                      __t: result.__t,
                      userName: result.userName,
                      email: result.email
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

      function addTeacher(_x14, _x15) {
        return _addTeacher.apply(this, arguments);
      }

      return addTeacher;
    }()
  }]);
  return TeacherController;
}();

var _default = TeacherController;
exports["default"] = _default;