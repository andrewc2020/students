import { Router } from 'express';
import StudentController from '../controllers/studentController';
import CourseController from '../controllers/courseController';
import KittenController from '../controllers/kittenController';
import userController from '../controllers/userController';
import {check} from 'express-validator/check';
import auth from '../middleware/auth';
import student_auth from '../middleware/student_auth';





const routes = Router();
routes.post('/user/',[check('email').isEmail(),check('userName').isLength({min:2})],userController.addUser);
routes.get('/user/current', auth, userController.getCurrent);
routes.get('/users',auth,userController.getAllUsers);
routes.delete('/users',auth,userController.deleteAllUsers);
routes.get('/kittens/', KittenController.getAllKittens);
routes.get('/kittens/sortby/name', KittenController.getAllKittensSortedByName);
routes.get('/kittens/:id',KittenController.getSingleKitten);
routes.post('/kittens/create/',[check('kitten.name').isLength({min:2})],KittenController.addKitten);
routes.delete('/kittens/delete/:id',KittenController.deleteKitten);
routes.get('/students/',student_auth, StudentController.getAllStudents);
routes.get('/students/:id', auth, StudentController.getSingleStudent);
routes.get('/students/sortby/age', auth, StudentController.getStudentsByAge);
routes.get('/students/sortby/age/asc', auth , StudentController.getStudentsByAgeAsc)
routes.get('/students/sortby/name',auth, StudentController.getStudentsByName);
routes.post('/students/create/',[auth, check('student.userName').isLength({min:2})] , StudentController.addStudent);
routes.put('/students/:id', auth, StudentController.updateStudent);
routes.delete('/students/:id', auth, StudentController.deleteStudent);
routes.get('/courses/', CourseController.getAllCourses);
routes.get('/courses/:id', CourseController.getSingleCourse);
routes.get('/courses/sortby/name',CourseController.getCoursesByName);
routes.post('/courses/create/',[check('course.name').isLength({min:2})], CourseController.addCourse);
routes.put('/courses/:id', CourseController.updateCourse);
routes.delete('/courses/:id', CourseController.deleteCourse);

  
  
 
  
  

export default routes;