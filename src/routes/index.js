import { Router } from 'express';
import StudentController from '../controllers/studentController';
import CourseController from '../controllers/courseController';

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
routes.get('/courses/sortby/name',CourseController.getCoursesByName);
routes.post('/courses/create/', CourseController.addCourse);
routes.put('/courses/:id', CourseController.updateCourse);
routes.delete('/courses/:id', CourseController.deleteCourse);


export default routes;