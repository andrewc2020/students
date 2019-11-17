import mongoose from 'mongoose';



let courseSchema = new mongoose.Schema({
    
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});



const Course = mongoose.model('Course', courseSchema);
export default Course;