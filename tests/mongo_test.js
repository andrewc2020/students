import mongo from 'mongodb';
import assert from 'assert';
import _calculateAge from '../src/utils/age';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

describe('mongo tests',()=>{


describe('#1 retrieve students',()=>{
    it('should create date from date string',()=>{
        var url = "mongodb://localhost:27017/";

mongo.MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            assert.equal(result.length,4);
                   
                db.close();
            }); // end find
        }); // end connect

    }) // end of it
}) // end describe
describe('#2 extend student with age calculated from dob',()=>{
    it('should create age field',()=>{
        var url = "mongodb://localhost:27017/";

mongo.MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            assert.equal(result.length,4);
            const students = JSON.parse(JSON.stringify(result.reduce((acc,student)=>{
                acc[student[0]] = student[0] || []
                acc.push({
                            id : student.id,
                            name: student.name,
                            dob: student.dob,
                            age: _calculateAge(new Date(student.dob))
                })
              
                return acc;
              
              },[]),2));

              assert.equal(students[0].age,23)
              console.log(students);
                   
                db.close();
            }); // end find
        }); // end connect

    }) // end of it
}) // end describe
describe('#3 connect using mongoose',()=>{
    it('should connect to local mongodb',()=>{
        mongoose.connect('mongodb://localhost/test', { useUnifiedTopology: true, useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
  // we're connected!
            assert.ok("connection established");
            db.close();
    });
    })
})
describe('#4 connect using env',()=>{
    it('should connect to local mongodb',()=>{
        dotenv.config();
        mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
  // we're connected!
            assert.ok("connection established");
            db.close();
    });
    })
})
describe('#5 connect using schema',()=>{
    it('should connect to local mongodb',()=>{
        dotenv.config();
        mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
  // we're connected!
            assert.ok("connection established");
            
            db.collection("kittens").drop();
            let kittySchema = new mongoose.Schema({
                name: String
              });
            // NOTE: methods must be added to the schema before compiling it with mongoose.model()
            kittySchema.methods.speak = function () {
            let greeting = this.name
                    ? "Meow name is " + this.name
            : "I don't have a name";
            console.log(greeting);
            }
  
  var Kitten = mongoose.model('Kitten', kittySchema);
            let silence = new Kitten({ name: 'Silence' });
            console.log(silence.name); // 'Silence'
            let fluffy = new Kitten({ name: 'fluffy' });
            fluffy.speak(); // "Meow name is fluffy"
            fluffy.save(function (err, fluffy) {
                if (err) return console.error(err);
                fluffy.speak();
              });
            
            db.close();
    });
    })
})
}) // end of mongo tests
