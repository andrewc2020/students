import { Router } from 'express';
import StudentController from '../controllers/studentController.js';
import CourseController from '../controllers/courseController.js';

const routes = Router();
routes.get('/students/', StudentController.getAllStudents);
routes.get('/students/:id', StudentController.getSingleStudent);
routes.get('/students/sortby/age',StudentController.getStudentsByAge);
routes.get('/students/sortby/name',StudentController.getStudentsByName);
routes.post('/students/create/', StudentController.addStudent);
routes.put('/students/:id', StudentController.updateStudent);
routes.delete('/students/:id', StudentController.deleteStudent);
routes.get('/courses/', CourseController.getAllCourses);
routes.get('/courses/:id', CourseController.getSingleCourse);


export default routes;