import {validationResult} from 'express-validator/check';
import _ from 'lodash';
import _calculateAge from '../utils/age';
import Student from '../models/student';



class StudentController {
    // Get all students



    


    constructor(){

     
      

    }


    


    
    
    static getAllStudents(req, res) {

      

      
        Student.find(async (err, students)=>{
             return await res.status(200).json({
                    students,
                    message: "All the students"
              })
        })
      
      
      
    
          
      
    }
    // Get a single student
    static getSingleStudent(req, res) {
     
           
                 Student.findById(req.params.id, async (err, student)=>{
                       
                       
                      
                  return await res.status(200).json({
                        student,
                        message : "A single student record"

                       })
                 })
           
     
    }
    // Get students sorted by age descending
    static getStudentsByAge(req,res){
          
                Student.find(async (err,students)=>{
                  const sortedByAge = students.sort((a,b) => (new Date(a.dob) > new Date(b.dob)) ? 1 : -1);
                  return await res.status(200).json({
                        sortedByAge,
                        message: "Students by age descending - oldest to youngest",
                  });

                })
          

           
    }

    // Get students sorted by age ascending
    static getStudentsByAgeAsc(req,res){
          
                Student.find( async (err,students)=>{
                  const sortedByAge = students.sort((a,b) => (new Date(a.dob) < new Date(b.dob)) ? 1 : -1);
                  return await res.status(200).json({
                        sortedByAge,
                        message: "Students by age ascending - youngest to oldest",
                  });

                })
          
     
}

   
    
    // Get students sorted by name
    static getStudentsByName(req,res){
          
                Student.find(async (err,students)=>{
                  const sortedByName = students.sort((a,b) => (a.name > b.name ? 1 : -1));
                  return await res.status(200).json({
                        sortedByName,
                        message: "Students by name",
                  });

                })
          
      
    
      }
      //update a student
static updateStudent(req,res){
      // const student = students.find( s => s.id === parseInt(req.params.id));
      // if(!student){
            
                  Student.updateOne({_id:req.params.id}, async (err, student)=>{
                        student.name = req.body.student.name;
                        student.dob = req.body.student.dob
                        return await res.status(200).json({
                              student,
                              message: "updated successfully"
                        })
                  })
            
      
            
            
      }
      
      
            
      // delete a student
      static deleteStudent(req,res){
           
                 Student.deleteOne({_id: req.params.id},async (err)=>{
                       return await StudentController.getAllStudents(req,res);

                 })
           
      }

      // add a student
      static addStudent(req,res){
            
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                  const errors = validationResult(req);

                 if(!errors.isEmpty()){ return res.status(422)}
                  
                  
                  if(_calculateAge(new Date(req.body.student.dob)) < 18){
                        
                        return res.status(422).json({ errors: errors.array() });
                  }
            
            
            var my_param = req.body.student;// info to create new student

    if (!my_param) {
        res.status(400).json({error : 'data is missing'});
        return;
    }

            
                  let s = new Student(req.body.student);
                  s.save(async (err)=>{
                        if(err){ res.status(500);}
                        return await StudentController.getAllStudents(req,res);

                  })
            
            
    
            
      }

    
}
export default StudentController;