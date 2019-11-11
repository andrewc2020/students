"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _studentController = _interopRequireDefault(require("../controllers/studentController"));

var _courseController = _interopRequireDefault(require("../controllers/courseController"));

var _kittenController = _interopRequireDefault(require("../controllers/kittenController"));

var routes = (0, _express.Router)();
routes.get('/kittens/', _kittenController["default"].getAllKittens);
routes.get('/kittens/sortby/name', _kittenController["default"].getAllKittensSortedByName);
routes.get('/kittens/:id', _kittenController["default"].getSingleKitten);
routes.post('/kittens/create/', _kittenController["default"].addKitten);
routes["delete"]('/kittens/delete/:id', _kittenController["default"].deleteKitten);
routes.get('/students/', _studentController["default"].getAllStudents);
routes.get('/students/:id', _studentController["default"].getSingleStudent);
routes.get('/students/sortby/age', _studentController["default"].getStudentsByAge);
routes.get('/students/sortby/age/asc', _studentController["default"].getStudentsByAgeAsc);
routes.get('/students/sortby/name', _studentController["default"].getStudentsByName);
routes.post('/students/create/', _studentController["default"].addStudent);
routes.put('/students/:id', _studentController["default"].updateStudent);
routes["delete"]('/students/:id', _studentController["default"].deleteStudent);
routes.get('/courses/', _courseController["default"].getAllCourses);
routes.get('/courses/:id', _courseController["default"].getSingleCourse);
routes.get('/courses/sortby/name', _courseController["default"].getCoursesByName);
routes.post('/courses/create/', _courseController["default"].addCourse);
routes.put('/courses/:id', _courseController["default"].updateCourse);
routes["delete"]('/courses/:id', _courseController["default"].deleteCourse);
var _default = routes;
exports["default"] = _default;