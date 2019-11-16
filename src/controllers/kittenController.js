
import Kitten from '../models/kitten';
import validate from '../models/kitten';
import {validationResult} from 'express-validator';



class KittenController{

    constructor(){
       

    }
    static getAllKittens(req,res){

        
        
            Kitten.find((err,kittens)=>{

                return res.status(200).json({
                    kittens,
                    message: "All the kittens"
        
                });  // end return
    
                
            }) //end find
        

    } // end method
    static getAllKittensSortedByName(req,res){
       
        Kitten.find((err,kittens)=>{
            if(err){return res.status(500);}
            const sortedByName = kittens.sort((a,b) => (a.name > b.name ? 1 : -1));
            return res.status(200).json({
                sortedByName,
                message: "all the kittens sorted by name"
            })
        })

       
            
        
    }
    static getSingleKitten(req,res){
        
            Kitten.findById(req.params.id,(err,kitten)=>{
                if(!kitten){
                    return res.status(404).json({message: "kitten not found"});
                }
                return res.status(200).json({ kitten, message: "a single kitten record"})

            })
        
    
       
                

            
        

    }

    static async addKitten(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }

        const { error } = validate(req.body.kitten);
        if (error) return res.status(400).send(error.details[0].message);

            let k = new Kitten({name: req.body.kitten.name});
            await k.save((err,result)=>{
                if(err){return res.status(422).json({message:err})}
                return res.status(200).json({result, message:"success"});
            })
        
    }

    static deleteKitten(req,res){
        
            Kitten.findById(req.params.id,(err, kitten)=>{
                Kitten.deleteOne(kitten,(err)=>{
                    if(err){return status(404)}
                    return KittenController.getAllKittens(req,res);


                })

            })
            
                

            
        
    }

    
}
export default KittenController;