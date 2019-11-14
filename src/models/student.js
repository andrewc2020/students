import mongoose from 'mongoose';


import _calculateAge from "../utils/age";



const studentSchema = new mongoose.Schema({
    
    name: {
        type: String,
        unique: false,
      },
    dob:{
          type: String,
          unique: false
      }
      
});







  

 
    
  

  




const Student = mongoose.model('Student', studentSchema);


export default Student;