import jwt from 'jsonwebtoken';
import User from '../models/user';


module.exports = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.my_private_key);
    req.user = decoded;
    User.findById(req.user._id,(err,student)=>{
        let arr =['Student','Teacher']
        
        if(!student || !arr.includes(student.__t)){
            return res.status(401).send("Access denied")
        }
        req.student = student;
    })
    
    console.log("user from token{0}",req.user);
    
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};