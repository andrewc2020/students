"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../models/user"));

module.exports = function (req, res, next) {
  //get the token from the header if present
  var token = req.headers["x-access-token"] || req.headers["authorization"]; //if no token found, return response (without going to the next middelware)

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    var decoded = _jsonwebtoken["default"].verify(token, process.env.my_private_key);

    req.user = decoded;

    _user["default"].findById(req.user._id, function (err, student) {
      console.log(err);
      console.log("student from token {0}", student);

      if (!student || student.__t !== "Student") {
        return res.status(401).send("Access denied");
      }

      req.student = student;
    });

    console.log("user from token{0}", req.user);
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};