 import {_calculateAge} from '../utils/age';


 

 
 
 function checkNameLength(req, res, next){
    
  
    // As I see, here is array in data, so we use simple find
    const name_long_enough = req.body.student.name.length > 2;
  
    if(!name_long_enough){
      return res.status(422).send('Students names must be more than 2 characters');
    }
  
    next();
  }

  function ageMust_beOver18(req,res,next){
     
      const age_outside_permitted_range = _calculateAge(new Date(req.body.student.dob)) < 18;

      if(!age_outside_permitted_range){
          return res.status(422).send('Students must be over 18');
      }
      next();

  }

  export {checkNameLength, ageMust_beOver18};