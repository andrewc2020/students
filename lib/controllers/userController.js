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

var _expressValidator = require("express-validator");

var _user = _interopRequireDefault(require("../models/user"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var userController =
/*#__PURE__*/
function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }

  (0, _createClass2["default"])(userController, null, [{
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      _user["default"].find(
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(err, users) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return res.status(200).json({
                    users: users,
                    message: "all the users"
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
    }
  }, {
    key: "getCurrent",
    value: function () {
      var _getCurrent = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(req, res) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _user["default"].findById(req.user._id).select("-password");

              case 2:
                user = _context2.sent;
                res.send(user);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getCurrent(_x3, _x4) {
        return _getCurrent.apply(this, arguments);
      }

      return getCurrent;
    }()
  }, {
    key: "getUser",
    value: function getUser(req, res) {
      _user["default"].find({
        id: req.params.id
      },
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err, user) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!user) {
                    res.status(404).json({
                      message: "user not found"
                    });
                  }

                  _context3.next = 3;
                  return res.status(200).json({
                    user: user,
                    message: "user found"
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
    }
  }, {
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee4(req, res) {
        var errors, _validate, error, user, token;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // Finds the validation errors in this request and wraps them in an object with handy functions
                errors = (0, _expressValidator.validationResult)(req);

                if (errors.isEmpty()) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", res.status(422).json({
                  errors: errors.array()
                }));

              case 3:
                _validate = (0, _user["default"])(req.body), error = _validate.error;

                if (!error) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send(error.details[0].message));

              case 6:
                _context4.next = 8;
                return _user["default"].findOne({
                  email: req.body.email
                });

              case 8:
                user = _context4.sent;

                if (!user) {
                  _context4.next = 11;
                  break;
                }

                return _context4.abrupt("return", res.status(400).send("User already registered."));

              case 11:
                user = new _user["default"]({
                  userName: req.body.userName,
                  password: req.body.password,
                  email: req.body.email
                });
                _context4.next = 14;
                return _bcrypt["default"].hash(user.password, 10);

              case 14:
                user.password = _context4.sent;
                _context4.next = 17;
                return user.save();

              case 17:
                token = user.generateAuthToken();
                res.header("x-auth-token", token).send({
                  _id: user._id,
                  userName: user.userName,
                  email: user.email
                });

              case 19:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addUser(_x7, _x8) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "deleteUser",
    value: function deleteUser(req, res) {
      user.deleteOne({
        _id: req.params.id
      }, function (err) {
        if (err) {
          return res.status(500);
        }

        return res.status(200);
      });
    }
  }]);
  return userController;
}();

var _default = userController;
exports["default"] = _default;