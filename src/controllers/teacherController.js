import {validationResult} from 'express-validator/check';
import _ from 'lodash';
import _calculateAge from '../utils/age';
import bcrypt from 'bcrypt';
import Teacher from '../models/teacher';
import User from '../models/user';





class TeacherController {
    // Get all Teachers



    


    constructor(){

     
      

    }


    


    
    
    static getAllTeachers(req, res) {

      

      
        Teacher.find(async (err, Teachers)=>{
             return await res.status(200).json({
                    Teachers,
                    message: "All the Teachers"
              })
        })
      
      
      
    
          
      
    }
    // Get a single Teacher
    static async getSingleTeacher(req, res) {
     
           
                 await Teacher.findById(req.params.id, (err, Teacher)=>{
                       
                       
                      
                  return res.status(200).json({
                        Teacher,
                        message : "A single Teacher record"

                       })
                 })
           
     
    }
    // Get Teachers sorted by age descending
    static getTeachersByAge(req,res){
          
                Teacher.find(async (err,Teachers)=>{
                  const sortedByAge = Teachers.sort((a,b) => (new Date(a.dob) > new Date(b.dob)) ? 1 : -1);
                  return await res.status(200).json({
                        sortedByAge,
                        message: "Teachers by age descending - oldest to youngest",
                  });

                })
          

           
    }

    // Get Teachers sorted by age ascending
    static getTeachersByAgeAsc(req,res){
          
                Teacher.find( async (err,Teachers)=>{
                  const sortedByAge = Teachers.sort((a,b) => (new Date(a.dob) < new Date(b.dob)) ? 1 : -1);
                  return await res.status(200).json({
                        sortedByAge,
                        message: "Teachers by age ascending - youngest to oldest",
                  });

                })
          
     
}

   
    
    // Get Teachers sorted by name
    static getTeachersByName(req,res){
          
                Teacher.find(async (err,Teachers)=>{
                  const sortedByName = Teachers.sort((a,b) => (a.name > b.name ? 1 : -1));
                  return await res.status(200).json({
                        sortedByName,
                        message: "Teachers by name",
                  });

                })
          
      
    
      }
      //update a Teacher
static updateTeacher(req,res){
      // const Teacher = Teachers.find( s => s.id === parseInt(req.params.id));
      // if(!Teacher){
            
                  Teacher.updateOne({_id:req.params.id}, async (err, Teacher)=>{
                        Teacher.userName = req.body.Teacher.userName;
                        Teacher.dob = req.body.Teacher.dob
                        return await res.status(200).json({
                              Teacher,
                              message: "updated successfully"
                        })
                  })
            
      
            
            
      }
      
      
            
      // delete a Teacher
      static deleteTeacher(req,res){
           
                 Teacher.deleteOne({_id: req.params.id},async (err)=>{
                       return await TeacherController.getAllTeachers(req,res);

                 })
           
      }

      // add a Teacher
      static async addTeacher(req,res){
            
                  // Finds the validation errors in this request and wraps them in an object with handy functions
                 
                  
                 
                  
                  
                 
                  
                  
                 
            
            
            var my_param = req.body;// info to create new Teacher

    if (!my_param) {
        res.status(400).json({error : 'data is missing'});
        return;
    }

           // Finds the validation errors in this request and wraps them in an object with handy functions
           const errors = validationResult(req);
           if (!errors.isEmpty()) {
           return res.status(422).json({ errors: errors.array() });
           }

           if(_calculateAge(new Date(req.body.Teacher.dob)) < 18){
                        
            return res.status(422).json({ errors: errors.array() });
      }
   
      //      const { error } = User.validate(req.body.Teacher);
      //      if (error) return res.status(400).send(error.details[0].message);
         
           //find an existing user
           let user = await User.findOne({ email: req.body.Teacher.email });
           if (user) return res.status(400).send("User already registered.");

           
                let saltRounds=10;
    
           await bcrypt.hash(req.body.Teacher.password, saltRounds, function(err, hash) {
            
         
           let Teacher = new Teacher({
             userName: req.body.Teacher.userName,
             password: hash,
             email: req.body.Teacher.email,
             dob: req.body.Teacher.dob
           });

           

     
           Teacher.save((err,result)=>{
            const token = Teacher.generateAuthToken();
            res.header("x-auth-token", token).send({
              _id: result._id,
              __t: result.__t,
              userName: result.userName,
              email: result.email
            });
            
            
             })
            });// end of bcrypt
     
           
           
         
          
           
           
               
        

            
                  

                  
                 
            
    
            
      }

    
}
export default TeacherController;