"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _studentController = _interopRequireDefault(require("../controllers/studentController"));

var _teacherController = _interopRequireDefault(require("../controllers/teacherController"));

var _courseController = _interopRequireDefault(require("../controllers/courseController"));

var _kittenController = _interopRequireDefault(require("../controllers/kittenController"));

var _userController = _interopRequireDefault(require("../controllers/userController"));

var _expressValidator = require("express-validator");

var _auth = _interopRequireDefault(require("../middleware/auth"));

var _non_admin_auth = _interopRequireDefault(require("../middleware/non_admin_auth"));

var routes = (0, _express.Router)();
routes.get('/', function (req, res) {
  res.status(200).json({
    "usage": "/kittens"
  });
});
routes.post('/users/authenticate', [(0, _expressValidator.check)('userName').isLength({
  min: 2
}), (0, _expressValidator.check)('password').isLength({
  min: 2
})], _userController["default"].authenticate);
routes.post('/user/', [(0, _expressValidator.check)('email').isEmail(), (0, _expressValidator.check)('userName').isLength({
  min: 2
})], _userController["default"].addUser);
routes.get('/user/current', _non_admin_auth["default"], _userController["default"].getCurrent);
routes.get('/users', _auth["default"], _userController["default"].getAllUsers);
routes["delete"]('/users', _auth["default"], _userController["default"].deleteAllUsers);
routes.get('/kittens/', _kittenController["default"].getAllKittens);
routes.get('/kittens/sortby/name', _kittenController["default"].getAllKittensSortedByName);
routes.get('/kittens/:id', _kittenController["default"].getSingleKitten);
routes.post('/kittens/create/', [(0, _expressValidator.check)('kitten.name').isLength({
  min: 2
})], _kittenController["default"].addKitten);
routes["delete"]('/kittens/delete/:id', _kittenController["default"].deleteKitten); //students

routes.get('/students/', _auth["default"], _studentController["default"].getAllStudents);
routes.get('/students/:id', _non_admin_auth["default"], _studentController["default"].getSingleStudent);
routes.get('/students/sortby/age', _auth["default"], _studentController["default"].getStudentsByAge);
routes.get('/students/sortby/age/asc', _auth["default"], _studentController["default"].getStudentsByAgeAsc);
routes.get('/students/sortby/name', _auth["default"], _studentController["default"].getStudentsByName);
routes.post('/students/create/', [_auth["default"], (0, _expressValidator.check)('student.userName').isLength({
  min: 2
})], _studentController["default"].addStudent);
routes.put('/students/:id', _auth["default"], _studentController["default"].updateStudent);
routes["delete"]('/students/:id', _auth["default"], _studentController["default"].deleteStudent); //teachers

routes.get('/teachers/', _auth["default"], _teacherController["default"].getAllTeachers);
routes.get('/teachers/:id', _auth["default"], _teacherController["default"].getSingleTeacher);
routes.get('/teachers/sortby/age', _auth["default"], _teacherController["default"].getTeachersByAge);
routes.get('/teachers/sortby/age/asc', _auth["default"], _teacherController["default"].getTeachersByAgeAsc);
routes.get('/teachers/sortby/name', _auth["default"], _teacherController["default"].getTeachersByName);
routes.post('/teachers/create/', [_auth["default"], (0, _expressValidator.check)('teacher.userName').isLength({
  min: 2
})], _teacherController["default"].addTeacher);
routes.put('/teachers/:id', _non_admin_auth["default"], _teacherController["default"].updateTeacher);
routes["delete"]('/teachers/:id', _auth["default"], _teacherController["default"].deleteTeacher); //courses

routes.get('/courses/', _courseController["default"].getAllCourses);
routes.get('/courses/:id', _courseController["default"].getSingleCourse);
routes.get('/courses/sortby/name', _courseController["default"].getCoursesByName);
routes.post('/courses/create/', [(0, _expressValidator.check)('course.name').isLength({
  min: 2
})], _courseController["default"].addCourse);
routes.put('/courses/:id', _courseController["default"].updateCourse);
routes["delete"]('/courses/:id', _courseController["default"].deleteCourse);
var _default = routes;
exports["default"] = _default;