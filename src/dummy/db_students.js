import mongo from 'mongodb';
import _calculateAge from '../utils/age';


const url = "mongodb://localhost:27017/";

let students =[];

   

mongo.MongoClient.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("students").find({}).toArray(function(err, result) {
            if (err) throw err;
           
          students = JSON.parse(JSON.stringify(result.reduce((acc,student)=>{
                acc[student[0]] = student[0] || []
                acc.push({
                            id : student.id,
                            name: student.name,
                            dob: student.dob,
                            age: _calculateAge(new Date(student.dob))
                })
              
                return acc;
              
              },[]),2));

             
                   
                db.close();
            }); // end find
        }); // end connect


    

     

          
          
export default students;
