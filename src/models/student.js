import mongoose from 'mongoose';
import User from './user';


import _calculateAge from "../utils/age";



const Student = User.discriminator('Student',new mongoose.Schema({
  dob:{
      type: String,
      required: true
  }

}))



export default Student;