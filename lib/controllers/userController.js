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
    key: "getUser",
    value: function getUser(req, res) {
      _user["default"].find({
        id: req.params.id
      },
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err, user) {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  if (!user) {
                    res.status(404).json({
                      message: "user not found"
                    });
                  }

                  _context2.next = 3;
                  return res.status(200).json({
                    user: user,
                    message: "user found"
                  });

                case 3:
                  return _context2.abrupt("return", _context2.sent);

                case 4:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x3, _x4) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "addUser",
    value: function addUser(req, res) {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      var errors = (0, _expressValidator.validationResult)(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.array()
        });
      }

      var me = new _user["default"]({
        "userName": req.body.userName
      });
      me.save(
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  console.log(err);
                  _context3.next = 3;
                  return userController.getAllUsers(req, res);

                case 3:
                  return _context3.abrupt("return", _context3.sent);

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x5) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
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