"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var userSchema = new _mongoose["default"].Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
}); //custom method to generate authToken 

userSchema.methods.generateAuthToken = function () {
  var token = _jsonwebtoken["default"].sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, process.env.my_private_key); //get the private key from the config file -> environment variable


  return token;
}; //function to validate user 


function validateUser(user) {
  var schema = {
    userName: _joi["default"].string().min(3).max(50).required(),
    email: _joi["default"].string().min(5).max(255).required().email(),
    password: _joi["default"].string().min(3).max(255).required()
  };
  return _joi["default"].validate(user, schema);
}

userSchema.statics.findByLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(login) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.findOne({
              userName: login
            });

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return this.findOne({
              email: login
            });

          case 6:
            user = _context.sent;

          case 7:
            return _context.abrupt("return", user);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

userSchema.methods.encrypt = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(to_be_encrypted) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcrypt["default"].hash(to_be_encrypted, 10, function (err, encrypted) {
              return encrypted;
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var User = _mongoose["default"].model('User', userSchema);

exports.validate = validateUser;
var _default = User;
exports["default"] = _default;