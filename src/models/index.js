import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Kitten from './kitten';

dotenv.config();
const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL, { dbName : 'test', useUnifiedTopology: true, useNewUrlParser: true});
  };
  const models = {Kitten};
 

 
  export default connectDb;
  