import students from '../dummy/students.js';
import {body,validationResult} from 'express-validator/check';
import {sanitizeBody} from 'express-validator/filter';

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
      // add a student
      static addStudent(req,res){
            console.log(req.body.myparam);
            body('name', 'Empty name').isLength({ min: 1 }).trim().withMessage('Name empty.').isAlpha().withMessage('Name must be alphabet letters.'), 
            body('age', 'Invalid age').optional({ checkFalsy: true }).isISO8601(),
            students.push({ "id": students.length + 1 , name: req.body.myparam.body.name , "age": req.body.myparam.body.age });
            var myparam = req.body.myparam; //league id to create new student
    if (!myparam) {
        res.status(400).json({error : 'myparam is missing'});
        return;
    }
            return res.status(200).json({
                  students,
                  message: "student added successfully",
            });
      }

    
}
export default StudentController;