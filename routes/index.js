import { Router } from 'express';
import StudentController from '../controllers/studentController.js';
const routes = Router();
routes.get('/', StudentController.getAllStudents);
routes.get('/:id', StudentController.getSingleStudent);
routes.get('/sortby/age',StudentController.getStudentsByAge);

export default routes;