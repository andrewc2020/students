import mongoose from 'mongoose';
import User from './user';












const Teacher = User.discriminator('Teacher',new mongoose.Schema({
    dob:{
        type: String,
        required: true
    }

}))

export default Teacher;






  

 
    
  

  




