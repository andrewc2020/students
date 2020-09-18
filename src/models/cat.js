import mongoose from 'mongoose';
import Joi from 'joi';


let catSchema = new mongoose.Schema({
    
  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
catSchema.methods.speak = function () {
let greeting = this.name
        ? "Meow name is " + this.name
: "I don't have a name";
console.log(greeting);
}
//function to validate user 
function validateCat(Cat) {
  const schema = {
    name: Joi.string().min(2).max(50).required()
  };

  return Joi.validate(Cat, schema);
}

const Cat = mongoose.model('Cat', catSchema);

exports.validate = validateCat;


export default Cat;