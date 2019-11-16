import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Student from './student';
import User from './user';

import Kitten from './kitten';

dotenv.config();
const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { dbName : 'test', useUnifiedTopology: true, useNewUrlParser: true});
  };
  const models = {Kitten, Student, User};

  
 export {models};

 export default connectDb;
 
  