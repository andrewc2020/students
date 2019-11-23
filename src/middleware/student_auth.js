
import User from '../models/user';


module.exports = function(req, res, next) {
  

  try {
    //if can verify the token, set req.user and pass to next middleware
    

    User.findById(req.user._id,(err,result)=>{
        let arr =['Student','Teacher']

        console.log("user from header{0}",result);

        
        // Students and Teachers may view their own record
        
        if(result && result.__t && arr.includes(result.__t)){
          console.log("{0} is a student or Teacher", result);
          if(!result.isAdmin && result._id !== req.params.id){
            return res.status(401).send("not authorised");
          }
        }
       
       
    }).catch((ex)=>{
       throw new TypeError("should be a student or teacher");

    });
    
 
    
    next();
  } catch (ex) {
    //if invalid token
    res.status(401).send("Access denied.");
  }
};