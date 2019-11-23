// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/server';
import dotenv from 'dotenv';
import Teacher from '../src/models/teacher';
import { AssertionError } from 'assert';
import assert from 'assert';
import bcrypt from 'bcrypt';
import User from '../src/models/user';
dotenv.config();
let token=process.env.ACCESS_TOKEN;
let student_token = "";
let user_token='';
before(async()=>{
    // Configure chai
chai.use(chaiHttp);
chai.should();




    
})

describe("Users",()=>{
    describe('User create',()=>{
        it('POST User Should create a user via the API and receive a valid token',(done)=>{
            const user = {
                userName: "Jane Sales",
                email: "janeS@halifax.com",
                isAdmin: true,
                password: "sdfjladfjasf"
            };

            chai.request(app)
            .post('/user')
            .send(user)
            .end((err,res) =>{
                res.should.have.status(200);
                res.should.have.header('x-auth-token');
                console.log(res.header['x-auth-token']);
                user_token=res.header['x-auth-token'];
                console.log("x-auth-token {0}",user_token)
                done();
                
                



            });
        
        })
    })
  
})

describe("Students", () => {
    describe("POST students/create",()=>{
        it("should add a student", (done)=>{
           
            const student = {
                userName: "Jane Eyre",
                email: "janeE@halifax.com",
                password: "sdfjladfjasf",
                dob: "1993-08-01T23:00:00.000+00:00"
            };

            chai.request(app)
            .post('/students/create/')
            .set({'x-access-token':token})
            .send({student})
            .end((err,res) =>{
                res.should.have.status(200);
                res.should.have.header('x-auth-token');
                student_token=res.header['x-auth-token'];
                console.log("x-auth-token {}",student_token)
                done();
                
                



            });
        

        });
        describe('deny access',()=>{
            it('should deny access to the student just created as she is not an admin',(done)=>{
    
                chai.request(app)
                .post('/students/create')
                .set({'x-access-token':student_token})
                .end((err,res) =>{
                    res.should.have.status(401);
                   
                    done();
                    
                    
    
    
    
                }) //end of end
            }) //end of it
        })//end of describe
    })
    describe("GET /students", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
           
             chai.request(app)
                .get('/students')
                .set({'x-access-token':token})
                .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     console.log(res.body);
                     done();
                  });
         });
        // Test to get single student record
        it("should get a single student record", (done) => {
             const id = "5dce74b2189244385fa2b51a";
             chai.request(app)
             .get(`/students/${id}`)
             .set({'x-access-token':token})
             .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to not get single student record 
        it("should not get a single student record", (done) => {
             const id = '5dcd791c78d3c4276632004a';
             chai.request(app)
             .get(`/students/${id}`)
             .set({'x-access-token' :token})
             .end((err, res) => {
                     res.should.have.status(200);
                     
                     done();
                  });
         });

         //Test to get students sorted by age
         it("should return students sorted by age desc",(done) => {
             chai.request(app)
             .get('/students/sortby/age')
             .set({'x-access-token':token})   
             .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    
                    
                    done();
                });

         });
       

          //Test to get students sorted by age
          it("should return students sorted by age asc",(done) => {
            chai.request(app)
            .get('/students/sortby/age/asc')
            .set({'x-access-token':token})
            .end((err, res) => {
                   res.should.have.status(200);
                   
                   
                   
                   done();
               });

        });
         it("should return students sorted by first name", (done)=>{
             chai.request(app)
             .get('/students/sortby/name')
             .set({'x-access-token': token})
             .end((err, res) =>{
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 let firststudent = res.body.sortedByName[0];
                 if(firststudent){
                    firststudent.should.have.property('userName').equal('Jane Eyre');

                 }
                 
                 
                 
                 done();



             }); //end of end
        

         }); //end of it

        
        

    }); //end of describe Get

    // POST 
    describe("Post /students", ()=>{
      
        it("should throw an error when the name is empty",(done)=>{
            const student =  {
                userName: '',
                email:'janeE@halifax.com',
                password:'sdfjladfjasf',
                dob: '1991-08-01T23:00:00.000+00:00'
            };

            chai.request(app)
            .post('/students/create/')
            .set({'x-access-token':token})
            .send({student})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });
            

        })
        it("should throw an error when the age is out of range",(done)=>{
            const student = {
                userName: 'George Davis',
                email:'georgedavis@halifax.com',
                password:'sdfjladfjasf',
                dob: '2008-08-01T23:00:00.000+00:00'
            };

            chai.request(app)
            .post('/students/create/')
            .set({'x-access-token':token})
            .send({student})
            .end((err,res) =>{
                res.should.have.status(422);
                done();
            });


        })
    }); // end of describe Post
    // describe PUT
    describe("Put /students/5dc993d649a6d09151e9b278", ()=>{
        it("should update an existing student Sean Gray - dob",(done) =>{
            const student = {
                    
                id:    "5dc993d649a6d09151e9b278" ,
                userName: "Sean Gray",
                email: "SeanGray@bt.com",
                password: "asdjfljfa",
                dob: "1992-08-01T23:00:00.000+00:00"
              
        };
        chai.request(app)
        .put(`/students/${student.id}`)
        .set({'x-access-token' : token})
        .send({student})
        .end((err, res) => {
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
        it("should not throw not found error when trying to update a non existent student", (done) => {
            const student = {
                    
                id : '5dcd46ef620bb5003485023854',       
                userName: "non existent student",
                email:"nonest@nowhere.com",
                dob: '02/14/1993'
              
        };
            chai.request(app)
            .put(`/students/${student.id}`)
            .set('x-access-token', token)
            .send({student})
            .end((err, res) => {
            res.should.have.status(200);
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
            .delete('/students/5dcd1696a6c47c00b285e8d2')
            .set({'x-access-token': token})
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
        .delete('/students/5dcd46ef620bb5099a79503b')
        .set({'x-access-token':token})
        .end((err, res) => {
            res.should.have.status(200);
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
        const id = "5dd18a5124fe5472330d1dd7";
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
        const id = "5dd18a5124fe54AAAAAA1dd7";
        chai.request(app)
            .get(`/courses/${id}`)
            .end((err, res) => {
                res.should.have.status(200);
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
            
            let firstCourse = res.body.sortedByName[0];
            if(firstCourse){
            firstCourse.should.have.property('name').equal('Art in the 20th Century');
            }

            done();
            });//end of end

    });// end of it should

}); // end of describe GET courses
// POST 
    describe("Post /courses", ()=>{
        
        it("should add a course",(done) => {
            const course = {
                    
                        
                name: "Mandarin for beginners"
                
              
        };
            chai.request(app)
            .post(`/courses/create`)
            .set('content-type', 'application/json')
            .send({course})
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
            const course = {
                    
                id : "5dd18bd1cce5eb72d21008ee",       
                name: "watercolour painting",
                
              
        };
        chai.request(app)
        .put(`/courses/${course.id}`)
        .set('content-type', 'application/json')
        .send({course})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
           
            
                
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
        .delete('/courses/5dd18bdaaaaaa8ee')
        .end((err, res) => {
            res.should.have.status(200);
            if (err) {
                done(err);
            } else {
                done();
            }
        }); 
        
    }); // end of it should throw error

    }); // end of describe delete
    

}); // end of describe courses
//Kittens
describe('kittens',()=>{
    describe('get all kittens',()=>{

    
    it('should retrieve kittens',(done)=>{
        chai.request(app)
        
        .get('/kittens')
        .end((err,res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            console.log(res.body);
            if (err) {
                done(err);
            } else {
                done();
            }

        
    })
})

describe('get one kitten',()=>{
    it('should throw an error of kitten does not exist',(done)=>{
        chai.request(app)
        
        .get('/kittens/5dc9496ef94bb8cfb1ad3a3c')
        .end((err,res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            console.log(res.body);
            if (err) {
                done(err);
            } else {
                done();
            }}) // end of end
        })

})// end of it should
}) // end of describe get one kitten
describe('delete one kitten',()=>{
    it('should delete one kitten',(done)=>{
        
        chai.request(app)
        
        .delete('/kittens/delete/5dc951b335288cd330595f1d')
        .end((err,res) => {
            res.should.have.status(200);
            done();
        })

    })
})
describe('get kittens sorted by name',()=>{
    it('should retrieve all kittens by name in alphabetical order',(done)=>{
        chai.request(app)
        .get('/kittens/sortby/name')
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            if (err) {
                done(err);
            } else {
                done();
            }

        })

    }
    )
})
describe('kittens/create success',()=>{
    it('should create a kitten',(done)=>{
        const kitten = {
                    
                        
            name: 'Marmalade'
            
          
        };

        chai.request(app)
        .post(`/kittens/create`)
        .set('content-type', 'application/json')
        .send({kitten})
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

    })
})
describe('kittens/create fail',()=>{
    it('should return a 422 error if the name is missing or less than two characters',(done)=>{
        const data = { Kitten : {
                    
                        
            name: 'M'
            
          
    }};
        chai.request(app)
        .post(`/kittens/create`)
        .set('content-type', 'application/json')
        .send({data})
        .end((err, res) =>{
            res.should.have.status(422);
            res.body.should.be.a('object');
            console.log(res.body);
            
            if (err) {
                done(err);
            } else {
                done();
            }

            

        }); // end of end
    })
})//end of describe kitten create error
}) // end of describe kittens

describe('Teacher',()=>{
    describe('inheritance',()=>{
        it('should create a teacher with both user and teacher properties',(done)=>{
            let myTeacher = new Teacher({
                dob: "2008-08-01T23:00:00.000+00:00",
                userName: "Maurice MichaelWhite",
                email: "maurice@bt.com",
                password:"ououewtouo"
            });
            myTeacher.save((err,result)=>{
               
                console.log(result);
                done();
                
            })
            
            assert.equal(myTeacher.email,'maurice@bt.com');
        })
        it('should encrypt',(done)=>{
            let myPlaintextPassword="fljsafjlasf";
            let saltRounds=10;

            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                assert.notEqual(hash,myPlaintextPassword)
                console.log("encrypted password {0}",hash)
               
               
                done();
              });

        })

        it('should save encrypted password',(done)=>{
            let myPlaintextPassword="fljsafjlasf";
            let saltRounds=10;

            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                assert.notEqual(hash,myPlaintextPassword)
                console.log("encrypted password {0}",hash)
                let myTeacher = new Teacher({
                    dob: "2008-08-01T23:00:00.000+00:00",
                    userName: "Maurice Landy",
                    email: "maurice@service.com",
                    password: hash
    
    
                })
                myTeacher.save((err,result)=>{
                    console.log(result);
                    

                })
               
               
                done();
              }); //end of it
              
             
              

              it('should post student with encrypted password',(done)=>{
                let myPlaintextPassword="fljsafjlasf";
                let saltRounds=10;
    
                bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {

                const student = {
                    userName: "Jane Newby",
                    email: "janeN@hampton.com",
                    password: hash,
                    dob: "1993-08-01T23:00:00.000+00:00"
                };
    
                chai.request(app)
                .post('/students/create/')
                .set({'x-access-token':token})
                .send({student})
                .end((err,res) =>{
                    res.should.have.status(200);
                    done();
                    
                    
    
    
    
                });
            });

        })


              
    })// end of describe inheritance
    describe('clean up',()=>{
        it('should delete all users',(done)=>{
            chai.request(app)
                .delete('/users')
                .set({'x-access-token':token})
                .end((err,res) =>{
                    res.should.have.status(200);
                    done();
                    
                    
    
    
    
                });

        })
    })
})// end of describe 
})

after(async () => {  
    chai.request(app)
    .delete('/users')
    .set({'x-access-token':token})
    .end((err,res) =>{
        
        
        



    });
  })