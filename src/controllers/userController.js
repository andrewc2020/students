
import {validationResult} from 'express-validator';
import User from '../models/user'

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
    static getUser(req,res){
        User.find({id: req.params.id}, async (err,user)=>{
            if(!user){res.status(404).json({message: "user not found"})}
            return await res.status(200).json({
                user,

                message : "user found"
            })

        })


    }
    static addUser(req,res){

        // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }
        
        let me = new User({ "userName": req.body.userName});
        me.save(async (err)=>{
            
            console.log(err);
            return await userController.getAllUsers(req,res);
        })
    }
    static deleteUser(req,res){
        user.deleteOne({_id : req.params.id},(err)=>{
            if(err){return res.status(500);}
            return res.status(200);
        })
    }
}

export default userController;