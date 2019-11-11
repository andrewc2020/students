import mongoose from 'mongoose';


let kittySchema = new mongoose.Schema({
    id: int,
    name: String
  });
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
let greeting = this.name
        ? "Meow name is " + this.name
: "I don't have a name";
console.log(greeting);
}

const Kitten = mongoose.model('Kitten', kittySchema);


export default Kitten;