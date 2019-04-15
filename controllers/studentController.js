import students from '../dummy/students.js';
import {check,validationResult} from 'express-validator/check';
import app from '../server.js';
import { doesNotReject } from 'assert';


class StudentController {
    // Get all students
    static getAllStudents(req, res) {
          return res.status(200).json({
                students,
                message: "All the students",
          });
    }
    // Get a single student
    static getSingleStudent(req, res) {
           const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
           if (findStudent) {
               return res.status(200).json({
                     student: findStudent,
                     message: "A single student record",
               });
           }
           return res.status(404).json({
                 message: "Student record not found",
           });
    }
    // Get students sorted by age
    static getStudentsByAge(req,res){
            const sortedbyage = students.sort((a,b) => (a.age > b.age) ? 1 : -1);
          return res.status(200).json({
                sortedbyage,
                message: "Students by age",
          });
    }

    // Get students sorted by name
    static getStudentsByName(req,res){
      const sortedbyname = students.sort((a,b) => (a.name > b.name ? 1 : -1));
    return res.status(200).json({
          sortedbyname,
          message: "Students by name",
    });
    
      }
      //update a student
static updateStudent(req,res){
      const student = students.find( s => s.id === parseInt(req.params.id));
      if(!student){
      
            return res.status(404).json({
                  message: 'student not found'
            });
            
      }
      students.find(student => student.id === parseInt(req.params.id, 10)).age = parseInt(req.body.data.student.age);
      students.find(student => student.id === parseInt(req.params.id, 10)).name = req.body.data.student.name;
      
      
      
            
            
            
            return res.status(200).json({
                  students,
                  message: "All the students",
            });
      

      
      

}

      // add a student
      static addStudent(req,res){
            
            //check('name','Name empty').isLength({ min: 2 }).trim().withMessage('Name empty.').isAlpha().withMessage('Name must be alphabet letters.')
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                  const errors = validationResult(req);
                  
                  if (req.body.data.student.name.length < 2) {
                       
                    return res.status(422).json({ errors: errors.array() });
                  }
                  if(req.body.data.student.age < 18){
                        
                        return res.status(422).json({ errors: errors.array() });
                  }
            
            
            students.push({ "id": students.length + 1 , name: req.body.data.student.name , "age": req.body.data.student.age });
          
            
            var myparam = req.body.data.student;// info to create new student

    if (!myparam) {
        res.status(400).json({error : 'data is missing'});
        return;
    }
    
            return res.status(200).json({
                  students,
                  message: "student added successfully",
            });
      }

    
}
export default StudentController;