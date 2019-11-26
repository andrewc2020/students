
import {validationResult} from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcrypt';
import validate from '../models/user';


class userController{
    constructor(){

    }
    static getAllUsers(req,res){
        User.find(async (err,users)=>{
            return await res.status(200).json({
                users,
                message: "all the users"
            })

        })
    }

    static async authenticate(req,res){
        //... fetch user from a db etc.
        let match = true;
        let userWithoutPassword = null;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }
        
        const user_to_find = await User.findOne({userName: req.body.userName});
        if(user_to_find && user_to_find._id){
             const user = await User.findById(user_to_find._id).select("-password");
     
            match = await bcrypt.compare(req.body.password, user_to_find.password);
            if(match) {
                //login
                const token = user.generateAuthToken();
                res.header("x-auth-token", token);
                return res.status(200).json({user});
            }
            

        }

        return res.status(401).json("not found");
        
       
     
        
        
    }
    
    static async getCurrent(req,res){

        const user = await User.findById(req.user._id).select("-password");
        res.send(user);

    }
    static getUser(req,res){
        User.find({id: req.params.id}, async (err,user)=>{
            if(!user){res.status(404).json({message: "user not found"})}
            return await res.status(200).json({
                user,

                message : "user found"
            })

        })


    }
    static async addUser(req,res){

        // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
      
        //find an existing user
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered.");
      
        user = new User({
          userName: req.body.userName,
          password: req.body.password,
          email: req.body.email,
          isAdmin: req.body.isAdmin,
        });
       user.password = await bcrypt.hash(user.password, 10);
        await user.save();
      
        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          isAdmin: user.isAdmin
        });
        
        
            
            
            
        
    }
    static deleteUser(req,res){
        user.deleteOne({_id : req.params.id},(err)=>{
            if(err){return res.status(500);}
            return res.status(200);
        })
    }
    static deleteAllUsers(req,res){
        User.deleteMany({},(err,result)=>{
            if(err){ return res.status(500);}
            return res.status(200).json({result, message:"all the users"})
        })
    }
}

export default userController;