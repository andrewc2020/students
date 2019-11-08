import {Student, Students} from './student';
import mongoose from 'mongoose';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
  };
  const models = { Student, Students };
  export { connectDb };
  export default models;