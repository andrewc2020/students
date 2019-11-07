import mongo from 'mongodb';
import _calculateAge from '../utils/age';


var url = "mongodb://localhost:27017/";
let _students = [];

mongo.MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
                
                _students = result;
                db.close();
            }); // end find
        }); // end connect

        const students = JSON.parse(JSON.stringify(_students.reduce((acc,student)=>{
            acc[student[0]] = student[0] || []
            acc.push({
                        id : student.id,
                        name: student.name,
                        dob: student.dob,
                        age: _calculateAge(new Date(student.dob))
            })
          
            return acc;
          
          },[]),2));

          
          
           export default students;
