import {validationResult} from 'express-validator/check';
import _ from 'lodash';
import _calculateAge from '../utils/age';
import bcrypt from 'bcrypt';
import Student from '../models/student';
import User from '../models/user';





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
    static async getSingleStudent(req, res) {
     
           
                 await Student.findById(req.params.id, (err, student)=>{
                       
                       
                      
                  return res.status(200).json({
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
            
                  Student.findOne({_id:req.params.id}, async (err, student)=>{
                        student.userName = req.body.student.userName;
                        student.dob = req.body.student.dob
                        student.save();
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
      static async addStudent(req,res){
            
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                 
                  
                 
                  
                  
                 
                  
                  
                 
            
            
            var my_param = req.body;// info to create new student

    if (!my_param) {
        res.status(400).json({error : 'data is missing'});
        return;
    }

           // Finds the validation errors in this request and wraps them in an object with handy functions
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
           return res.status(422).json({ errors: errors.array() });
           }

           if(_calculateAge(new Date(req.body.student.dob)) < 18){
                        
            return res.status(422).json({ errors: errors.array() });
      }
   
      //      const { error } = User.validate(req.body.student);
      //      if (error) return res.status(400).send(error.details[0].message);
         
           //find an existing user
           let user = await User.findOne({ email: req.body.student.email });
           if (user) return res.status(400).send("User already registered.");

           
                let saltRounds=10;
    
           await bcrypt.hash(req.body.student.password, saltRounds, function(err, hash) {
            
         
           let student = new Student({
             userName: req.body.student.userName,
             password: hash,
             isAdmin: false,
             email: req.body.student.email,
             dob: req.body.student.dob
           });

           

     
           student.save((err,result)=>{
            const token = student.generateAuthToken();
            res.header("x-auth-token", token).send({
              _id: result._id,
              __t: result.__t,
              userName: result.userName,
              email: result.email,
              dob: result.dob
            });
            
            
             })
            });// end of bcrypt
     
           
           
         
          
           
           
               
        

            
                  

                  
                 
            
    
            
      }

    
}
export default StudentController;