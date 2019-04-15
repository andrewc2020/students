// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import https from 'https';
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Students", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
        // Test to get single student record
        it("should get a single student record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to not get single student record 
        it("should not get a single student record", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });

         //Test to get students sorted by age
         it("should return students sorted by age desc",(done) => {
             chai.request(app)
                .get('/sortby/age')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    let firststudent = res.body.sortedbyage[0];
                    firststudent.should.have.property('age').equal(19);
                    
                    
                    done();
                });

         });
         it("should return students sorted by first name", (done)=>{
             chai.request(app)
             .get('/sortby/name')
             .end((err, res) =>{
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 let firststudent = res.body.sortedbyname[0];
                 firststudent.should.have.property('name').equal('Arthur Clark');
                 
                 
                 done();



             }); //end of end
        

         }); //end of it

        
        

    }); //end of describe Get

    // POST 
    describe("Post /", ()=>{
        it("should add a student", (done)=>{
           
            const data = { student : {
                    
                        
                name: 'Fred Bloggs',
                age: 36,
              
        }};
            chai.request(app)
            .post('/create/')
            .set('content-type', 'application/json')
            .send({data})
            .end((err, res) =>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                
                if (err) {
                    done(err);
                } else {
                    done();
                }
                
                



            });
       

        });
        it("should throw an error when the name is empty",(done)=>{
            const data = { student: {
                name: '',
                age: 26
            }};

            chai.request(app)
            .post('/create/')
            .set('content-type', 'application/json')
            .send({data})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });


        })
        it("should throw an error when the age is out of range",(done)=>{
            const data = { student: {
                name: 'Jane Eyre',
                age: 12
            }};

            chai.request(app)
            .post('/create/')
            .set('content-type', 'application/json')
            .send({data})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });


        })
    }); // end of describe Post
    // describe PUT
    describe("Put /1", ()=>{
        it("should update an existing student",(done) =>{
            const data = { student : {
                    
                id : 1,       
                name: "Sean Gray",
                age: 26,
              
        }};
        chai.request(app)
        .put(`/${data.student.id}`)
        .set('content-type', 'application/json')
        .send({data})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const student = res.body.students.filter(s => s.id == data.student.id);
            student[0].should.have.property("age").equal(26);
            
                
                if (err) {
                    done(err);
                } else {
                    done();
                }

            
         });


        });
        it("should throw not found error when trying to update a non existant student", (done) => {
            const data = { student : {
                    
                id : 300,       
                name: "non existent student",
                age: 26,
              
        }};
            chai.request(app)
            .put(`/${data.student.id}`)
            .set('content-type', 'application/json')
            .send({data})
            .end((err, res) => {
            res.should.have.status(404);
            if (err) {
                done(err);
            } else {
                done();
            }
            });
        }); // end of it should
            
        
    }); // end of describe PUT
}); // end of describe Students