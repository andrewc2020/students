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

studentSchema.methods.age = _calculateAge(new Date(studentSchema.dob));








const Student = mongoose.model('Student', studentSchema);



export default Student;