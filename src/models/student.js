import mongoose, { Mongoose } from 'mongoose';


const studentSchema = new Mongoose.Schema({
    id: {
        type: int,
        unique: true,
    },
    name: {
        type: String,
        unique: false,
      },
      dob:{
          type: String,
          unique: false
      },
      age:{
          type: int,
          unique: false
      }
})





const Student = mongoose.model('Student', studentSchema);



export default {Student, Students};