
import Course from '../models/course';
import {validationResult} from 'express-validator/check';

import _ from 'lodash';

class CourseController{
    static getAllCourses(req, res) {
      Course.find((err,courses)=>{

            return res.status(200).json({
                courses,
                message: "All the courses"
    
            });  // end return


          });
          
        
    }
     // Get a single course
     static getSingleCourse(req, res) {
      Course.findById(req.params.id,(err,course)=>{
            if(err){
                return res.status(404).json({message: "course not found"});
            }
            return res.status(200).json({ course, message: "a single course record"})

        })
    

 }
 // Get courses sorted by name
 static getCoursesByName(req,res){
      Course.find((err,courses)=>{
            if(err){return res.status(500);}
            const sortedByName = courses.sort((a,b) => (a.name > b.name ? 1 : -1));
            return res.status(200).json({
                sortedByName,
                message: "all the courses sorted by name"
            })
        })
  
    }


      // add a course
      static async addCourse(req,res){
            
       
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
            }
    
            
    
                let c = new Course({name: req.body.course.name});
                await c.save((err,result)=>{
                    if(err){return res.status(422).json({message:err})}
                    return res.status(200).json({result, message:"success"});
                })
  }
  //update a course
static updateCourse(req,res){
    const course = Course.find( {_id: req.params.id},(err,course)=>{
          if(err){return res.status(404).json({
            message: 'course not found'
      });}
      course.name = req.body.course.name;
      return res.status(200).json({
            course,
            message: "Course name updated",
      });

    });

    

}
 // delete a student
 static deleteCourse(req,res){
      Course.findById(req.params.id,(err, course)=>{
            Course.deleteOne(course,(err)=>{
                if(err){return status(404)}
                return CourseController.getAllCourses(req,res);


            })

        })
      }
        
} // end of class
export default CourseController;
