"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _user = _interopRequireDefault(require("../models/user"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

module.exports = function (req, res, next) {
  //get the token from the header if present
  var token = req.headers["x-access-token"] || req.headers["authorization"]; //if no token found, return response (without going to the next middelware)

  if (!token) return res.status(401).send({
    message: "Access denied. No token provided."
  });

  try {
    //if can verify the token, set req.user and pass to next middleware
    var decoded = _jsonwebtoken["default"].verify(token, process.env.my_private_key);

    req.user = decoded;
    console.log("decoded user {0}", req.user);
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send({
      message: "Invalid token."
    });
  }
};