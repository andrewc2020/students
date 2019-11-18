import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3
  },
  //give different access rights if admin or not 
  isAdmin: Boolean
});
//custom method to generate authToken 
userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.my_private_key); //get the private key from the config file -> environment variable
  return token;
}

//function to validate user 
function validateUser(user) {
  const schema = {
    userName: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required()
  };

  return Joi.validate(user, schema);
}


userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    userName: login,
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

userSchema.methods.encrypt = async function(to_be_encrypted){
   await bcrypt.hash(to_be_encrypted,10,(err,encrypted)=>{
     return encrypted;

   })
}

const User = mongoose.model('User', userSchema);
exports.validate = validateUser;



export default User;