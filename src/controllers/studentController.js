import students from '../dummy/students';
import {check,validationResult} from 'express-validator/check';
import _ from 'lodash';
import _calculateAge from '../utils/age';



class StudentController {
    // Get all students



    


    constructor(){
      

    }

    
    
    static getAllStudents(req, res) {

      const allStudents = JSON.parse(JSON.stringify(students.reduce((acc,student)=>{
            acc[student[0]] = student[0] || []
            acc.push({
                        id : student.id,
                        name: student.name,
                        dob: student.dob,
                        age: _calculateAge(new Date(student.dob))
            })

            return acc;

      },[]),2));
          
          return res.status(200).json({
                allStudents,
                message: "All the students"
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
    // Get students sorted by age descending
    static getStudentsByAge(req,res){
            const sortedbyage = students.sort((a,b) => (new Date(a.dob) > new Date(b.dob)) ? 1 : -1);
          return res.status(200).json({
                sortedbyage,
                message: "Students by age descending - oldest to youngest",
          });
    }

    // Get students sorted by age ascending
    static getStudentsByAgeAsc(req,res){
      const sortedbyage = students.sort((a,b) => (new Date(a.dob) < new Date(b.dob)) ? 1 : -1);
    return res.status(200).json({
          sortedbyage,
          message: "Students by age ascending - youngest to oldest",
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
      students.find(student => student.id === parseInt(req.params.id, 10)).dob = req.body.data.student.dob;
      students.find(student => student.id === parseInt(req.params.id, 10)).name = req.body.data.student.name;
      
      
      
            
            
            
            return res.status(200).json({
                  students,
                  message: "All the students",
            });
      

      
      

}
      // delete a student
      static deleteStudent(req,res){
            const student = students.find( s => s.id === parseInt(req.params.id));
      if(!student){
      
            return res.status(404).json({
                  message: 'student not found'
            });
            
      }
            _.remove( students, { id : parseInt(req.params.id) });
            return res.status(200).json({
                  students,
                  message: "all the students",
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
                  if(_calculateAge(new Date(req.body.data.student.dob)) < 18){
                        
                        return res.status(422).json({ errors: errors.array() });
                  }
            
            
            students.push({ "id": students.length + 1 , name: req.body.data.student.name , "dob": req.body.data.student.dob });
          
            
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