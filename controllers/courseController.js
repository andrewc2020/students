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
 // Get courses sorted by name
 static getCoursesByName(req,res){
    const sortedbyname = courses.sort((a,b) => (a.name > b.name ? 1 : -1));
        return res.status(200).json({
        sortedbyname,
        message: "Courses by name",
    });
  
    }


      // add a course
      static addCourse(req,res){
            
       
              // Finds the validation errors in this request and wraps them in an object with handy functions
              const errors = validationResult(req);
              
              if (req.body.data.course.name.length < 2) {
                   
                return res.status(422).json({ errors: errors.array() });
              }
              
        
        
        courses.push({ "id": courses.length + 1 , name: req.body.data.course.name });
      
        
        var myparam = req.body.data.course;// info to create new course

if (!myparam) {
    res.status(400).json({error : 'data is missing'});
    return;
}

        return res.status(200).json({
              courses,
              message: "course added successfully",
        });
  }
  //update a course
static updateCourse(req,res){
    const course = courses.find( s => s.id === parseInt(req.params.id));
    if(!course){
    
          return res.status(404).json({
                message: 'course not found'
          });
          
    }
    
    courses.find(course => course.id === parseInt(req.params.id, 10)).name = req.body.data.course.name;
    
    
    
          
          
          
          return res.status(200).json({
                courses,
                message: "All the courses",
          });
    

    
    

}


} // end of class
export default CourseController;
