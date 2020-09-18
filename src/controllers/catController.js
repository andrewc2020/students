
import Cat from '../models/cat';
import validate from '../models/cat';
import {validationResult} from 'express-validator';



class CatController{

    constructor(){
       

    }
    static getAllCats(req,res){

        
        
            Cat.find((err,Cats)=>{

                return res.status(200).json({
                    Cats,
                    message: "All the Cats"
        
                });  // end return
    
                
            }) //end find
        

    } // end method
    static getAllCatsSortedByName(req,res){
       
        Cat.find((err,Cats)=>{
            if(err){return res.status(500);}
            const sortedByName = Cats.sort((a,b) => (a.name > b.name ? 1 : -1));
            return res.status(200).json({
                sortedByName,
                message: "all the Cats sorted by name"
            })
        })

       
            
        
    }
    static getSingleCat(req,res){
        
            Cat.findById(req.params.id,(err,Cat)=>{
                if(!Cat){
                    return res.status(404).json({message: "Cat not found"});
                }
                return res.status(200).json({ Cat, message: "a single Cat record"})

            })
        
    
       
                

            
        

    }

    static async addCat(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
        }

        const { error } = validate(req.body.Cat);
        if (error) return res.status(400).send(error.details[0].message);

            let k = new Cat({name: req.body.Cat.name});
            await k.save((err,result)=>{
                if(err){return res.status(422).json({message:err})}
                return res.status(200).json({result, message:"success"});
            })
        
    }

    static deleteCat(req,res){
        
            Cat.findById(req.params.id,(err, Cat)=>{
                Cat.deleteOne(Cat,(err)=>{
                    if(err){return status(404)}
                    return CatController.getAllCats(req,res);


                })

            })
            
                

            
        
    }

    
}
export default CatController;