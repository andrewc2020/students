// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Students", () => {
    describe("GET /students", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
             chai.request(app)
                 .get('/students')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     console.log(res.body);
                     done();
                  });
         });
        // Test to get single student record
        it("should get a single student record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/students/${id}`)
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
                 .get(`/students/${id}`)
                 .end((err, res) => {
                     res.should.have.status(404);
                     done();
                  });
         });

         //Test to get students sorted by age
         it("should return students sorted by age desc",(done) => {
             chai.request(app)
                .get('/students/sortby/age')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    let firststudent = res.body.sortedbyage[0];
                    firststudent.should.have.property('dob').equal('03/30/1993');
                    
                    
                    done();
                });

         });

          //Test to get students sorted by age
          it("should return students sorted by age asc",(done) => {
            chai.request(app)
               .get('/students/sortby/age/asc')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   let firststudent = res.body.sortedbyage[0];
                   firststudent.should.have.property('dob').equal('12/09/2000');
                   
                   
                   done();
               });

        });
         it("should return students sorted by first name", (done)=>{
             chai.request(app)
             .get('/students/sortby/name')
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
    describe("Post /students", ()=>{
        it("should add a student", (done)=>{
           
            const data = { student : {
                    
                        
                name: 'Fred Bloggs',
                dob: '09/24/1983'
              
        }};
            chai.request(app)
            .post('/students/create/')
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
                dob: '11/16/1993'
            }};

            chai.request(app)
            .post('/students/create/')
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
                dob: '08/12/2008'
            }};

            chai.request(app)
            .post('/students/create/')
            .set('content-type', 'application/json')
            .send({data})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });


        })
    }); // end of describe Post
    // describe PUT
    describe("Put /students/1", ()=>{
        it("should update an existing student Sean Gray - dob",(done) =>{
            const data = { student : {
                    
                id : 1,       
                name: "Sean Gray",
                dob: '05/22/1993',
              
        }};
        chai.request(app)
        .put(`/students/${data.student.id}`)
        .set('content-type', 'application/json')
        .send({data})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const student = res.body.students.filter(s => s.id == data.student.id);
            student[0].should.have.property("dob").equal('05/22/1993');
            console.log(res.body);
                
                if (err) {
                    done(err);
                } else {
                    done();
                }

            
         });


        });
        it("should throw not found error when trying to update a non existent student", (done) => {
            const data = { student : {
                    
                id : 300,       
                name: "non existent student",
                dob: '02/14/1993'
              
        }};
            chai.request(app)
            .put(`/students/${data.student.id}`)
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
    describe("delete/students/{$id}", ( )=> {
        it("should delete a student", (done) =>{
            
            
            chai.request(app)
            .delete('/students/5')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                if (err) {
                    done(err);
                } else {
                    done();
                }

            });
        })

    
    it("should throw a not found error if the student does not exist", (done) => {
        
        chai.request(app)
        .delete('/students/300')
        .end((err, res) => {
            res.should.have.status(404);
            if (err) {
                done(err);
            } else {
                done();
            }
        }); 
        
    }); // end of it should throw error
    }); //end of describe delete
}); // end of describe Students

//describe  courses
describe('courses', () =>{
    describe('GET /courses', () => {
        // Test to get all course records
    it("should get all course records", (done) => {
        chai.request(app)
            .get('/courses')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             }); //end of end
    });// end of it
    // Test to get single course record
    it("should get a single course record", (done) => {
        const id = 1;
        chai.request(app)
            .get(`/courses/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
             }); //end of end
    }); // end of it
    // Test to not get single course record 
    it("should not get a single course record", (done) => {
        const id = 300;
        chai.request(app)
            .get(`/courses/${id}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
             });
    });
    // sort by name
    it("should get courses sorted by name", (done) => {
        chai.request(app)
        .get(`/courses/sortby/name`)
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            let firstcourse = res.body.sortedbyname[0];
            firstcourse.should.have.property('name').equal('biology');
            done();
            });//end of end

    });// end of it should

}); // end of describe GET courses
// POST 
    describe("Post /courses", ()=>{
        
        it("should add a course",(done) => {
            const data = { course : {
                    
                        
                name: 'Mandarin for beginners',
                
              
        }};
            chai.request(app)
            .post(`/courses/create`)
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

                

            }); // end of end

        }); // end of it
        it("should throw an error when the name is empty",(done)=>{
            const data = { course: {
                name: '',
                
            }};

            chai.request(app)
            .post('/courses/create/')
            .set('content-type', 'application/json')
            .send({data})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });


        })

    }); // end of describe POST courses
    // describe PUT
    describe("Put /courses/1", ()=>{
        it("should update an existing course",(done) =>{
            const data = { course : {
                    
                id : 1,       
                name: "watercolour painting",
                
              
        }};
        chai.request(app)
        .put(`/courses/${data.course.id}`)
        .set('content-type', 'application/json')
        .send({data})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            const course = res.body.courses.filter(s => s.id == data.course.id);
            course[0].should.have.property("name").equal("watercolour painting");
            
                
                if (err) {
                    done(err);
                } else {
                    done();
                }

            
         });


        });
        it("should throw not found error when trying to update a non existent course", (done) => {
            const data = { course : {
                    
                id : 300,       
                name: "non existent course",
                
              
        }};
            chai.request(app)
            .put(`/courses/${data.course.id}`)
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

    // describe DELETE
    describe("delete/courses/{$id}", ( )=> {
        it("should delete a course", (done) =>{
            
            
            chai.request(app)
            .delete('/courses/5')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log(res.body);
                if (err) {
                    done(err);
                } else {
                    done();
                }

            });
        })

    
    it("should throw a not found error if the course does not exist", (done) => {
        
        chai.request(app)
        .delete('/courses/300')
        .end((err, res) => {
            res.should.have.status(404);
            if (err) {
                done(err);
            } else {
                done();
            }
        }); 
        
    }); // end of it should throw error

    }); // end of describe delete
    

}); // end of describe courses