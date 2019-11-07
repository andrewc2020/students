import mongo from 'mongodb';
import assert from 'assert';

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
}) // end of mongo tests
