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
const studentsSchema = new Mongoose.Schema([studentSchema]);




const Student = mongoose.model('Student', studentSchema);
const Students = mongoose.model('Students',studentsSchema);


export default {Student, Students};