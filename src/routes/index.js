import { Router } from 'express';
import StudentController from '../controllers/studentController';
import TeacherController from '../controllers/teacherController';
import CourseController from '../controllers/courseController';
import KittenController from '../controllers/kittenController';
import CatController from '../controllers/catController'
import userController from '../controllers/userController';
import {check} from 'express-validator';
import auth from '../middleware/auth';

import non_admin_auth from '../middleware/non_admin_auth';





  

const routes = Router();
routes.get('/',(req,res)=>{
    res.status(200).json({"usage": "/kittens"})
})
routes.post('/users/authenticate',[check('userName').isLength({min:2}),check('password').isLength({min:2})],userController.authenticate);
routes.post('/user/',[check('email').isEmail(),check('userName').isLength({min:2})],userController.addUser);
routes.get('/user/current',non_admin_auth, userController.getCurrent);
routes.get('/users',auth, userController.getAllUsers);
routes.delete('/users',auth,userController.deleteAllUsers);
routes.get('/kittens/', KittenController.getAllKittens);
routes.get('/kittens/sortby/name', KittenController.getAllKittensSortedByName);
routes.get('/kittens/:id',KittenController.getSingleKitten);
routes.post('/kittens/create/',[check('kitten.name').isLength({min:2})],KittenController.addKitten);
routes.delete('/kittens/delete/:id',KittenController.deleteKitten);
//students
routes.get('/students/',auth, StudentController.getAllStudents);
routes.get('/students/:id', non_admin_auth, StudentController.getSingleStudent);
routes.get('/students/sortby/age', auth, StudentController.getStudentsByAge);
routes.get('/students/sortby/age/asc', auth , StudentController.getStudentsByAgeAsc)
routes.get('/students/sortby/name',auth, StudentController.getStudentsByName);
routes.post('/students/create/',[auth, check('student.userName').isLength({min:2})] , StudentController.addStudent);
routes.put('/students/:id', auth, StudentController.updateStudent);
routes.delete('/students/:id', auth, StudentController.deleteStudent);
//teachers
routes.get('/teachers/',auth,TeacherController.getAllTeachers);
routes.get('/teachers/:id', auth, TeacherController.getSingleTeacher);
routes.get('/teachers/sortby/age', auth, TeacherController.getTeachersByAge);
routes.get('/teachers/sortby/age/asc', auth , TeacherController.getTeachersByAgeAsc)
routes.get('/teachers/sortby/name',auth, TeacherController.getTeachersByName);
routes.post('/teachers/create/',[auth, check('teacher.userName').isLength({min:2})] , TeacherController.addTeacher);
routes.put('/teachers/:id', non_admin_auth, TeacherController.updateTeacher);
routes.delete('/teachers/:id', auth, TeacherController.deleteTeacher);

//courses
routes.get('/courses/', CourseController.getAllCourses);
routes.get('/courses/:id', CourseController.getSingleCourse);
routes.get('/courses/sortby/name',CourseController.getCoursesByName);
routes.post('/courses/create/',[check('course.name').isLength({min:2})], CourseController.addCourse);
routes.put('/courses/:id', CourseController.updateCourse);
routes.delete('/courses/:id', CourseController.deleteCourse);

  
  
 
  
  

export default routes;