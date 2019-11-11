import mongo from 'mongodb';
import assert from 'assert';
import _calculateAge from '../src/utils/age';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import connectDb from '../src/models';
import Kitten from '../src/models/kitten';

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
        mongoose.connect(process.env.DATABASE_URL, { dbName : 'test', useUnifiedTopology: true, useNewUrlParser: true});
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
  // we're connected!
            assert.ok("connection established");
            db.close();
    });
    })
})
describe('add using pre-registered schema',()=>{
    it('should add a kitten',()=>{
        if(connectDb()){
            //find number of kittens
            
            
            let griselda = new Kitten({name:'griselda'});
            griselda.speak();
            griselda.save((err)=>{
                if(err){console.log(err);}
            });
            
            
        }
    })
})

describe('#5 retrieve all kittens',()=>{
    it('should return all kittens',()=>{
        if(connectDb()){
            mongoose.set('debug',true);
            console.log('connection established');
            Kitten.find((err,kittens)=>{
                if(err){console.log(err);}
                console.log(kittens);
                console.log('all the kittens');
                console.log(kittens[0].speak())

            })
            // let db = mongoose.connection;
            // db.close();

        }; // end of if connect
    });// end of it
}); // end of describe


describe('delete using pre-registered schema',()=>{
    it('should delete one kitten',()=>{
        if(connectDb()){
            Kitten.deleteMany({name:'fluffy'},(err)=>{
                console.log(err);


            })
            // let db = mongoose.connection;
            //     db.close();
        }
    })
})

        
}) // end of mongo tests
