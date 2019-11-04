"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNameLength = checkNameLength;
exports.ageMust_beOver18 = ageMust_beOver18;

var _age = require("../utils/age");

function checkNameLength(req, res, next) {
  // As I see, here is array in data, so we use simple find
  var name_long_enough = req.body.data.student.name.length > 2;

  if (!name_long_enough) {
    return res.status(422).send('Students names must be more than 2 characters');
  }

  next();
}

function ageMust_beOver18(req, res, next) {
  var age_outside_permitted_range = (0, _age._calculateAge)(new Date(req.body.data.student.dob)) < 18;

  if (!age_outside_permitted_range) {
    return res.status(422).send('Students must be over 18');
  }

  next();
}