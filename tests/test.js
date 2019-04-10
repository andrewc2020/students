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
         
        // Test to get single student record
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



             });
        

         });
         it("should add a student", (done)=>{
           
            const data = { body : {
                    
                        
                name: 'Fred Bloggs',
                age: 36,
              
        }};
            chai.request(app)
            .post('/create/')
            .set('content-type', 'application/json')
            .send({myparam: data})
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

    });
});