"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _user = _interopRequireDefault(require("../models/user"));

module.exports = function (req, res, next) {
  try {
    //if can verify the token, set req.user and pass to next middleware
    _user["default"].findById(req.user._id, function (err, result) {
      var arr = ['Student', 'Teacher'];
      console.log("user from header{0}", result);

      if (result && result.__t && arr.includes(result.__t)) {
        console.log("{0} is a student or Teacher", result);
        req.student = result;
      }
    })["catch"](function (ex) {
      throw new TypeError("should be a student or teacher");
    });

    next();
  } catch (ex) {
    //if invalid token
    res.status(401).send("Access denied.");
  }
};