import courses from '../dummy/courses.js';
import {check,validationResult} from 'express-validator/check';
import app from '../server.js';
import { doesNotReject } from 'assert';
import _ from 'lodash';

class CourseController{
    static getAllCourses(req, res) {
        return res.status(200).json({
              courses,
              message: "All the courses",
        });
    }
     // Get a single course
     static getSingleCourse(req, res) {
        const findcourse = courses.find(course => course.id === parseInt(req.params.id, 10));
        if (findcourse) {
            return res.status(200).json({
                  student: findcourse,
                  message: "A single course record",
            });
        }
        return res.status(404).json({
              message: "Course record not found",
        });
 }

} // end of class
export default CourseController;
